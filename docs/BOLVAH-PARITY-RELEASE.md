# Bolvah parity release — 16 November 2026

Glorysake now covers every Bolvah module that can run without anyone paying money in. The practice rules stay the same: points have no cash value, demo credits are virtual, and live-money paths stay switched off.

## Added

| Bolvah module | Glorysake version | Where |
| --- | --- | --- |
| Fix Tap | **Fix Tap**: fix 12 cracked tiles in 20 seconds, with no more than 3 wrong taps | Activities, Games |
| Click Ads | **Sponsor spotlight**: three fictional sponsor cards. Each one must stay on screen for 8 seconds, and the timer pauses while the tab is hidden. An attention check follows | Activities |
| Earn With Spotify | **Music minute**: compare two clips each round, generated with WebAudio. No third-party audio is used | Activities, Games |
| YouTube / TikTok | **Short clips**: three vertical clips on mobile-money safety, with a transcript, then three questions | Activities |
| Chat and Earn | **Chat lounge** (`#/chat`). Your first 15+ character message each day adds practice points, and up to 5 messages a day add a virtual demo credit of UGX 100 each. The safety filter blocks phone numbers, PIN/OTP/password mentions, links and money requests | Member nav |
| Free Spin | **Free spin** (`#/spin`): one free spin per East Africa day for 10–60 practice points. There is nothing to stake or buy | Member nav, Games banner |
| Marketplace | **Marketplace** (`#/marketplace`): six fictional sample listings, category filter and search. Members can post and remove their own listings and save enquiries. Glorysake never holds money | Member nav |
| Content Library | **Content library** (`#/library`): eight guides on safety, money basics and work skills, with read tracking. One guide read per day adds practice points | Member nav |
| Dashboard task earnings and balance widgets | **Activity income**: activities wallet, games wallet, pending review, amount withdrawn, and a points/sample table for each activity | Overview |
| Homepage features, extra FAQ, "Try the demo" CTA | A "More ways to spend a spare minute" section. Three FAQs were added: country not listed, how progress is tracked, and no activation fee/casino/loans | Home, Help |

There are now 15 activities, up from 11. The new modules are in `extras.js`, `extras-data.js` and `extras.css`. They have been added to the service worker cache, the static build and the Docker payload.

## Deliberately not added

- **Activation fee and two-level commissions on activation fees.** If payouts depend on new members' fees, this is the structure Uganda's Anti-Pyramid Schemes Act 2023 prohibits.
- **Casino wheel with stakes, loans, and locked investment plans.** Each one needs its own licence and a provider arrangement.

Glorysake's FAQ says it offers none of these. The free spin never takes a stake.

## Validation

- `npm test`: **82 passing** (9 new tests in `tests/extras.test.mjs`).
- `npm run build`: passed.
- Headless Chrome at 390 px and 1366 px:
  - Pages checked: home, spin, chat, marketplace, library, games and dashboard.
  - No horizontal overflow and no console errors.
  - End-to-end runs completed: spin, chat (including a blocked phone number), listing post and enquiry, marking a guide as read, Fix Tap, Sponsor spotlight, Music minute and Short clips.
