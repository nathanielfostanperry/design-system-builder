'use client';

import ColorSystemBuilder from '@/components/ColorSystemBuilder';
import ColorScaleDisplay from '@/components/ColorScaleDisplay';
import { useDesignSystem } from '@/context/DesignSystemContext';
import DemoInput from '@/components/demo/DemoInput';
import DemoCard from '@/components/demo/DemoCard';
import DemoToast from '@/components/demo/DemoToast';
import DemoDropdown from '@/components/demo/DemoDropdown';
import DemoTabs from '@/components/demo/DemoTabs';
import DemoButtons from '@/components/demo/DemoButtons';
import DemoCards from '@/components/demo/DemoCards';
import DemoChips from '@/components/demo/DemoChips';
import DemoInteractive from '@/components/demo/DemoInteractive';
import Corners from '@/components/Corners';
import Spacing from '@/components/Spacing';

export default function Home() {
  const {
    primaryColorScale,
    accentColorScale,
    neutralColorScale,
    spacing,
    radius,
  } = useDesignSystem();

  return (
    <main className="min-h-screen">
      <div className="grid md:grid-cols-2 gap-2 p-2">
        {/* Control panel */}
        <div className={`bg-red-50 p-8 ${radius.name}`}>
          <Corners />
          <Spacing />
          <ColorSystemBuilder />
        </div>
        {/* Result Panel */}
        <div className={`p-8 ${radius.name}`}>
          <div className={`space-y-8 ${spacing.name}`}>
            <div>
              <h3 className="text-xl font-semibold mb-4">Primary Colors</h3>
              <ColorScaleDisplay colorScale={primaryColorScale} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Secondary Colors</h3>
              <ColorScaleDisplay colorScale={accentColorScale} />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Gray Colors</h3>
              <ColorScaleDisplay colorScale={neutralColorScale} />
            </div>

            {/* Demo Components Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-8">Demo Components</h2>
              <div className={`space-y-8 ${spacing.name}`}>
                <div>
                  <h3 className="text-lg font-medium mb-4">Buttons</h3>
                  <DemoButtons />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Cards</h3>
                  <DemoCards />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Form Elements</h3>
                  <DemoInput />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Interactive Controls
                  </h3>
                  <DemoInteractive />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Notifications & Menus
                  </h3>
                  <div className={`grid grid-cols-2 ${spacing.name}`}>
                    <DemoToast />
                    <DemoDropdown />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Navigation</h3>
                  <DemoTabs />
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Theme & Tags</h3>
                  <DemoChips />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
