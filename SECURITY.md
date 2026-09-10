# Reporting a security issue

This is the organization-wide policy. It applies to every Morelitea repository
that does not carry its own `SECURITY.md`.

## How to report

Email **security@morelitea.com**. Please do not open a public issue.

Include what you can:

- what the issue is, and where
- how to reproduce it
- what an attacker gets — the part that decides how fast we move
- a suggested fix, if you have one

## What to expect

- Acknowledgement within 48 hours.
- An estimated timeline once we have reproduced it.
- Notice when it is resolved.
- Credit in the release notes, unless you would rather stay anonymous.

## Which repositories this covers

GitHub applies this policy to every Morelitea repository that has no policy of
its own. A repository-local `SECURITY.md` takes precedence and may provide a
more specific reporting route or support window.

Reports about any non-archived repository are supported. Reports about an
archived repository are still welcome, but the resolution may be an archive
notice rather than a patch.

## What we ask

- Give us a chance to fix it before disclosing publicly.
- Do not access, change or keep data that is not yours while testing.
- Do not run denial-of-service tests or automated scanners against our hosted
  services. Test against your own deployment — everything under `initiative` is
  self-hostable, which makes that straightforward.

## Scope

First-party code, our deployment configuration, and our CI workflows.

Vulnerabilities in third-party dependencies are out of scope as issues in their
own right, but we want to hear about a vulnerable transitive dependency reaching
one of our releases — that is our problem to fix even when the bug is not ours.
