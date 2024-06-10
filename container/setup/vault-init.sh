#!/usr/bin/env bash

## Important notice
## This shell script initiates the Vault server with the following:
## - SHAMIR secret sharing with 6 keys and 3 threshold
## This script should be used as model for configuring an dev/test environment, 
## and should NEVER used in production.
## 

vault operator init -key-shares=6 -key-threshold=3
