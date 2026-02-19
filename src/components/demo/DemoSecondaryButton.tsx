'use client';

import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useSemanticColor } from '@/hooks/useSemanticColor';
import { useTypographyToken } from '@/hooks/useTypographyToken';

export default function DemoSecondaryButton() {
  const { radius } = useDesignSystem();
  const bgSubtle = useSemanticColor('background-subtle');
  const textColor = useSemanticColor('text-primary');
  const borderColor = useSemanticColor('border-default');
  const label = useTypographyToken('label');

  const [hovered, setHovered] = useState(false);

  return (
    <button
      className={`w-full px-4 py-2 text-sm font-medium transition-colors outline-none ${radius.name}`}
      style={{
        backgroundColor: hovered ? bgSubtle : 'transparent',
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
