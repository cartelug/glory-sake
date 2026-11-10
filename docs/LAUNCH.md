# Launch handoff

## Ready in this repository

The public website, mobile layouts, original brand assets, custom backgrounds, interactive member demo, practice games, real account API, support requests and operator draft campaign controls are implemented. Public legal copy explicitly describes preview operation. The Node server persists account/support records in SQLite; static hosting offers only the public site and practice demo.

## Required to launch live earning and payouts

1. Confirm the legal operator, final domain, support owner and launch countries; publish final terms, privacy contact, retention and dispute policies.
2. Select production hosting with TLS and durable database backups. Set the final PUBLIC_ORIGIN and production session settings. Run a restore test and create named operator accounts.
3. Add verified email/phone delivery, recovery, verification and operator MFA. The preview does not send emails or OTPs and does not collect identity documents.
4. Onboard an authorized payment provider and store its secrets outside Git. Implement signed webhooks, provider idempotency, reconciliation, fee schedules, verified destinations and payout reversals.
5. Implement the production funded task engine: budget reservations, server-scored claims, daily caps, proof reviews, appeals, immutable balanced ledger journals and duplicate-credit protection. Client-side demo scoring must never be reused as proof of payable work.
6. Confirm sponsor funding and actual rates. A campaign draft or budget entered into the admin UI is not verified cash funding and cannot activate a paid task.
7. Add dual approval for funds movement, fraud monitoring, operational alerts, reconciliation reports and the final country-specific launch checks.

Live money paths deliberately return unavailable. No funds are accepted or transferred. No financial or chance-based products are enabled. Shared browser localStorage is suitable only for the explicitly labeled demo.

## Maintenance

- Run `npm test` and `npm run build` before a release.
- Keep `data/`, `.env` and credentials out of commits.
- Support requests are saved to the operator inbox; there is no outgoing email integration.
- Review requests can be marked resolved; the audit records the actor, action, entity and timestamp.
- A static deploy cannot receive support submissions: it shows an explicit service-unavailable message instead of claiming delivery.
- The generated cafe image is illustrative; no testimonial or real-member claim is made.
- Asset prompts and ownership notes are in `docs/ASSETS.md`.
