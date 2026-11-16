# Glorysake completion plan and Bolvah comparison

**Reviewed:** 15 November 2026 (Africa/Kampala).  
**Repository:** https://github.com/cartelug/glory-sake  
**Audited baseline:** `19eb0392600f24d146ae9e8a9ede7f78c941583d` on `main`.  
**Scope:** source audit, current public competitor pages, prior owner blueprints, implementation of two immediately actionable gaps, and an ordered route to a live product.

## Hosting update — published 15 November 2026

The hosted account edition is now deployed at https://glorysake-live.woodsydegu512.chatgpt.site with owner-private access, platform ChatGPT sign-in and persistent D1 storage. Live checks verified HTTP 200 for the API health endpoint (`database: connected`), session boundary, frontend module, homepage and font; the 13 production tables were inspected. A production member profile was not created automatically: the owner must sign in and explicitly complete setup.

The Node self-hosting option remains available with email/password accounts; a Docker COPY omission of the server task module and offline assets was fixed and its assembled payload passed a startup check. The root suite now passes **72 tests**, including cloud-handler and packaging checks.

This removes the missing hosted-account API blocker. It does not establish public availability, custom-domain DNS, phone verification, funded tasks, a money ledger or payment-provider integration. The current hosted edition is private to the owner. The original GitHub Pages site remains a static demo. See [hosted/README.md](../hosted/README.md) for the source/deployment boundary.

## Implementation update — account work

A subsequent implementation on 15 November adds three server-backed **practice** activities, persistent attempts and submissions, server-side quiz scoring, operator reviews, status filters, pagination, recorded reasons and one appeal with an independent manual reviewer. The member can stay signed in while submitting account activities instead of entering the device-local demo. The original eleven local activities remain separate.

Validation increased from 48 to **60 passing tests**, with a successful static build. Browser QA followed a survey submission → reasoned rejection → member appeal → different-operator approval → final member history. Task versions are immutable; concurrent requests and reviewer races are tested. Details are in [ACCOUNT-WORK-RELEASE.md](ACCOUNT-WORK-RELEASE.md).

The assessment below is the initial audit with these updates applied where relevant. **Funded work, reserved sponsor budgets, real wallet accounting and payouts remain missing.** This is progress on Stage 2 infrastructure, not completion of the Stage 2 live-money acceptance gate.

## Bolvah parity update — 16 November 2026

Fix Tap, click ads (Sponsor spotlight), Spotify (Music minute), YouTube/TikTok (Short clips), Chat and Earn (Chat lounge), Free Spin, Marketplace, Content Library and a per-activity income dashboard are now implemented as practice features. See [BOLVAH-PARITY-RELEASE.md](BOLVAH-PARITY-RELEASE.md). The rows below that list these modules as missing are superseded by that release. The activation fee, commissions on activation fees, the staked casino, loans and investments remain out of scope.

## 1. Assessment

Glorysake already has a substantial website and an interactive practice product. It is **not yet a live earning and payout platform**. The largest gap is the backend connecting funded work, verified submissions, money owed and settled payouts. Adding more activity tiles will not close that gap.

There is no defensible single completion percentage: a finished public page and a working payout system have very different complexity and risk. The useful distinction is:

| Product area | Current position |
| --- | --- |
| Original brand and public website | Implemented; existing responsive QA is documented in the repository |
| Practice activities and progression | Eleven activities, five levels, sixteen achievements, daily practice patterns; device-local |
| Server accounts | Persistent SQLite identities, hashed passwords, sessions and account controls |
| Operations | Draft campaigns, support records, announcements and basic audits |
| Personal invitations | Implemented in this update; persistent signup attribution, no commissions |
| Support conversations | Implemented in this update; member/operator replies, ownership checks, reopen on member follow-up |
| Server task/review records | Implemented for three non-paying account activities; funding/ledger integration missing |
| Live funded tasks | Missing |
| Real wallet accounting | Missing; the API currently returns empty zero balances |
| Mobile-money collection and payouts | Missing; withdrawals return unavailable |
| Hosted account API | Private production deployment verified; public access, custom DNS and full operational readiness remain outstanding |

**Recommended first complete release:** a free-access, Uganda-first sponsored-task pilot with verified accounts, a small funded task catalogue, manual review and a reconciled payout process. This narrows the first release while preserving a clear expansion path. It is a proposal, not a new owner decision or a claim that market approvals exist.

## 2. Evidence and limits

### Current competitor evidence

The following public pages were retrieved directly on 15 November 2026 after the search service could not open them:

- https://bolvah.com/
- https://bolvah.com/demo.php
- https://bolvah.com/legal/terms.php
- https://bolvah.com/legal/risk.php

These establish **what Bolvah publishes**, not independently verified funding, licensing, payouts, active users or internal implementation. Its demo's navigation entries point to `#`; the public demo is not evidence that each underlying module works. Its terms also carry a template notice saying they have not been reviewed by a lawyer. Do not infer approval for Glorysake from a competitor's marketing or legal copy.

The owner's two earlier PDFs were also read: `GLORYSAKE_Ultimate_Website_Masterplan_2026.pdf` and `Glorysake_Website_Plan_Brighter_Sans_Sky.pdf`. They describe a larger platform than the current preview: country rules, tasks, reviews, wallets, payouts, teams, marketplace, operations and a balanced ledger. Their original design, supplied star-and-bird logo, Brighter Sans and Sky fonts remain the design basis.

### Current Glorysake evidence

- `app.js`, `data.js`, `activity-content.js`: pages and practice activities.
- `progress.js`, `experience.js`: local points, levels, streaks and achievements.
- `server.mjs`: the actual account, wallet, campaign and support behavior.
- `pay.js`: sample payment-reference tracking, not provider verification.
- `scripts/build.mjs`: static build; it does not deploy the account server.
- `.github/workflows/checks.yml`: tests/build/artifact upload; it is not a production deployment pipeline.
- `docs/LAUNCH.md`, `docs/DUSK-RELEASE.md`: explicit remaining launch boundaries.

The initial source audit established repository behavior and local test results. The later hosting update above adds verified private deployment evidence. It still does not establish that `glorysake.com` is registered/configured or connected to any payment provider. Historical Pages failures are not treated as current deployment evidence.

## 3. How Bolvah's published model works

1. **Register:** create a free account and choose a country.
2. **Activate:** pay a one-time local access fee. Its current terms list **UGX 19,000 in Uganda**.
3. **Perform activities:** daily task limits, scores and timing rules determine eligibility. Its terms say completion must be recorded by the server.
4. **Record rewards:** its site describes logged wallet movements; the demo shows main, investment, casino and games balances. These are display labels, not proof of its database design.
5. **Request a withdrawal:** its current terms list a **UGX 30,000 Uganda minimum and a 1% fee**, with payouts to a mobile-money number in the member's name. The homepage claims a typical 24-hour payout; that timing was not tested.
6. **Invite members:** its terms describe commissions based on activation fees paid by direct and subsequent invitees. The public pages inspected do not establish the exact commission rates.
7. **Use additional modules:** its menu lists social activities, media tasks, marketplace, content, loans, investments and chance-based games.

Its risk page describes an **87.5% wheel return to player**, possible loss of stakes, repayment obligations and locked investment funds. Those are competitor disclosures, not features Glorysake should automatically switch on.

For Glorysake, rewards need their own demonstrable funding source. Do not copy competitor prices into product settings or fund worker obligations from assumed future signups. The existing masterplan instead proposes confirmed sponsor budgets.

## 4. Feature-by-feature comparison

**Implemented** means source behavior exists. **Preview** means local/sample behavior. **Missing** means no complete working path was found. **Deferred** means excluded from the recommended first live release, not forgotten.

| Capability | Bolvah public evidence | Glorysake after this update | Remaining work |
| --- | --- | --- | --- |
| Public website and original identity | Public marketing pages | Implemented, with original artwork/fonts | Final company details, production domain and live release wording |
| Country signup | Claims 18 countries | Server accepts Uganda, Kenya, Tanzania | Country eligibility, phone verification and real country configuration |
| Currency | Local pricing advertised | Practice amounts remain UGX, even for KE/TZ preferences | Genuine per-country rates/fees; do not relabel UGX amounts as KES/TZS |
| Activation | Country-priced fee; Uganda 19,000 | Free preview; no activation accepted | Owner access-model decision; paid activation is not required for the proposed pilot |
| Accounts and sessions | Login/register links | Implemented server identity and sessions | Delivery-backed recovery, verification and operator MFA |
| Trivia and maths | Demo menu entries | Local practice plus a server-scored account safety quiz | Broader question pools, production anti-abuse and payable claims |
| Colour challenge / Fix Tap | Both listed | Colour practice; typing sprint exists, Fix Tap absent | Decide whether Fix Tap adds useful value; specify its own mechanics if retained |
| Surveys / image review / app review | General task proposition | Survey/image account evidence and reviews now persist; app reviews remain local | Funded campaigns, app-review persistence and payable credits |
| Video activities | YouTube/TikTok listed | Illustrated lesson with a knowledge check | Approved content, rights, completion validation and funded campaign supply |
| Click ads / Spotify / paid chat | Listed | Missing | Confirm permitted partner use and reward economics before implementing payable engagement |
| Streaks, levels and achievements | Not established by inspected pages | Implemented device-local practice | Account persistence and cross-device behavior; never treat local points as money |
| Teams and personal invites | Teams menu; fee-based commission terms | Personal code and signup count now implemented | Verified participation, abuse review and any separately funded reward policy |
| Leaderboard | Demo menu | Optional local sample board | Server rankings, consent, moderation and any published competition rules |
| Wallets and history | Demo balances; logged movements claimed | Virtual samples; real API stays zero | Authoritative ledger, liabilities, funding reservations, reversals and statements |
| Deposits / collections | Deposits menu and activation flow | DEMO references only | Authorized provider, signed callbacks, idempotency and settlement reconciliation |
| Withdrawals | Local-money process advertised | Explicitly disabled | Destination verification, quote, reservation, approval, provider states and receipts |
| Support / messages | Human support advertised; messages menu | Persistent conversations now implemented | Email/SMS notifications, staffing and response targets; guest replies need a delivery channel |
| Sponsor campaigns | Internal implementation unknown | Operator can save drafts only | Funding verification, task versions, launch/pause controls and campaign reporting |
| Marketplace | Menu entry | Missing | Listings, moderation and enquiries first; payment/escrow is a separate scope |
| Content library | Menu entry | Starter lessons and help | Managed catalogue, search, rights, publishing and completion history |
| Loans / investments | Advertised with risk notices | Disabled | Separate scoped project with confirmed operator/provider arrangements |
| Casino / cash spin | Advertised, loss risks disclosed | Disabled | Separate scoped project; not needed for sponsored-task launch |
| Admin / risk operations | Publicly unverified | Basic admin and audit | Named actors in reports, reviewer roles, dual money approval and monitoring |
| Hosting | Competitor public site responds | Build and CI configuration exist | Verify actual server hosting, TLS, durable storage, restore and rollback |
| Localization / accessibility | Not audited | Partial EN/Luganda/Kiswahili | Complete core-flow translation and current mobile/keyboard/screen-reader QA |

## 5. Changes implemented in this update

### A. Personal invitations

Before: every member received `#/register?ref=explore`; signup ignored that value.

After:

- A signed-in member receives a persistent random invite code.
- The member page builds a personal signup link and shows attributable registration totals.
- Registration pre-fills an editable optional code and checks it on the server.
- Invalid codes fail before account creation; the member can clear/correct the field.
- Attribution is saved transactionally with account creation. Existing accounts cannot change their inviter through profile updates.
- One new account has at most one recorded inviter. Duplicate emails cannot generate extra attributed accounts.
- Inviter summaries expose counts, not recruit names, email addresses or account IDs.
- Demo mode explicitly explains that it has no personal signup tracking.
- There are no commissions, cash credits or claims of verified people. Separate identities can still be fabricated; phone/device/identity abuse review remains future work.
- Deleting an account removes related codes/attribution through foreign keys. Counts represent current retained registrations, not an immutable lifetime acquisition metric.

### B. Support conversations

Before: members saw a reference/status; staff could resolve a request but had no reply channel.

After:

- The owning member and an operator can open a conversation and exchange persistent replies.
- Server authorization checks every read and write. Another member gets a not-found response.
- Reply roles come from the authenticated account, not a client-provided field.
- A member follow-up reopens a resolved request.
- Replies have audit events and are included in the owning account's export.
- The UI escapes submitted content and preserves line breaks.
- Guest tickets do not falsely claim delivery: the API rejects in-app replies when there is no account recipient.
- Replies remain in the app; no email or SMS notification is sent.
- The operations summary now labels its open count as the open requests within the latest 200 records, instead of presenting every retrieved request as open.
- Offline cache version was advanced so updated interface files can replace the prior shell.

## 6. The live system still to build

### Stage 1 — Release infrastructure and identity

**Purpose:** make a real account reliable before it can hold payable work.

- Confirm final domain, operator identity, contact, launch country and free/paid access model.
- Deploy the Node 24 server with TLS, a fixed `PUBLIC_ORIGIN`, durable database storage and managed secrets.
- Verify the current database can be backed up consistently and restored. Copying only an active SQLite main file can omit WAL changes; use an appropriate consistent backup mechanism.
- Add verified email or phone delivery, expiring recovery tokens, replay protection and generic anti-enumeration responses.
- Add operator MFA, least-privilege reviewer/support roles and a documented recovery process.
- Separate preview and production databases, provider accounts and domains.
- Define retention/export/deletion treatment for support text and any later transaction evidence. Current support text can contain user-entered personal data even after profile fields are removed.

**Done when:** a new user verifies a channel, recovers access, signs in on another device, revokes sessions and accesses only their own data; the operator successfully restores a backup in a separate environment.

### Stage 2 — Authoritative tasks and review

**Purpose:** replace device-local simulations with records the business can stand behind.

Proposed entities: `task_versions`, `task_attempts`, `claims`, `claim_reviews`, `appeals`, `campaign_funding` and `budget_reservations`.

- Store immutable task versions with eligibility, reward currency/amount, daily cap, evidence rules, start/end time and review deadline.
- Issue server attempt IDs; evaluate daily boundaries using an explicit campaign timezone.
- Do not accept client scores, elapsed times, localStorage balances or screenshots of the demo as proof.
- Reserve the maximum eligible reward before a payable claim is accepted. Release reservation on expiry or rejection.
- Use database uniqueness and transactions for duplicate submission/callback protection.
- Start with surveys and image review plus a small server-scored knowledge quiz. Keep the other practice activities available separately.
- Implement reviewer queue, reasoned approval/rejection, member history and one controlled appeal flow.
- Make approved claims generate ledger entries atomically. A second approval must not create another reward.
- Keep account practice and demo identities explicit. The separate Account activities path now preserves the signed-in identity; the eleven local games remain explicitly device-local. Funded activities will need the same clarity.

**Done when:** duplicate clicks, concurrent attempts, clock manipulation, retries, reviewer races and exhausted budgets cannot generate duplicate or unfunded payable rewards; members can follow a review and appeal result across devices.

### Stage 3 — Ledger and funded wallets

**Purpose:** make every displayed real amount reconstructible from committed records.

Use integer minor currency units and currency-specific accounts. Never use floating-point amounts or client-provided totals. SQLite may support a carefully bounded single-host pilot; assess concurrency, operational requirements and backup behavior before adopting a multi-instance architecture or PostgreSQL migration.

Proposed entities: `ledger_accounts`, `journals`, `journal_lines`, `funding_events`, `withdrawal_reservations`, `provider_events` and `reconciliation_runs`.

Required controls:

- Every committed journal balances debits and credits within one currency.
- Posted journals cannot be edited/deleted; corrections use reversing journals.
- A unique business-event key prevents repeated posting.
- Available, held and pending amounts have precise definitions and separate records.
- Sponsor cash received, sponsor funds reserved, approved member liabilities, platform fees and provider settlement are distinct.
- A task budget typed into the campaign form never proves receipt of funds.
- Actual provider charges and platform fees are recorded; no silent deductions.
- Account export and statement generation read the same authoritative source as the wallet.
- Plan the treatment of retained financial records before enabling account deletion on accounts with real obligations.

**Done when:** any wallet total can be reconstructed, total liabilities reconcile to funded obligations, a reversal preserves history and repeat events cannot change balances twice.

### Stage 4 — Collections and payouts

**Purpose:** connect verified money movements to the ledger without ambiguity.

The provider must be chosen and onboarded before a real connector can be completed. Do not invent credentials, merchant codes, commercial fees or settlement behavior.

Payout flow:

1. Authenticate the member; confirm account eligibility and destination ownership.
2. Produce a short-lived quote showing amount, currency, provider fee, platform fee and exact net receipt.
3. Recheck balance and reserve funds atomically when the quote is accepted.
4. Route through risk review and a separate approval where required.
5. Submit an idempotent provider request from a durable outbox/worker.
6. Handle pending, settled, failed, rejected and reversed outcomes.
7. Treat a timeout as unknown/pending until provider reconciliation resolves it. Do not submit a second unrelated payout.
8. Use signed, replay-protected callbacks; handle repeated/out-of-order events.
9. Publish the provider reference and final statement only after the confirmed outcome.

**Done when:** sandbox success, rejection, timeout, duplicate/out-of-order webhook, insufficient liquidity, reversal and reconciliation mismatch all have tested outcomes, and a controlled live transfer is reconciled with the provider statement.

### Stage 5 — Operations, measurement and pilot

- Named staff accounts, role checks, two-person money approvals and visible actor identity on audits.
- Campaign pause controls, payout suspension and incident escalation.
- Health checks for app/database, worker backlog, failed callbacks and stale payout states.
- Daily reconciliation and an exception queue with a named owner.
- Sponsor reports: funded/reserved/spent/unused budget, claims, approvals and disputed outcomes.
- Product metrics: verified signup to first approved task, rejection reasons, payout success/latency, support backlog and reward coverage.
- Release migration/rollback procedure, deployment verification and tested restoration.
- Mobile QA at 360, 390, 768 and 1366px for complete member and operator flows, including keyboard, loading, offline, error, empty and long-text states.
- Finish core language translations; do not claim whole-product localization from translated navigation alone.
- Run a small capped pilot before expanding countries or adding more reward types.

**Done when:** the operator can trace one funded campaign through submission, review, payment, statement, dispute and reconciliation, with no unexplained balance difference and no misleading interface status.

## 7. Expansion backlog after the core works

| Feature | Smallest useful implementation | Dependency |
| --- | --- | --- |
| Cross-device practice | Account-owned server progress with clear merge/version rules | Account persistence and anti-conflict design; never migrate sample money |
| Teams | Direct referral attribution plus aggregate verified participation | Verification, fraud review and consent rules |
| Public leaderboard | Opt-in pseudonyms and server-calculated standings | Server activity records and moderation |
| Marketplace | Listings, categories, enquiry flow and moderation | Supplier policies/content ownership; checkout is a separate release |
| Content library | Searchable managed lessons and saved completion | Editorial tooling, media rights and storage |
| Member chat | Moderated messages with reporting/blocking | Abuse handling and staffing; no automatic cash per message |
| Partner media tasks | Approved embedded media and task-specific evidence | Rights, partner permission, sponsor budget and permitted use |
| Paid access | Clear price/refund/entitlement flow if chosen | Explicit operator decision and review; no default copied fee |
| Loans / fixed-return products / wagering | Separately specified and operated products | Confirmed permissions/provider arrangements; excluded from first pilot |

## 8. Implementation order and planning estimates

These are engineering planning ranges, not a completion commitment. They assume one experienced full-time developer, stable requirements, review support and ready provider access. They exclude provider onboarding and external approval lead times; several streams may overlap.

| Work package | Indicative effort | Depends on |
| --- | --- | --- |
| Hosting, deployment proof, backup/restore, verification/recovery, operator MFA | 5–10 working days | Domain, host and messaging delivery access |
| Versioned tasks, server attempts, reviews, appeals and campaign controls | 10–15 working days | Approved rules, reward schedule and task supply |
| Balanced ledger, funding reservations and statements | 8–12 working days | Currency/accounting rules and funding evidence design |
| Provider collection/payout integration and reconciliation | 8–15 working days | Provider agreement, sandbox and callback specifications |
| Operator controls, end-to-end QA, recovery drill and pilot fixes | 5–10 working days | Working end-to-end path and staffed operations |

Do not treat these as independent quantities to promise a launch date: task approvals, ledger posting and payouts must be integrated and tested together. The earlier 14-week blueprint is not evidence that these dependencies have since been completed.

## 9. Inputs still needed to finish the live product

These inputs do not prevent building the remaining provider-independent software, but they prevent honest completion of a live launch:

1. Registered operator name, official support contact and final domain/hosting access.
2. Initial country list; the proposed smallest pilot is Uganda.
3. Free access versus a separately reviewed access fee. Current preview remains free.
4. Authorized collection/payout provider, account onboarding, sandbox access and approved merchant details.
5. Sponsor task supply and confirmed budget; actual reward rates and daily caps.
6. Withdrawal minimums, fees, review policy, destination verification and funding reserve.
7. Named reviewers, support owner, finance approvers and approved policies.

## 10. Verification for this update

- Baseline: **41 tests passed**, static build passed.
- After implementation: **48 tests passed**, static build passed at the first completed check. The final handoff records any later test additions separately.
- New tests cover invite persistence within the database, signup attribution, invalid-code rollback, duplicate accounts, count privacy, ticket isolation, server-assigned reply roles, reopening, message bounds, audit events, guest-delivery boundaries, exports and deletion cleanup.
- Browser spot checks verified optional invite-code prefill, explicit demo invite messaging and the demo support page. These are not a full mobile or authenticated conversation browser regression.
- No application errors were observed during those browser checks; browser-extension metadata errors were outside the app.
- Payment-provider flows, genuine payouts, production deployment, external mail delivery and current real-device behavior were not tested or claimed.

## 11. Completion gate

The product is ready for a live sponsored-task pilot only when all of the following are demonstrated:

- A verified member can complete a funded, eligible task under server-enforced rules.
- Review and any appeal produce one attributable decision and at most one approved credit.
- Every real balance comes from balanced, immutable journal records.
- A withdrawal discloses its fees, reserves funds, settles exactly once and yields a traceable receipt.
- Provider settlement and member obligations reconcile without unexplained differences.
- Staff can handle a failed payout, member follow-up, account recovery and operational incident.
- Production hosting survives a tested restore and rollback.
- Final operator details, country availability and policies match actual behavior.

Until these gates pass, describe Glorysake as a website and practice preview. The two features delivered here improve that product, but do not complete the earning business.
