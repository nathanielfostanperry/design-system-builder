'use client';

import React from 'react';
import Image from 'next/image';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useComponentToken } from '@/hooks/useComponentToken';
import { useTypographyToken } from '@/hooks/useTypographyToken';

export default function DemoProductCard() {
  const { radius, shadow } = useDesignSystem();
  const bgSurface = useComponentToken('card', 'bg');
  const borderColor = useComponentToken('card', 'border');
  const textPrimary = useComponentToken('card', 'title');
  const textSecondary = useComponentToken('card', 'body');
  const ctaBg = useComponentToken('card', 'cta-bg');
  const badgeBg = useComponentToken('badge', 'bg');
  const badgeText = useComponentToken('badge', 'text');
  const heading4 = useTypographyToken('heading-4');
  const body = useTypographyToken('body');
  const label = useTypographyToken('label');

  return (
    <div
      className={`overflow-hidden ${radius.name} ${shadow.name} border flex flex-row items-stretch`}
      style={{ backgroundColor: bgSurface, borderColor }}
    >
      <div className="p-3 pr-0">
        <div
          className={`relative overflow-hidden ${radius.name}`}
          style={{ width: '96px', height: '96px', flexShrink: 0 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
            alt="Product"
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2">
            <span
              className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ${radius.name}`}
                style={{
                  fontFamily: label.fontFamily,
                  backgroundColor: badgeBg,
                  color: badgeText,
                }}
            >
              New
            </span>
          </div>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h4
            className="font-semibold text-sm"
            style={{ fontFamily: heading4.fontFamily, color: textPrimary }}
          >
            Wireless Headphones
          </h4>
          <p
            className="text-sm"
            style={{ fontFamily: body.fontFamily, color: textSecondary }}
          >
            Premium sound quality
          </p>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-base" style={{ color: textPrimary }}>
            $299
          </span>
          <button
            className={`text-sm text-white hover:opacity-90 transition-opacity ${radius.name} px-3 py-1`}
            style={{
              backgroundColor: ctaBg,
              fontFamily: label.fontFamily,
              fontSize: label.fontSize,
            }}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
