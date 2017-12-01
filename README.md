# Rackspace 
# raks-landing-pages
Rackspace Landing Pages


## environment configuration:
```bash
cd /home/sites
mkdir raks-landing-pages
cd raks-landing-pages

git clone git@github.com:YOUR-USERNAME/raks-landing-pages
cd /home/sites/raks-landing-pages
git remote add upstream git@github.com:JellyfishGroup/raks-landing-pages
git remote set-url upstream --push no-pushing
git remote -v
chown apache:apache -R ./public_html/
```


## .ini configuration: (not needed)
```bash
cd /home/sites/raks-landing-pages
cp install/raks.ini /etc/jellyfish/
nano /etc/jellyfish/raks.ini
# copy the correct definitions from sgel6 container for the .ini file
# be sure to atleast change the {user} indicator for the cms_home and site_url variables
service httpd restart
```


## vhost:
```bash
cd /home/sites/raks-landing-pages
cp install/raks.conf /home/vhosts/
service httpd restart
```

## front end developer begin:
Are you a new developer to the company? If so, following the instruction guide here:
- http://wiki.jellyfish.tmp/index.php/Sass_Set_Up_on_a_Dev_Container


## task runner set-up:
```bash
cd /home/sites/raks-landing-pages/Front-End/task_runner/
npm install
gulp watch
```


## environment urls:
- **[dev]**     http://raks-landing-pages.sgel6.dev.jellyfish.tmp
- **[build]**   http://raks-landing-pages.build.us.jellyfish.net/
- **[stage]**   N/A
- **[prod]**    N/A


## deployment processes:
- **[dev => build & stage]**  N/A
- **[production/live]**       N/A


## administration access:
- Non-Production: N/A
- Production: N/A
  - u: admin | p: **[refer to mavenlink]**
  - u: content | p: **[refer to mavenlink]**


## asset duplication:
The rcopy command will copy all files within the first path to the second path defined.
```sh
# connect to your dev container and execute the following to copy all uploads
rcopy root@sgel6.dev.jellyfish.tmp:/home/sites/raks-landing-pages/public_html/images/* /home/sites/JellyfishMarketing/ibm_webinar/public_html/images/
```

## known bugs:
- **403 Forbidden Error** 
- White screen may be any of the following:
  - ``chown apache:apache`` the entire ``/home/sites/raks-landing-pages/public_html`` directory
- "The uploaded file could not be moved to"... error is typically a migration/permissions issue
  - ``chown apache:apache`` the entire ``/home/sites/raks-landing-pages/public_html`` directory
    - *Still didn't work? See here: http://goo.gl/OtT0a9*
