# Hosted backend snapshot

The deployed account edition is at https://glorysake-live.woodsydegu512.chatgpt.site and is owner-private. It uses ChatGPT sign-in, a separate persistent D1 database and the existing Glorysake frontend. It is not a public launch or a live-money service.

This directory mirrors the authored API, task catalogue and schema migration from the managed Site source. It is not a standalone framework scaffold. The complete deployable source and build configuration are versioned in the Site’s bound source repository. Use the Sites workflow for further hosted deployment, preserving project ID `appgprj_6af9f30fd6148191b4898837211f000e`. The initial published source commit is `4ea3cd6a029930f1d537d30bba85036cd0338799`.

The request handler is imported by the managed app API catch-all route and receives the D1 binding. It trusts platform-injected identity headers only behind the Sites dispatch boundary. Do not mount it on an ordinary public server that accepts those headers from clients. Configure verified operator emails using the `OPERATOR_EMAILS` runtime secret, never client input or committed values.

The Node email/password server in the repository root remains a separate deployment option. It does not share identities or database rows with the hosted edition. The frontend detects `authMode` from the server session response and uses the correct sign-in controls. Node startup and Docker packaging include the server-only task module, offline page and manifest.

The root test suite includes 11 cloud-handler tests using an isolated D1-compatible SQLite adapter, in addition to its Node tests. Hosted publication also applied the real D1 schema and the live database tables were inspected. The owner has not completed a production member profile during automated verification, and no real funds or payout provider are connected.

Before a public paid launch: complete final operator policies, campaign funding, authoritative financial accounting, country rules, provider verification/webhooks and payout reconciliation. The activation model remains undecided; Bolvah’s UGX 19,000 fee was not copied into Glorysake.
