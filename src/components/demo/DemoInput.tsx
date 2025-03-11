'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';

export default function DemoInput() {
  const {
    radius,
    isDarkMode,
    headingFont,
    bodyFont,
    primaryColorScale,
    accentColorScale,
  } = useDesignSystem();

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="demo-input"
          className="block text-sm font-medium mb-1"
          style={{
            fontFamily: headingFont.family,
            color: isDarkMode ? primaryColorScale[300] : primaryColorScale[700],
          }}
        >
          Demo Input
        </label>
        <input
          type="text"
          id="demo-input"
          className={`w-full px-3 py-2 shadow-sm transition-colors ${radius.name}`}
          placeholder="Type something..."
          style={{
            fontFamily: bodyFont.family,
            backgroundColor: isDarkMode ? 'rgb(55, 65, 81)' : 'white',
            borderWidth: '1px',
            borderColor: isDarkMode
              ? primaryColorScale[600]
              : primaryColorScale[200],
            color: isDarkMode ? primaryColorScale[100] : primaryColorScale[900],
            '--tw-ring-color': primaryColorScale[500],
            '--tw-ring-offset-shadow': `0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,
            '--tw-ring-shadow': `0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
          }}
        />
      </div>
      <button
        className={`w-full px-4 py-2 transition-colors ${radius.name}`}
        style={{
          fontFamily: bodyFont.family,
          backgroundColor: primaryColorScale[600],
          color: 'white',
          '--tw-ring-color': primaryColorScale[500],
          '--tw-ring-offset-shadow': `0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,
          '--tw-ring-shadow': `0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
        }}
      >
        Submit
      </button>
    </div>
  );
}
