'use client';

import React from 'react';
import Image from 'next/image';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useComponentPalette } from '@/hooks/useComponentPalette';

export default function DemoProductCard() {
  const { radius, shadow, isDarkMode, headingFont, bodyFont, borderWidth, borderOpacity } = useDesignSystem();
  const cardScale  = useComponentPalette('card');
  const badgeScale = useComponentPalette('badge');

  const borderColorWithOpacity = `${isDarkMode ? cardScale['700'] : cardScale['200']}${
    borderOpacity.name === '100' ? '' : borderOpacity.name
  }`;

  return (
    <div
      className={`overflow-hidden ${radius.name} ${shadow.name} ${borderWidth.name}`}
      style={{
        backgroundColor: isDarkMode ? 'rgb(31, 41, 55)' : 'white',
        borderColor: borderColorWithOpacity,
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
              backgroundColor: isDarkMode ? badgeScale['900'] : badgeScale['100'],
              color: isDarkMode ? badgeScale['100'] : badgeScale['800'],
            }}
          >
            New
          </span>
        </div>
      </div>
      <div className="p-4">
        <h4
          className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}
          style={{ fontFamily: headingFont.family }}
        >
          Wireless Headphones
        </h4>
        <p
          className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
          style={{ fontFamily: bodyFont.family }}
        >
          Premium sound quality
        </p>
        <div className="mt-4 flex justify-between items-center">
          <span className={`text-lg font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            $299
          </span>
          <button
            className={`px-4 py-2 text-sm text-white hover:opacity-90 transition-opacity ${radius.name}`}
            style={{ backgroundColor: cardScale['600'] }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
