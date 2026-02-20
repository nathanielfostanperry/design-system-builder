'use client';

import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useComponentToken } from '@/hooks/useComponentToken';
import { useTypographyToken } from '@/hooks/useTypographyToken';

export default function DemoPrimaryButton() {
  const { radius } = useDesignSystem();
  const bgDefault = useComponentToken('button-primary', 'bg');
  const bgHover = useComponentToken('button-primary', 'bg-hover');
  const bgActive = useComponentToken('button-primary', 'bg-active');
  const textColor = useComponentToken('button-primary', 'text');
  const borderColor = useComponentToken('button-primary', 'border');
  const label = useTypographyToken('label');

  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const bg = pressed ? bgActive : hovered ? bgHover : bgDefault;

  return (
    <button
      className={`w-full px-4 py-2 text-sm font-medium transition-colors outline-none ${radius.name}`}
      style={{
        backgroundColor: bg,
        color: textColor,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor,
        fontFamily: label.fontFamily,
        fontSize: label.fontSize,
        fontWeight: label.fontWeight,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
    >
      Primary Button
    </button>
  );
}
