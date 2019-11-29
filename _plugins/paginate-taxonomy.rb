# Author: atbradley (https://github.com/atbradley)
# License: MIT
#
# URL: https://github.com/atbradley/jekyll-taxonomy-pagination
#
# Modified to use slugified taxonomy names and to use "page/:num" instead of "page:num"

require "jekyll-paginate"
require 'active_support/inflector'

module Jekyll

  class TaxonGenerator < Generator
    safe true

    def generate(site)
      ['tags', 'categories'].each do |taxons_type|
        taxon_type = taxons_type.singularize

        #TODO: This should happen in TaxonPage.
        #TODO: We could also look for a special layout for certain categories/tags.
        if site.layouts.key? "#{taxon_type}_index"
            lyout = "#{taxon_type}_index"
        else
            lyout = 'taxon_index'
        end

        txns = site.send(taxons_type).keys

        txns.each do |txn|
          paginate(site, taxons_type, lyout, txn)
          site.pages << TaxonAtom.new(site, site.source, taxons_type, txn, lyout)
        end
      end
    end

    def paginate(site, txtype, lyout, taxon)
      tx_posts = site.posts.docs.find_all {|post| post.data[txtype].include?(taxon)}.sort_by {|post| -post.date.to_f}
      num_pages = TaxonPager.calculate_pages(tx_posts, site.config['paginate'].to_i)

      (1..num_pages).each do |page|
        pager = TaxonPager.new(site, page, tx_posts, taxon, txtype, num_pages)
        #TODO: directory name *could* be set in settings.
        dir = File.join(txtype.singularize, Utils.slugify(taxon), page > 1 ? "page/#{page}" : '')
        page = TaxonPage.new(site, site.source, dir, taxon, txtype, lyout)
        page.pager = pager
        site.pages << page
      end
    end
  end

  class TaxonPage < Page
    def initialize(site, base, dir, taxon, txtype, layout)
      @site = site
      @base = base
      @dir = dir
      @name = 'index.html'

      self.process(@name)
      self.read_yaml(File.join(base, '_layouts'), "#{layout}.html")
      self.data['taxon_type'] = txtype.singularize
      self.data['taxons_type'] = txtype
      self.data['taxon'] = taxon
      self.data['taxon_id'] = Utils.slugify(taxon)
    end
  end

  class TaxonFeedMeta < Liquid::Tag
    # Use Jekyll's native relative_url filter
    include Jekyll::Filters::URLFilters

    def render(context)
      @context = context
      attrs    = attributes.map { |k, v| %(#{k}="#{v}") }.join(" ")
      if @context.registers[:page].include?('taxon')
        "<link #{attrs} />"
      else
        ""
      end
    end

    private

    def config
      @config ||= @context.registers[:site].config
    end

    def attributes
      {
        :type  => "application/atom+xml",
        :rel   => "alternate",
        :href  => absolute_url(path),
        :title => title,
      }.keep_if { |_, v| v }
    end

    def path
      taxon_id = @context.registers[:page]['taxon_id']
      txtype = @context.registers[:page]['taxon_type']
      "/#{txtype}/#{taxon_id}/feed"
    end

    def title
      site_title = @context.registers[:site].config['title']
      taxon = @context.registers[:page]['taxon']
      txtype = @context.registers[:page]['taxon_type']
      "#{site_title} - #{taxon} #{txtype} feed"
    end

  end

  class TaxonAtom < Page
    def initialize(site, base, txtype, taxon, layout)
      @site = site
      @base = base
      @dir = File.join(txtype.singularize, Utils.slugify(taxon), "feed")
      @name = "feed.xml"

      process(@name)
      read_yaml(File.join(base, '_layouts'), "atom.html")
      self.data['taxon_type'] = txtype.singularize
      self.data['taxons_type'] = txtype
      self.data['taxon'] = taxon
      self.data['taxon_id'] = Utils.slugify(taxon)
    end
  end


  class TaxonPager < Jekyll::Paginate::Pager
    attr_reader :tag, :taxon_type

    def initialize(site, page, all_posts, taxon, txtype, num_pages = nil)
        @taxon = taxon
        @taxon_type = txtype.singularize

        super site, page, all_posts, num_pages
        #Have to override these because Pager calls paginate_path statically.
        @previous_page_path = paginate_path(site, @previous_page)
        @next_page_path = paginate_path(site, @next_page)
        @first_page_path = paginate_path(site, 1)
    end

    def paginate_path(site, num_page)
        return nil if num_page.nil?
        pag_root = site.config['taxonomy']['paginate_root']
        tx_root = pag_root.sub ':txtype', @taxon_type

        if pag_root.include?(":taxon")
            tx_root = tx_root.sub ':taxon', Utils.slugify(@taxon)
        else
            raise ArgumentError.new("Invalid taxonomy pagination root: '#{pag_root}'. It must include ':taxon'.")
        end

        if num_page != 1
          format = site.config['taxonomy']['paginate_path']
          if format.include?(":num")
              format = format.sub(':num', num_page.to_s)
          else
              raise ArgumentError.new("Invalid taxzonomy pagination path: '#{format}'. It must include ':num'.")
          end
        else
          format = ''
        end
        path = "#{tx_root}#{format}"
        path[0..0] == "/" ? path : "/#{path}"
    end

    def to_liquid
      liquid = super
      liquid['taxon_type'] = @taxon_type
      liquid['taxon'] = @taxon
      liquid['first_page_path'] = @first_page_path
      liquid['taxon_root_path'] = @first_page_path
      liquid
    end
  end
end

Liquid::Template.register_tag "taxon_feed_meta", Jekyll::TaxonFeedMeta
