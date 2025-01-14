---
title: FreshRSS installation on Oracle Cloud
date: 2022-01-19 15:45:47
tags: [DevOps, VPS]
---



In this article, the installation of FreshRSS on Oracle Cloud with Ubuntu OS is presented. It can be a reference for you if you want to install FreshRSS or other similar program on VPS.



<!-- more --> 



### Add new user

It is general recommended to add a new user to a new VPS and remove access to the root user to increase security. 

```shell
$ adduser yue
$ usermod -aG sudo yue
$ usermod -aG www-data yue
```



Then we need to add a ssh public key to the new user. On local machine: 

```shell
$ ssh-keygen -t ed25519
$ cat ~/.ssh/id_ed25519.pub | ssh yue@<10.0.0.1> "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```



### Install NGINX

Install the NGINX Open Source package:

```shell
$ sudo apt update
$ sudo apt-get install nginx
```



#### Make TCP ports available on Oracle cloud

For Oracle Cloud, all ports except 22 are blocked. To use the TCP ports 80 and 443, we need to enable them in the following way: 

1. Open the navigation menu and click **Networking**, and then click **Virtual Cloud Networks**.

2. Select the VCN you created with your compute instance.

3. With your new VCN displayed, click **<your-subnet-name>** subnet link.

   The public subnet information is displayed with the Security Lists at the bottom of the page. A link to the **Default Security List** for your VCN is displayed.

4. Click the **Default Security List** link.

   The default **Ingress Rules** for your VCN are displayed.

	1. In the Add Ingress Rules dialog box, set the following options to open port 22 for SSH access (if it isn't already open):

	* Stateless: Leave this box unchecked. This makes the rule stateful, which means that any response to the incoming traffic is allowed back to the originating host, regardless of any egress rules applicable to the instance.
	* Source Type: Select CIDR.
	* Source CIDR: Enter 0.0.0.0/0, which indicates that traffic from all sources on the internet is allowed.
	* IP Protocol: Select TCP.
	* Source Port Range: Accept the default All.
	* Destination Port Range: Enter 22, to allow access through SSH.
	* Description: Add an optional description.

	2. At the bottom of the dialog box, click +Another Ingress Rule, and enter the values for another rule. Do this for as many times as necessary, to create all the rules you need, and then click Add Ingress Rules. 

5. Then in your VPS, enable these ports:

   ```shell
   sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
   sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
   sudo netfilter-persistent save
   ```

   

### Install FreshRSS

First change your DNS so that the VPS's IP address points to the URL we want to use to the FreshRSS. For me, it is `rss.yj0.se`. Then we can add the NGINX config for FreshRSS at the file `/etc/nginx/sites-available/rss.yj0.se`: 

```nginx
server {
	listen 80;
	listen 443 ssl;

	# your server’s URL(s)
	server_name rss.yj0.se;

    # Enforce HTTPS
    #return 301 https://$server_name$request_uri;


	# the folder p of your FreshRSS installation
	root /var/www/rss.yj0.se;

	index index.php index.html index.htm;

	# nginx log files
	access_log /var/log/nginx/rss.access.log;
	error_log /var/log/nginx/rss.error.log;

	location / {
		try_files $uri $uri/ /index.php;
	}

	# php files handling
	# this regex is mandatory because of the API
	location ~ ^.+?\.php(/.*)?$ {
		fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
		fastcgi_split_path_info ^(.+\.php)(/.*)$;
		# By default, the variable PATH_INFO is not set under PHP-FPM
		# But FreshRSS API greader.php need it. If you have a “Bad Request” error, double check this var!
		# NOTE: the separate $path_info variable is required. For more details, see:
		# https://trac.nginx.org/nginx/ticket/321
		set $path_info $fastcgi_path_info;
		fastcgi_param PATH_INFO $path_info;
		include fastcgi_params;
		fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
	}
}
```



To enable this configuration:

```shell
$ sudo ln -s /etc/nginx/sites-available/rss.yj0.se /etc/nginx/sites-enabled/rss.yj0.se
$ sudo systemctl enable nginx
$ sudo systemctl start nginx
```



Next, install PHP and the necessary modules

```shell
$ sudo apt install php php-curl php-gmp php-intl php-mbstring php-sqlite3 php-xml php-zip php7.4-fpm
```



Next, we’ll need to install and configure MySQL. Install MySQL components like so:

```shell
$ sudo apt install mysql-server mysql-client php-mysql
```



MySQL can now be started:

```shell
$ service mysql start
```



We’ll need to configure MySQL. 

```shell
$ mysql_secure_installation
```


And restart it

```shell
$ service mysql restart
```



With MySQL ready, we can continue to config FreshRSS. FreshRSS needs `git`, so we install it: 

```shell
$ sudo apt install git
```


Next, change to the install directory and download FreshRSS using git

```shell
$ cd /usr/share/
$ git clone https://github.com/FreshRSS/FreshRSS.git
```



Change to the new FreshRSS directory, and set the permissions so that your Web server can access the files

```shell
$ cd FreshRSS
$ chown -R :www-data .
$ sudo chmod -R g+r .
```



We’ll also need to allow the data folder to be written to, like so:

```shell
$ sudo chmod -R g+w ./data/
```



Optional: If you would like to allow updates from the Web interface, set write permissions

```shell
$ chmod -R g+w .
```



Finally, symlink the public folder to the root of your web directory

```shell
$ ln -s /usr/share/FreshRSS/p /var/www/html/
```



Now the installation of FreshRSS is finished. But it needs a database to work. We will create a MySQL database: From the MySQL prompt (`MariaDB [(none)]>`), run the following commands, substituting `<username>`, `<password>`, and `<database_name>` for real values.

```mysql
CREATE USER '<username>'@'localhost' IDENTIFIED BY '<password>';
CREATE DATABASE `databaseName`;
GRANT ALL privileges ON `databaseName`.* TO 'userName'@localhost;
FLUSH PRIVILEGES;
QUIT;
```



Now we can use FreshRSS. 

#### Setup automatic feed updating
To run the updater script every hour, and 10 minutes past the hour, edit `/etc/crontab` and append the following line:
```shell
10 * * * * www-data php -f /usr/share/FreshRSS/app/actualize_script.php > /tmp/FreshRSS.log 2>&1
```



### Install HTTPS certificates

To be able to use HTTPS for secure connection, we can use the Certbot from EFF for free: 

```shell
$ sudo apt-get update && sudo apt-get upgrade -y
$ sudo apt install certbot python3-certbot-nginx
```



To add certificate for the newly installed FreshRSS, run the following command:

```shell
$ sudo certbot --nginx -d rss.yj0.se
```







### Reference

1. [Initial setup](https://community.hetzner.com/tutorials/howto-initial-setup-ubuntu)

2. [Apache on Ubuntu](https://docs.oracle.com/en-us/iaas/developer-tutorials/tutorials/apache-on-ubuntu/01oci-ubuntu-apache-summary.htm)

3. [How to use ssh](https://community.hetzner.com/tutorials/howto-ssh-key)

4. [Install Freshrss on Linux](http://freshrss.github.io/FreshRSS/en/admins/06_LinuxInstall.html)

5. [FreshRSS NGINX configuration file](http://freshrss.github.io/FreshRSS/en/admins/10_ServerConfig.html)

