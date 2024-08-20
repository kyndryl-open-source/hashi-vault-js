path "knight/*" {
  capabilities = ["create","read","update","delete","list"]
}

path "knight/data/*" {
  capabilities = ["create","read","update","delete"]
}

path "knight/delete/*" {
  capabilities = ["update"]
}

path "knight/undelete/*" {
    capabilities = ["update"]
}

path "knight/destroy/*" {
    capabilities = ["update"]
}

path "knight/metadata/*" {
    capabilities = ["create","update","delete","list","read"]
}

path "auth/approle/login" {
  capabilities = ["create"]
}

path "/auth/approle/role/knight" {
capabilities = ["update"]
  allowed_parameters = {
        "token_ttl" = []
  }
}

path "/auth/approle/role/knight/secret-id" {
    capabilities = ["create", "read", "update", "delete", "list"]
}

path "/auth/approle/role/knight/secret-id/*" {
    capabilities = ["create", "read", "update", "delete", "list"]
}

path "/auth/approle/role/knight/secret-id-accessor" {
    capabilities = ["create", "read", "update", "delete", "list"]
}

path "/auth/approle/role/knight/secret-id-accessor/*" {
    capabilities = ["create", "read", "update", "delete", "list"]
}
