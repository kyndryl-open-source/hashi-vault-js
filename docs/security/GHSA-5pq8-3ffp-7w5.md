# Security Advisory - GHSA-5pq8-3ffp-7w5

- Title: Vault token and secret values exposed in thrown errors
- CVE ID: TBD
- CVSS Score: TBD
- Reported Date: 2026-06-07
- Published Date: 2026-06-09
- Last Updated: 2026-06-09

## Summary

Vault token and secret values are exposed in thrown errors when using `hashi-vault-js`.

## Details

Every API method in `Vault.js` executes `throw parseAxiosError(err)`, which returns the raw `AxiosError` untouched. That error carries the full Axios configuration, including the `X-Vault-Token` header and the request body. Consuming applications that log caught errors (e.g., using `console.error`, `pino`, `winston`, Sentry, or APMs) inadvertently log the live Vault token in plaintext. Furthermore, write-path methods expose submitted passwords and secret values via `err.config.data`.

## Impact

When consuming applications log intercepted exceptions, sensitive credentials such as tokens, passwords, and secrets are unknowingly exposed to application logs, monitoring services, and APM systems via the raw `AxiosError`. This may lead to authorization bypass or unauthorized access to the underlying Vault instance.

## Patches

This vulnerability should be addressed by redacting `err.config.headers['X-Vault-Token']` and `err.config.data` before re-throwing, or by throwing a purpose-built error containing only safe properties like status and message. Users should upgrade to a version that includes this fix.

## Workarounds

If you cannot immediately update the library, you can mitigate this issue by capturing all exceptions thrown by `hashi-vault-js` and sanitizing or omitting the `err.config` object before passing the errors to logging utilities or crash reporters.

## Acknowledgements

We would like to thank Sebastián Alba Vives for reporting this vulnerability.

## References

- [CWE-532: Insertion of Sensitive Information into Log File](https://cwe.mitre.org/data/definitions/532.html)
- [CWE-209: Generation of Error Message Containing Sensitive Information](https://cwe.mitre.org/data/definitions/209.html)