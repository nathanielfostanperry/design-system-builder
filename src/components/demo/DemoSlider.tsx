'use client';

import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useComponentPalette } from '@/hooks/useComponentPalette';
import * as Slider from '@radix-ui/react-slider';

export default function DemoSlider() {
  const { radius, spacing, isDarkMode } = useDesignSystem();
  const scale = useComponentPalette('slider');
  const [sliderValue, setSliderValue] = useState([50]);

  return (
    <div
      className={`p-4 ${radius.name} border`}
      style={{
        backgroundColor: isDarkMode ? scale['800'] : 'white',
        borderColor: isDarkMode ? scale['700'] : scale['200'],
      }}
    >
      <div className={`${spacing.name}`}>
        <div className="flex justify-between">
          <label
            className="text-sm font-medium"
            style={{ color: isDarkMode ? scale['200'] : scale['700'] }}
          >
            Slider Value: {sliderValue[0]}
          </label>
        </div>
        <Slider.Root
          value={sliderValue}
          onValueChange={setSliderValue}
          min={0}
          max={100}
          step={1}
          className="relative flex items-center w-full h-5"
        >
          <Slider.Track
            className="relative flex-1 h-2 rounded-full"
            style={{ backgroundColor: isDarkMode ? scale['700'] : scale['200'] }}
          >
            <Slider.Range
              className="absolute h-full rounded-full"
              style={{ backgroundColor: scale['600'] }}
            />
          </Slider.Track>
          <Slider.Thumb
            className="block w-5 h-5 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
            style={{ backgroundColor: scale['600'] }}
          />
        </Slider.Root>
        <div
          className="flex justify-between text-xs"
          style={{ color: isDarkMode ? scale['400'] : scale['500'] }}
        >
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
}
