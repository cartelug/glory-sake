# Glorysake Dusk release — 13 November 2026

## Result

An illustrated public home and expanded practice experience, preserving the original Dusk palette, Brighter headings, Sky interface fonts and star-and-bird brand mark. Twenty-four new generated illustrations join the recovered first-steps badge. All 25 production assets are applied in the interface and recorded in `assets/visual-manifest.json`. PNG masters remain local; versioned WebPs preserve transparency and original dimensions.

The six backgrounds belong to the hero, activities, practice journey, everyday moments, trust and closing invitation. The eight glyphs appear on activity cards, lessons and results. Five increasingly elaborate crests appear in the level journey. Six illustrated badges coexist with CSS/SVG placeholders for the other ten achievements. Locked states use desaturation and an explicit lock.

## Working features

- Eleven practice activities: knowledge quiz, survey, image review, maths, colour matching, safety lesson, illustrated explainer and check, fictional app review, thirty-second typing sprint, scam spotting and East Africa quiz.
- Once-per-day practice points, five levels, daily check-in, one missed-day freeze per week, sixteen achievement rules, three daily goals, unlock notifications and a replayable four-step tour. Day boundaries use Africa/Kampala. Perfect retries can earn a badge without duplicating points.
- Optional, device-local nickname board with clearly labelled sample players and no prizes.
- Wallet type/date filters, CSV export, printable/downloadable practice records, separated pending submissions and an explicit disabled withdrawal preview.
- Searchable/category-filtered help. Demo support references remain on the device; server support references are scoped to the signed-in account.
- Operator-only plain-text announcements, server session list, password changes with session rotation and password-verified logout everywhere.
- Initial English/Luganda/Kiswahili navigation, selected headings/buttons and payment-step labels.
- PWA manifest, existing-mark app icon and offline public practice shell. Account, support and payment API responses are never cached. Installation controls appear only where the browser offers them.

## Verification

`npm test`: 41 passing tests covering server authentication and roles, account isolation, password/session invalidation, announcement authorisation, practice streaks and freezes, points, levels, achievements, timezone boundaries, visual integrity and offline worker behaviour.

`npm run build`: passed. The portable static output includes all frontend modules and production assets while excluding generated PNG masters.

Browser review: thirteen screens at four iframe viewport widths (360, 390, 768, 1366), 52 checks with no horizontal page overflow or observed broken images. The machine-readable results are in `docs/qa/dusk-width-checks.json`. Browser interactions verified check-in, badge unlocks, all five added activities, optional board participation, help search, local ticket references, wallet filters, practice receipts, mobile menu keyboard access, language switching and marking notifications read. No application console errors were observed. Browser download delivery and device-specific PWA installation were not fully verified; CSV/receipt export code and offline caching checks are included.

## Design references

The implementation uses original Glorysake artwork and styling. Behavioural references were the small, forgiving daily-practice patterns described by [Duolingo](https://www.duolingo.com/help/what-is-a-streak) and [Brilliant’s learning-by-doing approach](https://brilliant.org/help/features/how-do-i-use-interactives-on-brilliant/). The offline/manifest implementation follows [MDN’s PWA guidance](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps).

## Production boundary

This is a complete website/practice-preview upgrade, not a live-money launch. Payment tracking accepts sample references beginning DEMO- and cannot mark an actual payment confirmed. No activation fee is required or accepted. Withdrawals remain disabled. Funding, provider onboarding, production task scoring and the operator dependencies in `docs/LAUNCH.md` still apply. Static hosting supports the public site and local practice; server accounts, support delivery and operations need the Node server.
