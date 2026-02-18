'use client';

import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import ColorScaleDisplay from '@/components/ColorScaleDisplay';
import { useDesignSystem } from '@/context/DesignSystemContext';
import DemoInput from '@/components/demo/DemoInput';
import DemoToast from '@/components/demo/DemoToast';
import DemoDropdown from '@/components/demo/DemoDropdown';
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
import FontPreview from '@/components/FontPreview';
import CodeExport from '@/components/CodeExport';
import BrandDocs from '@/components/BrandDocs';
import DesignSidebar from '@/components/DesignSidebar';

export default function Home() {
  const {
    primaryColorScale,
    accentColorScale,
    neutralColorScale,
    extraPalettes,
    spacing,
    radius,
    isDarkMode,
    headingFont,
    bodyFont,
    componentPaletteMap,
    componentSettingsMap,
  } = useDesignSystem();
  // Whisper-quiet borders: rgba with low opacity
  const getBorderColor = (opacity: number = 0.08) => {
    if (isDarkMode) {
      return `rgba(255, 255, 255, ${opacity})`;
    }
    return `rgba(0, 0, 0, ${opacity})`;
  };

  // Surface elevation: subtle lightness shifts
  const getSurfaceColor = (elevation: number = 0) => {
    if (isDarkMode) {
      const base = 15; // neutralColorScale['900'] ≈ rgb(15, 15, 15)
      const lighten = elevation * 1.5;
      return `rgb(${base + lighten}, ${base + lighten}, ${base + lighten})`;
    }
    return elevation === 0 ? 'white' : `rgb(255, 255, 255)`;
  };

  // Text hierarchy
  const textColors = {
    primary: isDarkMode ? neutralColorScale['100'] : neutralColorScale['900'],
    secondary: isDarkMode ? neutralColorScale['300'] : neutralColorScale['600'],
    tertiary: isDarkMode ? neutralColorScale['400'] : neutralColorScale['500'],
    muted: isDarkMode ? neutralColorScale['500'] : neutralColorScale['400'],
  };

  const [activeTab, setActiveTab] = useState('colors');

  return (
    <main
      className="h-screen flex flex-col overflow-hidden"
      style={{
        backgroundColor: isDarkMode
          ? neutralColorScale['900']
          : neutralColorScale['50'],
        fontFamily: bodyFont.family,
      }}
    >
      {/* Main workspace */}
      <div className="flex-1 flex mx-auto w-full min-h-0">
        <DesignSidebar />

        {/* Main content area - Tabbed interface */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          <Tabs.Root value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col min-h-0">
            {/* Tab navigation */}
            <div
              className="sticky top-0 z-40 border-b px-6"
              style={{
                backgroundColor: getSurfaceColor(1),
                borderColor: getBorderColor(0.08),
                backdropFilter: 'blur(8px)',
              }}
            >
              <Tabs.List className="flex gap-1 -mb-px">
                <Tabs.Trigger
                  value="colors"
                  className="px-4 py-3 text-sm font-medium border-b-2 border-transparent outline-none transition-colors data-[state=active]:border-current"
                  style={{
                    color: activeTab === 'colors' ? textColors.primary : textColors.tertiary,
                    borderColor: activeTab === 'colors' ? primaryColorScale[500] : 'transparent',
                  }}
                >
                  Colors
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="typography"
                  className="px-4 py-3 text-sm font-medium border-b-2 border-transparent outline-none transition-colors data-[state=active]:border-current"
                  style={{
                    color: activeTab === 'typography' ? textColors.primary : textColors.tertiary,
                    borderColor: activeTab === 'typography' ? primaryColorScale[500] : 'transparent',
                  }}
                >
                  Typography
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="components"
                  className="px-4 py-3 text-sm font-medium border-b-2 border-transparent outline-none transition-colors data-[state=active]:border-current"
                  style={{
                    color: activeTab === 'components' ? textColors.primary : textColors.tertiary,
                    borderColor: activeTab === 'components' ? primaryColorScale[500] : 'transparent',
                  }}
                >
                  Components
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="brand"
                  className="px-4 py-3 text-sm font-medium border-b-2 border-transparent outline-none transition-colors data-[state=active]:border-current"
                  style={{
                    color: activeTab === 'brand' ? textColors.primary : textColors.tertiary,
                    borderColor: activeTab === 'brand' ? primaryColorScale[500] : 'transparent',
                  }}
                >
                  Brand
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="export"
                  className="px-4 py-3 text-sm font-medium border-b-2 border-transparent outline-none transition-colors data-[state=active]:border-current"
                  style={{
                    color: activeTab === 'export' ? textColors.primary : textColors.tertiary,
                    borderColor: activeTab === 'export' ? primaryColorScale[500] : 'transparent',
                  }}
                >
                  Export
                </Tabs.Trigger>
              </Tabs.List>
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto">
              {/* Colors Tab */}
              <Tabs.Content value="colors" className="p-6">
                <div className="max-w-6xl mx-auto space-y-8">
                  {/* Primary Colors */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2
                        className="text-sm font-medium"
                        style={{
                          fontFamily: headingFont.family,
                          color: textColors.primary,
                        }}
                      >
                        Primary Colors
                      </h2>
                      <span
                        className="text-xs"
                        style={{ color: textColors.tertiary }}
                      >
                        11 shades
                      </span>
                    </div>
                    <ColorScaleDisplay colorScale={primaryColorScale} />
                  </div>

                  {/* Secondary Colors */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2
                        className="text-sm font-medium"
                        style={{
                          fontFamily: headingFont.family,
                          color: textColors.primary,
                        }}
                      >
                        Secondary Colors
                      </h2>
                      <span
                        className="text-xs"
                        style={{ color: textColors.tertiary }}
                      >
                        11 shades
                      </span>
                    </div>
                    <ColorScaleDisplay colorScale={accentColorScale} />
                  </div>

                  {/* Neutral Colors */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2
                        className="text-sm font-medium"
                        style={{
                          fontFamily: headingFont.family,
                          color: textColors.primary,
                        }}
                      >
                        Neutral Colors
                      </h2>
                      <span
                        className="text-xs"
                        style={{ color: textColors.tertiary }}
                      >
                        11 shades
                      </span>
                    </div>
                    <ColorScaleDisplay colorScale={neutralColorScale} />
                  </div>

                  {/* Extra palettes */}
                  {extraPalettes.map((palette) => (
                    <div key={palette.id}>
                      <div className="flex items-center justify-between mb-4">
                        <h2
                          className="text-sm font-medium"
                          style={{ fontFamily: headingFont.family, color: textColors.primary }}
                        >
                          {palette.name}
                        </h2>
                        <span className="text-xs" style={{ color: textColors.tertiary }}>
                          11 shades
                        </span>
                      </div>
                      <ColorScaleDisplay colorScale={palette.scale} />
                    </div>
                  ))}
                </div>
              </Tabs.Content>

              {/* Typography Tab */}
              <Tabs.Content value="typography" className="p-6">
                <div className="max-w-4xl mx-auto">
                  <FontPreview />
                </div>
              </Tabs.Content>

              {/* Components Tab */}
              <Tabs.Content value="components" className="p-6">
                <div className="max-w-7xl mx-auto">
                  <div
                    className={`grid md:grid-cols-2 xl:grid-cols-3 gap-4 ${spacing.name}`}
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
                    <DemoChips />
                  </div>
                </div>
              </Tabs.Content>

              {/* Brand Tab */}
              <Tabs.Content value="brand" className="h-full">
                <BrandDocs />
              </Tabs.Content>

              {/* Export Tab */}
              <Tabs.Content value="export" className="p-6">
                <div className="max-w-4xl mx-auto">
                  <CodeExport
                    primaryColorScale={primaryColorScale}
                    accentColorScale={accentColorScale}
                    neutralColorScale={neutralColorScale}
                    extraPalettes={extraPalettes}
                    componentPaletteMap={componentPaletteMap}
                    componentSettingsMap={componentSettingsMap}
                    radius={radius}
                    spacing={spacing}
                  />
                </div>
              </Tabs.Content>
            </div>
          </Tabs.Root>
        </div>
      </div>
    </main>
  );
}
