# GLORYSAKE

A complete responsive public website and interactive member experience built from the owner's November 2026 masterplan. Original star-and-bird mark and embedded Brighter Sans / Sky Text fonts are preserved. Custom generated hero and community images are optimized and included locally; no external image or font requests are needed.

## Hosted account edition — published 15 November 2026

**Owner-private working site:** https://glorysake-live.woodsydegu512.chatgpt.site

The hosted edition now runs the account API with a persistent D1 database and platform-managed ChatGPT sign-in. It supports profiles, saved practice submissions, operator reviews/appeals, support conversations, invitations and account data controls. Sign in with the account that owns the Site and explicitly finish the Glorysake profile setup. No production profile was created or terms accepted automatically.

The deployment succeeded; its health endpoint returned HTTP 200 with `database: connected`, and the live 13-table schema, frontend module and font asset were verified. The browser showed the expected private sign-in gate; an authenticated production member walkthrough still needs the owner to sign in. Public access, `glorysake.com` DNS and live cash processing have not been enabled.

The original Node edition retains email/password sign-in. The frontend chooses the correct controls from the backend's `authMode`; its accounts/database remain distinct from the hosted edition. GitHub Pages remains the static public demo. [Hosted backend and deployment details](hosted/README.md).

The full repository suite now has **72 passing tests**. Docker packaging was corrected to include `work-engine.mjs`, the offline page and web manifest; a staged COPY-payload startup test passed. An actual Docker engine was unavailable, so no Docker image build is claimed.

## Run

Requires **Node.js 24 or newer**. No third-party runtime packages or API keys are needed.

```sh
npm start
```

Open `http://localhost:3000`. Set `PORT` to change the port. SQLite data is stored in `data/glorysake.sqlite` and is excluded from Git.

```sh
npm test
npm run build
```

`npm run build` produces a portable static site in `dist/`. The public website and device-local practice demo work on static hosting, including a GitHub Pages project path. Account creation, login, support delivery and operator functions require the Node server. Static hosting does not create a server or a payment service.

## Account submissions and reviews — 15 November 2026

Signed-in members can now complete three server-backed practice activities at `/#/work`: a survey, image observations and a digital safety quiz. Attempts have immutable task versions, a thirty-minute window and one attempt per activity per East Africa calendar day. Quiz scores are calculated on the server. Submissions, evidence, decisions and appeals persist across devices.

Members follow outcomes at `/#/submissions`. Operators open `/#/reviews` from Operations, leave an approve/reject reason and handle one appeal per rejected submission. Operators cannot review their own work, and appeals of manual decisions require a different operator. These activities do not pay cash or affect any wallet balance.

Startup creates four additive `work_*` tables and immutable-version triggers. Back up an existing database before deploying. Static hosting includes the UI module but cannot run the account API. No test accounts or QA shortcuts are shipped. The build now rejects JavaScript syntax errors before packaging.

Validation: **60 tests passed**, static build passed, and local browser QA followed a member submission through rejection, appeal, independent approval and the member’s final history. Mobile width regression was not repeated for this increment. See [the account-work release notes](docs/ACCOUNT-WORK-RELEASE.md).

## Completion review — 15 November 2026

The repository now includes personal invite codes with server-recorded signup attribution and private support conversations between members and operators. Member follow-ups reopen resolved requests. Neither feature creates cash rewards or sends external notifications. New SQLite tables are created automatically on startup; back up an existing database before deploying. Existing accounts receive a code when they open Invite friends; old `ref=explore` links are not personal codes.

See [the completion plan and Bolvah comparison](docs/COMPLETION-PLAN.md) for the current feature matrix, remaining live-product dependencies, implementation sequence and acceptance checks. Validation for this update: 48 automated tests and a successful static build; browser spot checks of invite-code prefill and demo boundaries.

## Dusk upgrade — 13 November 2026

The public site now uses **25 illustrated assets**: six section backgrounds, eight activity glyphs, five level crests and six badges. The production WebPs total about 2.49 MiB; the existing fonts and star-and-bird mark are preserved.

The practice experience includes eleven activities, daily check-ins and a weekly freeze, five levels, sixteen achievements, three daily goals, an optional nickname board, notifications and a replayable tour. Practice points and virtual wallet samples are separate and have no cash value. Added account controls include session visibility, password changes and logout everywhere. Help search, support references, receipt records, wallet filters and offline shell support are included. Public navigation, selected headings and payment-step labels have English, Luganda and Kiswahili options; this is an initial translation pass.

Validation: **41 automated tests**, a successful static build, and **52 browser layout checks** over thirteen screens at 360, 390, 768 and 1366 pixels. Details and remaining production boundaries are in [the release notes](docs/DUSK-RELEASE.md).

## Included

- Public home, how it works, activity explorer, trust, access/availability, partner enquiries, help center and preview legal notices.
- Responsive dashboard, task search and categories, daily knowledge quiz, Math Rush, Color Match, a digital skills lesson and practice survey/image review submissions.
- Virtual reward history and CSV export, duplicate practice-credit prevention, pending practice submissions, invite-link copy, profile settings and reset controls.
- Real server accounts with scrypt password hashing, HttpOnly sessions, rate limits, role checks, origin checks, persistent profiles, data export and password-confirmed account deletion.
- SQLite support inbox, draft campaign studio and audit trail, restricted to server-created operators.
- Self-hosting Dockerfile, security headers and automated API/security checks.

## Operator setup

Create the first operator using the local environment, never a committed password:

```sh
read -r -s -p 'Unique operator password (16+ characters): ' ADMIN_PASSWORD
export ADMIN_PASSWORD
node scripts/create-admin.mjs
unset ADMIN_PASSWORD
```

The script asks for the operator's email and name. Log in normally at `/#/login`; operator accounts open `/#/admin`. No public registration field can assign the admin role. No default operator credentials are shipped.

## Production server configuration

Use TLS behind a reverse proxy; set `NODE_ENV=production`, `PUBLIC_ORIGIN=https://your-domain.example`, `PORT=3000`, and a durable `DATABASE_PATH`. Production sessions use Secure cookies. Back up the SQLite database and restrict host access to the operator. The service uses its direct socket address for rate limiting; if behind a proxy, configure per-client rate limiting at that proxy. Do not expose the database directory.

```sh
docker build -t glorysake .
docker run --name glorysake -p 3000:3000 -v glorysake-data:/app/data glorysake
```

Set production environment variables only when TLS and the final origin are configured. Static deploys contain no secrets or database.

## Release boundaries

This is a **website and platform preview**, not a launched financial product. Demo balances are virtual, device-local and never accepted by the server as money. Real accounts start at zero. Live paid campaigns, task credits, deposits, withdrawals, loans, investments, wagering and referral cash commissions are disabled. Campaign budgets are planning fields, not evidence that funds were received.

See [docs/LAUNCH.md](docs/LAUNCH.md) for the exact remaining operational dependencies. Do not advertise live earnings or collect activation fees before those are complete.
