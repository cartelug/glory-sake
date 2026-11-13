# GLORYSAKE

A complete responsive public website and interactive member experience built from the owner's November 2026 masterplan. Original star-and-bird mark and embedded Brighter Sans / Sky Text fonts are preserved. Custom generated hero and community images are optimized and included locally; no external image or font requests are needed.

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
