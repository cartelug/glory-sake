# Account submissions and reviews — 15 November 2026

## What changed

Previously, survey and image explanations were only saved as pending items in the browser demo. Operators could not inspect or decide those submissions. The new account workflow persists practice work with the signed-in identity.

- `/#/work`: three account activities (survey, image observations, digital safety quiz).
- `/#/submissions`: member evidence, statuses, decisions, history and one appeal.
- `/#/reviews`: operator queue with status filtering and cursor pagination; linked from Operations.
- The existing eleven local activities and their virtual wallet remain separate.

Every new account activity is practice, with `cashValue: 0`. An approval is not an earnings credit, payment receipt, money owed or a live campaign entitlement.

## Behavioral guarantees

1. Task versions are immutable SQLite records. Changing a definition requires a new version number; startup rejects a silent content change to an existing version.
2. The server creates one attempt per member, task and Africa/Kampala calendar day. Repeated start requests return the same attempt.
3. Starting creates a thirty-minute submission window. Closing the form does not extend it; the server enforces expiry.
4. Validated evidence is persisted once per attempt. Repeated submissions return the existing claim and never overwrite evidence.
5. Quiz answers are scored on the server; client `score`, reward and status fields are ignored. The answer key is not returned by the activity API or included in the static build.
6. Members can only read/appeal their own work. All operator queue/review routes enforce the admin role.
7. Initial decisions require an approve/reject outcome and a reason. An expected revision prevents stale or simultaneous decisions from overwriting a result.
8. Rejected work permits one appeal. A human who made the initial decision cannot decide that appeal. A second named operator is needed for those cases; there is no public role-grant path.
9. Operator self-review is blocked. Automated quiz decisions have an explicit history event.
10. Decisions and submissions generate audit events. Account exports include the owner's evidence and review history. Account deletion removes private practice work through foreign-key cascades; this deletion policy must be revisited before financial records exist.
11. Account/private API responses are not cached by the offline worker. The new UI shell module is included in the offline/static bundle.
12. Async page render generations prevent a slower prior route request from replacing a newer navigation result.

The daily cap applies to the **attempt start day**, not the day a reviewer reaches a decision. An attempt started shortly before midnight can remain open into the next day; the new day's attempt is separate. This is an explicit practice rule, not a funded campaign cap implementation.

## API surface

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/work/tasks` | Active practice catalogue and today's attempt availability |
| POST | `/api/work/attempts` | Start/resume an attempt using `{taskId}` |
| GET | `/api/work/attempts/:id` | Owner-scoped attempt, questionnaire and result |
| POST | `/api/work/attempts/:id/submit` | Submit validated `{evidence}` once |
| GET | `/api/work/claims?status=all&cursor=...` | Owner-scoped records, 50 per page |
| GET | `/api/work/claims/:id` | Fetch current owner-scoped evidence and decision |
| POST | `/api/work/claims/:id/appeal` | One `{reason}` for rejected owner work |
| GET | `/api/admin/work/claims?status=pending&cursor=...` | Operator review records, 50 per page |
| GET | `/api/admin/work/claims/:id` | Fetch current operator evidence before a decision |
| POST | `/api/admin/work/claims/:id/review` | `{decision,reason,expectedRevision}` |

No endpoint accepts a payable reward, sponsor settlement, funding confirmation or wallet adjustment.

## Deployment and data

- Requires the existing Node 24 account server and persistent SQLite database. A static upload does not run this workflow.
- Four additive tables are created on startup: `work_task_versions`, `work_attempts`, `work_claims`, `work_reviews`; associated indexes and immutable-version triggers are added.
- Back up and verify an existing database before deployment. The current release does not provide a production backup job or claim that restoration was exercised on the user's host.
- Run `npm test` and `npm run build`; the build now syntax-checks top-level JavaScript modules before copying assets.
- The server-only `work-engine.mjs` is excluded from static files and refused by public file routing.
- Local browser QA used a separate, ignored test database and an untracked fixture launcher. Neither test credentials nor fixture routes are included in repository changes or static output.

## Verification

**60 automated tests pass**. New checks cover unauthenticated/unauthorized access, cross-account isolation, task-version immutability, start/submission idempotency, invalid proof, server scoring, unchanged zero wallets, conflicting reviewer decisions, reviewer identity, appeal limits, expiry, East Africa day boundaries, pagination, account export/deletion and persistence after server restart.

The static build passes, including syntax checks. Offline checks cover `work-ui.js` and confirm that work/review APIs are excluded from caching.

Browser QA on the local preview followed the member survey form through saved pending evidence, operator rejection, member appeal, second-operator approval and the member's final evidence/decision history. It also checked the status filter. No app-script errors were observed; browser-extension metadata errors were unrelated. Opening a submission fetches its current server record rather than relying on a previously rendered queue snapshot. The first filter interaction during navigation produced a stale view, so render generation protection was added and should be included in later navigation regression checks. That final protection was syntax/build checked, not a second full browser walkthrough.

This increment did not repeat the prior thirteen-screen mobile width sweep or exercise the entire quiz in the browser; quiz scoring is verified through API tests. Production deployment and provider operations are not claimed.

## Still required for paid work

Sponsor funding evidence, verified entitlements, budget reservations, balanced immutable money journals, payable reward posting, country-specific rules, verification/recovery/MFA, task anti-abuse, provider onboarding/webhooks, payout reconciliation and production operations remain separate work. The fixed practice quiz is instructional and must not be repurposed as fraud-resistant paid work.
