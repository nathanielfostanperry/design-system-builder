'use client';

import React from 'react';
import Image from 'next/image';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useComponentPalette } from '@/hooks/useComponentPalette';

export default function DemoTeamCard() {
  const { radius, shadow, isDarkMode, headingFont, bodyFont, borderWidth, borderOpacity } = useDesignSystem();
  const scale = useComponentPalette('card');

  const borderColorWithOpacity = `${isDarkMode ? scale['700'] : scale['200']}${
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
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <div className={`relative h-12 w-12 ${radius.name === 'rounded-full' ? 'rounded-full' : 'rounded-lg'} overflow-hidden`}>
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              alt="Team member"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4
              className={`text-lg font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}
              style={{ fontFamily: headingFont.family }}
            >
              John Doe
            </h4>
            <p
              className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
              style={{ fontFamily: bodyFont.family }}
            >
              Software Engineer
            </p>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
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
      </div>
    </div>
  );
}
