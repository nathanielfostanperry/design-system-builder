import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';

export default function DemoSlider() {
  const { radius } = useDesignSystem();
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <div className={`bg-white p-4 ${radius.name} border border-gray-200`}>
      <div className="space-y-2">
        <div className="flex justify-between">
          <label className="text-sm font-medium text-gray-700">
            Slider Value: {sliderValue}
          </label>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={(e) => setSliderValue(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
}
