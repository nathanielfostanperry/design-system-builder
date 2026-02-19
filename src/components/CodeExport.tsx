'use client';

import React, { useState } from 'react';
import type { ExtraPalette } from '@/context/DesignSystemContext';
import type { FontOption } from '@/types/designSystem';
import {
  SEMANTIC_TOKEN_DEFINITIONS,
  getEffectiveMapping,
  resolvePrimitiveRef,
} from '@/utils/semanticTokens';
import {
  SEMANTIC_TYPOGRAPHY_DEFINITIONS,
  getEffectiveTypographyMapping,
} from '@/utils/semanticTypography';

const getFontWeightValue = (w: string) => ({ thin: '300', regular: '400', bold: '700', extrabold: '800' }[w] ?? '400');
const getFontSizeValue = (s: string) =>
  ({ xxs: '0.625rem', xs: '0.75rem', sm: '0.875rem', regular: '1rem', lg: '1.25rem', xl: '1.5rem', xxl: '2rem' }[s] ?? '1rem');

interface CodeExportProps {
  primaryColorScale: Record<string, string>;
  accentColorScale: Record<string, string>;
  neutralColorScale: Record<string, string>;
  extraPalettes?: ExtraPalette[];
  semanticTokenOverrides?: Record<string, string>;
  headingFont?: FontOption;
  bodyFont?: FontOption;
  codeFont?: FontOption;
  typographyTokenOverrides?: Record<string, { fontRef?: string; size?: string; weight?: string }>;
  radius: { name: string; label: string };
  spacing: { name: string; label: string };
}

// Convert a human name like "Accent 1" or "My Brand Color" to a CSS-safe slug
const toSlug = (name: string) =>
  name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const CodeExport: React.FC<CodeExportProps> = ({
  primaryColorScale,
  accentColorScale,
  neutralColorScale,
  extraPalettes = [],
  semanticTokenOverrides = {},
  headingFont,
  bodyFont,
  codeFont,
  typographyTokenOverrides = {},
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

    // ── Font primitives ───────────────────────────────────
    if (headingFont && bodyFont && codeFont) {
      css += `\n  /* Font primitives */\n`;
      css += `  --font-heading: ${headingFont.family}, sans-serif;\n`;
      css += `  --font-body: ${bodyFont.family}, sans-serif;\n`;
      css += `  --font-code: ${codeFont.family}, monospace;\n`;

      // ── Semantic typography tokens ─────────────────────
      css += `\n  /* Semantic typography tokens */\n`;
      const fontMap = { heading: headingFont, body: bodyFont, code: codeFont };
      SEMANTIC_TYPOGRAPHY_DEFINITIONS.forEach((token) => {
        const { fontRef, size, weight } = getEffectiveTypographyMapping(token.id, typographyTokenOverrides);
        const font = fontMap[fontRef];
        const sizeVal = getFontSizeValue(size ?? token.defaultSize ?? font.size);
        const weightVal = getFontWeightValue(weight ?? token.defaultWeight ?? font.weight);
        css += `  /* ${token.description} */\n`;
        css += `  --font-semantic-${token.id}: var(--font-${fontRef});\n`;
        css += `  --font-size-semantic-${token.id}: ${sizeVal};\n`;
        css += `  --font-weight-semantic-${token.id}: ${weightVal};\n`;
      });
    }

    // ── Semantic tokens (purpose-driven, map to primitives) ─
    css += `\n  /* Semantic tokens */\n`;
    SEMANTIC_TOKEN_DEFINITIONS.forEach((token) => {
      const ref = getEffectiveMapping(token.id, semanticTokenOverrides);
      if (!ref) return;
      let value: string;
      if (token.id === 'interactive-focus-ring') {
        // Focus ring with 50% opacity for accessibility
        const [palette, shade] = ref.split('-');
        const varRef = palette && shade ? `var(--color-${palette}-${shade})` : ref;
        value = `color-mix(in srgb, ${varRef} 50%, transparent)`;
      } else {
        value = resolvePrimitiveRef(ref);
      }
      css += `  /* ${token.description} */\n`;
      css += `  --semantic-${token.id}: ${value};\n`;
    });

    // ── Component assignments (semantic tokens where possible) ─────────
    css += `\n  /* Component assignments (reference semantic tokens) */\n`;
    // Primary button uses interactive semantic tokens
    css += `  --component-button-primary-bg: var(--semantic-interactive-default);\n`;
    css += `  --component-button-primary-bg-hover: var(--semantic-interactive-hover);\n`;
    css += `  --component-button-primary-bg-active: var(--semantic-interactive-active);\n`;
    css += `  --component-button-primary-text: var(--semantic-text-on-brand);\n`;
    css += `  --component-button-primary-border: var(--semantic-border-default);\n`;
    css += `  --component-button-primary-focus-ring: var(--semantic-interactive-focus-ring);\n`;
    // Secondary button, input, etc. use border/surface semantics
    css += `  --component-button-secondary-border: var(--semantic-border-default);\n`;
    css += `  --component-input-border: var(--semantic-border-default);\n`;
    css += `  --component-input-border-focus: var(--semantic-border-focus);\n`;
    css += `  --component-card-surface: var(--semantic-background-surface);\n`;

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

    if (headingFont && bodyFont && codeFont) {
      scss += `\n// ── Font primitives ─────────────────────────────────\n`;
      scss += `$font-heading: ${headingFont.family}, sans-serif;\n`;
      scss += `$font-body: ${bodyFont.family}, sans-serif;\n`;
      scss += `$font-code: ${codeFont.family}, monospace;\n`;

      scss += `\n// ── Semantic typography tokens ─────────────────────\n`;
      const fontMap = { heading: headingFont, body: bodyFont, code: codeFont };
      SEMANTIC_TYPOGRAPHY_DEFINITIONS.forEach((token) => {
        const { fontRef, size, weight } = getEffectiveTypographyMapping(token.id, typographyTokenOverrides);
        const font = fontMap[fontRef];
        const sizeVal = getFontSizeValue(size ?? token.defaultSize ?? font.size);
        const weightVal = getFontWeightValue(weight ?? token.defaultWeight ?? font.weight);
        scss += `// ${token.description}\n`;
        scss += `$font-semantic-${token.id}: $font-${fontRef};\n`;
        scss += `$font-size-semantic-${token.id}: ${sizeVal};\n`;
        scss += `$font-weight-semantic-${token.id}: ${weightVal};\n`;
      });
    }

    // Semantic tokens
    scss += `\n// ── Semantic tokens ──────────────────────────────────\n`;
    SEMANTIC_TOKEN_DEFINITIONS.forEach((token) => {
      const ref = getEffectiveMapping(token.id, semanticTokenOverrides);
      if (!ref) return;
      let value: string;
      if (token.id === 'interactive-focus-ring') {
        const [palette, shade] = ref.split('-');
        const varRef = palette && shade ? `var(--color-${palette}-${shade})` : ref;
        value = `color-mix(in srgb, ${varRef} 50%, transparent)`;
      } else {
        value = resolvePrimitiveRef(ref);
      }
      scss += `// ${token.description}\n`;
      scss += `$semantic-${token.id}: ${value};\n`;
    });

    // Component assignments (semantic tokens)
    scss += `\n// ── Component assignments (reference semantic tokens) ───\n`;
    scss += `$component-button-primary-bg: var(--semantic-interactive-default);\n`;
    scss += `$component-button-primary-bg-hover: var(--semantic-interactive-hover);\n`;
    scss += `$component-button-primary-bg-active: var(--semantic-interactive-active);\n`;
    scss += `$component-button-primary-text: var(--semantic-text-on-brand);\n`;
    scss += `$component-button-primary-border: var(--semantic-border-default);\n`;
    scss += `$component-button-primary-focus-ring: var(--semantic-interactive-focus-ring);\n`;
    scss += `$component-button-secondary-border: var(--semantic-border-default);\n`;
    scss += `$component-input-border: var(--semantic-border-default);\n`;
    scss += `$component-input-border-focus: var(--semantic-border-focus);\n`;
    scss += `$component-card-surface: var(--semantic-background-surface);\n`;

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
