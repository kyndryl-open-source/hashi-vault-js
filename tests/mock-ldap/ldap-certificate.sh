#!/bin/bash

# Get LDAP server certificate
openssl s_client -showcerts -connect ldap.chatopsknight.com:636 </dev/null | sed -n -e '/-.BEGIN/,/-.END/ p' > ../ldap-server.pem
# Check validity of certificate
openssl x509 -in ../ldap-server.pem -noout -text

