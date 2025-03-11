'use client';

import React from 'react';
import Image from 'next/image';
import { useDesignSystem } from '@/context/DesignSystemContext';

export default function DemoProductCard() {
  const {
    radius,
    shadow,
    isDarkMode,
    headingFont,
    bodyFont,
    primaryColorScale,
    accentColorScale,
  } = useDesignSystem();

  return (
    <div
      className={`overflow-hidden border ${radius.name} ${shadow.name}`}
      style={{
        backgroundColor: isDarkMode ? 'rgb(31, 41, 55)' : 'white',
        borderColor: isDarkMode
          ? primaryColorScale[700]
          : primaryColorScale[200],
      }}
    >
      <div className="relative h-32 w-full">
        <Image
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
          alt="Product"
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium ${radius.name}`}
            style={{
              fontFamily: bodyFont.family,
              backgroundColor: isDarkMode
                ? accentColorScale[900]
                : accentColorScale[100],
              color: isDarkMode ? accentColorScale[100] : accentColorScale[800],
            }}
          >
            New
          </span>
        </div>
      </div>
      <div className="p-4">
        <h4
          className="text-lg font-semibold"
          style={{
            fontFamily: headingFont.family,
            color: isDarkMode ? primaryColorScale[100] : primaryColorScale[900],
          }}
        >
          Wireless Headphones
        </h4>
        <p
          className="text-sm mt-1"
          style={{
            fontFamily: bodyFont.family,
            color: isDarkMode ? primaryColorScale[300] : primaryColorScale[600],
          }}
        >
          Premium sound quality
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span
            className="text-lg font-bold"
            style={{
              fontFamily: headingFont.family,
              color: isDarkMode ? accentColorScale[300] : accentColorScale[700],
            }}
          >
            $299
          </span>
          <button
            className={`px-4 py-2 text-sm transition-colors ${radius.name}`}
            style={{
              fontFamily: bodyFont.family,
              backgroundColor: primaryColorScale[600],
              color: 'white',
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
