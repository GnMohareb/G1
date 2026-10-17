import React from 'react';

interface AdPlacementSlotProps {
  placement?: 'bottom-banner' | 'study-guide-footer' | 'progress-sidebar';
  className?: string;
}

/**
 * Reserved structural container for future monetization / advertisement placement.
 * Per specification: No fake ads, no fake revenue, no obscuring of test questions or navigation.
 */
export const AdPlacementSlot: React.FC<AdPlacementSlotProps> = ({
  placement = 'bottom-banner',
  className = '',
}) => {
  return (
    <div
      role="region"
      aria-label="Sponsorship / Partner Notice"
      className={`w-full rounded-lg border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-3 text-center my-6 ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-4xl mx-auto text-xs text-slate-700 dark:text-slate-300">
        <span className="font-medium tracking-wide">
          Educational Partner Placement Reserved
        </span>
        <span>
          Non-intrusive space reserved for verified Ontario driving school partners
        </span>
      </div>
    </div>
  );
};
