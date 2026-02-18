'use client';

import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useComponentPalette } from '@/hooks/useComponentPalette';

export default function DemoPrimaryButton() {
  const { radius } = useDesignSystem();
  const scale = useComponentPalette('button-primary');
  const [hovered, setHovered] = useState(false);

  return (
    <button
      className={`w-full px-4 py-2 text-white transition-colors outline-none focus:ring-2 focus:ring-offset-2 ${radius.name}`}
      style={{
        backgroundColor: hovered ? scale['700'] : scale['600'],
        color: 'white',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      Primary Button
    </button>
  );
}
