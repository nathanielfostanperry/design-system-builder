/**
 * Converts a hex color to RGB components
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  // Remove the hash if present
  hex = hex.replace(/^#/, '');

  // Parse the hex value
  let r, g, b;
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }

  return { r, g, b };
}

/**
 * Converts RGB components to a hex color
 */
export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Converts RGB to HSL components
 */
export function rgbToHsl(
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return { h, s, l };
}

/**
 * Converts HSL to RGB components
 */
export function hslToRgb(
  h: number,
  s: number,
  l: number
): { r: number; g: number; b: number } {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Generates a color scale based on a base color
 * @param baseColor - The base color in hex format
 * @returns An object with color variants from 50 to 950
 */
export function generateColorScale(baseColor: string): Record<string, string> {
  const rgb = hexToRgb(baseColor);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  // Define lightness values for each step in the scale
  const lightnessScale = {
    '50': 0.97,
    '100': 0.94,
    '200': 0.86,
    '300': 0.76,
    '400': 0.66,
    '500': 0.56, // This is closest to the base color
    '600': 0.46,
    '700': 0.38,
    '800': 0.3,
    '900': 0.22,
    '950': 0.14,
  };

  // Adjust saturation based on base color's saturation
  // For very low or very high saturation colors, we need to adjust to create a balanced scale
  let saturationAdjust = 1;
  if (hsl.s < 0.15) {
    saturationAdjust = 3; // Boost saturation for gray-ish colors
  } else if (hsl.s > 0.9) {
    saturationAdjust = 0.85; // Reduce saturation for very saturated colors
  }

  const colorScale: Record<string, string> = {};

  // Generate each step in the scale
  Object.entries(lightnessScale).forEach(([step, lightness]) => {
    // Adjust saturation based on lightness
    // Lighter colors should be less saturated, darker colors more saturated
    let adjustedSaturation = hsl.s;
    if (lightness > 0.7) {
      adjustedSaturation = Math.min(1, hsl.s * 0.8 * saturationAdjust);
    } else if (lightness < 0.3) {
      adjustedSaturation = Math.min(1, hsl.s * 1.2 * saturationAdjust);
    } else {
      adjustedSaturation = Math.min(1, hsl.s * saturationAdjust);
    }

    const color = hslToRgb(hsl.h, adjustedSaturation, lightness);
    colorScale[step] = rgbToHex(color.r, color.g, color.b);
  });

  return colorScale;
}

/**
 * Generates a set of neutral/grey colors that are derived from the primary color
 * @param primaryColor - The primary color in hex format
 * @returns An object with neutral color variants from 50 to 950
 */
export function generateNeutrals(primaryColor: string): Record<string, string> {
  const rgb = hexToRgb(primaryColor);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  // Derive a neutral palette by:
  // 1. Taking the hue from the primary color
  // 2. Significantly reducing the saturation
  // 3. Using a similar lightness scale as the color scale

  // Create a slight hue shift for more interesting neutrals
  // Move the hue slightly toward blue for cool greys or toward orange for warm greys
  // Based on where the original hue is located
  let neutralHue = hsl.h;

  // If the hue is in the blue/green range, shift toward warmer grey
  if (neutralHue > 0.3 && neutralHue < 0.7) {
    neutralHue = (neutralHue + 0.05) % 1; // Shift slightly warmer
  } else {
    // If the hue is in the red/orange/yellow range, shift toward cooler grey
    neutralHue = (neutralHue + 0.95) % 1; // Shift slightly cooler
  }

  // Very low saturation for neutrals, but keep a hint of the color influence
  const baseSaturation = Math.min(0.08, hsl.s * 0.12);

  // Define lightness values for each step in the neutral scale
  const lightnessScale = {
    '50': 0.98, // Nearly white
    '100': 0.94,
    '200': 0.88,
    '300': 0.78,
    '400': 0.66,
    '500': 0.54,
    '600': 0.42,
    '700': 0.32,
    '800': 0.22,
    '900': 0.14,
    '950': 0.09, // Nearly black
  };

  const neutralScale: Record<string, string> = {};

  // Generate each step in the scale
  Object.entries(lightnessScale).forEach(([step, lightness]) => {
    // Adjust saturation based on lightness
    // Very dark and very light colors get even less saturation
    let adjustedSaturation = baseSaturation;
    if (lightness > 0.9 || lightness < 0.2) {
      adjustedSaturation = baseSaturation * 0.5;
    }

    const color = hslToRgb(neutralHue, adjustedSaturation, lightness);
    neutralScale[step] = rgbToHex(color.r, color.g, color.b);
  });

  return neutralScale;
}
