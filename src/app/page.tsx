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
import Borders from '@/components/Borders';
import Fonts from '@/components/Fonts';
import FontPreview from '@/components/FontPreview';
import CodeExport from '@/components/CodeExport';
import IconLibraryPicker from '@/components/IconLibraryPicker';

export default function Home() {
  const {
    primaryColorScale,
    accentColorScale,
    neutralColorScale,
    spacing,
    radius,
    isDarkMode,
    headingFont,
    bodyFont,
  } = useDesignSystem();

  // Professional spacing scale: 4px base
  const space = {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '48px',
  };

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

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: isDarkMode
          ? neutralColorScale['900']
          : neutralColorScale['50'],
        fontFamily: bodyFont.family,
      }}
    >
      {/* Header - Integrated, not separated */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          backgroundColor: getSurfaceColor(1),
          borderColor: getBorderColor(0.1),
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1
                className="text-xl font-semibold tracking-tight"
                style={{
                  fontFamily: headingFont.family,
                  color: textColors.primary,
                  letterSpacing: '-0.01em',
                }}
              >
                Design System Builder
              </h1>
              <p
                className="text-xs mt-1"
                style={{
                  color: textColors.tertiary,
                }}
              >
                Create and customize your design system
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main workspace - Single focused layout */}
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[320px_1fr] gap-8">
          {/* Controls sidebar - Subtle, organized */}
          <aside className="space-y-8">
            {/* Typography */}
            <div>
              <h2
                className="text-xs font-medium uppercase tracking-wider mb-4"
                style={{
                  fontFamily: headingFont.family,
                  color: textColors.tertiary,
                  letterSpacing: '0.05em',
                }}
              >
                Typography
              </h2>
              <div
                className="border rounded-lg p-4"
                style={{
                  backgroundColor: getSurfaceColor(1),
                  borderColor: getBorderColor(0.08),
                }}
              >
                <Fonts />
              </div>
            </div>

            {/* Design Tokens */}
            <div>
              <h2
                className="text-xs font-medium uppercase tracking-wider mb-4"
                style={{
                  fontFamily: headingFont.family,
                  color: textColors.tertiary,
                  letterSpacing: '0.05em',
                }}
              >
                Design Tokens
              </h2>
              <div
                className="border rounded-lg p-4 space-y-3"
                style={{
                  backgroundColor: getSurfaceColor(1),
                  borderColor: getBorderColor(0.08),
                }}
              >
                <IconLibraryPicker />
                <div className="grid grid-cols-2 gap-3">
                  <Corners />
                  <Spacing />
                  <Shadows />
                  <Borders />
                </div>
              </div>
            </div>

            {/* Color System */}
            <div>
              <h2
                className="text-xs font-medium uppercase tracking-wider mb-4"
                style={{
                  fontFamily: headingFont.family,
                  color: textColors.tertiary,
                  letterSpacing: '0.05em',
                }}
              >
                Colors
              </h2>
              <div
                className="border rounded-lg p-4"
                style={{
                  backgroundColor: getSurfaceColor(1),
                  borderColor: getBorderColor(0.08),
                }}
              >
                <ColorSystemBuilder />
              </div>
            </div>

            {/* Export */}
            <div>
              <h2
                className="text-xs font-medium uppercase tracking-wider mb-4"
                style={{
                  fontFamily: headingFont.family,
                  color: textColors.tertiary,
                  letterSpacing: '0.05em',
                }}
              >
                Export
              </h2>
              <div
                className="border rounded-lg p-4"
                style={{
                  backgroundColor: getSurfaceColor(1),
                  borderColor: getBorderColor(0.08),
                }}
              >
                <CodeExport
                  primaryColorScale={primaryColorScale}
                  accentColorScale={accentColorScale}
                  neutralColorScale={neutralColorScale}
                />
              </div>
            </div>
          </aside>

          {/* Preview area - Prominent, spacious */}
          <main className="space-y-12">
            {/* Color Scales - Prominent display */}
            <section>
              <div className="mb-6">
                <h2
                  className="text-sm font-medium mb-1"
                  style={{
                    fontFamily: headingFont.family,
                    color: textColors.primary,
                  }}
                >
                  Color Scales
                </h2>
                <p
                  className="text-xs"
                  style={{
                    color: textColors.tertiary,
                  }}
                >
                  Generated color scales from your selections
                </p>
              </div>
              <div
                className="border rounded-lg p-6 space-y-8"
                style={{
                  backgroundColor: getSurfaceColor(1),
                  borderColor: getBorderColor(0.08),
                }}
              >
                <div>
                  <h3
                    className="text-xs font-medium mb-3 uppercase tracking-wider"
                    style={{
                      color: textColors.secondary,
                      letterSpacing: '0.05em',
                    }}
                  >
                    Primary
                  </h3>
                  <ColorScaleDisplay colorScale={primaryColorScale} />
                </div>
                <div className="border-t" style={{ borderColor: getBorderColor(0.06) }}>
                  <h3
                    className="text-xs font-medium mb-3 mt-8 uppercase tracking-wider"
                    style={{
                      color: textColors.secondary,
                      letterSpacing: '0.05em',
                    }}
                  >
                    Accent
                  </h3>
                  <ColorScaleDisplay colorScale={accentColorScale} />
                </div>
                <div className="border-t" style={{ borderColor: getBorderColor(0.06) }}>
                  <h3
                    className="text-xs font-medium mb-3 mt-8 uppercase tracking-wider"
                    style={{
                      color: textColors.secondary,
                      letterSpacing: '0.05em',
                    }}
                  >
                    Neutral
                  </h3>
                  <ColorScaleDisplay colorScale={neutralColorScale} />
                </div>
              </div>
            </section>

            {/* Typography Preview */}
            <section>
              <div className="mb-6">
                <h2
                  className="text-sm font-medium mb-1"
                  style={{
                    fontFamily: headingFont.family,
                    color: textColors.primary,
                  }}
                >
                  Typography Preview
                </h2>
                <p
                  className="text-xs"
                  style={{
                    color: textColors.tertiary,
                  }}
                >
                  See how your typography choices render
                </p>
              </div>
              <div
                className="border rounded-lg p-6"
                style={{
                  backgroundColor: getSurfaceColor(1),
                  borderColor: getBorderColor(0.08),
                }}
              >
                <FontPreview />
              </div>
            </section>

            {/* Component Library - The signature feature */}
            <section>
              <div className="mb-6">
                <h2
                  className="text-sm font-medium mb-1"
                  style={{
                    fontFamily: headingFont.family,
                    color: textColors.primary,
                  }}
                >
                  Component Library
                </h2>
                <p
                  className="text-xs"
                  style={{
                    color: textColors.tertiary,
                  }}
                >
                  Live preview of components using your design system
                </p>
              </div>
              <div
                className="border rounded-lg p-6"
                style={{
                  backgroundColor: getSurfaceColor(1),
                  borderColor: getBorderColor(0.08),
                }}
              >
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
                  <DemoTabs />
                  <DemoChips />
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </main>
  );
}
