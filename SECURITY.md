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

Being honest about this is the point of writing it down: a report is worth more
when the reporter knows what will happen to it.

**Actively developed — report anything.**

| Repository | |
|---|---|
| `initiative` | the platform. Has its own [`SECURITY.md`](https://github.com/Morelitea/initiative/blob/main/SECURITY.md) with the tenancy model in detail; read that one first |
| `initiative_auto`, `initiative_billing`, `initiative_infra` | the companion services and the deployment |
| `initiative-app-kit`, `initiative-github` | the app protocol and its reference app |
| `morelitea-hydrogen` | the storefront |
| `inventory-management` | our fork of [OpenBoxes](https://github.com/openboxes/openboxes) |

For `inventory-management`, an issue in upstream OpenBoxes rather than in our
changes is better reported to
[OpenBoxes](https://github.com/openboxes/openboxes/security) so every downstream
fork benefits. Tell us either way and we will make sure it reaches them.

**Not actively developed.** `PathKit`, `TealeavesGMKit`, `Tile-Match` and
`Mycorzha-Map` are hobby and game projects. Reports are still welcome and we
would still rather know, but a fix may take a while or may be an archive notice
rather than a patch. Saying that up front is fairer than an unanswered email.

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
