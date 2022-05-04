#!/bin/sh

source ldap.env

docker run -p 389:389 -p 636:636 \
  --name open-ldap-$LDAP_IMAGE_VERSION \
  --hostname ldap.chatopsknight.com \
  --env LDAP_ORGANISATION="Chatops Knight" \
  --env LDAP_DOMAIN="chatopsknight.com" \
  --env LDAP_ADMIN_PASSWORD=$LDAP_ADMIN_PASSWORD \
  --detach osixia/openldap:$LDAP_IMAGE_VERSION

#  docker run -p 389:389 -p 636:636 \
#    --name open-ldap-1.5.0 \
#    --detach osixia/openldap:1.5.0
