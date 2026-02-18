import React, { useState } from 'react';

interface CodeExportProps {
  primaryColorScale: Record<string, string>;
  accentColorScale: Record<string, string>;
  neutralColorScale: Record<string, string>;
  radius: { name: string; label: string };
  spacing: { name: string; label: string };
}

const CodeExport: React.FC<CodeExportProps> = ({
  primaryColorScale,
  accentColorScale,
  neutralColorScale,
  radius,
  spacing,
}) => {
  const [copied, setCopied] = useState(false);
  const [exportFormat, setExportFormat] = useState<'css' | 'scss'>(
    'css'
  );

  // Generate CSS variables
  const generateCssVariables = () => {
    let css = `:root {\n`;

    // Primary colors
    Object.entries(primaryColorScale).forEach(([shade, color]) => {
      css += `  --color-primary-${shade}: ${color};\n`;
    });

    // Accent colors
    Object.entries(accentColorScale).forEach(([shade, color]) => {
      css += `  --color-accent-${shade}: ${color};\n`;
    });

    // Neutral colors
    Object.entries(neutralColorScale).forEach(([shade, color]) => {
      css += `  --color-neutral-${shade}: ${color};\n`;
    });

    // Border radius
    css += `  --radius: ${radius.name};\n`;

    // Spacing
    css += `  --spacing: ${spacing.name};\n`;

    css += `}`;
    return css;
  };

  // Generate SCSS variables
  const generateScssVariables = () => {
    let scss = `// Primary Colors\n`;

    Object.entries(primaryColorScale).forEach(([shade, color]) => {
      scss += `$color-primary-${shade}: ${color};\n`;
    });

    scss += `\n// Accent Colors\n`;
    Object.entries(accentColorScale).forEach(([shade, color]) => {
      scss += `$color-accent-${shade}: ${color};\n`;
    });

    scss += `\n// Neutral Colors\n`;
    Object.entries(neutralColorScale).forEach(([shade, color]) => {
      scss += `$color-neutral-${shade}: ${color};\n`;
    });

    scss += `\n// Border Radius\n`;
    scss += `$radius: ${radius.name};\n`;

    scss += `\n// Spacing\n`;
    scss += `$spacing: ${spacing.name};\n`;

    return scss;
  };

  const getExportCode = () => {
    switch (exportFormat) {
      case 'css':
        return generateCssVariables();
      case 'scss':
        return generateScssVariables();
      default:
        return generateCssVariables();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getExportCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-16 border rounded-lg p-8">
      <div className="flex justify-center mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            onClick={() => setExportFormat('css')}
            className={`px-4 py-2 text-sm font-medium border rounded-l-md ${
              exportFormat === 'css'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            CSS Variables
          </button>
          <button
            onClick={() => setExportFormat('scss')}
            className={`px-4 py-2 text-sm font-medium border border-l-0 rounded-r-md ${
              exportFormat === 'scss'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            SCSS Variables
          </button>
        </div>
      </div>

      <div className="bg-gray-900 rounded-md overflow-hidden">
        <div className="flex justify-between items-center px-4 py-2 bg-gray-800">
          <span className="text-gray-400 text-sm">
            {exportFormat === 'css' ? 'CSS Variables' : 'SCSS Variables'}
          </span>
          <button
            onClick={copyToClipboard}
            className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <pre className="p-4 text-gray-300 overflow-x-auto text-sm">
          <code>{getExportCode()}</code>
        </pre>
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        <p>
          Copy and paste this code into your project to use your design system
          colors.
        </p>
      </div>
    </div>
  );
};

export default CodeExport;
