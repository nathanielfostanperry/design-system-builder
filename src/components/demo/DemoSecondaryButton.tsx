'use client';

import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useComponentToken } from '@/hooks/useComponentToken';
import { useTypographyToken } from '@/hooks/useTypographyToken';

export default function DemoSecondaryButton() {
  const { radius } = useDesignSystem();
  const bgDefault = useComponentToken('button-secondary', 'bg');
  const bgHover = useComponentToken('button-secondary', 'bg-hover');
  const textColor = useComponentToken('button-secondary', 'text');
  const borderColor = useComponentToken('button-secondary', 'border');
  const label = useTypographyToken('label');

  const [hovered, setHovered] = useState(false);

  return (
    <button
      className={`w-full px-4 py-2 text-sm font-medium transition-colors outline-none ${radius.name}`}
      style={{
        backgroundColor: hovered ? bgHover : bgDefault,
        color: textColor,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor,
        fontFamily: label.fontFamily,
        fontSize: label.fontSize,
        fontWeight: label.fontWeight,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      Secondary Button
    </button>
  );
}
