'use client';

import React, { useState } from 'react';
import type { ExtraPalette } from '@/context/DesignSystemContext';

interface CodeExportProps {
  primaryColorScale: Record<string, string>;
  accentColorScale: Record<string, string>;
  neutralColorScale: Record<string, string>;
  extraPalettes?: ExtraPalette[];
  componentPaletteMap?: Record<string, string>;
  componentSettingsMap?: Record<string, Record<string, string>>;
  radius: { name: string; label: string };
  spacing: { name: string; label: string };
}

// Convert a human name like "Accent 1" or "My Brand Color" to a CSS-safe slug
const toSlug = (name: string) =>
  name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

// Convert camelCase key like "arrowType" to "arrow-type"
const camelToKebab = (key: string) =>
  key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const CodeExport: React.FC<CodeExportProps> = ({
  primaryColorScale,
  accentColorScale,
  neutralColorScale,
  extraPalettes = [],
  componentPaletteMap = {},
  componentSettingsMap = {},
  radius,
  spacing,
}) => {
  const [copied, setCopied] = useState(false);
  const [exportFormat, setExportFormat] = useState<'css' | 'scss'>('css');

  const generateCssVariables = () => {
    let css = `:root {\n`;

    // ── Color scales ──────────────────────────────────────
    css += `\n  /* Primary */\n`;
    Object.entries(primaryColorScale).forEach(([shade, color]) => {
      css += `  --color-primary-${shade}: ${color};\n`;
    });

    css += `\n  /* Secondary */\n`;
    Object.entries(accentColorScale).forEach(([shade, color]) => {
      css += `  --color-secondary-${shade}: ${color};\n`;
    });

    css += `\n  /* Neutral */\n`;
    Object.entries(neutralColorScale).forEach(([shade, color]) => {
      css += `  --color-neutral-${shade}: ${color};\n`;
    });

    if (extraPalettes.length > 0) {
      extraPalettes.forEach((palette) => {
        const slug = toSlug(palette.name);
        css += `\n  /* ${palette.name} */\n`;
        Object.entries(palette.scale).forEach(([shade, color]) => {
          css += `  --color-${slug}-${shade}: ${color};\n`;
        });
      });
    }

    // ── Design tokens ─────────────────────────────────────
    css += `\n  /* Tokens */\n`;
    css += `  --radius: ${radius.name};\n`;
    css += `  --spacing: ${spacing.name};\n`;

    // ── Component palette assignments ─────────────────────
    if (Object.keys(componentPaletteMap).length > 0) {
      css += `\n  /* Component palette assignments */\n`;
      Object.entries(componentPaletteMap).forEach(([componentId, paletteId]) => {
        css += `  --component-${componentId}-palette: ${paletteId};\n`;
      });
    }

    // ── Component style settings ──────────────────────────
    if (Object.keys(componentSettingsMap).length > 0) {
      css += `\n  /* Component style settings */\n`;
      Object.entries(componentSettingsMap).forEach(([componentId, settings]) => {
        Object.entries(settings).forEach(([key, value]) => {
          css += `  --component-${componentId}-${camelToKebab(key)}: ${value};\n`;
        });
      });
    }

    css += `}`;
    return css;
  };

  const generateScssVariables = () => {
    let scss = `// ── Primary Colors ───────────────────────────────────\n`;
    Object.entries(primaryColorScale).forEach(([shade, color]) => {
      scss += `$color-primary-${shade}: ${color};\n`;
    });

    scss += `\n// ── Secondary Colors ─────────────────────────────────\n`;
    Object.entries(accentColorScale).forEach(([shade, color]) => {
      scss += `$color-secondary-${shade}: ${color};\n`;
    });

    scss += `\n// ── Neutral Colors ───────────────────────────────────\n`;
    Object.entries(neutralColorScale).forEach(([shade, color]) => {
      scss += `$color-neutral-${shade}: ${color};\n`;
    });

    if (extraPalettes.length > 0) {
      extraPalettes.forEach((palette) => {
        const slug = toSlug(palette.name);
        scss += `\n// ── ${palette.name} ───────────────────────────────────\n`;
        Object.entries(palette.scale).forEach(([shade, color]) => {
          scss += `$color-${slug}-${shade}: ${color};\n`;
        });
      });
    }

    scss += `\n// ── Tokens ───────────────────────────────────────────\n`;
    scss += `$radius: ${radius.name};\n`;
    scss += `$spacing: ${spacing.name};\n`;

    if (Object.keys(componentPaletteMap).length > 0) {
      scss += `\n// ── Component Palette Assignments ────────────────────\n`;
      Object.entries(componentPaletteMap).forEach(([componentId, paletteId]) => {
        scss += `$component-${componentId}-palette: ${paletteId};\n`;
      });
    }

    if (Object.keys(componentSettingsMap).length > 0) {
      scss += `\n// ── Component Style Settings ─────────────────────────\n`;
      Object.entries(componentSettingsMap).forEach(([componentId, settings]) => {
        Object.entries(settings).forEach(([key, value]) => {
          scss += `$component-${componentId}-${camelToKebab(key)}: ${value};\n`;
        });
      });
    }

    return scss;
  };

  const getExportCode = () =>
    exportFormat === 'scss' ? generateScssVariables() : generateCssVariables();

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
          Copy and paste this code into your project to use your design system tokens.
        </p>
      </div>
    </div>
  );
};

export default CodeExport;
