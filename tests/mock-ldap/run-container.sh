#!/bin/sh

#docker run -p 389:389 -p 636:636 \
#  --name open-ldap-1.5.0 \
#  --hostname openldap.chatopsknight.kyndryl.net \
#  --env LDAP_ORGANISATION="Chatops Knight" \
#  --env LDAP_DOMAIN="chatopsknight.kyndryl.net" \
#  --env LDAP_ADMIN_PASSWORD="W0lfBlu3s!" \
#  --detach osixia/openldap:1.5.0

  docker run -p 389:389 -p 636:636 \
    --name open-ldap-1.5.0 \
    --detach osixia/openldap:1.5.0
