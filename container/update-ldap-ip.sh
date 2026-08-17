#!/bin/bash

LDAP_IP=$(podman inspect ck-ldap --format '{{.NetworkSettings.IPAddress}}')

sed "s/\<LDAP_IP\>/$LDAP_IP/g" docker-compose.tpl > ./docker-compose.yaml