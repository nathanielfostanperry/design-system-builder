'use client';

import ColorSystemBuilder from '@/components/ColorSystemBuilder';
import ColorScaleDisplay from '@/components/ColorScaleDisplay';
import { useDesignSystem } from '@/context/DesignSystemContext';
import DemoInput from '@/components/demo/DemoInput';
import DemoToast from '@/components/demo/DemoToast';
import DemoDropdown from '@/components/demo/DemoDropdown';
import DemoTabs from '@/components/demo/DemoTabs';
import DemoPrimaryButton from '@/components/demo/DemoPrimaryButton';
import DemoSecondaryButton from '@/components/demo/DemoSecondaryButton';
import DemoIconButtonPrimary from '@/components/demo/DemoIconButtonPrimary';
import DemoIconButtonSecondary from '@/components/demo/DemoIconButtonSecondary';
import DemoTeamCard from '@/components/demo/DemoTeamCard';
import DemoProductCard from '@/components/demo/DemoProductCard';
import DemoChips from '@/components/demo/DemoChips';
import DemoAccordion from '@/components/demo/DemoAccordion';
import DemoRadioGroup from '@/components/demo/DemoRadioGroup';
import DemoSlider from '@/components/demo/DemoSlider';
import Corners from '@/components/Corners';
import Spacing from '@/components/Spacing';
import Shadows from '@/components/Shadows';
import Fonts from '@/components/Fonts';
import FontPreview from '@/components/FontPreview';

export default function Home() {
  const {
    primaryColorScale,
    accentColorScale,
    neutralColorScale,
    spacing,
    radius,
    isDarkMode,
  } = useDesignSystem();

  return (
    <main
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="grid md:grid-cols-2 gap-2 p-2">
        {/* Control panel */}
        <div className={`bg-red-50 p-8 ${radius.name}`}>
          <Fonts />
          <div className="flex justify-between gap-4">
            <Corners />
            <Spacing />
            <Shadows />
          </div>
          <ColorSystemBuilder />
        </div>

        {/* Result Panel */}
        <div
          className={`p-8 ${radius.name} ${
            isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'
          }`}
        >
          {/* Color Scales */}
          <div className={`${spacing.name}`}>
            <div>
              <h3
                className={`text-xl font-semibold mb-4 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}
              >
                Primary Colors
              </h3>
              <ColorScaleDisplay colorScale={primaryColorScale} />
            </div>
            <div>
              <h3
                className={`text-xl font-semibold mb-4 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}
              >
                Secondary Colors
              </h3>
              <ColorScaleDisplay colorScale={accentColorScale} />
            </div>
            <div>
              <h3
                className={`text-xl font-semibold mb-4 ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-900'
                }`}
              >
                Gray Colors
              </h3>
              <ColorScaleDisplay colorScale={neutralColorScale} />
            </div>
          </div>

          {/* Font Preview */}
          <FontPreview />

          {/* Demo Components Section */}
          <div className="mt-12">
            <h2
              className={`text-2xl font-bold mb-8 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}
            >
              Demo Components
            </h2>
            <div
              className={`grid md:grid-cols-2 xl:grid-cols-3 ${spacing.name}`}
            >
              <DemoPrimaryButton />
              <DemoSecondaryButton />
              <DemoIconButtonPrimary />
              <DemoIconButtonSecondary />
              <DemoTeamCard />
              <DemoProductCard />
              <DemoInput />
              <DemoAccordion />
              <DemoRadioGroup />
              <DemoSlider />
              <DemoToast />
              <DemoDropdown />
              <DemoTabs />
              <DemoChips />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
