'use client';

import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useComponentPalette } from '@/hooks/useComponentPalette';
import { useComponentSettings } from '@/hooks/useComponentSettings';

const PADDING_MAP = {
  compact: 'px-3 py-1',
  default: 'px-4 py-2',
  relaxed: 'px-6 py-3',
};

export default function DemoPrimaryButton() {
  const { radius } = useDesignSystem();
  const scale    = useComponentPalette('button-primary');
  const settings = useComponentSettings('button-primary');
  const [hovered, setHovered] = useState(false);

  const bg      = settings.background ?? 'solid';
  const border  = settings.border     ?? 'none';
  const padding = PADDING_MAP[(settings.padding as keyof typeof PADDING_MAP)] ?? PADDING_MAP.default;

  const getBg = () => {
    if (bg === 'tinted') return hovered ? scale['100'] : scale['50'];
    if (bg === 'none')   return hovered ? scale['50']  : 'transparent';
    return hovered ? scale['700'] : scale['600'];
  };

  const getColor = () => (bg === 'solid' ? 'white' : scale['700']);
  const getBorderWidth = () => border === 'lg' ? '2px' : border === 'sm' ? '1px' : '0';

  return (
    <button
      className={`w-full text-sm font-medium transition-colors outline-none ${radius.name} ${padding}`}
      style={{
        backgroundColor: getBg(),
        color: getColor(),
        borderWidth: getBorderWidth(),
        borderStyle: 'solid',
        borderColor: scale['400'],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      Primary Button
    </button>
  );
}
