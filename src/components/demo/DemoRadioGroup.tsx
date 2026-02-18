import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import * as RadioGroup from '@radix-ui/react-radio-group';

export default function DemoRadioGroup() {
  const { radius, spacing, primaryColorScale, isDarkMode } = useDesignSystem();

  const radioOptions = [
    { id: 'option1', label: 'Default Option' },
    { id: 'option2', label: 'Alternative Choice' },
    { id: 'option3', label: 'Another Option' },
  ];

  return (
    <div
      className={`p-4 ${radius.name} border`}
      style={{
        backgroundColor: isDarkMode ? primaryColorScale[800] : 'white',
        borderColor: isDarkMode ? primaryColorScale[700] : primaryColorScale[200],
      }}
    >
      <RadioGroup.Root
        defaultValue="option1"
        className={`${spacing.name}`}
      >
        {radioOptions.map((option) => (
          <div key={option.id} className="flex items-center space-x-3">
            <RadioGroup.Item
              value={option.id}
              id={option.id}
              className="w-4 h-4 rounded-full border-2 outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              style={{
                borderColor: isDarkMode ? primaryColorScale[600] : primaryColorScale[300],
              }}
            >
              <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-2 after:h-2 after:rounded-full" style={{ backgroundColor: primaryColorScale[600] }} />
            </RadioGroup.Item>
            <label
              htmlFor={option.id}
              className="cursor-pointer"
              style={{
                color: isDarkMode ? primaryColorScale[100] : primaryColorScale[900],
              }}
            >
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroup.Root>
    </div>
  );
}
