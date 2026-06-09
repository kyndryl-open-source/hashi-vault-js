# Security Advisory - GHSA-g956-2f74-rmv7

## Summary

The `hashi-vault-js` library is vulnerable to path traversal and query string injection due to the lack of proper encoding of identifiers in path segments and query strings. This allows attackers to manipulate the request URL and potentially access unintended downstream endpoints or inject malicious parameters if untrusted input is passed to the library.

## Details

There are zero calls to `encodeURIComponent` anywhere in `Vault.js`. Every identifier (e.g., name, username, group, role, version) provided to the library is concatenated straight into the HTTP URL without URI encoding.

Two vectors can be dynamically confirmed:

1. **Path Traversal:** Passing `../../sys/seal` as a secret name causes the HTTP client to normalize the path and send the request to `/v1/sys/seal` instead of the intended Key-Value path.
2. **Query Injection:** Passing `1&list=true` as a version value injects an extra query parameter into the request payload.

## Impact

In applications where Vault identifiers originate from untrusted user input, this allows an unauthenticated attacker to redirect requests to unintended Vault endpoints (including administrative paths under `sys/`) or otherwise alter the executed query, executing operations within the permissions of the Vault token used by the application.

## Patches

This vulnerability has been addressed by wrapping path segments with `encodeURIComponent()` and safely formatting query strings instead of manual string concatenation. Users should upgrade to a version that includes this fix.

## Workarounds

If you cannot immediately update the library, you can mitigate this issue by rigidly validating and sanitizing all user-supplied input before passing it into `hashi-vault-js` methods. Alternatively, manually encode inputs using `encodeURIComponent()` before supply them to the library's functions.

## Acknowledgements

We would like to thank Sebastián Alba Vives for reporting this vulnerability.

## References

- [CWE-23: Relative Path Traversal](https://cwe.mitre.org/data/definitions/23.html)
- [CWE-74: Improper Neutralization of Special Elements in Output Used by a Downstream Component ('Injection')](https://cwe.mitre.org/data/definitions/74.html)
