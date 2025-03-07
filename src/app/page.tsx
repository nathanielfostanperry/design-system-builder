'use client';

import ColorSystemBuilder from '@/components/ColorSystemBuilder';
import ColorScaleDisplay from '@/components/ColorScaleDisplay';
import { useDesignSystem } from '@/context/DesignSystemContext';
import DemoInput from '@/components/demo/DemoInput';
import DemoCard from '@/components/demo/DemoCard';
import DemoToast from '@/components/demo/DemoToast';
import DemoDropdown from '@/components/demo/DemoDropdown';
import DemoTabs from '@/components/demo/DemoTabs';
import Corners from '@/components/Corners';
import Spacing from '@/components/Spacing';

export default function Home() {
  const { primaryColorScale, accentColorScale, neutralColorScale } =
    useDesignSystem();

  return (
    <main className="min-h-screen">
      <div className="grid md:grid-cols-2 gap-2 p-2">
        <div className="bg-red-50 rounded-lg p-8">
          <Corners />
          <Spacing />
          <ColorSystemBuilder />
        </div>
        <div className="p-8">
          <div className="space-y-8">
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
              <div className="space-y-8">
                <DemoInput />
                <DemoCard />
                <div className="grid grid-cols-2 gap-4">
                  <DemoToast />
                  <DemoDropdown />
                </div>
                <DemoTabs />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
