#!/bin/bash

ldapadd -x -D "cn=admin,dc=chatopsknight,dc=com" -w $LDAP_ADMIN_PASSWORD -H ldap://localhost -f chatops-knight.ldif
ldapsearch -x -D "cn=admin,dc=chatopsknight,dc=com" -w $LDAP_ADMIN_PASSWORD -LLL -b "dc=chatopsknight, dc=com" -s sub "(objectclass=*)"
