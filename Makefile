all:
	hexo clean
	hexo generate
	hexo deploy

test:
	hexo clean
	hexo generate
	hexo server

upload:
	ssh -p 11451 -i ~/.ssh/hetzner_tensor_ed25519  tensor@65.21.190.130 "rm -r /var/www/blog.yj0.se/*"
	scp -P 11451 -i ~/.ssh/hetzner_tensor_ed25519 -r ./public/*  tensor@65.21.190.130:/var/www/blog.yj0.se/
