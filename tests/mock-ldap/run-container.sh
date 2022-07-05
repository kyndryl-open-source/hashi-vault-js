#!/bin/sh

source ldap.env

docker run -p 389:389 -p 636:636 \
  --name ck-ldap \
  --hostname ldap.chatopsknight.com \
  --env LDAP_ORGANISATION="Chatops Knight" \
  --env LDAP_DOMAIN="chatopsknight.com" \
  --env LDAP_TLS_VERIFY_CLIENT="never" \
  --env LDAP_ADMIN_PASSWORD=$LDAP_ADMIN_PASSWORD \
  --env LDAP_CONFIG_PASSWORD=$LDAP_CONFIG_PASSWORD \
  --detach osixia/openldap:$LDAP_IMAGE_VERSION

#  docker run -p 389:389 -p 636:636 \
#    --name open-ldap-1.5.0 \
#    --detach osixia/openldap:1.5.0
