'use client';

import React from 'react';
import { useDesignSystem, SHADOW_OPTIONS } from '@/context/DesignSystemContext';

export default function Shadows() {
  const { shadow, setShadow, radius, isDarkMode, primaryColorScale, neutralColorScale, headingFont, bodyFont } = useDesignSystem();

  const handleClick = () => {
    const currentIndex = SHADOW_OPTIONS.findIndex(
      (option) => option.name === shadow.name
    );
    const nextIndex = (currentIndex + 1) % SHADOW_OPTIONS.length;
    setShadow(SHADOW_OPTIONS[nextIndex]);
  };

  const textColors = {
    primary: isDarkMode ? neutralColorScale['100'] : neutralColorScale['900'],
    secondary: isDarkMode ? neutralColorScale['300'] : neutralColorScale['600'],
    tertiary: isDarkMode ? neutralColorScale['400'] : neutralColorScale['500'],
  };

  const borderColor = isDarkMode
    ? `rgba(255, 255, 255, 0.1)`
    : `rgba(0, 0, 0, 0.1)`;

  const bgColor = isDarkMode
    ? neutralColorScale['800']
    : 'white';

  return (
    <div>
      <label
        className="block text-xs font-medium mb-2"
        style={{
          fontFamily: headingFont.family,
          color: textColors.secondary,
        }}
      >
        Shadows
      </label>
      <button
        onClick={handleClick}
        className={`w-full flex items-center justify-between px-3 py-2 border transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-1 ${radius.name} ${shadow.name}`}
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
          color: textColors.primary,
        }}
      >
        <span
          className="text-sm"
          style={{
            fontFamily: bodyFont.family,
          }}
        >
          {shadow.label}
        </span>
        <div
          className={`w-8 h-8 ${radius.name}`}
          style={{
            backgroundColor: primaryColorScale['500'],
          }}
        />
      </button>
    </div>
  );
}
