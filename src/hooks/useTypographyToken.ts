import { useDesignSystem } from '@/context/DesignSystemContext';
import {
  getEffectiveTypographyMapping,
  type TypographyFontRef,
} from '@/utils/semanticTypography';
import type { FontOption, FontSize, FontWeight } from '@/types/designSystem';

const getFontWeightValue = (weight: FontWeight): string => {
  switch (weight) {
    case 'thin': return '300';
    case 'regular': return '400';
    case 'bold': return '700';
    case 'extrabold': return '800';
    default: return '400';
  }
};

const getFontSizeValue = (size: FontSize): string => {
  switch (size) {
    case 'xxs': return '0.625rem';
    case 'xs': return '0.75rem';
    case 'sm': return '0.875rem';
    case 'regular': return '1rem';
    case 'lg': return '1.25rem';
    case 'xl': return '1.5rem';
    case 'xxl': return '2rem';
    default: return '1rem';
  }
};

const getFontByRef = (
  fontRef: TypographyFontRef,
  headingFont: FontOption,
  bodyFont: FontOption,
  codeFont: FontOption
): FontOption => {
  switch (fontRef) {
    case 'heading': return headingFont;
    case 'body': return bodyFont;
    case 'code': return codeFont;
    default: return bodyFont;
  }
};

export interface TypographyTokenStyles {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  fontOption: FontOption;
}

/**
 * Resolves a semantic typography token to concrete font styles.
 * Use this hook in components that need to consume typography tokens.
 */
export function useTypographyToken(tokenId: string): TypographyTokenStyles {
  const {
    headingFont,
    bodyFont,
    codeFont,
    typographyTokenOverrides,
  } = useDesignSystem();

  const { fontRef, size, weight } = getEffectiveTypographyMapping(tokenId, typographyTokenOverrides);

  const fontOption = getFontByRef(fontRef, headingFont, bodyFont, codeFont);

  return {
    fontFamily: fontOption.family,
    fontSize: getFontSizeValue((size ?? fontOption.size) as FontSize),
    fontWeight: getFontWeightValue((weight ?? fontOption.weight) as FontWeight),
    fontOption,
  };
}
