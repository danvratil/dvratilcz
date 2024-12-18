---
categories:
- Linux Stuff
date: "2017-11-21T21:00:40Z"
tags:
- linux
- NextCloud
- php
- software collctions
title: NextCloud, Multiple versions of PHP via SCL on CentOS 7
---
There's nothing new in this blog post, it's mostly a documentation for future myself once stuff breaks and I'll have to figure out what I did to make it work :-)

This is post is about running NextCloud 10 on PHP 5.6 from Software Collections (SCL) on CentOS 7 (where PHP 5.4 is available by default) while keeping the rest of the web apps running on the system-wide PHP 5.4.

NextCloud 10 itself runs on PHP 5.4 just fine, but the News app requires at least PHP 5.5.  At the same time, I can't switch over to PHP 5.6 completely since some other apps that I'm running depend on binary PHP plugins, which are not available in PHP 5.6 Software Collections. I'd have to build them myself, and Ithe SCL's 'm too lazy to maintain them later.

## Step 1 - Install SCL and PHP 5.6

Follow the official instructions here to setup Software Collections on CentOS 7 and to install rh-php56 SCL: [https://www.softwarecollections.org/en/scls/rhscl/rh-php56/](https://www.softwarecollections.org/en/scls/rhscl/rh-php56/)

You will also need to install additional PHP 5.6 modules:

```
sudo dnf install rh-php56-php-fpm rh-php56-php-intl rh-php56-php-ldap rh-php56-php-pgsql
```

(install `rh-php56-php-mysqlnd` instead of pgsql if you use NextCloud with MySQL)

INTL, LDAP and PGSQL modules are needed by NextCloud, FPM is a FastCGI Processing Manager that we will use to execute NextCloud's PHP scripts with PHP 5.6 instead of the default system-wide PHP.

## Step 2 - Configure PHP 5.6

The `php.ini` for SCL PHP 5.6 is located in `/etc/opt/rh/rh-php56/`:

Make sure to configure timezone:

```
date.timezone = "whatever your have in /etc/php.ini"
```

Setup `include_path` to fallback to PHP modules from system-wide PHP. This is probably not very kosher, but since the system modules are PHP 5.4, there should be no problems when using them with PHP 5.6:

```
include_path = .:/opt/rh/rh-php56/root/usr/share/pear:/opt/rh/rh-php56/root/usr/share/php:/usr/share/pear:/usr/share/php
```

Finally, update `open_basedir` to include all the paths and NextCloud:

```
open_basedir = .:/tmp:/usr/share/pear:/usr/share:/usr/share/nextcloud:/etc/nextcloud:/var/lib/nextcloud
```

You may also want to adjust error handling and log reporting to not use the PHP defaults.

## Step 3 - Set up FPM

You can use the stock FPM configuration, which works just fine. You may want to configure logging in `/etc/opt/rh/rh-php56/php-fpm.d/cloud.conf` to make debugging problems easier.

Start the PHP 5.6 FPM:

```
scl enable rh-php56 -- systemctl start rh-php56-php-fpm
scl enable rh-php56 -- systemctl enable rh-php56-php-fpm
```

## Step 4 - Configure Apache to forward to FPM

In your VirtualHost configuration for NextCloud, add the following to the `<VirtualHost>` section:

```
<FilesMatch \.php$>
  SetHandler "proxy:fcgi://127.0.0.1:9000"
</FilesMatch>
```

(Make sure `mod_proxy` and `mod_proxy_fcgi` are enabled and loaded)

This will let all .php files in the NextCloud virtual host to be executed by PHP 5.6 through the FPM.

## Conclusion

That should be it, NextCloud will now run on PHP 5.6, while all remaining virtual hosts will continue using the system-wide PHP 5.4.

It is possible to redirect any other VirtualHosts to the FPM. It's also possible to do the same for other PHP SCLs, it's just necessary to configure FPM from each SCL to listen on a different port (FPM listens on port 9000 by default), and then run all of them in parallel, and just forward respective VirtualHosts to respective FPMs depending on which PHP version you want to use for each particular VirtualHost.

## References

* [https://www.softwarecollections.org/en/scls/rhscl/rh-php56/](https://www.softwarecollections.org/en/scls/rhscl/rh-php56/)
* [http://blog.koenreiniers.nl/guide-to-combining-apache-virtual-hosts-and-php7-fpm/](http://blog.koenreiniers.nl/guide-to-combining-apache-virtual-hosts-and-php7-fpm/ "Guide to combining Apache virtual hosts and PHP7 FPM")
* [https://developers.redhat.com/blog/2014/04/08/apache-with-various-php-versions-using-scl/](https://developers.redhat.com/blog/2014/04/08/apache-with-various-php-versions-using-scl/ "Apache with various PHP versions, using SCL")
