import { useDesignSystem } from '@/context/DesignSystemContext';
import {
  getEffectiveComponentTokenRef,
  isSemanticRef,
} from '@/utils/componentTokens';
import { getEffectiveMapping } from '@/utils/semanticTokens';

/**
 * Resolves a component token to its computed hex/rgb value.
 * Component tokens can reference primitives or semantic tokens.
 */
export function useComponentToken(componentId: string, tokenKey: string): string {
  const {
    primaryColorScale,
    accentColorScale,
    neutralColorScale,
    extraPalettes,
    semanticTokenOverrides,
    componentTokenOverrides,
  } = useDesignSystem();

  const ref = getEffectiveComponentTokenRef(componentId, tokenKey, componentTokenOverrides);
  if (!ref) return '#999999';

  if (ref === 'white') return '#ffffff';
  if (ref === 'transparent') return 'transparent';

  // Semantic ref: resolve through semantic layer
  if (isSemanticRef(ref)) {
    const semanticId = ref.slice('semantic:'.length);
    const primitiveRef = getEffectiveMapping(semanticId, semanticTokenOverrides);
    return resolvePrimitiveToColor(primitiveRef, {
      primaryColorScale,
      accentColorScale,
      neutralColorScale,
      extraPalettes,
    });
  }

  // Primitive ref
  return resolvePrimitiveToColor(ref, {
    primaryColorScale,
    accentColorScale,
    neutralColorScale,
    extraPalettes,
  });
}

function resolvePrimitiveToColor(
  ref: string,
  scales: {
    primaryColorScale: Record<string, string>;
    accentColorScale: Record<string, string>;
    neutralColorScale: Record<string, string>;
    extraPalettes: { id: string; name: string; scale: Record<string, string> }[];
  }
): string {
  const parts = ref.split('-');
  if (parts.length < 2) return '#999999';
  const shade = parts[parts.length - 1];
  const palette = parts.slice(0, -1).join('-');

  switch (palette) {
    case 'primary':
      return scales.primaryColorScale[shade] ?? '#999999';
    case 'secondary':
      return scales.accentColorScale[shade] ?? '#999999';
    case 'neutral':
      return scales.neutralColorScale[shade] ?? '#999999';
    default: {
      const toSlug = (n: string) => n.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const extra = scales.extraPalettes.find((p) => toSlug(p.name) === palette);
      return extra?.scale[shade] ?? '#999999';
    }
  }
}
