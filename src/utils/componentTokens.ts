/**
 * Component-level token definitions.
 * Each component token maps to a semantic token or primitive by default,
 * allowing component-specific overrides (e.g. secondary button with unique color).
 */

export type ComponentTokenRef = string; // "primary-500" | "semantic:background-subtle"

export interface ComponentTokenDef {
  componentId: string;
  tokenKey: string;
  label: string;
  /** Default ref: primitive (primary-500) or semantic (semantic:background-subtle) */
  defaultRef: ComponentTokenRef;
  description: string;
}

/** Full token id for storage: "button-secondary-bg" */
export function toComponentTokenId(componentId: string, tokenKey: string): string {
  return `${componentId}-${tokenKey}`;
}

/** Check if ref points to a semantic token */
export function isSemanticRef(ref: string): boolean {
  return ref.startsWith('semantic:');
}

/** Resolve ref to CSS var. Semantic refs become var(--semantic-X), primitives become var(--color-X-Y) */
export function resolveComponentTokenRef(ref: string): string {
  if (ref === 'white') return '#ffffff';
  if (ref === 'transparent') return 'transparent';
  if (isSemanticRef(ref)) {
    const semanticId = ref.slice('semantic:'.length);
    return `var(--semantic-${semanticId})`;
  }
  const parts = ref.split('-');
  if (parts.length < 2) return ref;
  const shade = parts[parts.length - 1];
  const palette = parts.slice(0, -1).join('-');
  return `var(--color-${palette}-${shade})`;
}

/** All component token definitions */
export const COMPONENT_TOKEN_DEFINITIONS: ComponentTokenDef[] = [
  // ── Buttons ─────────────────────────────────────────────────────────
  {
    componentId: 'button-primary',
    tokenKey: 'bg',
    label: 'Background',
    defaultRef: 'semantic:interactive-default',
    description: 'Default background color',
  },
  {
    componentId: 'button-primary',
    tokenKey: 'bg-hover',
    label: 'Background (hover)',
    defaultRef: 'semantic:interactive-hover',
    description: 'Hover state background',
  },
  {
    componentId: 'button-primary',
    tokenKey: 'bg-active',
    label: 'Background (active)',
    defaultRef: 'semantic:interactive-active',
    description: 'Active/pressed state background',
  },
  {
    componentId: 'button-primary',
    tokenKey: 'text',
    label: 'Text',
    defaultRef: 'semantic:text-on-brand',
    description: 'Text color on button',
  },
  {
    componentId: 'button-primary',
    tokenKey: 'border',
    label: 'Border',
    defaultRef: 'semantic:border-default',
    description: 'Border color',
  },
  {
    componentId: 'button-secondary',
    tokenKey: 'bg',
    label: 'Background',
    defaultRef: 'transparent',
    description: 'Default background (transparent or subtle)',
  },
  {
    componentId: 'button-secondary',
    tokenKey: 'bg-hover',
    label: 'Background (hover)',
    defaultRef: 'semantic:background-subtle',
    description: 'Hover state background',
  },
  {
    componentId: 'button-secondary',
    tokenKey: 'text',
    label: 'Text',
    defaultRef: 'semantic:text-primary',
    description: 'Text color',
  },
  {
    componentId: 'button-secondary',
    tokenKey: 'border',
    label: 'Border',
    defaultRef: 'semantic:border-default',
    description: 'Border color',
  },
  {
    componentId: 'icon-button',
    tokenKey: 'bg',
    label: 'Background',
    defaultRef: 'semantic:interactive-default',
    description: 'Button background',
  },
  {
    componentId: 'icon-button',
    tokenKey: 'text',
    label: 'Icon color',
    defaultRef: 'semantic:text-on-brand',
    description: 'Icon color',
  },
  // ── Inputs ───────────────────────────────────────────────────────────
  {
    componentId: 'input',
    tokenKey: 'bg',
    label: 'Background',
    defaultRef: 'semantic:background-surface',
    description: 'Input background',
  },
  {
    componentId: 'input',
    tokenKey: 'border',
    label: 'Border',
    defaultRef: 'semantic:border-default',
    description: 'Border color',
  },
  {
    componentId: 'input',
    tokenKey: 'text',
    label: 'Text',
    defaultRef: 'semantic:text-primary',
    description: 'Text color',
  },
  {
    componentId: 'input',
    tokenKey: 'label',
    label: 'Label',
    defaultRef: 'semantic:text-primary',
    description: 'Label text color',
  },
  // ── Cards ───────────────────────────────────────────────────────────
  {
    componentId: 'card',
    tokenKey: 'bg',
    label: 'Background',
    defaultRef: 'semantic:background-surface',
    description: 'Card background',
  },
  {
    componentId: 'card',
    tokenKey: 'border',
    label: 'Border',
    defaultRef: 'semantic:border-default',
    description: 'Card border',
  },
  {
    componentId: 'card',
    tokenKey: 'title',
    label: 'Title',
    defaultRef: 'semantic:text-primary',
    description: 'Card title text color',
  },
  {
    componentId: 'card',
    tokenKey: 'body',
    label: 'Body',
    defaultRef: 'semantic:text-secondary',
    description: 'Card body text color',
  },
  {
    componentId: 'card',
    tokenKey: 'cta-bg',
    label: 'CTA / Button',
    defaultRef: 'semantic:brand-primary',
    description: 'Primary action button background',
  },
  {
    componentId: 'card',
    tokenKey: 'secondary-bg',
    label: 'Secondary action',
    defaultRef: 'semantic:background-subtle',
    description: 'Secondary button / subtle background',
  },
  // ── Badge / Chip ────────────────────────────────────────────────────
  {
    componentId: 'badge',
    tokenKey: 'bg',
    label: 'Background',
    defaultRef: 'semantic:status-info-bg',
    description: 'Badge background',
  },
  {
    componentId: 'badge',
    tokenKey: 'text',
    label: 'Text',
    defaultRef: 'semantic:status-info-text',
    description: 'Badge text color',
  },
];

/** Group by component for display */
export const COMPONENT_TOKEN_GROUPS = [
  { id: 'button-primary', label: 'Primary Button' },
  { id: 'button-secondary', label: 'Secondary Button' },
  { id: 'icon-button', label: 'Icon Button' },
  { id: 'input', label: 'Input' },
  { id: 'card', label: 'Card' },
  { id: 'badge', label: 'Badge / Chip' },
] as const;

export function getEffectiveComponentTokenRef(
  componentId: string,
  tokenKey: string,
  overrides: Record<string, string>
): string {
  const tokenId = toComponentTokenId(componentId, tokenKey);
  const override = overrides[tokenId];
  if (override) return override;
  const def = COMPONENT_TOKEN_DEFINITIONS.find(
    (t) => t.componentId === componentId && t.tokenKey === tokenKey
  );
  return def?.defaultRef ?? 'neutral-500';
}

/** Check if ref is transparent (no color) */
export function isTransparentRef(ref: string): boolean {
  return ref === 'transparent';
}

/** Build options for component token override: primitives + semantic tokens + special */
export function getComponentTokenRefOptions(
  primitiveOptions: { value: string; label: string }[],
  semanticTokens: { id: string; label: string }[]
): { value: string; label: string }[] {
  const special = [
    { value: 'transparent', label: 'Transparent' },
    { value: 'white', label: 'White' },
  ];
  const semanticOpts = semanticTokens.map((t) => ({
    value: `semantic:${t.id}`,
    label: `Semantic: ${t.label}`,
  }));
  return [...special, ...primitiveOptions.filter((o) => o.value !== 'white'), ...semanticOpts];
}
