import { useDesignSystem } from '@/context/DesignSystemContext';

/**
 * Resolves the color scale assigned to a given component ID via the
 * Components panel. Falls back to primaryColorScale if nothing is assigned.
 */
export function useComponentPalette(componentId: string): Record<string, string> {
  const {
    componentPaletteMap,
    primaryColorScale,
    accentColorScale,
    neutralColorScale,
    extraPalettes,
  } = useDesignSystem();

  const paletteId = componentPaletteMap[componentId] ?? 'primary';

  switch (paletteId) {
    case 'primary': return primaryColorScale;
    case 'accent':  return accentColorScale;
    case 'neutral': return neutralColorScale;
    default: {
      const extra = extraPalettes.find((p) => p.id === paletteId);
      return extra?.scale ?? primaryColorScale;
    }
  }
}
