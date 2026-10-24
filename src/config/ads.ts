/**
 * Google AdSense Configuration
 * 
 * Instructions to enable real ads:
 * 1. Replace ADSENSE_CLIENT_ID with your real AdSense publisher ID (e.g. "ca-pub-1234567890123456").
 * 2. Replace the AD_SLOTS values with your actual AdSense ad unit slot IDs.
 * 3. Set ADS_ENABLED to true.
 * 4. Ensure ads.txt at domain root (/ads.txt) contains your publisher record.
 * 5. Verify the domain is approved in your Google AdSense console.
 */

// Publisher ID supplied by the site owner; confirm it matches AdSense before enabling monetized ad slots.
export const ADSENSE_CLIENT_ID = 'ca-pub-6899118382012296';

export const AD_SLOTS = {
  homeBanner: '1234567890',
  studyGuideInline: '2345678901',
  resultsFooter: '3456789012',
  catalogFooter: '4567890123',
} as const;

// Ads remain disabled until AdSense approval and actual ad unit IDs are configured.
export const ADS_ENABLED = false;
