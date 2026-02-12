# Marketing Assets

## Product Hunt Launch Assets

### ✅ Ready

| Asset | Location | Notes |
|-------|----------|-------|
| Logo SVG | `apps/ogpix/public/logo.svg` | 240x240, gradient purple |
| Launch copy | `producthunt-launch.md` | Tagline, description, first comment |
| Reddit posts | `reddit-posts.md` | 5 communities ready |
| Twitter threads | `twitter-threads.md` | 3 threads + daily tweets |

### ❌ Needs Creation

| Asset | Specs | Description |
|-------|-------|-------------|
| Logo PNG | 240x240 | Convert from SVG |
| Gallery 1 | 1270x760 | API call + result screenshot |
| Gallery 2 | 1270x760 | Before/after comparison |
| Gallery 3 | 1270x760 | Architecture diagram |
| Gallery 4 | 1270x760 | Dashboard screenshot |
| Video demo | 60-90s | See script below |

---

## Gallery Image Descriptions

### Image 1: "API in Action"
```
Split view:
LEFT: Terminal showing curl command
  curl "https://ogpix.dev/api/og?title=Hello%20World&theme=gradient"
  
RIGHT: Generated OG image result
  Beautiful gradient card with "Hello World"
```

### Image 2: "Before vs After"
```
Side by side:
BEFORE: Frustrated dev, manual image editing, Figma/Photoshop open
  - "2 hours to make one OG image"
  
AFTER: Happy dev, one API call
  - "2 seconds with OGPix"
```

### Image 3: "How It Works"
```
Architecture flow diagram:

[Your App] 
    ↓ API Request
[OGPix API]
    ↓ Template Selection
[Satori Engine]
    ↓ Render
[PNG Image]
    ↓ CDN Cache
[Fast Response]
```

### Image 4: "Dashboard"
```
Screenshot of OGPix dashboard showing:
- API key management
- Usage stats (pie chart)
- Rate limit indicator
- Pro upgrade CTA
```

---

## Video Demo Script (60-90 seconds)

### Scene 1: The Problem (0-15s)
*Show frustrated developer screen*
- Manually creating OG images in Figma
- Copy-pasting into different sizes
- "Every blog post needs this... ugh"

### Scene 2: The Solution (15-35s)
*Terminal view*
- Single API call:
  `curl "https://ogpix.dev/api/og?title=My%20Blog&theme=dark"`
- Image appears instantly
- "That's it. One line of code."

### Scene 3: Features (35-55s)
*Quick montage*
- 21 themes scrolling by
- 22 templates preview
- Dashboard showing usage
- Code snippet in Next.js/React

### Scene 4: CTA (55-75s)
*Landing page view*
- "Start free. 100 images/month."
- "Pro unlimited for $5/month"
- ogpix.dev

### Scene 5: End Card (75-90s)
*OGPix logo*
- "OGPix - OG Images, instantly"
- GitHub stars animation
- API endpoint displayed

---

## OG Image for Product Hunt

Generate using OGPix itself:
```
https://ogpix.vercel.app/api/og?title=OGPix&description=Generate%20beautiful%20OG%20images%20with%20a%20single%20API%20call&theme=gradient&template=product
```

---

## Social Preview Images

### Twitter Card
- Size: 1200x630
- Generate via OGPix API

### LinkedIn Preview
- Size: 1200x627
- Use same as Twitter

### GitHub Social Preview
- Size: 1280x640
- Upload to repo settings

---

*Last updated: 2026-02-12 by Milo 🦊*
