'use client';

import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useComponentPalette } from '@/hooks/useComponentPalette';
import * as RadioGroup from '@radix-ui/react-radio-group';

const radioOptions = [
  { id: 'option1', label: 'Default Option' },
  { id: 'option2', label: 'Alternative Choice' },
  { id: 'option3', label: 'Another Option' },
];

const checkboxOptions = [
  { id: 'check1', label: 'Enable notifications' },
  { id: 'check2', label: 'Auto-save changes' },
  { id: 'check3', label: 'Show advanced options' },
];

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M1.5 5L4 7.5L8.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function DemoRadioGroup() {
  const { radius, spacing, isDarkMode } = useDesignSystem();
  const scale = useComponentPalette('radio-group');

  const [checked, setChecked] = useState<Set<string>>(new Set(['check1', 'check3']));

  const toggleCheck = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const textColor = isDarkMode ? scale['100'] : scale['900'];
  const borderClr = isDarkMode ? scale['600'] : scale['300'];

  return (
    <div
      className={`p-4 ${radius.name} border`}
      style={{
        backgroundColor: isDarkMode ? scale['800'] : 'white',
        borderColor: isDarkMode ? scale['700'] : scale['200'],
      }}
    >
      {/* Radio group */}
      <p className="text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: isDarkMode ? scale['400'] : scale['500'] }}>
        Single Select
      </p>
      <RadioGroup.Root defaultValue="option1" className={`${spacing.name}`}>
        {radioOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-3">
            <RadioGroup.Item
              value={option.id}
              id={option.id}
              className="w-4 h-4 rounded-full border-2 outline-none focus:ring-2 focus:ring-offset-2 flex-shrink-0"
              style={{ borderColor: borderClr }}
            >
              <RadioGroup.Indicator
                className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full"
                style={{ backgroundColor: scale['600'] }}
              />
            </RadioGroup.Item>
            <label
              htmlFor={option.id}
              className="cursor-pointer text-sm"
              style={{ color: textColor }}
            >
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroup.Root>

      {/* Divider */}
      <div
        className="my-3"
        style={{ borderTop: `1px solid ${isDarkMode ? scale['700'] : scale['100']}` }}
      />

      {/* Checkbox group */}
      <p className="text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ color: isDarkMode ? scale['400'] : scale['500'] }}>
        Multi Select
      </p>
      <div className={`${spacing.name}`}>
        {checkboxOptions.map((option) => {
          const isChecked = checked.has(option.id);
          return (
            <div
              key={option.id}
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => toggleCheck(option.id)}
            >
              {/* Custom checkbox */}
              <div
                className={`w-4 h-4 flex-shrink-0 flex items-center justify-center border-2 transition-colors ${radius.name === 'rounded-full' ? 'rounded-sm' : 'rounded-sm'}`}
                style={{
                  borderColor: isChecked ? scale['600'] : borderClr,
                  backgroundColor: isChecked ? scale['600'] : 'transparent',
                }}
              >
                {isChecked && <CheckIcon />}
              </div>
              <span className="text-sm select-none" style={{ color: textColor }}>
                {option.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
