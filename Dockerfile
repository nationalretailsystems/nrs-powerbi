FROM node:16
COPY ./ibm-iaccess-1.1.0.15-1.0.amd64.deb ./
RUN apt-get update

# https://superuser.com/questions/648316/dpkg-dependency-problems-prevent-configuration
RUN apt-get install -y libodbc1 odbcinst odbcinst1debian2

RUN dpkg -i ibm-iaccess-1.1.0.15-1.0.amd64.deb 

# https://askubuntu.com/questions/40011/how-to-let-dpkg-i-install-dependencies-for-me
RUN apt-get -f install
