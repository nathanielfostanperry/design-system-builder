'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useComponentPalette } from '@/hooks/useComponentPalette';
import * as Switch from '@radix-ui/react-switch';

const XIcon = () => (
  <svg className="ml-1.5 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
  </svg>
);

export default function DemoChips() {
  const { radius, isDarkMode, setIsDarkMode, accentColorScale, neutralColorScale } = useDesignSystem();
  const badgeScale = useComponentPalette('badge');

  return (
    <div className="space-y-6">
      {/* Theme Toggle */}
      <div className="flex items-center justify-between">
        <span
          className="text-sm font-medium"
          style={{ color: isDarkMode ? neutralColorScale['300'] : neutralColorScale['700'] }}
        >
          Theme
        </span>
        <Switch.Root
          checked={isDarkMode}
          onCheckedChange={setIsDarkMode}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${radius.name}`}
          style={{ backgroundColor: isDarkMode ? badgeScale['600'] : neutralColorScale['200'] }}
        >
          <Switch.Thumb
            className={`pointer-events-none relative inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`}
          >
            <span className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}>🌞</span>
            <span className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}>🌙</span>
          </Switch.Thumb>
        </Switch.Root>
      </div>

      {/* Palette chips */}
      <div className="flex flex-wrap gap-2">
        <span
          className={`inline-flex items-center px-3 py-1 text-sm font-medium ${radius.name}`}
          style={{
            backgroundColor: isDarkMode ? neutralColorScale['700'] : neutralColorScale['100'],
            color: isDarkMode ? neutralColorScale['200'] : neutralColorScale['800'],
          }}
        >
          Default
        </span>
        <span
          className={`inline-flex items-center px-3 py-1 text-sm font-medium ${radius.name}`}
          style={{
            backgroundColor: isDarkMode ? badgeScale['900'] : badgeScale['100'],
            color: isDarkMode ? badgeScale['100'] : badgeScale['800'],
          }}
        >
          Primary
        </span>
        <span
          className={`inline-flex items-center px-3 py-1 text-sm font-medium ${radius.name}`}
          style={{
            backgroundColor: isDarkMode ? accentColorScale['900'] : accentColorScale['100'],
            color: isDarkMode ? accentColorScale['100'] : accentColorScale['800'],
          }}
        >
          Accent
        </span>
      </div>

      {/* Status chips */}
      <div className="flex flex-wrap gap-2">
        <span className={`inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium ${radius.name}`}>Success</span>
        <span className={`inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium ${radius.name}`}>Warning</span>
        <span className={`inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm font-medium ${radius.name}`}>Error</span>
      </div>

      {/* Interactive chips */}
      <div className="flex flex-wrap gap-2">
        <button
          className={`inline-flex items-center px-3 py-1 text-sm font-medium hover:opacity-80 transition-opacity ${radius.name}`}
          style={{
            backgroundColor: isDarkMode ? badgeScale['900'] : badgeScale['100'],
            color: isDarkMode ? badgeScale['100'] : badgeScale['800'],
          }}
        >
          Interactive <XIcon />
        </button>
        <button
          className={`inline-flex items-center px-3 py-1 text-sm font-medium hover:opacity-80 transition-opacity ${radius.name}`}
          style={{
            backgroundColor: isDarkMode ? accentColorScale['900'] : accentColorScale['100'],
            color: isDarkMode ? accentColorScale['100'] : accentColorScale['800'],
          }}
        >
          Removable <XIcon />
        </button>
      </div>
    </div>
  );
}
