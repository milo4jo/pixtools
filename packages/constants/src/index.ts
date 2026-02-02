/**
 * @pixtools/constants - Shared Branding & Limits
 */

// App Registry
export const APPS = {
  ogpix: {
    id: 'ogpix',
    name: 'OGPix',
    description: 'OG Image Generator',
    url: 'https://ogpix.vercel.app',
  },
  favpix: {
    id: 'favpix',
    name: 'FavPix',
    description: 'Favicon Generator',
    url: 'https://favpix.vercel.app',
  },
  qrpix: {
    id: 'qrpix',
    name: 'QRPix',
    description: 'QR Code Generator',
    url: 'https://qrpix.vercel.app',
  },
} as const;

export type AppId = keyof typeof APPS;

// Rate Limits
export const RATE_LIMITS = {
  free: {
    monthlyRequests: 500,
    requestsPerMinute: 10,
  },
  pro: {
    monthlyRequests: 10000,
    requestsPerMinute: 60,
  },
} as const;

export type PlanId = keyof typeof RATE_LIMITS;

// API Key Prefixes
export const API_KEY_PREFIXES = {
  ogpix: 'ogpix_',
  favpix: 'favpix_',
  qrpix: 'qrpix_',
} as const;

// Branding
export const BRANDING = {
  name: 'PixTools',
  tagline: 'Pixel-perfect developer tools',
  github: 'https://github.com/milo4jo/pixtools',
} as const;
