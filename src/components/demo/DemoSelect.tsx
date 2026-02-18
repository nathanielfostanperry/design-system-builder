'use client';

import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useComponentPalette } from '@/hooks/useComponentPalette';
import * as Select from '@radix-ui/react-select';
import * as Label from '@radix-ui/react-label';

const OPTIONS = [
  { value: 'design',      label: 'Design System' },
  { value: 'components',  label: 'Components' },
  { value: 'tokens',      label: 'Design Tokens' },
  { value: 'guidelines',  label: 'Guidelines' },
];

export default function DemoSelect() {
  const { radius, isDarkMode, headingFont, bodyFont } = useDesignSystem();
  const scale = useComponentPalette('input');
  const [value, setValue] = useState('');

  const borderClr = isDarkMode ? scale['600'] : scale['200'];
  const bgColor   = isDarkMode ? 'rgb(55, 65, 81)' : 'white';
  const textColor = isDarkMode ? scale['100'] : scale['900'];
  const mutedClr  = isDarkMode ? scale['500'] : scale['400'];

  return (
    <div>
      <Label.Root
        className="block text-sm font-medium mb-1"
        style={{ fontFamily: headingFont.family, color: isDarkMode ? scale['300'] : scale['700'] }}
      >
        Select Option
      </Label.Root>

      <Select.Root value={value} onValueChange={setValue}>
        <Select.Trigger
          className={`w-full px-3 py-2 flex items-center justify-between text-sm shadow-sm outline-none transition-colors ${radius.name}`}
          style={{
            fontFamily: bodyFont.family,
            backgroundColor: bgColor,
            borderWidth: '1px',
            borderColor: borderClr,
            color: value ? textColor : mutedClr,
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
              backgroundColor: bgColor,
              borderWidth: '1px',
              borderColor: borderClr,
              minWidth: 'var(--radix-select-trigger-width)',
            }}
          >
            <Select.Viewport className="p-1">
              {OPTIONS.map((opt) => (
                <Select.Item
                  key={opt.value}
                  value={opt.value}
                  className={`px-3 py-2 text-sm outline-none cursor-pointer transition-colors ${radius.name}`}
                  style={{ fontFamily: bodyFont.family, color: textColor }}
                  onFocus={(e)  => (e.currentTarget.style.backgroundColor = isDarkMode ? scale['700'] : scale['50'])}
                  onBlur={(e)   => (e.currentTarget.style.backgroundColor = 'transparent')}
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
