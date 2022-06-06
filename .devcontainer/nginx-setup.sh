
# Exit on error
# https://stackoverflow.com/questions/64786/error-handling-in-bash
# https://mywiki.wooledge.org/BashFAQ/105
set -e

# Variables
NGINX_ETC_FOLDER=/etc/nginx
HOSTNAME=dev

function setup_nginx(){
  printf "\n%60s\n" " " | tr " " "-" && (date +"%Y-%m-%d %T")
  printf "Setting up NginX TLS Reverse Proxy Server\n\n"

  # Check if nginx configuration file is present. If no, exit with error
  printf "Checking for nginx-configuration.zip\n\n"
  while [ ! -f "nginx-configuration.zip" ]
  do
    printf "nginx-configuration.zip not found. Please make sure the sample NginX configuration is present.\n\n"
    read -p "Check again? [y or n]: " yesno
    if [ $yesno != 'y' ]
    then
      return
    fi
  done
  
  # Unzip nginx configuration
  printf "Unzipping nginx configuration\n\n"
  unzip nginx-configuration.zip
  # Copy nginx.conf over existing one
  printf "Copying nginx.conf over existing one\n\n"
  cp nginx-configuration/nginx.conf $NGINX_ETC_FOLDER/nginx.conf
  # Create directories: logs, sites-available, sites-enabled, tls
  printf "Creating directories: logs, sites-available, sites-enabled, tls\n\n"
  mkdir -p $NGINX_ETC_FOLDER/logs
  mkdir -p $NGINX_ETC_FOLDER/sites-available
  mkdir -p $NGINX_ETC_FOLDER/sites-enabled
  mkdir -p $NGINX_ETC_FOLDER/tls
  # copy template site configuration into sites-available twice (once as template, once as ec-app.conf )
  printf "Copying template site configuration into sites-available\n\n"
  cp nginx-configuration/sites-available/template.conf $NGINX_ETC_FOLDER/sites-available/template.conf
  cp nginx-configuration/sites-available/template.conf $NGINX_ETC_FOLDER/sites-available/ec-app.conf
  # symlink ec-app.conf to sites-enabled
  printf "Enabling site: ec-app\n\n"
  ln -s $NGINX_ETC_FOLDER/sites-available/ec-app.conf $NGINX_ETC_FOLDER/sites-enabled/ec-app.conf
  # copy our tls.conf into tls directory
  printf "Copying TLS settings\n\n"
  cp nginx-configuration/tls/tls.conf $NGINX_ETC_FOLDER/tls/tls.conf
  # generate self-signed cert
  printf "Generating Self-Signed TLS Certificate\n"
  printf "  Certificate Location: $NGINX_ETC_FOLDER/tls/certificate.pem\n"
  printf "  Key Location: $NGINX_ETC_FOLDER/tls/key.pem\n"
  printf "Replace these files if you have your own publicly trusted TLS certificate\n\n"
  sed -i "s/IBMI_HOSTNAME/$HOSTNAME/g" nginx-configuration/tls/openssl.conf
  openssl genrsa -out key.pem 4096
  openssl req -new -key key.pem -out cert.csr -config nginx-configuration/tls/openssl.conf > cert.csr
  openssl x509 -req -days 365 -in cert.csr -signkey key.pem -out certificate.pem
  rm cert.csr
  mv key.pem certificate.pem $NGINX_ETC_FOLDER/tls
  # generate dhparams
  printf "Generating dhparams\n\n"
  openssl dhparam -dsaparam -out $NGINX_ETC_FOLDER/tls/dhparam.pem 4096
  printf "Testing NginX Configuration"
  nginx -t
  (date +"%Y-%m-%d %T") 
  printf "Finished NginX Configuration\n\n"
}

setup_nginx
