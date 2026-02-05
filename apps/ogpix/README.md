# OGPix

**Instant Open Graph Image API** — Generate beautiful social images with a single URL.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmilo4jo%2Fogpix)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

<p align="center">
  <img src="https://ogpix.vercel.app/api/og?title=OGPix&subtitle=Instant+OG+Image+API&theme=gradient" alt="OGPix Demo" width="600" />
</p>

## ✨ Features

- **20+ Themes** — Dark, light, gradient, pastel, and neon themes
- **20+ Templates** — Blog, GitHub, Product, Quote, Podcast, and more
- **9 Google Fonts** — Inter, Roboto, Poppins, Playfair, and more
- **Full Customization** — Colors, patterns, layouts, borders
- **Instant API** — No signup, no API key required for free tier
- **Edge Rendered** — Fast response times globally

## 🚀 Quick Start

Just add to your HTML:

```html
<meta property="og:image" content="https://ogpix.vercel.app/api/og?title=Your+Title" />
```

Or use in Next.js:

```typescript
export const metadata = {
  openGraph: {
    images: ['https://ogpix.vercel.app/api/og?title=My+Page&theme=dark'],
  },
}
```

## 📖 API Reference

### Base URL
```
https://ogpix.vercel.app/api/og
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `title` | string | **Required.** Main title text |
| `subtitle` | string | Secondary text below title |
| `theme` | string | `dark` `light` `gradient` `blue` `green` `purple` `orange` `pink` `cyan` `slate` `zinc` `sunset` `ocean` `forest` `midnight` `aurora` `ember` `neon` `lavender` `mint` `rose` |
| `template` | string | `blog` `github` `product` `event` `docs` `quote` `podcast` `minimal` `hero` `split` `feature` `release` `announcement` `tutorial` `changelog` `showcase` `news` `testimonial` `pricing` `social` `video` |
| `pattern` | string | `none` `dots` `grid` `diagonal` |
| `fontSize` | string | `auto` `sm` `md` `lg` `xl` |
| `font` | string | `inter` `roboto` `poppins` `montserrat` `opensans` `lato` `playfair` `merriweather` `sourcecode` |
| `layout` | string | `center` `left` |
| `tag` | string | Small label above title |
| `author` | string | Author name at bottom |
| `logo` | url | URL to logo/icon image |
| `bg` | hex | Custom background color |
| `text` | hex | Custom text color |
| `watermark` | boolean | Show/hide watermark (default: true) |
| `borderWidth` | number | Border width in pixels (max: 20) |
| `borderColor` | hex | Border color (e.g., ffffff) |
| `borderRadius` | number | Corner radius in pixels (max: 60) |

### Examples

**Blog Post:**
```
/api/og?title=How+to+Build+APIs&subtitle=A+complete+guide&template=blog&theme=dark
```

**GitHub Project:**
```
/api/og?title=my-awesome-lib&subtitle=Fast+and+lightweight&template=github&theme=gradient
```

**Product Launch:**
```
/api/og?title=Launching+Today&subtitle=The+future+of+X&template=product&theme=sunset
```

## 🎨 Live Builder

Try the interactive builder at [ogpix.vercel.app](https://ogpix.vercel.app) to preview and customize your images.

## 💰 Pricing

| Free | Pro (Coming Soon) |
|------|-------------------|
| ✓ 500 images/month | ✓ Unlimited images |
| ✓ All themes & templates | ✓ No watermark |
| ✓ Full customization | ✓ Custom fonts |
| ✓ API access | ✓ Priority rendering |
| • Includes watermark | ✓ API analytics |
| • Rate limited | $9/mo |

**Rate Limits:**
- Without API key: 20 requests/day per IP
- With free API key: 500 images/month
- Pro: Unlimited

[Join the Pro waitlist →](https://ogpix.vercel.app)

## 🛠️ Self-Hosting

Clone and deploy your own instance:

```bash
git clone https://github.com/milo4jo/ogpix.git
cd ogpix
npm install
npm run dev
```

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmilo4jo%2Fogpix)

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

## 📄 License

MIT © [Milo](https://milo-site-self.vercel.app)

---

<p align="center">
  Built by <a href="https://milo-site-self.vercel.app">Milo</a> 🦊
</p>
