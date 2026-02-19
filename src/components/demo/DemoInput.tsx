'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useSemanticColor } from '@/hooks/useSemanticColor';
import { useTypographyToken } from '@/hooks/useTypographyToken';
import * as Label from '@radix-ui/react-label';

export default function DemoInput() {
  const { radius } = useDesignSystem();
  const bgSurface = useSemanticColor('background-surface');
  const borderColor = useSemanticColor('border-default');
  const textPrimary = useSemanticColor('text-primary');
  const textTertiary = useSemanticColor('text-tertiary');
  const labelToken = useTypographyToken('label');
  const body = useTypographyToken('body');

  return (
    <div>
      <Label.Root
        htmlFor="demo-input"
        className="block mb-1"
        style={{ fontFamily: labelToken.fontFamily, fontSize: labelToken.fontSize, fontWeight: labelToken.fontWeight, color: textPrimary }}
      >
        Text Input
      </Label.Root>
      <input
        type="text"
        id="demo-input"
        className={`w-full px-3 py-2 transition-colors outline-none focus:ring-2 focus:ring-offset-2 ${radius.name}`}
        placeholder="Type something…"
        style={{
          fontFamily: body.fontFamily,
          fontSize: body.fontSize,
          backgroundColor: bgSurface,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor,
          color: textPrimary,
        }}
      />
    </div>
  );
}
