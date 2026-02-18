'use client';

import React from 'react';
import Image from 'next/image';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useComponentPalette } from '@/hooks/useComponentPalette';
import { useComponentSettings } from '@/hooks/useComponentSettings';

export default function DemoTeamCard() {
  const { radius, shadow, isDarkMode, headingFont, bodyFont, borderWidth, borderOpacity } = useDesignSystem();
  const scale    = useComponentPalette('card');
  const settings = useComponentSettings('card');

  const background  = settings.background  ?? 'solid';
  const border      = settings.border      ?? 'show';
  const imageShape  = settings.imageShape  ?? 'rounded';
  const layout      = settings.layout      ?? 'horizontal';
  const showActions = settings.showActions !== 'hide';

  const getCardBg = () => {
    if (background === 'tinted') return isDarkMode ? scale['900'] : scale['50'];
    if (background === 'none')   return 'transparent';
    return isDarkMode ? 'rgb(31, 41, 55)' : 'white';
  };

  const borderColorWithOpacity = `${isDarkMode ? scale['700'] : scale['200']}${
    borderOpacity.name === '100' ? '' : borderOpacity.name
  }`;

  const imageRadiusClass =
    imageShape === 'circle' ? 'rounded-full' :
    imageShape === 'square' ? 'rounded-none' :
    radius.name === 'rounded-full' ? 'rounded-lg' : radius.name;

  const isVertical = layout === 'vertical';

  return (
    <div
      className={`overflow-hidden ${radius.name} ${shadow.name} ${border === 'show' ? borderWidth.name : ''}`}
      style={{
        backgroundColor: getCardBg(),
        borderColor: border === 'show' ? borderColorWithOpacity : 'transparent',
      }}
    >
      <div className={`p-4 flex ${isVertical ? 'flex-col items-center text-center gap-3' : 'items-center gap-4'}`}>
        <div className={`relative flex-shrink-0 h-12 w-12 ${imageRadiusClass} overflow-hidden`}>
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
            alt="Team member"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4
            className="text-lg font-semibold"
            style={{ fontFamily: headingFont.family, color: isDarkMode ? 'rgb(243,244,246)' : 'rgb(17,24,39)' }}
          >
            John Doe
          </h4>
          <p
            className="text-sm"
            style={{ fontFamily: bodyFont.family, color: isDarkMode ? 'rgb(156,163,175)' : 'rgb(107,114,128)' }}
          >
            Software Engineer
          </p>
        </div>

        {showActions && (
          <div className={`flex gap-2 flex-shrink-0 ${isVertical ? 'justify-center' : ''}`}>
            <button
              className={`px-3 py-1 text-sm ${radius.name}`}
              style={{
                fontFamily: bodyFont.family,
                backgroundColor: isDarkMode ? scale['900'] : scale['50'],
                color: isDarkMode ? scale['100'] : scale['700'],
              }}
            >
              Message
            </button>
            <button
              className={`px-3 py-1 text-sm ${radius.name}`}
              style={{
                fontFamily: bodyFont.family,
                backgroundColor: isDarkMode ? 'rgb(55,65,81)' : 'rgb(249,250,251)',
                color: isDarkMode ? 'rgb(209,213,219)' : 'rgb(55,65,81)',
              }}
            >
              Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
