# FavPix Brand Guide 🎯

## Brand Essence

**FavPix** is a favicon generator that's small but mighty. While favicons are tiny (16-32px), they carry your entire brand identity. FavPix embraces this paradox: **maximum impact in minimum space**.

---

## Brand Personality

### Tone of Voice: **Precise & Playful**
- Technical accuracy, but not dry
- Brief, punchy copy (favicons are small, so is our prose)
- Subtle wit, never forced
- Confident but not arrogant

### Character Traits
- **Compact** — We don't waste pixels or words
- **Crisp** — Sharp, clean, no blur
- **Crafted** — Every detail matters at 16px

---

## Visual Identity

### Logo Mark
A stylized pixel grid forming an "F" — represents the intersection of typography and pixels.

```
┌───┬───┬───┐
│ █ │ █ │ █ │
├───┼───┼───┤
│ █ │ █ │   │
├───┼───┼───┤
│ █ │   │   │
└───┴───┴───┘
```

SVG Logo (inline):
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <rect x="2" y="2" width="6" height="6" rx="1" fill="currentColor"/>
  <rect x="9" y="2" width="6" height="6" rx="1" fill="currentColor"/>
  <rect x="16" y="2" width="6" height="6" rx="1" fill="currentColor" opacity="0.4"/>
  <rect x="2" y="9" width="6" height="6" rx="1" fill="currentColor"/>
  <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.4"/>
  <rect x="16" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.15"/>
  <rect x="2" y="16" width="6" height="6" rx="1" fill="currentColor"/>
  <rect x="9" y="16" width="6" height="6" rx="1" fill="currentColor" opacity="0.15"/>
  <rect x="16" y="16" width="6" height="6" rx="1" fill="currentColor" opacity="0.15"/>
</svg>
```

### Primary Color: **Cyan/Teal**
Distinguishes FavPix from OGPix (purple). Feels digital, precise, modern.

| Name | Hex | Usage |
|------|-----|-------|
| **Pixel Cyan** | `#06b6d4` | Primary accent, CTAs, highlights |
| **Pixel Cyan Dim** | `#0891b2` | Hover states |
| **Pixel Cyan Glow** | `rgba(6, 182, 212, 0.2)` | Glows, shadows |

### Secondary Palette
| Name | Hex | Usage |
|------|-----|-------|
| Void | `#000000` | Background |
| Carbon | `#0a0a0a` | Card backgrounds |
| Graphite | `#171717` | Elevated surfaces |
| Smoke | `#525252` | Secondary text |
| Cloud | `#f5f5f5` | Primary text |

### Color Presets (Creative Names)
Replace boring color names with evocative ones:

| Creative Name | Hex BG | Hex Text | Vibe |
|--------------|--------|----------|------|
| **Midnight** | `#000000` | `#ffffff` | Classic dark |
| **Arctic** | `#ffffff` | `#000000` | Clean light |
| **Ultraviolet** | `#7c3aed` | `#ffffff` | Bold purple |
| **Ocean** | `#0ea5e9` | `#ffffff` | Fresh blue |
| **Forest** | `#16a34a` | `#ffffff` | Natural green |
| **Ember** | `#dc2626` | `#ffffff` | Hot red |
| **Sunset** | `#ea580c` | `#ffffff` | Warm orange |
| **Lemon** | `#facc15` | `#000000` | Bright yellow |
| **Sakura** | `#ec4899` | `#ffffff` | Soft pink |
| **Lagoon** | `#14b8a6` | `#ffffff` | Cool teal |

---

## Typography

### Hierarchy
- **Hero Headlines:** Bold, tight tracking (-0.02em)
- **Section Headers:** Semibold
- **Body:** Regular, generous line-height
- **Code/URLs:** Monospace (system)

### Font Stack
```css
font-family: system-ui, -apple-system, sans-serif;
font-family: ui-monospace, monospace; /* for code */
```

---

## UI Components

### Shape Icons (SVG, not Unicode)

**Square:**
```svg
<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
  <rect x="2" y="2" width="16" height="16" rx="1"/>
</svg>
```

**Rounded:**
```svg
<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
  <rect x="2" y="2" width="16" height="16" rx="4"/>
</svg>
```

**Circle:**
```svg
<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
  <circle cx="10" cy="10" r="8"/>
</svg>
```

### Buttons
- **Primary:** Cyan background, dark text, bold
- **Secondary:** Border only, hover fills
- **Ghost:** No border, subtle hover background

### Cards
- Border: `border-neutral-800`
- Background: Semi-transparent (`bg-neutral-900/50`)
- Hover: Slight border lighten + subtle glow

---

## Copy Guidelines

### Hero Text Options
❌ "Favicons. One API." (generic, OGPix clone)

✅ Options:
- **"16 pixels of pure intent."**
- **"Your brand, pixel-perfect."**
- **"Tiny icon. Big impression."**
- **"Favicons that actually look good."**

### CTA Labels
❌ "Download All Sizes"
✅ "Download Favicon Pack"

❌ "Copy"
✅ "Copy URL" or just the checkmark on success

### Feature Descriptions
Be specific, not generic:
- ❌ "All sizes, instant"
- ✅ "16px to 512px, one request"

---

## Differentiation from OGPix

| Aspect | OGPix | FavPix |
|--------|-------|--------|
| **Accent** | Purple (#7c3aed) | Cyan (#06b6d4) |
| **Tone** | Versatile, powerful | Precise, compact |
| **Hero** | "OG Images" | "Pixel-perfect favicons" |
| **Logo** | 🖼️ Image frame | Pixel grid F |

---

## Motion & Interaction

### Principles
- Quick transitions (150-200ms)
- Ease-out for entrances
- Subtle scale on hover (1.02-1.05)
- No bounce or playful animations (we're precise, not cute)

### Specific Animations
- **Preview update:** Subtle fade (no bounce)
- **Copy success:** Checkmark appears, text changes
- **Color swatch hover:** Slight scale + ring

---

## File Naming Convention
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png`
- `android-chrome-192x192.png`
- `android-chrome-512x512.png`

---

## Summary

FavPix is **small, sharp, and intentional**. Every design decision should feel:
1. **Compact** — No wasted space
2. **Crisp** — Clean edges, clear contrast
3. **Crafted** — Details matter, even at 16px

We're not OGPix's little sibling. We're a precision tool for a specific job: making your favicon look damn good.
