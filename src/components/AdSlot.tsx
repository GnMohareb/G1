import React, { useEffect, useRef } from 'react';
import { ADS_ENABLED, ADSENSE_CLIENT_ID } from '../config/ads';

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

interface AdSlotProps {
  slotId: string;
  className?: string;
  minHeight?: number;
}

/**
 * Production-ready Google AdSense display unit component.
 * Safely handles React strict mode double-invocations, dynamically injects the
 * official AdSense script once into document.head, and gracefully hides itself
 * when ads are disabled or running with placeholder publisher IDs.
 */
export const AdSlot: React.FC<AdSlotProps> = ({
  slotId,
  className = '',
  minHeight = 90,
}) => {
  const adPushedRef = useRef(false);

  // Check if ads are enabled and a real client ID is configured
  const isPlaceholderId = !ADSENSE_CLIENT_ID || ADSENSE_CLIENT_ID.includes('XXXX') || ADSENSE_CLIENT_ID === 'ca-pub-XXXXXXXXXXXXXXXX';
  const shouldRenderAd = ADS_ENABLED && !isPlaceholderId && Boolean(slotId);

  useEffect(() => {
    if (!shouldRenderAd || adPushedRef.current) return;

    // Inject AdSense library script if not already present in <head>
    const scriptId = 'google-adsense-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
      script.async = true;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    // Push ad request with double-push guard for React Strict Mode
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      adPushedRef.current = true;
    } catch (e) {
      // Ignore adsbygoogle errors in development or adblocker environments
      console.warn('AdSense push error:', e);
    }
  }, [shouldRenderAd]);

  // When ads are disabled or IDs are placeholders, render nothing to avoid layout shifts or broken boxes
  if (!shouldRenderAd) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Advertisement"
      className={`w-full my-6 flex flex-col items-center justify-center ${className}`}
      style={{ minHeight: `${minHeight}px` }}
    >
      <span className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 font-mono">
        Advertisement
      </span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight: `${minHeight}px` }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};
