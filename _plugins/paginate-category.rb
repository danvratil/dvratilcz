# Customized version of jekyll-paginate-category plugin which uses
# sluggified category names in URL
#
# Original:
# https://github.com/midnightSuyama/jekyll-paginate-category/blob/master/lib/jekyll-paginate-category.rb

module Jekyll
    module Paginate
      module Category

        class IndexPage < Page
          def initialize(site, category, num_page)
            @site = site
            @base = site.source

            category_dir = site.config['category_dir'] || 'categories'
            category_slug = Utils.slugify(category)
            @dir = File.join(category_dir, category_slug)

            @name = Paginate::Pager.paginate_path(site, num_page)
            @name.concat '/' unless @name.end_with? '/'
            @name += 'index.html'

            self.process(@name)

            category_layout = site.config['category_layout'] || 'index.html'
            self.read_yaml(@base, category_layout)

            self.data.merge!(
                             'title'     => category,
                             'paginator' => Paginate::Pager.new(site, num_page, site.categories[category])
                            )
          end
        end
      end
    end
  end