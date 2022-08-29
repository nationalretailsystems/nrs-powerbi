#!/bin/sh
NODE_HOME=/QOpenSys/pkgs/bin
ECNCT_HOME=/QOpenSys/opt/eradani/test/eradani-inout-template

NODE_ENV=test
export NODE_ENV

PATH=$NODE_HOME:$PATH

cd $ECNCT_HOME
npm start
