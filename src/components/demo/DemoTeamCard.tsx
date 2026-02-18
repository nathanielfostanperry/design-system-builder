'use client';

import React from 'react';
import Image from 'next/image';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useComponentPalette } from '@/hooks/useComponentPalette';
import { useComponentSettings } from '@/hooks/useComponentSettings';

export default function DemoTeamCard() {
  const { radius, shadow, isDarkMode, headingFont, bodyFont, borderWidth, borderOpacity } = useDesignSystem();
  const scale = useComponentPalette('card');
  const settings = useComponentSettings('card');

  const layout      = settings.layout      ?? 'horizontal';
  const avatarShape = settings.avatarShape ?? 'rounded';
  const showActions = settings.showActions !== 'hide';

  const borderColorWithOpacity = `${isDarkMode ? scale['700'] : scale['200']}${
    borderOpacity.name === '100' ? '' : borderOpacity.name
  }`;

  const avatarRadiusClass =
    avatarShape === 'circle' ? 'rounded-full' :
    avatarShape === 'square' ? 'rounded-none' :
    radius.name === 'rounded-full' ? 'rounded-lg' : radius.name;

  const isVertical = layout === 'vertical';

  return (
    <div
      className={`overflow-hidden ${radius.name} ${shadow.name} ${borderWidth.name}`}
      style={{
        backgroundColor: isDarkMode ? 'rgb(31, 41, 55)' : 'white',
        borderColor: borderColorWithOpacity,
      }}
    >
      <div className={`p-4 flex flex-col ${isVertical ? 'items-center text-center gap-3' : 'gap-3'}`}>
        {/* Avatar + info row */}
        <div className={`flex ${isVertical ? 'flex-col items-center gap-2' : 'items-center space-x-4'}`}>
          <div className={`relative flex-shrink-0 h-12 w-12 ${avatarRadiusClass} overflow-hidden`}>
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              alt="Team member"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4
              className="text-lg font-semibold"
              style={{
                fontFamily: headingFont.family,
                color: isDarkMode ? 'rgb(243,244,246)' : 'rgb(17,24,39)',
              }}
            >
              John Doe
            </h4>
            <p
              className="text-sm"
              style={{
                fontFamily: bodyFont.family,
                color: isDarkMode ? 'rgb(156,163,175)' : 'rgb(107,114,128)',
              }}
            >
              Software Engineer
            </p>
          </div>
        </div>

        {/* Action buttons */}
        {showActions && (
          <div className={`flex gap-2 ${isVertical ? 'justify-center' : ''}`}>
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
