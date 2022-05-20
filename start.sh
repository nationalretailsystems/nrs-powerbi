#!/bin/sh
NODE_HOME=/QOpenSys/pkgs/bin
ECNCT_HOME=/QOpenSys/opt/eradani/nrs-inbound

NODE_ENV=development
export NODE_ENV

PATH=$NODE_HOME:$PATH

nginx -s reload || nginx

cd $ECNCT_HOME
npm start
