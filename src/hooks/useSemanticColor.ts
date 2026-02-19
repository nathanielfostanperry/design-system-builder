import { useDesignSystem } from '@/context/DesignSystemContext';
import { getEffectiveMapping } from '@/utils/semanticTokens';

/**
 * Resolves a semantic color token to its computed hex/rgb value at runtime.
 * Use this in components that need to consume semantic tokens.
 */
export function useSemanticColor(tokenId: string): string {
  const {
    primaryColorScale,
    accentColorScale,
    neutralColorScale,
    extraPalettes,
    semanticTokenOverrides,
  } = useDesignSystem();

  const ref = getEffectiveMapping(tokenId, semanticTokenOverrides);
  if (!ref) return '#999999';

  if (ref === 'white') return '#ffffff';

  const [palette, shade] = ref.split('-');
  if (!palette || !shade) return '#999999';

  switch (palette) {
    case 'primary':
      return primaryColorScale[shade] ?? '#999999';
    case 'secondary':
      return accentColorScale[shade] ?? '#999999';
    case 'neutral':
      return neutralColorScale[shade] ?? '#999999';
    default: {
      const extra = extraPalettes.find((p) =>
        p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === palette
      );
      return extra?.scale[shade] ?? '#999999';
    }
  }
}
