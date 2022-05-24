#!/bin/sh
NODE_HOME=/QOpenSys/pkgs/bin
ECNCT_HOME=/QOpenSys/opt/eradani/nrs-powerbi

NODE_ENV=development
export NODE_ENV

PATH=$NODE_HOME:$PATH

cd $ECNCT_HOME
npm start
