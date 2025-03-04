import React from 'react';

interface DesignSystemPreviewProps {
  primaryColor: string;
  accentColor: string;
  primaryColorScale: Record<string, string>;
  accentColorScale: Record<string, string>;
  neutralColorScale: Record<string, string>;
}

const DesignSystemPreview: React.FC<DesignSystemPreviewProps> = ({
  primaryColor,
  accentColor,
  primaryColorScale,
  accentColorScale,
  neutralColorScale,
}) => {
  return (
    <div className="mt-16 border rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Design System Preview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Buttons */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-4">Buttons</h3>

          <div className="space-y-4">
            <div>
              <button
                style={{ backgroundColor: primaryColorScale['500'] }}
                className="px-4 py-2 rounded-md text-white font-medium shadow-sm hover:shadow-md transition-all"
              >
                Primary Button
              </button>
            </div>

            <div>
              <button
                style={{ backgroundColor: accentColorScale['500'] }}
                className="px-4 py-2 rounded-md text-white font-medium shadow-sm hover:shadow-md transition-all"
              >
                Accent Button
              </button>
            </div>

            <div>
              <button
                style={{
                  backgroundColor: 'white',
                  color: primaryColorScale['600'],
                  borderColor: primaryColorScale['300'],
                  borderWidth: '1px',
                }}
                className="px-4 py-2 rounded-md font-medium shadow-sm hover:shadow-md transition-all"
              >
                Outline Button
              </button>
            </div>

            <div>
              <button
                style={{
                  backgroundColor: neutralColorScale['100'],
                  color: neutralColorScale['800'],
                }}
                className="px-4 py-2 rounded-md font-medium shadow-sm hover:shadow-md transition-all"
              >
                Neutral Button
              </button>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold mb-4">Cards</h3>

          <div
            className="rounded-lg shadow-md p-6 border"
            style={{ borderColor: neutralColorScale['200'] }}
          >
            <div
              className="text-lg font-bold mb-2"
              style={{ color: neutralColorScale['800'] }}
            >
              Neutral Card
            </div>
            <p
              className="text-sm mb-4"
              style={{ color: neutralColorScale['700'] }}
            >
              This is a sample card using your neutral colors.
            </p>
            <button
              style={{ backgroundColor: primaryColorScale['500'] }}
              className="px-3 py-1 rounded text-white text-sm"
            >
              Action
            </button>
          </div>

          <div
            className="rounded-lg shadow-md p-6"
            style={{
              backgroundColor: neutralColorScale['100'],
              borderColor: neutralColorScale['200'],
              borderWidth: '1px',
            }}
          >
            <div
              className="text-lg font-bold mb-2"
              style={{ color: primaryColorScale['700'] }}
            >
              Mixed Card
            </div>
            <p
              className="text-sm mb-4"
              style={{ color: neutralColorScale['800'] }}
            >
              Combining primary and neutral colors.
            </p>
            <button
              style={{ backgroundColor: accentColorScale['500'] }}
              className="px-3 py-1 rounded text-white text-sm"
            >
              Action
            </button>
          </div>
        </div>
      </div>

      {/* Alert Examples */}
      <div className="mt-10 space-y-4">
        <h3 className="text-xl font-semibold mb-4">Alerts</h3>

        <div
          className="p-4 rounded-md"
          style={{
            backgroundColor: neutralColorScale['100'],
            color: neutralColorScale['800'],
          }}
        >
          <div className="font-medium">Neutral Alert</div>
          <p className="text-sm">
            This is an alert using your neutral colors - perfect for standard
            notifications.
          </p>
        </div>

        <div
          className="p-4 rounded-md border-l-4"
          style={{
            backgroundColor: neutralColorScale['50'],
            borderLeftColor: primaryColorScale['500'],
            color: neutralColorScale['900'],
          }}
        >
          <div className="font-medium">Information Alert</div>
          <p className="text-sm">
            Combining neutral backgrounds with primary accents creates a
            balanced look.
          </p>
        </div>
      </div>

      {/* Typography */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Typography</h3>

        <div className="space-y-4">
          <h1
            className="text-3xl font-bold"
            style={{ color: neutralColorScale['900'] }}
          >
            Heading 1 with Neutral
          </h1>

          <h2
            className="text-2xl font-bold"
            style={{ color: primaryColorScale['700'] }}
          >
            Heading 2 with Primary
          </h2>

          <h3
            className="text-xl font-semibold"
            style={{ color: accentColorScale['600'] }}
          >
            Heading 3 with Accent
          </h3>

          <p style={{ color: neutralColorScale['800'] }}>
            Body text using neutral colors provides optimal readability while
            maintaining your brand's character. These neutral colors are derived
            from your primary color for a cohesive design system.
          </p>

          <div
            className="p-4 rounded"
            style={{ backgroundColor: neutralColorScale['100'] }}
          >
            <p style={{ color: neutralColorScale['900'] }}>
              Using neutral backgrounds for content areas creates a clean,
              professional look while still maintaining subtle brand connection
              through the color derivation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignSystemPreview;
