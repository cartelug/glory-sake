# Glorysake: symbol plan + feature expansion prompts

Two prompts. Prompt A goes to ChatGPT (image generation). Prompt B goes to Claude Code to build features. The palette and fonts below match the live "Dusk" design.

**Palette:** base #0e0920 · deep #160f30 · amber #ffb84d · coral #ff7a59 · violet #b9a4ff · leaf #63e2a6 · text #f6f2ff
**Fonts:** MTN Brighter Sans Bold (headings) · Sky Text Light/Regular/Bold (everything else)

---

## Who makes what (the plan)

| Group | Count | Made by | Format | Why |
|---|---|---|---|---|
| 1. UI line icons | 32 | **Claude, in code** | inline SVG in `icons.js` | Must be pixel-crisp at 16–24px, recolourable with CSS. Image AIs can't draw clean 2px strokes. |
| 2. Achievement badges | 16 | ChatGPT | PNG 1024×1024, transparent | Rich, glowing, collectible feel. |
| 3. Activity category glyphs | 8 | ChatGPT | PNG 1024×1024, transparent | Big 3D objects for activity cards. |
| 4. Level emblems | 5 | ChatGPT | PNG 1024×1024, transparent | Levels 1–5, practice points only. |
| 5. State illustrations | 6 | ChatGPT | PNG 1600×1200 | Empty, success, error, offline, maintenance, 404. |
| 6. Brand set | 6 | ChatGPT, then Claude cleans up | PNG 1024 + SVG trace | App icon, maskable icon, favicon, splash, share card, pattern tile. |

Total: 32 coded + 41 generated = **73 symbols**.

### Group 1: line icons Claude will code (you don't need to generate these)
Already there: arrow, chevron, spark, grid, wallet, check, shield, users, book, bolt, message, image, clock, search, menu, close, sun, settings, logout, download, plus, mail, copy, globe.
New: flame (streak), trophy, medal, bell, calendar, gift, target, chart, lock, eye, phone-hash (USSD), receipt, filter, star, moon, play.

---

## PROMPT A: paste into ChatGPT (image generation)

> **Start of prompt**
>
> You are the lead illustrator for **Glorysake**, a mobile-first app in Uganda, Kenya and Tanzania where people do short quizzes, surveys and skill lessons in their spare minutes. The brand mood is **"Kampala at dusk"**: warm sunset light fading into a deep violet night, glowing city lights, calm and optimistic.
>
> **House style (apply to every image):**
> - **Material:** soft frosted glass and polished enamel. Gentle inner glow, a single warm rim light from the upper right, soft long shadow to the lower left.
> - **Palette only:** deep indigo #0e0920 and #160f30 for shadows; amber #ffb84d and coral #ff7a59 for warm light; lavender violet #b9a4ff for cool light; mint #63e2a6 only for "success"; off-white #f6f2ff for highlights. No other hues.
> - **Shape language:** rounded, chunky, friendly. Slightly heavier at the bottom so objects feel grounded. No thin fussy details.
> - **Composition:** one centred object, about 70% of the canvas, plenty of padding, **transparent background** (PNG with alpha), no floor, no text, no letters, no numbers unless stated, no logos, no brand marks, no money, no coins, no banknotes, no people.
> - **Consistency:** every symbol must look like it belongs to the same set: same camera angle (3/4 view, 15° from above), same light direction, same glass thickness.
> - **Output:** 1024×1024 PNG, transparent background, sharp, no watermark.
>
> Generate them **one at a time, in order**. After each one, wait for me to say "next". If I say "match", redo it to match the previous one's light and material exactly.
>
> **GROUP 2: Achievement badges (16).** Circular or shield-shaped medallions, glass rim with an enamel centre. Each has one simple emblem in the middle:
> 1. **first-steps:** a single footprint
> 2. **streak-3:** a small flame
> 3. **streak-7:** a bigger flame with a second inner flame
> 4. **streak-30:** a blazing flame inside a ring of rays
> 5. **quiz-ace:** a lightbulb with a check
> 6. **survey-voice:** a speech bubble with three dots
> 7. **sharp-eye:** a magnifying glass over a small picture frame
> 8. **quick-maths:** a lightning bolt crossing a plus sign
> 9. **colour-master:** a fan of four colour swatches
> 10. **safe-online:** a shield with a padlock
> 11. **early-bird:** a rising sun over a horizon line
> 12. **night-owl:** a crescent moon with two stars
> 13. **all-rounder:** a six-pointed star made of six small facets
> 14. **helper:** two hands holding a small glowing star
> 15. **explorer:** a compass
> 16. **perfect-week:** a calendar page with seven glowing dots
>
> Each badge has a "locked" twin: same badge, desaturated to deep indigo glass with the emblem as a faint outline. Make the locked twin right after each badge.
>
> **GROUP 3: Activity category glyphs (8).** Floating 3D objects, no frame:
> 1. **quiz:** a question-mark-shaped glass lamp, glowing amber inside
> 2. **survey:** a clipboard with three tick marks
> 3. **image-review:** two stacked photo frames with a magnifier
> 4. **math:** a chunky calculator keypad tile with plus and equals keys
> 5. **colour:** a paint swatch fan
> 6. **lesson:** an open book with a small shield rising from the pages
> 7. **video:** a rounded play button in a glass screen
> 8. **app-review:** a phone with a single star above it
>
> **GROUP 4: Level emblems (5).** A hexagonal glass crest that gets more elaborate per level. Show the numeral in the centre in a rounded geometric sans:
> 1. Level 1, **Spark:** plain amber crest, numeral 1
> 2. Level 2, **Ember:** crest with a thin coral rim, numeral 2
> 3. Level 3, **Glow:** crest with a double rim and two small wings, numeral 3
> 4. Level 4, **Blaze:** crest with wings and a halo, numeral 4
> 5. Level 5, **Dusk Star:** violet-and-amber crest with wings, halo and a star on top, numeral 5
>
> **GROUP 5: State illustrations (6).** 1600×1200, transparent or deep indigo #0e0920 background, same glass style, scene-sized:
> 1. **empty:** an open glass box with one sparkle floating out
> 2. **success:** a large mint check inside a glowing ring, small confetti
> 3. **error:** a cracked glass triangle with a soft coral glow (calm, not alarming)
> 4. **offline:** a phone with a cloud and a small broken signal arc
> 5. **maintenance:** a glass wrench crossed with a screwdriver over a gear
> 6. **not-found:** a lost compass drifting among stars
>
> **GROUP 6: Brand set (6).** Use the Glorysake star-and-bird mark I attach (a four-pointed star with a bird shape inside).
> 1. **app-icon:** 1024×1024, the mark in off-white on a rounded square with a gradient from amber (top right) to deep violet (bottom left), soft inner glow
> 2. **app-icon-maskable:** the same, with the mark scaled to 60% so it survives circular masks
> 3. **favicon:** 512×512, the mark only, amber on transparent, simplified, bold
> 4. **splash:** 1290×2796, deep indigo with a soft amber sunset glow at the bottom and the mark centred
> 5. **share-card:** 1200×630, deep indigo to violet gradient, mark on the left, empty space on the right for a headline I'll add in code
> 6. **pattern-tile:** 512×512 seamless tile of tiny stars and dots in violet on transparent, 10% opacity look
>
> **End of prompt**

**Saving them:** name each file exactly as listed and put them in folders:
`assets/badges/badge-<name>.png` and `badge-<name>-locked.png`, `assets/glyphs/glyph-<name>.png`, `assets/levels/level-<1-5>.png`, `assets/states/state-<name>.png`, `assets/brand/<name>.png`. Then attach the files or a zip in chat and Claude will compress them to WebP, wire them in and make SVG versions of the brand mark.

---

## PROMPT B: paste into Claude Code (build the features)

> **Start of prompt**
>
> Work in the `cartelug/glory-sake` repo on `main`. Keep the Dusk design (`glow.css`, `fx.js`), the fonts, and the honesty rules: no guaranteed income, sample rewards labelled, no fake payout tickers or fabricated testimonials, no cash for recruiting, no chance-based or pay-to-upgrade features. Everything below works in the browser demo (localStorage) and, where an API exists, in server mode.
>
> **1. Icons first.** Add these line icons to `icons.js` in the existing 24px, 2px rounded-stroke style: flame, trophy, medal, bell, calendar, gift, target, chart, lock, eye, phone-hash, receipt, filter, star, moon, play.
>
> **2. Engagement (practice points only, never cash):**
> - **Daily check-in and streaks:** a 7-day check-in strip on the dashboard with a flame counter. Missing a day resets the streak, and there's one "streak freeze" per week.
> - **Practice points and levels:** points for completed practice tasks. 5 levels (Spark, Ember, Glow, Blaze, Dusk Star) with a progress ring. Points are not money and cannot be withdrawn; say so beside the ring.
> - **Achievements:** 16 badges (names in `docs/PROMPTS-SYMBOLS-FEATURES.md`) with locked/unlocked states, an unlock toast and a badge gallery page. Use the PNGs in `assets/badges/` when they exist; until then, render a CSS placeholder.
> - **Daily goals:** three small goals per day (for example "finish 2 activities", "learn 1 lesson") with progress bars and a small celebration when all three are done.
> - **Weekly leaderboard:** opt-in only, practice points only, nickname instead of real name, demo shows the member against clearly labelled sample players ("Sample player").
>
> **3. More activity types (demo versions):**
> - **Video lesson:** a short embedded explainer with a 3-question check after it.
> - **App review practice:** a mock app screen, rate it, write two observations.
> - **Typing sprint:** type a short phrase accurately within 30 seconds.
> - **Spot the scam:** pick which of three SMS messages is a phishing attempt (fits Glorysake's safety lessons).
> - **Local knowledge quiz:** questions on East African geography and everyday facts.
> - Add category filters and a "time available" filter (2, 5, 10 minutes) to the activities page.
>
> **4. Wallet and payments:**
> - **Payment status tracker:** after submitting a transaction ID, show a timeline: Submitted, Checking, Confirmed or Needs attention, with the reference number.
> - **Receipts:** a downloadable/printable receipt per demo transaction.
> - **Wallet filters:** by type (practice reward, pending review, payment) and by date; keep the CSV export.
> - **Withdrawal preview:** show minimum, fee and net amount, and keep live withdrawals disabled with a clear message.
>
> **5. Account and trust:**
> - **Notifications centre:** a bell in the header with unread count. Shows badge unlocks, streak reminders, payment status changes and announcements.
> - **Announcements:** an operator-editable banner (admin page) for news like "New activities added".
> - **Profile completion:** a progress card (name, country, phone, first activity) that nudges without blocking.
> - **Security page:** sessions list, "log out everywhere", password change, and tips for spotting fake Glorysake messages.
> - **Language switch:** English, Luganda and Kiswahili for the public site's main pages (start with headings, buttons and the pay steps). Put strings in a `i18n.js` file.
>
> **6. Help and community:**
> - **Searchable help centre:** an instant search over FAQs with categories (Account, Payments, Activities, Safety).
> - **Support ticket tracker:** members see their ticket status and reference numbers.
> - **Guided tour:** a 4-step first-visit tour in the demo (dashboard, activities, wallet, help) that can be skipped and replayed.
>
> **7. App feel:**
> - **Installable PWA:** `manifest.webmanifest`, service worker for offline shell, the app icons from `assets/brand/`, and an "Install app" button where supported.
> - **Offline page:** use `assets/states/state-offline.png`.
> - **Haptic-style feedback:** subtle button press scale and success pulses, respecting the Pause animations control and `prefers-reduced-motion`.
> - **Skeleton loading states** for the dashboard and wallet.
>
> **Deliberately NOT building** (common on competitor earning sites, but harmful or misleading): spin-the-wheel and lucky draws, paid "VIP levels" that unlock higher earnings, multi-level referral commissions, fake live "someone just withdrew" pop-ups, countdown pressure timers on deposits, and income calculators that promise a daily amount.
>
> **Quality bar:**
> - Add tests for streak, points, level and badge logic.
> - Run `npm test` and `npm run build`.
> - Screenshot 360, 390, 768 and 1366px on every new screen, then fix overflow, contrast and console errors.
> - Keep everything keyboard-accessible.
> - Commit in small logical commits and push to `main`.
>
> **End of prompt**
