import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';

export default function DemoRadioGroup() {
  const { radius } = useDesignSystem();
  const [selectedRadio, setSelectedRadio] = useState('option1');

  const radioOptions = [
    { id: 'option1', label: 'Default Option' },
    { id: 'option2', label: 'Alternative Choice' },
    { id: 'option3', label: 'Another Option' },
  ];

  return (
    <div className={`bg-white p-4 ${radius.name} border border-gray-200`}>
      <div className="space-y-2">
        {radioOptions.map((option) => (
          <label
            key={option.id}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="relative flex items-center">
              <input
                type="radio"
                value={option.id}
                checked={selectedRadio === option.id}
                onChange={(e) => setSelectedRadio(e.target.value)}
                className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
              />
            </div>
            <span className="text-gray-900">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
