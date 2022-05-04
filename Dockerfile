FROM node:16
COPY ./ibm-iaccess-1.1.0.15-1.0.amd64.deb ./
RUN apt-get update

# https://askubuntu.com/questions/40011/how-to-let-dpkg-i-install-dependencies-for-me
RUN apt-get install -y ./ibm-iaccess-1.1.0.15-1.0.amd64.deb 
