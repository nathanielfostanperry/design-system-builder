'use client';

import React from 'react';
import Image from 'next/image';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useComponentPalette } from '@/hooks/useComponentPalette';
import { useComponentSettings } from '@/hooks/useComponentSettings';

export default function DemoProductCard() {
  const { radius, shadow, isDarkMode, headingFont, bodyFont, borderWidth, borderOpacity } = useDesignSystem();
  const cardScale  = useComponentPalette('card');
  const badgeScale = useComponentPalette('badge');
  const settings   = useComponentSettings('card');

  const background  = settings.background  ?? 'solid';
  const border      = settings.border      ?? 'show';
  const imageShape  = settings.imageShape  ?? 'rounded';
  const layout      = settings.layout      ?? 'horizontal';
  const showActions = settings.showActions !== 'hide';

  const getCardBg = () => {
    if (background === 'tinted') return isDarkMode ? cardScale['900'] : cardScale['50'];
    if (background === 'none')   return 'transparent';
    return isDarkMode ? 'rgb(31, 41, 55)' : 'white';
  };

  const borderColorWithOpacity = `${isDarkMode ? cardScale['700'] : cardScale['200']}${
    borderOpacity.name === '100' ? '' : borderOpacity.name
  }`;

  // imageShape: rounded = contained with radius, circle = contained circular, square = full-bleed
  const isContained  = imageShape !== 'square';
  const imageRadius  = imageShape === 'circle' ? 'rounded-full' : radius.name;
  const isHorizontal = layout === 'horizontal';

  const imageBlock = (
    <div className={isContained ? (isHorizontal ? 'p-3 pr-0' : 'p-3 pb-0') : ''}>
      <div
        className={`relative overflow-hidden ${isContained ? imageRadius : ''}`}
        style={isHorizontal
          ? { width: '96px', height: '96px', flexShrink: 0 }
          : { height: '128px', width: '100%' }
        }
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
              fontFamily: bodyFont.family,
              backgroundColor: isDarkMode ? badgeScale['900'] : badgeScale['100'],
              color: isDarkMode ? badgeScale['100'] : badgeScale['800'],
            }}
          >
            New
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`overflow-hidden ${radius.name} ${shadow.name} ${border === 'show' ? borderWidth.name : ''} ${isHorizontal ? 'flex flex-row items-stretch' : ''}`}
      style={{
        backgroundColor: getCardBg(),
        borderColor: border === 'show' ? borderColorWithOpacity : 'transparent',
      }}
    >
      {imageBlock}

      <div className={`p-4 ${isHorizontal ? 'flex-1 flex flex-col justify-between' : ''}`}>
        <div>
          <h4
            className={`font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} ${isHorizontal ? 'text-sm' : 'text-lg'}`}
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
        </div>

        <div className={`flex justify-between items-center ${isHorizontal ? 'mt-2' : 'mt-4'}`}>
          <span className={`font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'} ${isHorizontal ? 'text-base' : 'text-lg'}`}>
            $299
          </span>
          {showActions && (
            <button
              className={`text-sm text-white hover:opacity-90 transition-opacity ${radius.name} ${isHorizontal ? 'px-3 py-1' : 'px-4 py-2'}`}
              style={{ backgroundColor: cardScale['600'] }}
            >
              {isHorizontal ? 'Buy' : 'Add to Cart'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
