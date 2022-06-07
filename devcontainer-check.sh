#!/usr/bin/env bash

# Exit on error
# https://stackoverflow.com/questions/64786/error-handling-in-bash
# https://mywiki.wooledge.org/BashFAQ/105
set -e

successes=()
failures=()

# Echo with colors
function echo_red() {
    echo -e "\e[31m$1\e[0m"
}

function echo_green() {
    echo -e "\e[32m$1\e[0m"
}

function echo_cyan() {
    echo -e "\e[36m$1\e[0m"
}

# Helper functions
function title() {
    echo_cyan "$1:"
}

function success() {
    local text
    text="✓ [ ok ] $1"
    echo_green "$text"
    successes+=("$text")
}

function fail() {
    local text
    # https://stackoverflow.com/questions/5353461/unicode-character-for-x-cancel-close
    text="✕ [fail] $1 - $2"
    echo_red "$text"
    failures+=("$text")
}

# Checks
function check_comand() {
    if eval "$1" ;
    then
        success "$2"
    else
        fail "$2" "$3"
    fi
}

function check_file() {
    if [ -f "$1" ] ; 
    then
        success "$2"
    else
        fail "$2" "$3"
    fi
}

# Tests
function test_docker(){
    title "Checking docker command"
    check_comand "docker --version" "\"docker --version\" command works" "Please check docker installation"
    echo
}

function test_code() {
    title "Checking code command (Visual Studio Code)"
    check_comand "code --version" "\"code --version\" command works (Visual Studio Code)" "Please check vscode installation"
    echo
}

function test_npmrc() {
    local filename
    filename=.npmrc
    title "Checking $filename"
    check_file "$filename" "\"$filename\" file exists" "Please create $filename in current directory and add auth token"
    if [ -f "$filename" ] ; 
    then
        check_comand "grep -q '//registry.npmjs.org/:_authToken=' $filename" "Auth token is defined in \"$filename\" file" "Please add auth token to $filename"
    fi
    echo
}

function test_ibm_iaccess() {
    local filename
    filename=ibm-iaccess-1.1.0.15-1.0.amd64.deb
    title "Checking for $filename"
    check_file "$filename"  "\"$filename\" file exists" "Please download and put \"$filename\" into current directory"
    echo
}

function test_development_config() {
    local filename
    local config_folder
    config_folder=src/config
    filename=$config_folder/development.json
    title "Checking for $filename"
    check_file "$filename"  "\"$filename\" file exists" "Please copy $config_folder/default.json into $filename and change required fields"
    echo
}

# Summary
function line() {
    echo "------------------------------------------------------------"
}

function summary() {
    line
    echo
    title "Summary"
    echo
    for i in "${successes[@]}"
    do
        echo_green "$i"
    done
    for i in "${failures[@]}"
    do
        echo_red "$i"
    done
}

# Checks execution
test_docker
test_code
test_ibm_iaccess
test_npmrc
test_development_config

# Execute summary
summary
