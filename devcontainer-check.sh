#!/usr/bin/env bash

# Exit on error
# https://stackoverflow.com/questions/64786/error-handling-in-bash
# https://mywiki.wooledge.org/BashFAQ/105
set -e

function echo_red() {
    echo -e "\e[31m$1\e[0m"
}

function echo_green() {
    echo -e "\e[32m$1\e[0m"
}

function echo_cyan() {
    echo -e "\e[36m$1\e[0m"
}

function title() {
    echo_cyan "$1:"
}

function success() {
    echo_green "$1 - success"
}

function fail() {
    echo_red "$1 - failed"
    echo_red "$2"
}

function check_comand() {
    if eval "$1" ;
    then
        success "$2 check"
    else
        fail "$2 check" "$3"
    fi
}

function test_docker(){
    title "Checking docker command"
    check_comand "docker --version" "docker command" "Check docker installation"
    echo
}

function test_code() {
    title "Checking code command (Visual Studio Code)"
    check_comand "code --version" "docker command" "Check docker installation"
    printf ""
}

test_docker
test_code
