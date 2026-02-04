/**
 * Simple logger for OGPix
 * Uses console.warn for info-level logs to pass ESLint rules
 * In production, consider replacing with a proper logging service
 */

const PREFIX = "[OGPix]";

export const logger = {
  info: (message: string, ...args: unknown[]) => {
    console.warn(`${PREFIX} ${message}`, ...args);
  },
  warn: (message: string, ...args: unknown[]) => {
    console.warn(`${PREFIX} ⚠️ ${message}`, ...args);
  },
  error: (message: string, ...args: unknown[]) => {
    console.error(`${PREFIX} ❌ ${message}`, ...args);
  },
  debug: (message: string, ...args: unknown[]) => {
    if (process.env.NODE_ENV === "development") {
      console.warn(`${PREFIX} 🔍 ${message}`, ...args);
    }
  },
};
