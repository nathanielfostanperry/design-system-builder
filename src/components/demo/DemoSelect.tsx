'use client';

import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useSemanticColor } from '@/hooks/useSemanticColor';
import { useTypographyToken } from '@/hooks/useTypographyToken';
import * as Select from '@radix-ui/react-select';
import * as Label from '@radix-ui/react-label';

const OPTIONS = [
  { value: 'design',     label: 'Design System' },
  { value: 'components', label: 'Components' },
  { value: 'tokens',     label: 'Design Tokens' },
  { value: 'guidelines', label: 'Guidelines' },
];

export default function DemoSelect() {
  const { radius } = useDesignSystem();
  const bgSurface = useSemanticColor('background-surface');
  const bgSubtle = useSemanticColor('background-subtle');
  const borderColor = useSemanticColor('border-default');
  const textPrimary = useSemanticColor('text-primary');
  const textTertiary = useSemanticColor('text-tertiary');
  const labelToken = useTypographyToken('label');
  const body = useTypographyToken('body');

  const [value, setValue] = useState('');
  const textColor = value ? textPrimary : textTertiary;

  return (
    <div>
      <Label.Root
        className="block mb-1"
        style={{ fontFamily: labelToken.fontFamily, fontSize: labelToken.fontSize, fontWeight: labelToken.fontWeight, color: textPrimary }}
      >
        Select Option
      </Label.Root>

      <Select.Root value={value} onValueChange={setValue}>
        <Select.Trigger
          className={`w-full flex items-center justify-between text-sm outline-none transition-colors px-3 py-2 ${radius.name}`}
          style={{
            fontFamily: body.fontFamily,
            fontSize: body.fontSize,
            backgroundColor: bgSurface,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor,
            color: textColor,
          }}
        >
          <Select.Value placeholder="Choose an option…" />
          <Select.Icon>
            <svg className="w-4 h-4 opacity-50" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className={`shadow-lg z-50 overflow-hidden ${radius.name}`}
            sideOffset={4}
            style={{
              backgroundColor: bgSurface,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor,
              minWidth: 'var(--radix-select-trigger-width)',
            }}
          >
            <Select.Viewport className="p-1">
              {OPTIONS.map((opt) => (
                <Select.Item
                  key={opt.value}
                  value={opt.value}
                  className={`text-sm outline-none cursor-pointer transition-colors px-3 py-2 ${radius.name}`}
                  style={{ fontFamily: body.fontFamily, color: textPrimary }}
                  onFocus={(e) => (e.currentTarget.style.backgroundColor = bgSubtle)}
                  onBlur={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <Select.ItemText>{opt.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
