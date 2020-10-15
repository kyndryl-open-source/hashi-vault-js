#!/bin/bash
# self signed root CA cert
openssl genrsa -aes256 -out ca.key 4096
openssl req -new -x509 -extensions v3_ca -days 3000 -key ca.key -out ca.crt -config ca.conf
openssl x509 -text -noout -in ca.crt | grep "CA:TRUE"
openssl rsa -in ca.key -out ca-np.key
cat ca-np.key ca.crt > ca-bundle.pem
rm ca-np.key

# intermediate cert signed with the root CA cert
# this must be done by Vault PKI sign intermediate
#openssl genrsa -aes256 -out int.key 4096
#openssl req -new -config int.conf -key int.key -out int.csr
#openssl req -in int.csr -text -noout
#openssl x509 -req -extensions v3_int_ca -extfile int.conf -days 2000 -in int.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out int.crt
#openssl x509 -in int.crt -text -noout | grep "CA:TRUE"
#openssl rsa -in int.key -out int-np.key
#cat int.crt ca.crt int.key > int-ca-bundle.pem
#openssl verify -verbose -CAfile ca.crt int.crt
