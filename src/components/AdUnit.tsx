'use client';

import { useEffect, useRef } from 'react';

const ADSENSE_ENABLED = true;
const ADSENSE_CLIENT = 'ca-pub-2057309335537732';

interface AdUnitProps {
  slot?: string;
  format?: 'horizontal' | 'rectangle' | 'vertical';
  className?: string;
}

export default function AdUnit({ slot = '', format = 'horizontal', className = '' }: AdUnitProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (ADSENSE_ENABLED && !pushed.current && typeof window !== 'undefined') {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        pushed.current = true;
      } catch {
        // AdSense not loaded yet
      }
    }
  }, []);

  if (!ADSENSE_ENABLED) {
    const sizeClasses = {
      horizontal: 'h-24',
      rectangle: 'h-64',
      vertical: 'h-[600px] w-[160px]',
    };
    return (
      <div
        className={`flex items-center justify-center rounded-lg border border-dashed border-card-border bg-card-bg/50 text-xs text-text/20 ${sizeClasses[format]} ${className}`}
      >
        Ad Space
      </div>
    );
  }

  const formatStyles: Record<string, { style: React.CSSProperties; adFormat: string }> = {
    horizontal: { style: { display: 'block', minHeight: '90px' }, adFormat: 'horizontal' },
    rectangle: { style: { display: 'inline-block', width: '300px', height: '250px' }, adFormat: 'rectangle' },
    vertical: { style: { display: 'inline-block', width: '160px', height: '600px' }, adFormat: 'vertical' },
  };

  const config = formatStyles[format] || formatStyles.horizontal;

  return (
    <div ref={adRef} className={`ad-unit ${className}`}>
      <ins
        className="adsbygoogle"
        style={config.style}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot || undefined}
        data-ad-format={slot ? undefined : 'auto'}
        data-full-width-responsive={slot ? undefined : 'true'}
      />
    </div>
  );
}
