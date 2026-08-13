// Configuration File
// Pre-Registration Form Backend Configuration

export const CONFIG = {
  // Google Apps Script Web App URL - Pre-Registration
  GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbylVvRYHPKB4MYaiDivZGCGjn9xNFzAU0tiVTPwxbmACrB5xFEOdtXZkJVhT_JYd-3F/exec',
  
  // Google Apps Script Web App URL - Mentor Application
  MENTOR_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbybGItjdJHDH4i_Akadg5YI0gsBiBYM8xq7dp2hien7ZsY2zX3lkEcKcawjZzSC0PTG/exec',
  
  // Google Apps Script Web App URL - Judge Application
  JUDGE_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbwImmF3vck3ebDgTzT-_cQHVHD7LL93h9PwmECr6wCGXU_GmY4CnZi-9bWvCRJDUopn/exec',
  
  // Cloudflare Turnstile Site Key (PUBLIC - safe to commit)
  CLOUDFLARE_SITE_KEY: '0x4AAAAAACTJreI0s-gpiMF2',
  
  // Event Configuration - Hackathon Start Date
  // Starts: April 17, 2026 at 12:00 PM
  // Ends: April 18, 2026 at 1:30 PM (24+ hour hackathon)
  EVENT_DATE: '2026-04-17T12:00:00',
  
  // Environment
  ENVIRONMENT: 'production' as const,
  
  // Enable CAPTCHA Bypass for localhost (disabled for production)
  ENABLE_DEV_BYPASS: false
};
