# See here for image contents: https://github.com/microsoft/vscode-dev-containers/tree/v0.234.0/containers/typescript-node/.devcontainer/base.Dockerfile

# [Choice] Node.js version (use -bullseye variants on local arm64/Apple Silicon): 18, 16, 14, 18-bullseye, 16-bullseye, 14-bullseye, 18-buster, 16-buster, 14-buster
ARG VARIANT="18-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

# [Optional] Uncomment if you want to install an additional version of node using nvm
# ARG EXTRA_NODE_VERSION=10
# RUN su node -c "source /usr/local/share/nvm/nvm.sh && nvm install ${EXTRA_NODE_VERSION}"

# [Optional] Uncomment if you want to install more global node packages
# RUN su node -c "npm install -g <your-package-list -here>"

# nginx
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y nginx

# https://github.com/mkleehammer/pyodbc/issues/441
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get install -y unixodbc-dev

COPY ./ibm-iaccess-1.1.0.15-1.0.amd64.deb ./
# https://askubuntu.com/questions/40011/how-to-let-dpkg-i-install-dependencies-for-me
RUN apt-get install -y ./ibm-iaccess-1.1.0.15-1.0.amd64.deb 
RUN rm ibm-iaccess-1.1.0.15-1.0.amd64.deb

# nginx setup
COPY ./.devcontainer/nginx-configuration.zip ./
COPY ./.devcontainer/nginx-setup.sh ./
RUN bash nginx-setup.sh
RUN rm -rf nginx-configuration
RUN rm nginx-configuration.zip
RUN rm nginx-setup.sh
