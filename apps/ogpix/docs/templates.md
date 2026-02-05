# OGPix Templates

Pre-configured templates for common use cases. Each template sets optimal defaults for `tag`, `layout`, and `pattern`.

## Usage

```
/api/og?template=quote&title=Your%20Text
```

Templates can be combined with other parameters — your custom values override template defaults.

---

## Available Templates

### Content Templates

| Template | Tag | Layout | Pattern | Best For |
|----------|-----|--------|---------|----------|
| `blog` | Blog Post | left | dots | Blog articles |
| `docs` | Documentation | left | grid | Technical docs |
| `tutorial` | Tutorial | left | dots | How-to guides |
| `changelog` | Changelog | card | grid | Release notes |
| `news` | News | card | none | News articles |

### Product & Marketing

| Template | Tag | Layout | Pattern | Best For |
|----------|-----|--------|---------|----------|
| `product` | Product | center | none | Product launches |
| `announcement` | Announcement | hero | none | Big announcements |
| `showcase` | Showcase | featured | diagonal | Project showcases |
| `feature` | New (badge) | featured | none | Feature highlights |
| `release` | Release (badge) | card | grid | Version releases |
| `pricing` | Pricing | center | none | Pricing pages |

### Social & Quotes

| Template | Tag | Layout | Pattern | Best For |
|----------|-----|--------|---------|----------|
| `quote` | Quote | center | dots | Inspirational quotes |
| `testimonial` | Testimonial | center | none | Customer reviews |
| `social` | — | center | none | Social media posts |
| `podcast` | Podcast | left | diagonal | Podcast episodes |
| `video` | Video | center | none | Video thumbnails |

### Data & Metrics

| Template | Tag | Layout | Pattern | Best For |
|----------|-----|--------|---------|----------|
| `stats` | Stats | center | grid | KPIs, metrics |
| `comparison` | Compare | split | none | Before/after, A vs B |

### Developer & Open Source

| Template | Tag | Layout | Pattern | Best For |
|----------|-----|--------|---------|----------|
| `github` | Open Source | center | grid | GitHub repos |
| `event` | Event | center | diagonal | Conferences, meetups |
| `vercel` | — | modern | none | Modern tech style |
| `minimal` | — | minimal | none | Clean, simple |
| `split` | — | split | none | Accent line style |
| `hero` | — | hero | none | Large icon/emoji focus |

---

## Template Examples

### Quote Template

Perfect for sharing quotes with attribution.

```
/api/og?template=quote&title=The%20best%20way%20to%20predict%20the%20future%20is%20to%20invent%20it.&author=Alan%20Kay&theme=midnight
```

**Recommended parameters:**
- `title` — The quote text
- `author` — Attribution
- `theme` — `midnight`, `slate`, or `dark` work well

### Stats Template

Great for showcasing metrics and KPIs.

```
/api/og?template=stats&title=10M%2B%20Downloads&subtitle=Trusted%20by%20developers%20worldwide&theme=gradient
```

**Recommended parameters:**
- `title` — The main metric (e.g., "10M+", "99.9%", "500K")
- `subtitle` — Context or description
- `fontSize=xl` — Makes numbers stand out
- `theme` — `gradient`, `blue`, or `aurora`

### Comparison Template

Ideal for before/after or versus comparisons.

```
/api/og?template=comparison&title=Before%20vs%20After&subtitle=See%20the%20difference&theme=slate
```

**Recommended parameters:**
- `title` — Comparison headline
- `subtitle` — Details
- Uses split layout with accent line

---

## Customizing Templates

Templates provide sensible defaults, but you can override any parameter:

```
# Start with blog template but use grid pattern instead of dots
/api/og?template=blog&title=My%20Post&pattern=grid

# Use stats template with custom theme
/api/og?template=stats&title=99.9%&theme=aurora&fontSize=xl
```

Priority: Your parameters > Template defaults > Global defaults
