# OGPix Product Hunt Gallery Images

Generated using OGPix itself! 🦊

---

## Gallery Image URLs

### 1. Hero Shot - "Beautiful OG Images"
```
https://ogpix.vercel.app/api/og?template=product&title=OGPix&description=Beautiful%20OG%20images%20in%20one%20API%20call&theme=gradient
```

### 2. Template Showcase - Blog
```
https://ogpix.vercel.app/api/og?template=blog&title=How%20to%20Build%20a%20SaaS&description=A%20complete%20guide%20to%20launching%20your%20first%20product&author=Milo&theme=dark
```

### 3. Template Showcase - GitHub
```
https://ogpix.vercel.app/api/og?template=github&title=ogpix&description=Generate%20beautiful%20OG%20images%20via%20API&theme=dark&stars=127&forks=23
```

### 4. Template Showcase - Event
```
https://ogpix.vercel.app/api/og?template=event&title=Product%20Hunt%20Launch&description=Join%20us%20for%20the%20OGPix%20launch!&date=March%2025,%202026&theme=neon
```

### 5. Template Showcase - Podcast
```
https://ogpix.vercel.app/api/og?template=podcast&title=Building%20in%20Public&description=Episode%2042:%20Micro-SaaS%20Journey&theme=vibrant
```

### 6. Template Showcase - Minimal
```
https://ogpix.vercel.app/api/og?template=minimal&title=Simple.%20Fast.%20Beautiful.&theme=light
```

---

## Theme Comparison (Same Text, Different Themes)

All using: `title=Your%20Title%20Here&template=blog&description=Same%20content,%20different%20vibes`

| Theme | URL |
|-------|-----|
| Dark | `?theme=dark` |
| Light | `?theme=light` |
| Gradient | `?theme=gradient` |
| Neon | `?theme=neon` |
| Ocean | `?theme=ocean` |
| Sunset | `?theme=sunset` |

---

## Composite Image Creation

For Product Hunt, create composites using a design tool:

### Grid Layout (Templates)
Arrange 6 template screenshots in 2x3 grid:
1. Blog
2. GitHub  
3. Product
4. Event
5. Podcast
6. Minimal

### Strip Layout (Themes)
Arrange 6 theme variations horizontally:
dark | light | gradient | neon | ocean | sunset

---

## Before/After Comparison

**Before (generic):**
- Screenshot of Twitter card with no OG image
- Shows default link preview with just URL

**After (OGPix):**
- Screenshot of Twitter card WITH OGPix OG image
- Shows beautiful, branded preview

---

## Download Script

```bash
#!/bin/bash
# Download all gallery images

BASE="https://ogpix.vercel.app/api/og"

# Hero
curl -o "hero.png" "$BASE?template=product&title=OGPix&description=Beautiful%20OG%20images%20in%20one%20API%20call&theme=gradient"

# Templates
curl -o "template-blog.png" "$BASE?template=blog&title=How%20to%20Build%20a%20SaaS&description=A%20complete%20guide&author=Milo&theme=dark"
curl -o "template-github.png" "$BASE?template=github&title=ogpix&description=OG%20images%20via%20API&theme=dark&stars=127"
curl -o "template-event.png" "$BASE?template=event&title=Product%20Hunt%20Launch&date=March%2025&theme=neon"
curl -o "template-podcast.png" "$BASE?template=podcast&title=Building%20in%20Public&description=Episode%2042&theme=vibrant"
curl -o "template-minimal.png" "$BASE?template=minimal&title=Simple.%20Fast.%20Beautiful.&theme=light"

# Themes
for theme in dark light gradient neon ocean sunset; do
  curl -o "theme-$theme.png" "$BASE?template=blog&title=Same%20Title&description=Different%20themes&theme=$theme"
done

echo "Done! Check current directory for images."
```

---

*Generated: 2026-02-13 by Milo 🦊*
