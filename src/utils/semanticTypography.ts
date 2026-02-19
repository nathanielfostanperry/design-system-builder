/**
 * Semantic typography token definitions.
 * Each token maps to a font primitive (heading, body, code) with optional size/weight overrides.
 * Mirrors the semantic color token pattern for design system consistency.
 */

import type { FontSize, FontWeight } from '@/types/designSystem';

export type TypographyFontRef = 'heading' | 'body' | 'code';

export interface SemanticTypographyDef {
  id: string;
  category: string;
  label: string;
  /** Which font primitive this token maps to */
  defaultFontRef: TypographyFontRef;
  /** Optional size override; when absent, uses the primitive's default */
  defaultSize?: FontSize;
  /** Optional weight override; when absent, uses the primitive's default */
  defaultWeight?: FontWeight;
  /** Inline comment explaining intended use */
  description: string;
}

export const SEMANTIC_TYPOGRAPHY_DEFINITIONS: SemanticTypographyDef[] = [
  // ── Display ─────────────────────────────────────────────────────────
  {
    id: 'display',
    category: 'display',
    label: 'Display',
    defaultFontRef: 'heading',
    defaultSize: 'xxl',
    defaultWeight: 'bold',
    description: 'Hero text, landing headlines, large marketing titles',
  },
  // ── Headings ─────────────────────────────────────────────────────────
  {
    id: 'heading-1',
    category: 'heading',
    label: 'Heading 1',
    defaultFontRef: 'heading',
    defaultSize: 'xl',
    defaultWeight: 'bold',
    description: 'Page title, primary section heading',
  },
  {
    id: 'heading-2',
    category: 'heading',
    label: 'Heading 2',
    defaultFontRef: 'heading',
    defaultSize: 'lg',
    defaultWeight: 'bold',
    description: 'Major section heading',
  },
  {
    id: 'heading-3',
    category: 'heading',
    label: 'Heading 3',
    defaultFontRef: 'heading',
    defaultSize: 'regular',
    defaultWeight: 'bold',
    description: 'Subsection heading',
  },
  {
    id: 'heading-4',
    category: 'heading',
    label: 'Heading 4',
    defaultFontRef: 'heading',
    defaultSize: 'regular',
    defaultWeight: 'bold',
    description: 'Minor heading, card titles',
  },
  {
    id: 'heading-5',
    category: 'heading',
    label: 'Heading 5',
    defaultFontRef: 'heading',
    defaultSize: 'sm',
    defaultWeight: 'bold',
    description: 'Small heading, list group titles',
  },
  {
    id: 'heading-6',
    category: 'heading',
    label: 'Heading 6',
    defaultFontRef: 'heading',
    defaultSize: 'xs',
    defaultWeight: 'bold',
    description: 'Smallest heading, overline-style labels',
  },
  // ── Body ─────────────────────────────────────────────────────────────
  {
    id: 'body-large',
    category: 'body',
    label: 'Body Large',
    defaultFontRef: 'body',
    defaultSize: 'lg',
    defaultWeight: 'regular',
    description: 'Lead paragraphs, introductory text',
  },
  {
    id: 'body',
    category: 'body',
    label: 'Body',
    defaultFontRef: 'body',
    defaultSize: 'regular',
    defaultWeight: 'regular',
    description: 'Default body text, paragraphs',
  },
  {
    id: 'body-small',
    category: 'body',
    label: 'Body Small',
    defaultFontRef: 'body',
    defaultSize: 'sm',
    defaultWeight: 'regular',
    description: 'Secondary paragraphs, compact content',
  },
  // ── UI / Supporting ─────────────────────────────────────────────────
  {
    id: 'caption',
    category: 'ui',
    label: 'Caption',
    defaultFontRef: 'body',
    defaultSize: 'xs',
    defaultWeight: 'regular',
    description: 'Captions, footnotes, timestamps, metadata',
  },
  {
    id: 'label',
    category: 'ui',
    label: 'Label',
    defaultFontRef: 'body',
    defaultSize: 'xs',
    defaultWeight: 'bold',
    description: 'Form labels, badges, table headers',
  },
  {
    id: 'overline',
    category: 'ui',
    label: 'Overline',
    defaultFontRef: 'body',
    defaultSize: 'xxs',
    defaultWeight: 'bold',
    description: 'Kickers, category tags, uppercase labels',
  },
  {
    id: 'code',
    category: 'ui',
    label: 'Code',
    defaultFontRef: 'code',
    defaultSize: 'sm',
    defaultWeight: 'regular',
    description: 'Inline code, code blocks, technical content',
  },
];

export const TYPOGRAPHY_CATEGORIES = [
  { id: 'display', label: 'Display' },
  { id: 'heading', label: 'Headings' },
  { id: 'body', label: 'Body' },
  { id: 'ui', label: 'UI & Supporting' },
] as const;

/** Override shape: can override fontRef, size, and/or weight */
export type TypographyTokenOverride = {
  fontRef?: TypographyFontRef;
  size?: FontSize;
  weight?: FontWeight;
};

export function getEffectiveTypographyMapping(
  tokenId: string,
  overrides: Record<string, { fontRef?: string; size?: string; weight?: string }>
): { fontRef: TypographyFontRef; size?: FontSize; weight?: FontWeight } {
  const def = SEMANTIC_TYPOGRAPHY_DEFINITIONS.find((t) => t.id === tokenId);
  const override = overrides[tokenId];
  if (!def) return { fontRef: 'body' };
  const fontRef = (override?.fontRef ?? def.defaultFontRef) as TypographyFontRef;
  const size = (override?.size ?? def.defaultSize) as FontSize | undefined;
  const weight = (override?.weight ?? def.defaultWeight) as FontWeight | undefined;
  return { fontRef, size, weight };
}
