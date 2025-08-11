# MERNWithAWS


#!/bin/bash
sudo yum update -y

# Install Apache web server (httpd)
sudo yum install -y httpd
sudo systemctl start httpd
sudo systemctl enable httpd

# Create a simple HTML file to verify the web server is running, including dynamic hostname
echo "<html><h1>Welcome to Apache Web Server on Amazon Linux - $(hostname)!</h1></html>" > /var/www/html/index.html
