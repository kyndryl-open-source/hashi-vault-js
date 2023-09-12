
storage "file" {
  path = "/vault/file"
}

listener "tcp" {
  address     = "0.0.0.0:8200"
  tls_disable = false
  tls_cert_file = "/vault/certs/vault.crt"
  tls_key_file = "/vault/certs/vault.key"
}

ui = true
disable_mlock = true
max_lease_ttl =  "760h"
default_lease_ttl = "760h"
api_addr = "https://127.0.0.1:8200"
