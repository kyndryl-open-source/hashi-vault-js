#!/bin/bash

source ldap.env

ldapwhoami -H $LDAP_URL -x
ldapadd -x -D "cn=admin,dc=chatopsknight,dc=com" -w $LDAP_ADMIN_PASSWORD -H $LDAP_URL -f chatops-knight.ldif
ldapsearch -x -D "cn=admin,dc=chatopsknight,dc=com" -w $LDAP_ADMIN_PASSWORD -H $LDAP_URL -LLL -b "dc=chatopsknight, dc=com" -s sub "(objectclass=*)"


#ldapmodify -xvvv  -D "cn=admin,cn=config" -w $LDAP_CONFIG_PASSWORD -H $LDAP_URL -f ck-permissions.ldif
