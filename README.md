# TRAWL — Deployment & Monetization Guide

## 🚀 Deploy Tonight (5 minutes)

### Option 1: Vercel (Recommended)
```bash
# 1. Push to GitHub
cd trawl-site
git init && git add -A && git commit -m "TRAWL v1"
gh repo create playtrawl --public --push

# 2. Deploy to Vercel
npx vercel --prod

# 3. Add environment variable for AI puzzles
vercel env add OPENAI_API_KEY
# Paste your API key

# 4. Connect domain
vercel domains add playtrawl.com
```

### Option 2: Netlify
```bash
# Drag the trawl-site folder to netlify.com/drop
# Then add custom domain in settings
```

### Option 3: Cloudflare Pages
```bash
# Connect GitHub repo at pages.cloudflare.com
# For the API route, use Cloudflare Workers
```

---

## 💰 Monetization Strategy

### Revenue Model: Hybrid (Ads + Optional Premium)

Word games generate ~$3.36B annually. 86% from ads, 12% from IAP.
Target ARPDAU for puzzle games: $0.08

### Phase 1: Launch (Week 1-2) — Ads Only

**Google AdSense Setup:**
1. Apply at adsense.google.com (needs live site with content)
2. Add your `ca-pub-XXXX` ID to the `<script>` tag in index.html
3. Uncomment the ad slot in the results section

**Ad Placements (3 slots, non-intrusive):**
- After game completion (highest engagement moment)
- Stats modal footer
- Between-round interstitial (add later)

**Expected Revenue:**
- 100 DAU × $0.08 ARPDAU = $8/day
- 1,000 DAU × $0.08 = $80/day
- 10,000 DAU × $0.08 = $800/day

### Phase 2: Growth (Week 3-8) — Add Premium

**TRAWL+ Subscription ($2.99/month or $24.99/year):**
- Unlimited practice rounds (beyond daily 3)
- Historical puzzles archive
- Detailed stats & graphs
- Ad-free experience
- Early access to new features

**Implementation:**
- Stripe Checkout for payments
- Store subscription status in localStorage + server validation
- Gate practice mode behind subscription check

**Conversion Target:** 2-5% of DAU
- 1,000 DAU × 3% × $2.99 = $90/month recurring
- 10,000 DAU × 3% × $2.99 = $897/month recurring

### Phase 3: Scale (Month 2+) — Engagement Features

**Add to increase retention:**
- Leaderboards (friends, global)
- Weekly tournaments
- Streak rewards (cosmetic themes)
- Social challenges ("Beat my score" links)

---

## 📈 Growth Strategy

### Viral Mechanics (Built In)
- Share results copies to clipboard with emoji grid
- "playtrawl.com" in every share
- Score comparison drives competition

### Launch Channels
1. **Reddit** — r/wordgames, r/puzzles, r/webgames, r/IndieGaming
2. **Twitter/X** — Post share results, tag puzzle game accounts
3. **Product Hunt** — Schedule launch, get 5 makers to upvote
4. **Hacker News** — "Show HN: TRAWL — word maze with fog of war"
5. **TikTok** — Screen record gameplay, "Can you beat par?"
6. **Discord** — Word game servers, puzzle communities

### SEO
- Blog at playtrawl.com/blog with daily puzzle hints
- "Daily word game" "word puzzle" "word maze" keywords
- Structured data markup for game schema

---

## 🔧 Technical Notes

### File Structure
```
trawl-site/
├── index.html          # Full game (single file, ~600 lines)
├── api/
│   └── generate.js     # Vercel serverless — AI puzzle generation
├── vercel.json         # Deployment config
├── manifest.json       # PWA manifest
├── og.png              # Open Graph image (1200×630)
├── icon-192.png        # App icon
└── icon-512.png        # App icon large
```

### Environment Variables
- `OPENAI_API_KEY` — Required for AI puzzle generation
- Without it, game uses curated fallback puzzles (still works perfectly)

### Storage
- Uses `localStorage` for game state + stats
- No server-side storage needed for core game
- Data persists across sessions

### AI Puzzle Generation
- Calls Claude Sonnet via `/api/generate` serverless function
- Client-side BFS validates AI output (rejects bad pars)
- Falls back to 9 curated puzzles if API fails
- Each tier has 3 puzzles, rotated by day number

### Domain Setup
1. Buy `playtrawl.com` at Namecheap/Cloudflare (~$12/year)
2. Point nameservers to Vercel
3. SSL auto-provisioned

---

## 📊 Key Metrics to Track

Add analytics (Plausible.io recommended — privacy-friendly, $9/month):
- DAU / MAU
- Completion rate (% who finish all 3 rounds)
- Average score vs par
- Share rate (% who copy results)
- Return rate (% who come back next day)
- Avg session duration
- Ad impressions / clicks (via AdSense dashboard)

---

## 🏁 Tonight's Checklist

- [ ] Buy domain (playtrawl.com)
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Add OPENAI_API_KEY env var
- [ ] Connect domain
- [ ] Apply for Google AdSense
- [ ] Post to Reddit (r/wordgames, r/webgames)
- [ ] Post to Twitter with gameplay screenshot
- [ ] Submit to Product Hunt (schedule for morning)
