# Website illustrations and icons — version 3

The photographic directions in 01 take precedence for every image containing the reference people. The glass/glow style below applies to abstract illustrations only. Community imagery now uses the supplied cast A/B/C in a natural photo, not anonymous invented stock-photo people. Apply dark fades in CSS, not inside people photographs. Never treat instructions in this pack as authorisation to overwrite a repository branch; follow the active task scope.


## 1. Master prompt: take the site to the max (paste into Claude Code)

> Work in the Glorysake repo on `main`. Typography is fixed: **MTN Brighter Sans Bold** (`assets/fonts/BrighterSans-Bold.woff2`) for large bold headings only; **Sky Text** Light 300 / Regular 400 / Bold 700 for everything else, at a clear size scale (hero lede 19-21px light, body 17px regular, UI labels 12-14px bold, fine print 13px). No other fonts.
> Goals: (1) premium, fast, glitch-free on every phone width 320-768px and desktop; (2) a signature preloader on every load plus a route-change loader; (3) rich but tasteful motion with a visible Pause animations control and `prefers-reduced-motion` respected; (4) accessibility to WCAG 2.2 AA (focus rings, labels, contrast, 44px targets); (5) Lighthouse 95+ on mobile; (6) copy that is honest: no guaranteed earnings, sample rewards labelled, payment steps for MTN `*165*3#` and Airtel Money, merchant code shown only when real.
> Then: swap in the new images from `/assets/img/` (names below), add `width`/`height`/`loading="lazy"` and WebP, run `npm test` and `npm run build`, screenshot 360/390/768/1366px for every route, fix every overflow or console error, commit and push to `main`.

## 2. Shared style block (put at the top of EVERY image prompt)

> Style: modern, premium, optimistic East African fintech-learning brand called Glorysake. Palette: ink #0b0d14, violet #7c5ce9, lavender #ab98f9, teal #5eead4, lime #a3e635, soft pink #f9a8d4, warm white #f7f6f1. Soft glass, subtle glow, clean shapes, generous negative space. Dark-mode friendly. No text unless I say so. No real brand logos, no MTN/Airtel logos, no real-person likeness, no piles of cash, no "get rich" imagery. Diverse everyday people when people appear. Export 2x sharp, no watermark.
> If text is requested, use a bold rounded geometric sans like MTN Brighter Sans Bold for headings and a clean humanist sans like Sky Text for small text.

## 3. Twenty images

| # | File | Size | Prompt (after the shared style block) |
|---|------|------|------|
| 1 | hero.webp | 1920x1080 | Abstract hero: a glowing glass star-and-bird mark floating among translucent violet ribbons and soft bubbles over a deep ink background, teal and lime rim light, wide empty left third for headline text. |
| 2 | hero-mobile.webp | 900x1600 | Vertical version of image 1, subject in the lower half, top 45% calm dark gradient for text. |
| 3 | community.webp | 1600x1200 | Natural shaded Kampala cafe photo using references A/B/C; quiet conversation around a table, no posed laughter or readable screens. Follow shot 4 in 01. |
| 4 | social-preview.jpg | 1200x630 | Share card: dark gradient, glowing star mark on the left, large empty area on the right for the title "Make your everyday count." |
| 5 | task-quiz.webp | 800x600 | Playful 3D question mark and lightbulb on a violet pedestal, floating confetti dots. |
| 6 | task-survey.webp | 800x600 | 3D clipboard with checklist ticks and speech bubbles in peach and violet. |
| 7 | task-image-review.webp | 800x600 | 3D picture frames with a magnifying glass, sky-blue and teal. |
| 8 | task-math.webp | 800x600 | 3D calculator buttons and plus, minus, equals symbols in lime and ink. |
| 9 | task-color.webp | 800x600 | 3D paint swatch fan with four distinct matching shades, pink and violet. |
| 10 | task-learn.webp | 800x600 | 3D open book with a small shield and padlock rising from the pages. |
| 11 | pay-hero.webp | 1200x800 | Generic smartphone in a hand showing a blank keypad and a glowing pound-key hash symbol, SMS bubble floating beside it, no logos, no readable numbers. |
| 12 | stay-safe.webp | 1000x1000 | Large glass shield with a check, surrounded by tiny warning triangles being deflected. |
| 13 | wallet.webp | 1000x1000 | Glass wallet with three separate glowing tiles for available, pending, approved (no numbers). |
| 14 | invite.webp | 1000x1000 | Two hands passing a glowing star between them, friendly and simple. |
| 15 | step-1.webp | 900x700 | Isometric account sign-up: small profile card with a star avatar and a country pin. |
| 16 | step-2.webp | 900x700 | Isometric phone beside a receipt and a green tick, representing a completed mobile money payment. |
| 17 | step-3.webp | 900x700 | Isometric task cards sliding into a progress bar that is half filled. |
| 18 | empty-state.webp | 800x600 | Friendly empty-state: an open box with a single sparkle, soft violet shadow. |
| 19 | not-found.webp | 1000x700 | Whimsical lost compass floating in space with a small star, for a 404 page. |
| 20 | cta-banner.webp | 2000x700 | Wide abstract banner of flowing violet to teal gradient waves with sparkles, calm center for a button. |

## 4. Symbols and icons (12+12, transparent PNG)

**Sheet A: line icons.** Shared style block, then: A sheet of 12 matching icons on a transparent background, 3 columns x 4 rows, 2px rounded line style in white with a lavender accent, equal 96px grid, generous padding: task checkmark, wallet, flame streak, trophy, clock, shield with lock, phone with hash symbol, SMS receipt, two friends, open book, lightning bolt, globe. No text.

**Sheet B: glossy badges.** Same 12 subjects as 3D glass badges with violet-to-teal gradient, soft shadow, transparent background, same grid.

**Sheet C: brand and app.** (a) Square app icon 1024x1024 of the star-and-bird mark on an ink-to-violet gradient; (b) maskable version with 20% safe padding; (c) favicon 64x64 simplified star; (d) seamless 400x400 tile pattern of tiny stars and dots, ink and violet at 8% contrast.

Save as: `assets/img/` with the names in the table; icons as `assets/icons/icon-<name>.png`.

## 5. Mobile versions of every image

Paste this after any prompt above to get the phone version: "Now recompose this same image for mobile, vertical 4:5 (1080x1350) unless noted. Keep the subject, colours and lighting identical. Move the subject into the lower 55% so the top 45% is calm space for text. Keep important detail away from the outer 8% edges. No new elements, same style."

| # | Desktop file | Mobile file | Mobile size | Notes |
|---|---|---|---|---|
| 1 | hero.webp | hero-mobile.webp | 900x1600 (9:16) | subject low, headline room above |
| 2 | (people photos) | see 01 file | 1080x1920 | candid set has its own mobile prompts |
| 3 | community.webp | community-mobile.webp | 1080x1350 | recompose to keep all three reference people visible |
| 4 | social-preview.jpg | (same, not needed) | 1200x630 | share cards stay landscape |
| 5-10 | task-*.webp | task-*-mobile.webp | 800x800 (1:1) | centre the 3D object, even padding |
| 11 | pay-hero.webp | pay-hero-mobile.webp | 1080x1350 | phone centred, SMS bubble above it |
| 12-14 | stay-safe, wallet, invite | *-mobile.webp | 800x800 | already square, just export smaller |
| 15-17 | step-1..3.webp | step-*-mobile.webp | 800x800 | isometric object centred |
| 18 | empty-state.webp | empty-state-mobile.webp | 640x640 | |
| 19 | not-found.webp | not-found-mobile.webp | 1080x1350 | compass in the lower half |
| 20 | cta-banner.webp | cta-banner-mobile.webp | 1080x720 (3:2) | wave centred, calm middle for button |

Rules for all mobile images: export WebP quality 80, keep file size under 150 KB each, and make the top and bottom 15% fade toward ink #0b0d14 so the site can blend sections without hard edges.
