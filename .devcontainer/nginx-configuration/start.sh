#!/QOpenSys/pkgs/bin/bash

PATH=/QOpenSys/pkgs/bin:$PATH
export PATH

cd /QOpenSys/etc/nginx

nginx -s stop
nginx
