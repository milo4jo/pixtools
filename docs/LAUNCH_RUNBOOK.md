# 🚀 PixTools Launch Runbook

> Everything Jo needs to do to get OGPix + ContextKit fully live.
> Estimated time: ~2 hours total

---

## 📋 Quick Status

| Product | Code | Deployed | Monetization | Domain |
|---------|------|----------|--------------|--------|
| OGPix | ✅ Complete | ✅ Vercel | ⏳ Needs Lemon Squeezy | ⏳ ogpix.dev |
| ContextKit CLI | ✅ v0.6.10 | ✅ npm | Free (open source) | N/A |
| ContextKit Cloud | ✅ Complete | ✅ CF Workers | ⏳ Needs Stripe | ⏳ app.contextkit.dev |
| ContextKit VS Code | ✅ Complete | ⏳ Needs publish | Free | N/A |

---

## 🔑 Priority 1: OGPix Monetization (30 min)

### Step 1: Create Lemon Squeezy Account
1. Go to https://lemonsqueezy.com
2. Sign up (use milo4jo@outlook.de or your own)
3. Complete onboarding

### Step 2: Create Product
1. Products → New Product
2. **Name:** "OGPix Pro"
3. **Price:** $5/month (subscription)
4. **Description:** "Unlimited OG images, no watermark, priority support"

### Step 3: Get Credentials
1. Settings → API → Create API key
2. Settings → Webhooks → Create webhook:
   - **URL:** `https://ogpix.vercel.app/api/webhooks/lemonsqueezy`
   - **Events:** subscription_created, subscription_updated, subscription_cancelled
3. Copy the webhook secret

### Step 4: Configure Vercel
1. Go to https://vercel.com/milo4jo/ogpix/settings/environment-variables
2. Add these variables:
   ```
   LEMONSQUEEZY_API_KEY=your_api_key
   LEMONSQUEEZY_WEBHOOK_SECRET=your_webhook_secret
   LEMONSQUEEZY_STORE_ID=your_store_id
   LEMONSQUEEZY_PRODUCT_ID=your_product_id
   LEMONSQUEEZY_VARIANT_ID=your_variant_id
   ```
3. Redeploy

### Step 5: Test
1. Use test mode in Lemon Squeezy
2. Complete a test checkout
3. Verify webhook fires and user upgrades to Pro

---

## 🌐 Priority 2: Domains (15 min)

### OGPix Domain
**Option A: Use ogpix.dev (if you own it)**
1. Vercel → ogpix → Settings → Domains
2. Add `ogpix.dev`
3. Update DNS:
   - A record: `76.76.21.21`
   - or CNAME: `cname.vercel-dns.com`

**Option B: Use subdomain of jomaendle.com**
1. Add `ogpix.jomaendle.com` to Vercel
2. Add CNAME in your DNS

### ContextKit Dashboard Domain
1. Vercel → contextkit-dashboard → Settings → Domains
2. Add `app.contextkit.dev` (or similar)
3. Update Clerk allowed origins

---

## 💳 Priority 3: ContextKit Cloud Monetization (30 min)

### Step 1: Stripe Account
1. Go to https://stripe.com
2. Sign up / use existing account
3. Get API keys (Settings → API keys)

### Step 2: Create Products
Create these products in Stripe Dashboard:
1. **ContextKit Hobby** — $5/month
   - 10,000 chunks/month
   - 5 projects
2. **ContextKit Pro** — $20/month  
   - Unlimited chunks
   - Unlimited projects
   - Priority support

### Step 3: Configure API
1. Go to Cloudflare Dashboard → Workers → contextkit-api → Settings → Variables
2. Add:
   ```
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

### Step 4: Add Webhook
1. Stripe → Developers → Webhooks → Add endpoint
2. URL: `https://contextkit-api.milo4jo.workers.dev/stripe/webhook`
3. Events: customer.subscription.*, checkout.session.completed

---

## 🔌 Priority 4: VS Code Extension (20 min)

### Step 1: Create Azure DevOps Publisher
1. Go to https://marketplace.visualstudio.com/manage
2. Create publisher: `milo4jo` (or your choice)
3. Note the publisher ID

### Step 2: Create PAT
1. Azure DevOps → User settings → Personal access tokens
2. Create new token:
   - **Scopes:** Marketplace (Manage)
   - **Organization:** All accessible organizations

### Step 3: Publish
```bash
cd /path/to/contextkit-vscode
npx vsce login milo4jo  # use your publisher ID
npx vsce publish
```

### Step 4: Verify
1. Go to VS Code Marketplace
2. Search for "ContextKit"
3. Install and test

---

## 📢 Priority 5: Marketing Execution (ongoing)

All content is ready in `/pixtools/marketing/`:

### Week 1 Schedule
| Day | Platform | Content |
|-----|----------|---------|
| Mon | Twitter | Thread 1 + Daily tweet |
| Tue | Reddit r/programming | Post 1 |
| Wed | Twitter | Daily tweet |
| Thu | Hacker News | Show HN post |
| Fri | Twitter | Thread 2 + Daily tweet |

### Content Files
- `reddit-posts.md` — 5 Reddit posts ready
- `twitter-content.md` — 3 threads + 5 daily tweets
- `hackernews-post.md` — Show HN draft
- `posting-schedule.md` — Full 2-week schedule

---

## ✅ Launch Checklist

### Before Launch
- [ ] Lemon Squeezy configured
- [ ] Stripe configured
- [ ] Domains pointing correctly
- [ ] VS Code extension published
- [ ] All env vars set
- [ ] Test payment flows work

### Launch Day
- [ ] Post first Twitter thread
- [ ] Post to r/programming
- [ ] Post Show HN
- [ ] Monitor for issues
- [ ] Respond to comments

### After Launch
- [ ] Check analytics daily
- [ ] Respond to all feedback
- [ ] Fix any reported bugs immediately
- [ ] Track weekly metrics

---

## 🆘 If Something Breaks

### Common Issues

**"Webhook not firing"**
- Check Lemon Squeezy/Stripe webhook logs
- Verify URL is correct
- Check env vars are set

**"Payment not upgrading user"**
- Check user_id is passed correctly in checkout
- Verify webhook handler logs in Vercel

**"VS Code extension won't publish"**
- Ensure PAT has correct scopes
- Check publisher ID matches

### Quick Fixes
```bash
# Redeploy OGPix
cd pixtools/apps/ogpix && vercel --prod

# Check ContextKit API logs
wrangler tail contextkit-api

# View Vercel logs
vercel logs ogpix --since 1h
```

---

## 📞 Contact

If blocked, message Milo via WhatsApp or leave a note in `HEARTBEAT.md`.

---

*Created: 2026-02-14 by Milo 🦊*
*This runbook covers everything needed to go from "code complete" to "fully live".*
