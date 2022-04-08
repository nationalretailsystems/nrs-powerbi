#!/bin/sh
NODE_HOME=/QOpenSys/pkgs/bin
ECNCT_HOME=/QOpenSys/opt/eradani/dev/eradani-inout-template

NODE_ENV=development
export NODE_ENV

PATH=$NODE_HOME:$PATH

nginx -s reload || nginx

cd $ECNCT_HOME
npm start
