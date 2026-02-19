'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useSemanticColor } from '@/hooks/useSemanticColor';
import { useTypographyToken } from '@/hooks/useTypographyToken';
import * as Switch from '@radix-ui/react-switch';

const XIcon = () => (
  <svg className="ml-1.5 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
  </svg>
);

export default function DemoChips() {
  const { radius, setIsDarkMode, isDarkMode } = useDesignSystem();
  const bgSubtle = useSemanticColor('background-subtle');
  const textPrimary = useSemanticColor('text-primary');
  const brandPrimary = useSemanticColor('brand-primary');
  const statusInfoBg = useSemanticColor('status-info-bg');
  const statusInfoText = useSemanticColor('status-info-text');
  const statusSuccessBg = useSemanticColor('status-success-bg');
  const statusSuccessText = useSemanticColor('status-success-text');
  const statusWarningBg = useSemanticColor('status-warning-bg');
  const statusWarningText = useSemanticColor('status-warning-text');
  const statusErrorBg = useSemanticColor('status-error-bg');
  const statusErrorText = useSemanticColor('status-error-text');
  const label = useTypographyToken('label');

  return (
    <div className="space-y-6">
      {/* Theme Toggle */}
      <div className="flex items-center justify-between">
        <span
          className="text-sm font-medium"
          style={{ fontFamily: label.fontFamily, fontSize: label.fontSize, color: textPrimary }}
        >
          Theme
        </span>
        <Switch.Root
          checked={isDarkMode}
          onCheckedChange={setIsDarkMode}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${radius.name}`}
          style={{ backgroundColor: isDarkMode ? brandPrimary : bgSubtle }}
        >
          <Switch.Thumb
            className={`pointer-events-none relative inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`}
          >
            <span className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${isDarkMode ? 'opacity-0' : 'opacity-100'}`}>🌞</span>
            <span className={`absolute inset-0 flex h-full w-full items-center justify-center transition-opacity ${isDarkMode ? 'opacity-100' : 'opacity-0'}`}>🌙</span>
          </Switch.Thumb>
        </Switch.Root>
      </div>

      {/* Palette chips */}
      <div className="flex flex-wrap gap-2">
        <span
          className={`inline-flex items-center px-3 py-1 text-sm font-medium ${radius.name}`}
          style={{
            fontFamily: label.fontFamily,
            backgroundColor: bgSubtle,
            color: textPrimary,
          }}
        >
          Default
        </span>
        <span
          className={`inline-flex items-center px-3 py-1 text-sm font-medium ${radius.name}`}
          style={{
            fontFamily: label.fontFamily,
            backgroundColor: statusInfoBg,
            color: statusInfoText,
          }}
        >
          Primary
        </span>
        <span
          className={`inline-flex items-center px-3 py-1 text-sm font-medium ${radius.name}`}
          style={{
            fontFamily: label.fontFamily,
            backgroundColor: statusWarningBg,
            color: statusWarningText,
          }}
        >
          Accent
        </span>
      </div>

      {/* Status chips */}
      <div className="flex flex-wrap gap-2">
        <span
          className={`inline-flex items-center px-3 py-1 text-sm font-medium ${radius.name}`}
          style={{ fontFamily: label.fontFamily, backgroundColor: statusSuccessBg, color: statusSuccessText }}
        >
          Success
        </span>
        <span
          className={`inline-flex items-center px-3 py-1 text-sm font-medium ${radius.name}`}
          style={{ fontFamily: label.fontFamily, backgroundColor: statusWarningBg, color: statusWarningText }}
        >
          Warning
        </span>
        <span
          className={`inline-flex items-center px-3 py-1 text-sm font-medium ${radius.name}`}
          style={{ fontFamily: label.fontFamily, backgroundColor: statusErrorBg, color: statusErrorText }}
        >
          Error
        </span>
      </div>

      {/* Interactive chips */}
      <div className="flex flex-wrap gap-2">
        <button
          className={`inline-flex items-center px-3 py-1 text-sm font-medium hover:opacity-80 transition-opacity ${radius.name}`}
          style={{
            fontFamily: label.fontFamily,
            backgroundColor: statusSuccessBg,
            color: statusSuccessText,
          }}
        >
          Interactive <XIcon />
        </button>
        <button
          className={`inline-flex items-center px-3 py-1 text-sm font-medium hover:opacity-80 transition-opacity ${radius.name}`}
          style={{
            fontFamily: label.fontFamily,
            backgroundColor: statusWarningBg,
            color: statusWarningText,
          }}
        >
          Removable <XIcon />
        </button>
      </div>
    </div>
  );
}
