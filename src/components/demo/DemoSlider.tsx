import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import * as Slider from '@radix-ui/react-slider';

export default function DemoSlider() {
  const { radius, spacing, primaryColorScale, isDarkMode } = useDesignSystem();
  const [sliderValue, setSliderValue] = useState([50]);

  return (
    <div
      className={`p-4 ${radius.name} border`}
      style={{
        backgroundColor: isDarkMode ? primaryColorScale[800] : 'white',
        borderColor: isDarkMode ? primaryColorScale[700] : primaryColorScale[200],
      }}
    >
      <div className={`${spacing.name}`}>
        <div className="flex justify-between">
          <label
            className="text-sm font-medium"
            style={{
              color: isDarkMode ? primaryColorScale[200] : primaryColorScale[700],
            }}
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
            style={{
              backgroundColor: isDarkMode ? primaryColorScale[700] : primaryColorScale[200],
            }}
          >
            <Slider.Range
              className="absolute h-full rounded-full"
              style={{
                backgroundColor: primaryColorScale[600],
              }}
            />
          </Slider.Track>
          <Slider.Thumb
            className="block w-5 h-5 rounded-full outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            style={{
              backgroundColor: primaryColorScale[600],
            }}
          />
        </Slider.Root>
        <div
          className="flex justify-between text-xs"
          style={{
            color: isDarkMode ? primaryColorScale[400] : primaryColorScale[500],
          }}
        >
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
}
