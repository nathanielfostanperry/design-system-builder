'use client';

import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useSemanticColor } from '@/hooks/useSemanticColor';
import { useTypographyToken } from '@/hooks/useTypographyToken';
import * as Slider from '@radix-ui/react-slider';

export default function DemoSlider() {
  const { radius } = useDesignSystem();
  const bgSurface = useSemanticColor('background-surface');
  const borderColor = useSemanticColor('border-default');
  const textPrimary = useSemanticColor('text-primary');
  const textSecondary = useSemanticColor('text-secondary');
  const interactiveDefault = useSemanticColor('interactive-default');
  const label = useTypographyToken('label');
  const body = useTypographyToken('body');

  const [sliderValue, setSliderValue] = useState([50]);

  return (
    <div
      className={`p-4 ${radius.name} border`}
      style={{ backgroundColor: bgSurface, borderColor }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <label
            className="text-sm font-medium"
            style={{ fontFamily: label.fontFamily, fontSize: label.fontSize, color: textPrimary }}
          >
            Slider
          </label>
          <span
            className="text-sm tabular-nums"
            style={{ fontFamily: body.fontFamily, color: textSecondary }}
          >
            {sliderValue[0]}
          </span>
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
            style={{ backgroundColor: borderColor }}
          >
            <Slider.Range
              className="absolute h-full rounded-full"
              style={{ backgroundColor: interactiveDefault }}
            />
          </Slider.Track>
          <Slider.Thumb
            className="block w-5 h-5 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
            style={{ backgroundColor: interactiveDefault }}
          />
        </Slider.Root>

        <div
          className="flex justify-between text-xs"
          style={{ fontFamily: body.fontFamily, color: textSecondary }}
        >
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>
      </div>
    </div>
  );
}
