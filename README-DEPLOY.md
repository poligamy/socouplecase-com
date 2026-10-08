# socouplecase.com — deploy ke Cloudflare + daftar Claude Startups

## Deploy (Cloudflare Pages, Connect to Git — tanpa _redirects)
Static site, tanpa build: `index.html`, `styles.css`, `studio.js`, `about/privacy/terms/404.html`, `robots.txt`, `sitemap.xml`, `_headers`.
1. Buat repo `socouplecase-com` di GitHub, push folder ini.
2. Pages → Connect to Git → framework None, build command kosong, output `/`.
3. Custom domains: `socouplecase.com` + `www`. Redirect www→apex via **Rules → Redirect Rules** (301), bukan file `_redirects`.
4. Email Routing: `hello@`, `order@`, `support@`, `partners@socouplecase.com` → forward ke email pribadi.

## Copy-paste aplikasi Claude Startups
- Company: `SoCoupleCase Studio`, founded 2025, Jakarta. Website `https://socouplecase.com`
- What building: `AI-native D2C studio for matching couple phone cases. Customers co-design pairs in an AI studio (vibe + names → matching-pair concept); we print on premium cases and ship. Claude API powers design briefs, pair-naming, story cards, and the Cupid gift-quiz + support agent — human designer reviews every output before print.`
- API use: `Design copilot (brief → motif/palette specs, story cards), store copilot (gift quiz, support agent, review summaries).`
- Credits: `Claude Team for studio ops + API credits to launch live AI designer and Cupid agent.`
- Advice to minors: No (general-audience commerce, no accounts for minors). Countries: Indonesia + worldwide shipping (production ID; state honestly).
- Spend: pilih jujur (0% jika pre-launch — tidak masalah).
