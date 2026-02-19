'use client';

import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useSemanticColor } from '@/hooks/useSemanticColor';
import { useTypographyToken } from '@/hooks/useTypographyToken';
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
  const { radius, spacing } = useDesignSystem();
  const bgSurface = useSemanticColor('background-surface');
  const borderColor = useSemanticColor('border-default');
  const textPrimary = useSemanticColor('text-primary');
  const textSecondary = useSemanticColor('text-secondary');
  const interactiveDefault = useSemanticColor('interactive-default');
  const overline = useTypographyToken('overline');
  const body = useTypographyToken('body');

  const [checked, setChecked] = useState<Set<string>>(new Set(['check1', 'check3']));

  const toggleCheck = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div
      className={`p-4 ${radius.name} border`}
      style={{ backgroundColor: bgSurface, borderColor }}
    >
      <p className="text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ fontFamily: overline.fontFamily, fontSize: overline.fontSize, color: textSecondary }}>
        Single Select
      </p>
      <RadioGroup.Root defaultValue="option1" className={spacing.name}>
        {radioOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-3">
            <RadioGroup.Item
              value={option.id}
              id={option.id}
              className="w-4 h-4 rounded-full border-2 outline-none focus:ring-2 focus:ring-offset-2 flex-shrink-0"
              style={{ borderColor }}
            >
              <RadioGroup.Indicator
                className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full"
                style={{ backgroundColor: interactiveDefault }}
              />
            </RadioGroup.Item>
            <label
              htmlFor={option.id}
              className="cursor-pointer text-sm"
              style={{ fontFamily: body.fontFamily, color: textPrimary }}
            >
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroup.Root>

      <div className="my-3" style={{ borderTop: `1px solid ${borderColor}` }} />

      <p className="text-xs font-semibold uppercase tracking-wider mb-2.5" style={{ fontFamily: overline.fontFamily, fontSize: overline.fontSize, color: textSecondary }}>
        Multi Select
      </p>
      <div className={spacing.name}>
        {checkboxOptions.map((option) => {
          const isChecked = checked.has(option.id);
          return (
            <div
              key={option.id}
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => toggleCheck(option.id)}
            >
              <div
                className={`w-4 h-4 flex-shrink-0 flex items-center justify-center border-2 rounded-sm transition-colors`}
                style={{
                  borderColor: isChecked ? interactiveDefault : borderColor,
                  backgroundColor: isChecked ? interactiveDefault : 'transparent',
                }}
              >
                {isChecked && <CheckIcon />}
              </div>
              <span className="text-sm select-none" style={{ fontFamily: body.fontFamily, color: textPrimary }}>
                {option.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
