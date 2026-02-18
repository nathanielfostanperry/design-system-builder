'use client';

import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useComponentPalette } from '@/hooks/useComponentPalette';
import { useComponentSettings } from '@/hooks/useComponentSettings';
import * as Select from '@radix-ui/react-select';
import * as Label from '@radix-ui/react-label';

const OPTIONS = [
  { value: 'design',     label: 'Design System' },
  { value: 'components', label: 'Components' },
  { value: 'tokens',     label: 'Design Tokens' },
  { value: 'guidelines', label: 'Guidelines' },
];

const SIZE_PADDING = {
  compact:     'px-3 py-1.5',
  default:     'px-3 py-2',
  comfortable: 'px-3 py-3',
};

export default function DemoSelect() {
  const { radius, isDarkMode, headingFont, bodyFont } = useDesignSystem();
  const scale    = useComponentPalette('input');
  const settings = useComponentSettings('input');
  const [value, setValue] = useState('');

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
  const textColor   = isDarkMode ? scale['100'] : scale['900'];
  const mutedClr    = isDarkMode ? scale['500'] : scale['400'];

  const inputStyle = {
    fontFamily: bodyFont.family,
    backgroundColor: getBg(),
    borderWidth,
    borderStyle: 'solid' as const,
    borderColor: isDarkMode ? scale['600'] : scale['200'],
    color: value ? textColor : mutedClr,
  };

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
          className={`w-full flex items-center justify-between text-sm outline-none transition-colors ${padding} ${radius.name}`}
          style={inputStyle}
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
              backgroundColor: getBg() === 'transparent' ? (isDarkMode ? 'rgb(55,65,81)' : 'white') : getBg(),
              borderWidth,
              borderStyle: 'solid',
              borderColor: isDarkMode ? scale['600'] : scale['200'],
              minWidth: 'var(--radix-select-trigger-width)',
            }}
          >
            <Select.Viewport className="p-1">
              {OPTIONS.map((opt) => (
                <Select.Item
                  key={opt.value}
                  value={opt.value}
                  className={`text-sm outline-none cursor-pointer transition-colors ${padding} ${radius.name}`}
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
