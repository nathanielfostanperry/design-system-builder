'use client';

import ColorSystemBuilder from '@/components/ColorSystemBuilder';
import ColorScaleDisplay from '@/components/ColorScaleDisplay';
import { useDesignSystem } from '@/context/DesignSystemContext';

export default function Home() {
  const { primaryColorScale, accentColorScale, neutralColorScale } =
    useDesignSystem();

  return (
    <main className="min-h-screen">
      <div className="grid md:grid-cols-2 gap-2 p-2">
        <div className="bg-red-50 rounded-lg p-8">
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
          </div>
        </div>
      </div>
    </main>
  );
}
