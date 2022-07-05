#!/bin/bash

source ldap.env

# Configure schema with AD attributes
cat config-schema.ldif | docker exec -i ck-ldap ldapmodify -Y EXTERNAL -H ldapi:///
docker exec -i ck-ldap ldapsearch -Y EXTERNAL -Q -H ldapi:/// -LLL -o ldif-wrap=no -b cn=config '(olcAttributeTypes=*)' | grep MSDN
# Check anonymous connection
ldapwhoami -H $LDAP_URL -x
# Add dummy entities for testing
ldapadd -x -D "cn=admin,dc=chatopsknight,dc=com" -w $LDAP_ADMIN_PASSWORD -H $LDAP_URL -f chatops-knight.ldif
ldapsearch -x -D "cn=admin,dc=chatopsknight,dc=com" -w $LDAP_ADMIN_PASSWORD -H $LDAP_URL -LLL -b "dc=chatopsknight, dc=com" -s sub "(objectclass=*)"
ldapsearch -x -D "cn=admin,dc=chatopsknight,dc=com" -w $LDAP_ADMIN_PASSWORD -H $LDAP_URL -LLL -b "dc=chatopsknight, dc=com" -s sub "(userPrincipalName=rod.anami@chatopsknight.com)"
