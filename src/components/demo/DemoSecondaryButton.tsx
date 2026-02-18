'use client';

import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useComponentPalette } from '@/hooks/useComponentPalette';

export default function DemoSecondaryButton() {
  const { radius, isDarkMode } = useDesignSystem();
  const scale = useComponentPalette('button-secondary');
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className={`w-full px-4 py-2 border transition-colors outline-none focus:ring-2 focus:ring-offset-2 ${radius.name}`}
      style={{
        backgroundColor: hovered
          ? isDarkMode ? scale['900'] : scale['50']
          : isDarkMode ? 'transparent' : 'white',
        color: isDarkMode ? scale['200'] : scale['700'],
        borderColor: isDarkMode ? scale['500'] : scale['300'],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      Secondary Button
    </button>
  );
}
