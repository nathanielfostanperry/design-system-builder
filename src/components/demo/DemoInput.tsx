'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useComponentPalette } from '@/hooks/useComponentPalette';
import * as Label from '@radix-ui/react-label';

export default function DemoInput() {
  const { radius, isDarkMode, headingFont, bodyFont } = useDesignSystem();
  const scale = useComponentPalette('input');

  return (
    <div className="space-y-4">
      <div>
        <Label.Root
          htmlFor="demo-input"
          className="block text-sm font-medium mb-1"
          style={{
            fontFamily: headingFont.family,
            color: isDarkMode ? scale['300'] : scale['700'],
          }}
        >
          Demo Input
        </Label.Root>
        <input
          type="text"
          id="demo-input"
          className={`w-full px-3 py-2 shadow-sm transition-colors outline-none focus:ring-2 focus:ring-offset-2 ${radius.name}`}
          placeholder="Type something..."
          style={{
            fontFamily: bodyFont.family,
            backgroundColor: isDarkMode ? 'rgb(55, 65, 81)' : 'white',
            borderWidth: '1px',
            borderColor: isDarkMode ? scale['600'] : scale['200'],
            color: isDarkMode ? scale['100'] : scale['900'],
          }}
        />
      </div>
      <button
        className={`w-full px-4 py-2 text-white hover:opacity-90 transition-opacity outline-none focus:ring-2 focus:ring-offset-2 ${radius.name}`}
        style={{
          fontFamily: bodyFont.family,
          backgroundColor: scale['600'],
        }}
      >
        Submit
      </button>
    </div>
  );
}
