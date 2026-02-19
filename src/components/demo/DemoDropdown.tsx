'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useSemanticColor } from '@/hooks/useSemanticColor';
import { useTypographyToken } from '@/hooks/useTypographyToken';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export default function DemoDropdown() {
  const { radius } = useDesignSystem();
  const bgSurface = useSemanticColor('background-surface');
  const bgSubtle = useSemanticColor('background-subtle');
  const borderColor = useSemanticColor('border-default');
  const textPrimary = useSemanticColor('text-primary');
  const textBrand = useSemanticColor('text-brand');
  const body = useTypographyToken('body');

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={`inline-flex items-center px-4 py-2 border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${radius.name}`}
          style={{
            borderColor,
            backgroundColor: bgSurface,
            color: textPrimary,
            fontFamily: body.fontFamily,
          }}
        >
          Options
          <svg
            className="ml-2 h-5 w-5 opacity-50"
            style={{ color: textPrimary }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
          </svg>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`w-56 shadow-lg ${radius.name}`}
          style={{
            backgroundColor: bgSurface,
            border: `1px solid ${borderColor}`,
          }}
        >
          <div className="py-1">
            {['Account settings', 'Support', 'License'].map((item) => (
              <DropdownMenu.Item
                key={item}
                className="block px-4 py-2 text-sm outline-none cursor-pointer transition-colors"
                style={{ fontFamily: body.fontFamily, color: textPrimary }}
                onFocus={(e) => (e.currentTarget.style.backgroundColor = bgSubtle)}
                onBlur={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {item}
              </DropdownMenu.Item>
            ))}
            <DropdownMenu.Separator
              className="h-px my-1"
              style={{ backgroundColor: borderColor }}
            />
            <DropdownMenu.Item
              className="block px-4 py-2 text-sm outline-none cursor-pointer"
              style={{ fontFamily: body.fontFamily, color: textBrand }}
              onFocus={(e) => (e.currentTarget.style.backgroundColor = bgSubtle)}
              onBlur={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Sign out
            </DropdownMenu.Item>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
