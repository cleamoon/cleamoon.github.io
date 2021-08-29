---
title: SSH setup and configuration on VPS
date: 2021-07-15
mathjax: true
tags: [Shell, VPS]
---

In this article, the setup of the SSH server on my vps is presented. The setup is aimed for high security and this setup should be valid for other types of server as well.

<!-- more -->

### Pre-configuration
It is more secure to login to the VPS as a non-root user with SSH key instead of the password. So we choose to create a user `yue` with the following command: 
```shell
adduser --disabled-password yue
```

To be able to use sudo, we need to add the following line to the sudo configuration file:
```
yue ALL = (ALL) NOPASSWD: ALL
```



### SSH server configuration

We change the the SSH configuration file `/etc/ssh/sshd_config` to the following form:
```
Protocol 2
Port 11451
HostKey /etc/ssh/ssh_host_rsa_key
HostKey /etc/ssh/ssh_host_ecdsa_key
HostKey /etc/ssh/ssh_host_ed25519_key
UsePrivilegeSeparation yes
KeyRegenerationInterval 3600
SyslogFacility AUTH
LogLevel INFO
PermitRootLogin no
StrictModes yes
IgnoreRhosts yes
RhostsRSAAuthentication no
HostbasedAuthentication no
PubkeyAuthentication yes
PasswordAuthentication no
ChallengeResponseAuthentication no
UsePAM yes
X11Forwarding no
PrintMotd no
AcceptEnv LANG LC_*
Subsystem sftp /usr/lib/openssh/sftp-server
AllowUsers yue
```

Here:

* `Protocol 2` ensures that the server only accepts connections via secure protocol version 2
* `Port 11451` changes the port SSH connects to. Changing the port does not increase security, but we can bypass most automated login attempts as they usually only use the default port
* `PermitRootLogin no` prohibits login as root via SSH
* `PasswordAuthentication no` forbids login with passwords. The login with a public key is more secure than the login with passwords
* `PubkeyAuthentication yes` enables authentication using SSH key pairs
* `StrictModes yet` prevents the SSH server from starting if certain files have too loose permissions. A lot of weird bugs pop up because of this option
* `AllowUsers yue` provides a whitelist for all users who are allowed to log in via SSH



To activate this configuration, we need to restarting the SSH server:
```shell
systemctl restart sshd
```



### Creating an SSH key pair

On the client machine, an SSH key pair can be created by the following command: 
```shell
ssh-keygen \
  -o \
  -a 100 \
  -t ed25519 \
  -f ~/.ssh/id_ed25519 \
  -C "$(whoami)@$(hostname)"
```

If you created your key with a different name, or if you are adding an existing key that has a different name, you can run the following command to add your SSH private key to the SSH-agent
```shell
ssh-add ~/.ssh/your_private_key
```



### Depositing the public key

On the server, run:
```shell
mkdir -p /home/yue/.ssh
vim /home/yue/.ssh/authorized_keys # copy the public key from the client here
chmod 600 /home/yue/.ssh/authorized_keys
chown yue:yue /home/yue/.ssh/authorized_keys
```

The permission of these files and folders needs to be set to a specific level so that OpenSSH shall work and the security is not compromised. The permission should be set with command similar to the following ones on BOTH the client side and the server side:
```shell
chown -R yue:yue /home/yue/
chmod -R o-rwx /home/yue/
chmod 700 /home/yue/.ssh/
chmod 600 /home/yue/.ssh/*
chmod 644 /home/yue/.ssh/*.pub
chmod 644 /home/yue/.ssh/authorized_keys
```

To avoid this cumbersome and error prune way of copying the public key, we can use `ssh-copy-id` (I haven't tested this method)



### Login

The SSH server needs to be activated with the new configuration on the VPS:
```shell
systemctl restart sshd
```

Now we can login to the VPS with the following command:
```shell
ssh -p 11451 yue@<vps_ip>
```



### Copy file from the client to the server with SCP

We can use SCP to upload files to the server by following command:
```shell
scp -P 11451 -r ~/folder_to_be_uploaded/*  yue@<vps_ip>:/destination_directory/
```



### Setup the firewall

To further increase the security, we can add a firewall the VPS by the following command. The firewall will block all incoming connections that were not explicitly allowed
```shell
sudo apt install ufw
sudo ufw default deny incoming
sudo ufw allow 11451/tcp
sudo ufw enable
```



### References

1. [Hetzner community tutorials](https://community.hetzner.com/tutorials/debian-base-configuration-docker)
2. [Github docs](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
3. [Superuser answer](https://superuser.com/questions/215504/permissions-on-private-key-in-ssh-folder)
