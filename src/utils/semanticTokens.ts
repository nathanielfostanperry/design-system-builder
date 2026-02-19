/**
 * Semantic token definitions and default mappings.
 * Each token maps to a primitive reference (e.g. var(--color-neutral-900))
 * so that when color scales regenerate, semantic tokens update automatically.
 */

export type SemanticTokenId = string;

export interface SemanticTokenDef {
  id: SemanticTokenId;
  category: string;
  label: string;
  /** Default primitive reference, e.g. "neutral-900" or "primary-600" */
  defaultRef: string;
  /** Inline comment explaining intended use */
  description: string;
}

/** Format: "palette-shade" e.g. "neutral-900", "primary-600" */
export function primitiveToVar(ref: string): string {
  const [palette, shade] = ref.split('-');
  return `var(--color-${palette}-${shade})`;
}

/** All semantic token definitions with default mappings and documentation */
export const SEMANTIC_TOKEN_DEFINITIONS: SemanticTokenDef[] = [
  // ── Backgrounds ─────────────────────────────────────────────────────
  {
    id: 'background-base',
    category: 'background',
    label: 'Base',
    defaultRef: 'neutral-50',
    description: 'Page or app background; lowest elevation',
  },
  {
    id: 'background-surface',
    category: 'background',
    label: 'Surface',
    defaultRef: 'white',
    description: 'Card, panel, modal backgrounds; elevated surfaces',
  },
  {
    id: 'background-subtle',
    category: 'background',
    label: 'Subtle',
    defaultRef: 'neutral-100',
    description: 'Hover states, disabled areas, subtle emphasis',
  },
  {
    id: 'background-inverse',
    category: 'background',
    label: 'Inverse',
    defaultRef: 'neutral-900',
    description: 'Inverted backgrounds (e.g. dark header on light page)',
  },
  // ── Text ─────────────────────────────────────────────────────────────
  {
    id: 'text-primary',
    category: 'text',
    label: 'Primary',
    defaultRef: 'neutral-900',
    description: 'Headings and primary body text; highest emphasis',
  },
  {
    id: 'text-secondary',
    category: 'text',
    label: 'Secondary',
    defaultRef: 'neutral-600',
    description: 'Supporting text, captions, labels',
  },
  {
    id: 'text-tertiary',
    category: 'text',
    label: 'Tertiary',
    defaultRef: 'neutral-400',
    description: 'Placeholder text, hints, lowest emphasis',
  },
  {
    id: 'text-disabled',
    category: 'text',
    label: 'Disabled',
    defaultRef: 'neutral-300',
    description: 'Text on disabled controls',
  },
  {
    id: 'text-inverse',
    category: 'text',
    label: 'Inverse',
    defaultRef: 'neutral-50',
    description: 'Text on dark/inverse backgrounds',
  },
  {
    id: 'text-brand',
    category: 'text',
    label: 'Brand',
    defaultRef: 'primary-600',
    description: 'Links, brand highlights in body text',
  },
  {
    id: 'text-on-brand',
    category: 'text',
    label: 'On Brand',
    defaultRef: 'white',
    description: 'Text on primary/brand-colored backgrounds (buttons, badges)',
  },
  // ── Border ───────────────────────────────────────────────────────────
  {
    id: 'border-default',
    category: 'border',
    label: 'Default',
    defaultRef: 'neutral-200',
    description: 'Standard borders for inputs, cards, dividers',
  },
  {
    id: 'border-subtle',
    category: 'border',
    label: 'Subtle',
    defaultRef: 'neutral-100',
    description: 'Very light borders; subtle separation',
  },
  {
    id: 'border-strong',
    category: 'border',
    label: 'Strong',
    defaultRef: 'neutral-400',
    description: 'Emphasized borders; focus or high-contrast separation',
  },
  {
    id: 'border-focus',
    category: 'border',
    label: 'Focus',
    defaultRef: 'primary-500',
    description: 'Focus ring / outline color for keyboard navigation',
  },
  // ── Interactive ──────────────────────────────────────────────────────
  {
    id: 'interactive-default',
    category: 'interactive',
    label: 'Default',
    defaultRef: 'primary-600',
    description: 'Primary button, link, or interactive element default state',
  },
  {
    id: 'interactive-hover',
    category: 'interactive',
    label: 'Hover',
    defaultRef: 'primary-700',
    description: 'Hover state for primary interactive elements',
  },
  {
    id: 'interactive-active',
    category: 'interactive',
    label: 'Active',
    defaultRef: 'primary-800',
    description: 'Active/pressed state for primary interactive elements',
  },
  {
    id: 'interactive-disabled',
    category: 'interactive',
    label: 'Disabled',
    defaultRef: 'neutral-300',
    description: 'Disabled interactive elements',
  },
  {
    id: 'interactive-focus-ring',
    category: 'interactive',
    label: 'Focus Ring',
    defaultRef: 'primary-500',
    description: 'Focus ring with 50% opacity for accessibility',
  },
  // ── Status: Success ──────────────────────────────────────────────────
  {
    id: 'status-success-bg',
    category: 'status-success',
    label: 'Background',
    defaultRef: 'neutral-100',
    description: 'Success message or alert background',
  },
  {
    id: 'status-success-text',
    category: 'status-success',
    label: 'Text',
    defaultRef: 'neutral-800',
    description: 'Success message text',
  },
  {
    id: 'status-success-border',
    category: 'status-success',
    label: 'Border',
    defaultRef: 'neutral-200',
    description: 'Success message border',
  },
  // ── Status: Warning ──────────────────────────────────────────────────
  {
    id: 'status-warning-bg',
    category: 'status-warning',
    label: 'Background',
    defaultRef: 'secondary-50',
    description: 'Warning message or alert background',
  },
  {
    id: 'status-warning-text',
    category: 'status-warning',
    label: 'Text',
    defaultRef: 'secondary-700',
    description: 'Warning message text',
  },
  {
    id: 'status-warning-border',
    category: 'status-warning',
    label: 'Border',
    defaultRef: 'secondary-200',
    description: 'Warning message border',
  },
  // ── Status: Error ────────────────────────────────────────────────────
  {
    id: 'status-error-bg',
    category: 'status-error',
    label: 'Background',
    defaultRef: 'secondary-50',
    description: 'Error message or alert background',
  },
  {
    id: 'status-error-text',
    category: 'status-error',
    label: 'Text',
    defaultRef: 'secondary-700',
    description: 'Error message text',
  },
  {
    id: 'status-error-border',
    category: 'status-error',
    label: 'Border',
    defaultRef: 'secondary-200',
    description: 'Error message border',
  },
  // ── Status: Info ─────────────────────────────────────────────────────
  {
    id: 'status-info-bg',
    category: 'status-info',
    label: 'Background',
    defaultRef: 'primary-50',
    description: 'Info message or alert background',
  },
  {
    id: 'status-info-text',
    category: 'status-info',
    label: 'Text',
    defaultRef: 'primary-700',
    description: 'Info message text',
  },
  {
    id: 'status-info-border',
    category: 'status-info',
    label: 'Border',
    defaultRef: 'primary-200',
    description: 'Info message border',
  },
  // ── Brand ───────────────────────────────────────────────────────────
  {
    id: 'brand-primary',
    category: 'brand',
    label: 'Primary',
    defaultRef: 'primary-600',
    description: 'Primary brand color; main CTAs, links',
  },
  {
    id: 'brand-secondary',
    category: 'brand',
    label: 'Secondary',
    defaultRef: 'secondary-600',
    description: 'Secondary brand color; accents, highlights',
  },
  {
    id: 'brand-accent',
    category: 'brand',
    label: 'Accent',
    defaultRef: 'secondary-500',
    description: 'Accent color for emphasis and decoration',
  },
];

/** Resolve a primitive ref to a CSS var() string. Handles special cases like "white". */
export function resolvePrimitiveRef(ref: string): string {
  if (ref === 'white') return '#ffffff';
  const [palette, shade] = ref.split('-');
  if (!palette || !shade) return ref;
  return `var(--color-${palette}-${shade})`;
}

/** Get the effective mapping for a token (override or default) */
export function getEffectiveMapping(
  tokenId: string,
  overrides: Record<string, string>
): string {
  return overrides[tokenId] ?? SEMANTIC_TOKEN_DEFINITIONS.find((t) => t.id === tokenId)?.defaultRef ?? '';
}

/** Shade scale used by color palettes */
export const SHADE_SCALE = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const;

/** Build list of primitive ref options for override UI */
export function getPrimitiveRefOptions(extraPaletteSlugs: string[] = []): { value: string; label: string }[] {
  const palettes = [
    { slug: 'primary', label: 'Primary' },
    { slug: 'secondary', label: 'Secondary' },
    { slug: 'neutral', label: 'Neutral' },
    ...extraPaletteSlugs.map((slug) => ({ slug, label: slug })),
  ];
  const options: { value: string; label: string }[] = [{ value: 'white', label: 'White' }];
  palettes.forEach(({ slug, label }) => {
    SHADE_SCALE.forEach((shade) => {
      options.push({ value: `${slug}-${shade}`, label: `${label} ${shade}` });
    });
  });
  return options;
}

/** Group tokens by category for display */
export const SEMANTIC_CATEGORIES = [
  { id: 'background', label: 'Backgrounds' },
  { id: 'text', label: 'Text' },
  { id: 'border', label: 'Border' },
  { id: 'interactive', label: 'Interactive' },
  { id: 'status-success', label: 'Status: Success' },
  { id: 'status-warning', label: 'Status: Warning' },
  { id: 'status-error', label: 'Status: Error' },
  { id: 'status-info', label: 'Status: Info' },
  { id: 'brand', label: 'Brand' },
] as const;
