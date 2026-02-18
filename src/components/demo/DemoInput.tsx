'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useComponentPalette } from '@/hooks/useComponentPalette';
import { useComponentSettings } from '@/hooks/useComponentSettings';
import * as Label from '@radix-ui/react-label';

const SIZE_PADDING = {
  compact:     'px-3 py-1.5',
  default:     'px-3 py-2',
  comfortable: 'px-3 py-3',
};

export default function DemoInput() {
  const { radius, isDarkMode, headingFont, bodyFont } = useDesignSystem();
  const scale    = useComponentPalette('input');
  const settings = useComponentSettings('input');

  const bg     = settings.background ?? 'solid';
  const border = settings.border     ?? 'sm';
  const size   = settings.size       ?? 'default';

  const padding = SIZE_PADDING[(size as keyof typeof SIZE_PADDING)] ?? SIZE_PADDING.default;

  const getBg = () => {
    if (bg === 'tinted') return isDarkMode ? scale['800'] : scale['50'];
    if (bg === 'none')   return 'transparent';
    return isDarkMode ? 'rgb(55, 65, 81)' : 'white';
  };

  const borderWidth = border === 'none' ? '0' : border === 'lg' ? '2px' : '1px';

  return (
    <div>
      <Label.Root
        htmlFor="demo-input"
        className="block text-sm font-medium mb-1"
        style={{ fontFamily: headingFont.family, color: isDarkMode ? scale['300'] : scale['700'] }}
      >
        Text Input
      </Label.Root>
      <input
        type="text"
        id="demo-input"
        className={`w-full transition-colors outline-none focus:ring-2 focus:ring-offset-2 ${padding} ${radius.name}`}
        placeholder="Type something…"
        style={{
          fontFamily: bodyFont.family,
          backgroundColor: getBg(),
          borderWidth,
          borderStyle: 'solid',
          borderColor: isDarkMode ? scale['600'] : scale['200'],
          color: isDarkMode ? scale['100'] : scale['900'],
        }}
      />
    </div>
  );
}
