'use client';

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
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
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
    // achromatic
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
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
 * Interface for a control point on a color curve
 */
export interface CurveControlPoint {
  position: number;
  lightness?: number;
  saturation?: number; // Saturation multiplier for controlling chroma
}

/**
 * Generates a color scale based on a base color and custom control points
 * @param baseColor - The base color in hex format
 * @param controlPoints - Array of control points to shape the curve
 * @returns An object with color variants from 50 to 950
 */
export function generateCustomColorScale(
  baseColor: string,
  controlPoints: CurveControlPoint[] = []
): Record<string, string> {
  const rgb = hexToRgb(baseColor);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  // Define the default shade positions on a scale of 0-1
  const shadePositions = {
    '50': 0,
    '100': 0.1,
    '200': 0.2,
    '300': 0.3,
    '400': 0.4,
    '500': 0.5, // Middle point
    '600': 0.6,
    '700': 0.7,
    '800': 0.8,
    '900': 0.9,
    '950': 1,
  };

  // If no control points are provided, create default ones
  if (controlPoints.length === 0) {
    controlPoints = [
      { position: 0, lightness: 0.97 }, // 50
      { position: 0.25, lightness: 0.85 }, // Around 200
      { position: 0.5, lightness: 0.56 }, // 500 (base)
      { position: 0.75, lightness: 0.32 }, // Around 700
      { position: 1, lightness: 0.14 }, // 950
    ];
  }

  // Make sure control points are sorted by position
  controlPoints.sort((a, b) => a.position - b.position);

  const colorScale: Record<string, string> = {};

  // Generate each step in the scale
  Object.entries(shadePositions).forEach(([shade, position]) => {
    // Find the control points to interpolate between
    let beforePoint = controlPoints[0];
    let afterPoint = controlPoints[controlPoints.length - 1];

    for (let i = 0; i < controlPoints.length - 1; i++) {
      const current = controlPoints[i];
      const next = controlPoints[i + 1];

      if (position >= current.position && position <= next.position) {
        beforePoint = current;
        afterPoint = next;
        break;
      }
    }

    // Interpolate lightness between control points
    const t =
      (position - beforePoint.position) /
      (afterPoint.position - beforePoint.position || 1);

    // Get lightness values with proper undefined checks
    const beforeLightness =
      beforePoint.lightness !== undefined ? beforePoint.lightness : 0.5;
    const afterLightness =
      afterPoint.lightness !== undefined ? afterPoint.lightness : 0.5;

    const interpolatedLightness =
      beforeLightness + t * (afterLightness - beforeLightness);

    // Determine the saturation for this shade
    let adjustedSaturation = hsl.s;

    // If saturation is specified in control points, interpolate it too
    if (
      beforePoint.saturation !== undefined &&
      afterPoint.saturation !== undefined
    ) {
      adjustedSaturation =
        beforePoint.saturation +
        t * (afterPoint.saturation - beforePoint.saturation);
    } else {
      // Default saturation behavior - lighter colors are less saturated
      if (interpolatedLightness > 0.7) {
        adjustedSaturation = hsl.s * 0.8;
      } else if (interpolatedLightness < 0.3) {
        adjustedSaturation = Math.min(1, hsl.s * 1.2);
      }
    }

    // Ensure saturation is within bounds
    adjustedSaturation = Math.max(0, Math.min(1, adjustedSaturation));

    // Generate the color using the calculated values
    const color = hslToRgb(hsl.h, adjustedSaturation, interpolatedLightness);
    colorScale[shade] = rgbToHex(color.r, color.g, color.b);
  });

  return colorScale;
}

/**
 * Converts UI bezier curve points (x,y) to CurveControlPoint format
 * @param points Array of UI points from the BezierCurveEditor
 * @param isChroma Whether the points are for chroma curves (true) or lightness curves (false)
 * @returns Array of CurveControlPoint for use in color generation
 */
export function uiPointsToControlPoints(
  points: { x: number; y: number }[],
  isChroma: boolean
): CurveControlPoint[] {
  return points.map((point) => {
    // Normalize to 0-1 range
    const position = point.x / 320;
    const normalizedY = 1 - point.y / 320;

    const controlPoint: CurveControlPoint = {
      position,
    };

    if (isChroma) {
      // For chroma curve, y controls saturation
      controlPoint.saturation = normalizedY;
    } else {
      // For lightness curve, y controls lightness
      controlPoint.lightness = normalizedY;
    }

    return controlPoint;
  });
}

/**
 * Generates a set of neutral/grey colors that are derived from the primary color
 * @param primaryColor - The primary color in hex format
 * @returns An object with neutral color variants from 50 to 950
 */
export function generateNeutrals(primaryColor: string): Record<string, string> {
  const primaryHsl = rgbToHsl(
    hexToRgb(primaryColor).r,
    hexToRgb(primaryColor).g,
    hexToRgb(primaryColor).b
  );
  const neutralScale: Record<string, string> = {};

  // Light shades (50-500)
  for (let i = 0; i < 6; i++) {
    const shade = [50, 100, 200, 300, 400, 500][i];
    const lightness = 0.98 - i * 0.08; // 0.98 down to 0.58

    // Create a very subtle hint of the primary hue
    // Using a saturation that decreases as the shade gets lighter
    const saturationFactor = 0.08 - i * 0.01;
    const saturation = primaryHsl.s * saturationFactor;

    neutralScale[shade.toString()] = hslToHex({
      h: primaryHsl.h,
      s: saturation,
      l: lightness,
    });
  }

  // Dark shades (600-950)
  for (let i = 0; i < 5; i++) {
    const shade = [600, 700, 800, 900, 950][i];
    const lightness = 0.48 - i * 0.08; // 0.48 down to 0.16

    // For darker shades, slightly increase the saturation for visual interest
    // but still keep it very subtle
    const saturationFactor = 0.06 - i * 0.005;
    const saturation = primaryHsl.s * saturationFactor;

    neutralScale[shade.toString()] = hslToHex({
      h: primaryHsl.h,
      s: saturation,
      l: lightness,
    });
  }

  return neutralScale;
}

/**
 * Calculates points to draw a color curve for a range of color shades
 * @param colorScale - Object containing the color scale
 * @param rangeStart - Starting shade (e.g. "50", "600")
 * @param rangeEnd - Ending shade (e.g. "400", "950")
 * @returns Array of points to draw the curve
 */
export function generateCurvePoints(
  colorScale: Record<string, string>,
  rangeStart: string,
  rangeEnd: string
): Array<{ x: number; y: number }> {
  const points: Array<{ x: number; y: number }> = [];
  const shades = Object.keys(colorScale).sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  // Filter to only include shades within our range
  const rangeShades = shades.filter((shade) => {
    const value = parseInt(shade);
    return value >= parseInt(rangeStart) && value <= parseInt(rangeEnd);
  });

  if (rangeShades.length === 0) return points;

  // Get first and last shade for normalization
  const firstShade = parseInt(rangeShades[0]);
  const lastShade = parseInt(rangeShades[rangeShades.length - 1]);
  const range = lastShade - firstShade;

  // Extract lightness values
  rangeShades.forEach((shade) => {
    const color = colorScale[shade];
    const hsl = rgbToHsl(
      hexToRgb(color).r,
      hexToRgb(color).g,
      hexToRgb(color).b
    );

    // Calculate x position based on shade number
    const x = (parseInt(shade) - firstShade) / range;

    // y is inverted (1 - lightness) since in UI 0,0 is top left
    const y = 1 - hsl.l;

    points.push({ x, y });
  });

  return points;
}

/**
 * Calculates points to visualize chroma (saturation) for a range of color shades
 * @param colorScale - Object containing the color scale
 * @param rangeStart - Starting shade (e.g. "50", "600")
 * @param rangeEnd - Ending shade (e.g. "400", "950")
 * @returns Array of points with their positions and colors
 */
export function generateChromaPoints(
  colorScale: Record<string, string>,
  rangeStart: string,
  rangeEnd: string
): Array<{ x: number; y: number; color: string }> {
  // Get all the shades between rangeStart and rangeEnd
  const orderedShades = [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '950',
  ];

  const startIndex = orderedShades.indexOf(rangeStart);
  const endIndex = orderedShades.indexOf(rangeEnd);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Invalid range: ${rangeStart}-${rangeEnd}`);
  }

  const shades = orderedShades.slice(
    Math.min(startIndex, endIndex),
    Math.max(startIndex, endIndex) + 1
  );

  // Select a few representative points for the chroma visualization
  // We'll use 3 points: start, middle, and end of the range
  const chromaPoints: Array<{ x: number; y: number; color: string }> = [];

  // Choose 3 points from the range
  const pointIndices = [0, Math.floor(shades.length / 2), shades.length - 1];

  pointIndices.forEach((pointIndex) => {
    const shade = shades[pointIndex];
    const color = colorScale[shade];
    const rgb = hexToRgb(color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    // Normalize the x position for the canvas
    const x =
      startIndex < endIndex
        ? pointIndex / (shades.length - 1)
        : 1 - pointIndex / (shades.length - 1);

    // Y position based on saturation
    const y = 1 - hsl.s;

    chromaPoints.push({ x, y, color });
  });

  return chromaPoints;
}

// Get the SVG path definition for a curve
export function getCurvePathDefinition(
  points: Array<{ x: number; y: number }>,
  width: number,
  height: number,
  padding: number = 20
): string {
  if (points.length < 2) return '';

  const drawWidth = width - padding * 2;
  const drawHeight = height - padding * 2;

  // Map normalized points to SVG coordinates
  const mappedPoints = points.map((point) => ({
    x: padding + point.x * drawWidth,
    y: padding + point.y * drawHeight,
  }));

  // Start the path
  let path = `M ${mappedPoints[0].x},${mappedPoints[0].y}`;

  // For a smooth curve, use cubic bezier curves between points
  for (let i = 0; i < mappedPoints.length - 1; i++) {
    const current = mappedPoints[i];
    const next = mappedPoints[i + 1];

    // Calculate control points for a smooth curve
    const controlPointX1 = current.x + (next.x - current.x) * 0.5;
    const controlPointY1 = current.y;
    const controlPointX2 = next.x - (next.x - current.x) * 0.5;
    const controlPointY2 = next.y;

    path += ` C ${controlPointX1},${controlPointY1} ${controlPointX2},${controlPointY2} ${next.x},${next.y}`;
  }

  return path;
}

/**
 * OKLCH color space conversions
 * OKLCH is perceptually uniform and provides better color scales
 */

// Convert sRGB to linear RGB
function sRGBToLinear(x: number): number {
  return x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

// Convert linear RGB to sRGB
function linearTosRGB(x: number): number {
  return x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
}

// Convert linear RGB to OKLAB
function LRGBToOKLAB(
  L: number,
  M: number,
  S: number
): { L: number; a: number; b: number } {
  const l = Math.cbrt(0.4122214708 * L + 0.5363325363 * M + 0.0514459929 * S);
  const m = Math.cbrt(0.2119034982 * L + 0.6806995451 * M + 0.1073969566 * S);
  const s = Math.cbrt(0.0883024619 * L + 0.2817188376 * M + 0.6299787005 * S);

  return {
    L: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  };
}

// Convert OKLAB to linear RGB
function OKLABToLRGB(
  L: number,
  a: number,
  b: number
): { L: number; M: number; S: number } {
  const l = L + 0.3963377774 * a + 0.2158037573 * b;
  const m = L - 0.1055613458 * a - 0.0638541728 * b;
  const s = L - 0.0894841775 * a - 1.291485548 * b;

  const l3 = l * l * l;
  const m3 = m * m * m;
  const s3 = s * s * s;

  return {
    L: +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3,
    M: -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
    S: -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3,
  };
}

// Convert OKLAB to OKLCH
function OKLABToOKLCH(
  L: number,
  a: number,
  b: number
): { L: number; C: number; h: number } {
  const C = Math.sqrt(a * a + b * b);
  let h = (Math.atan2(b, a) * 180) / Math.PI;
  if (h < 0) h += 360;

  return { L, C, h };
}

// Convert OKLCH to OKLAB
function OKLCHToOKLAB(
  L: number,
  C: number,
  h: number
): { L: number; a: number; b: number } {
  const hRad = (h * Math.PI) / 180;
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);
  return { L, a, b };
}

// Convert hex to OKLCH
export function hexToOKLCH(hex: string): { L: number; C: number; h: number } {
  const { r, g, b } = hexToRgb(hex);

  const lr = sRGBToLinear(r / 255);
  const lg = sRGBToLinear(g / 255);
  const lb = sRGBToLinear(b / 255);

  const lab = LRGBToOKLAB(lr, lg, lb);
  return OKLABToOKLCH(lab.L, lab.a, lab.b);
}

// Convert OKLCH to hex
export function OKLCHToHex(L: number, C: number, h: number): string {
  const lab = OKLCHToOKLAB(L, C, h);
  const rgb = OKLABToLRGB(lab.L, lab.a, lab.b);

  // Clamp and convert to sRGB
  const r = Math.max(0, Math.min(255, Math.round(linearTosRGB(rgb.L) * 255)));
  const g = Math.max(0, Math.min(255, Math.round(linearTosRGB(rgb.M) * 255)));
  const b = Math.max(0, Math.min(255, Math.round(linearTosRGB(rgb.S) * 255)));

  return rgbToHex(r, g, b);
}

/**
 * Converts a hex color value to HSL components
 */
export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const rgb = hexToRgb(hex);
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

/**
 * Applies curve control points to generate a color scale
 */
export function applyColorCurves(
  baseColor: string,
  lightnessControlPoints: CurveControlPoint[] = [],
  chromaControlPoints: CurveControlPoint[] = []
): Record<string, string> {
  try {
    // Default lightness control points - creates a natural progression
    const defaultLightnessPoints: CurveControlPoint[] = [
      { position: 0, lightness: 0.98 }, // 50 (very light)
      { position: 0.2, lightness: 0.9 }, // ~200
      { position: 0.4, lightness: 0.75 }, // ~400
      { position: 0.5, lightness: 0.6 }, // 500 (base)
      { position: 0.6, lightness: 0.45 }, // ~600
      { position: 0.8, lightness: 0.25 }, // ~800
      { position: 1, lightness: 0.1 }, // 950 (very dark)
    ];

    // Default chroma control points (constant saturation across the scale)
    const defaultChromaPoints: CurveControlPoint[] = [
      { position: 0, saturation: 0.7 }, // 50 (reduced saturation for very light)
      { position: 0.2, saturation: 0.85 }, // ~200
      { position: 0.4, saturation: 0.95 }, // ~400
      { position: 0.5, saturation: 1.0 }, // 500 (base - full saturation)
      { position: 0.6, saturation: 0.95 }, // ~600
      { position: 0.8, saturation: 0.85 }, // ~800
      { position: 1, saturation: 0.7 }, // 950 (reduced saturation for very dark)
    ];

    // Use provided control points or defaults
    const lightnessPoints =
      lightnessControlPoints.length > 0
        ? lightnessControlPoints
        : defaultLightnessPoints;

    const chromaPoints =
      chromaControlPoints.length > 0
        ? chromaControlPoints
        : defaultChromaPoints;

    // Convert base color to HSL
    const { r, g, b } = hexToRgb(baseColor);
    const baseHsl = rgbToHsl(r, g, b);

    // Define the color steps to generate
    const colorSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    const colorScale: Record<string, string> = {};

    // Generate each shade in the scale
    colorSteps.forEach((step, index) => {
      // Calculate position in the scale (0 to 1)
      const position = index / (colorSteps.length - 1);

      // Interpolate lightness and chroma (saturation)
      const lightnessValue = interpolateLightness(position, lightnessPoints);
      const chromaMultiplier = interpolateChroma(position, chromaPoints);

      // Adjust saturation based on chroma multiplier (clamped to valid range)
      const adjustedSaturation = Math.min(
        1,
        Math.max(0, baseHsl.s * chromaMultiplier)
      );

      // Generate the color
      colorScale[step.toString()] = hslToHex({
        h: baseHsl.h,
        s: adjustedSaturation,
        l: lightnessValue,
      });
    });

    return colorScale;
  } catch (error) {
    console.error('Error generating color scale:', error);
    return generateColorScale(baseColor); // Fallback to default scale
  }
}

/**
 * Interpolates lightness value based on position and control points
 */
function interpolateLightness(
  position: number,
  controlPoints: CurveControlPoint[]
): number {
  // Sort control points by position
  const sortedPoints = [...controlPoints].sort(
    (a, b) => a.position - b.position
  );

  // Handle edge cases
  if (sortedPoints.length === 0) return 0.5; // Default to mid-gray
  if (sortedPoints.length === 1 && sortedPoints[0].lightness !== undefined) {
    return sortedPoints[0].lightness;
  }

  // Find the two control points that contain our position
  let lower = sortedPoints[0];
  let upper = sortedPoints[sortedPoints.length - 1];

  for (let i = 0; i < sortedPoints.length - 1; i++) {
    if (
      position >= sortedPoints[i].position &&
      position <= sortedPoints[i + 1].position
    ) {
      lower = sortedPoints[i];
      upper = sortedPoints[i + 1];
      break;
    }
  }

  // If either point doesn't have a lightness value, use a default
  const lowerLightness = lower.lightness !== undefined ? lower.lightness : 0.5;
  const upperLightness = upper.lightness !== undefined ? upper.lightness : 0.5;

  // Calculate interpolation factor
  const range = upper.position - lower.position;
  if (range === 0) return lowerLightness;

  const factor = (position - lower.position) / range;

  // Linear interpolation
  return lowerLightness + factor * (upperLightness - lowerLightness);
}

/**
 * Interpolates chroma (saturation) multiplier based on position and control points
 */
function interpolateChroma(
  position: number,
  controlPoints: CurveControlPoint[]
): number {
  // Sort control points by position
  const sortedPoints = [...controlPoints].sort(
    (a, b) => a.position - b.position
  );

  // Handle edge cases
  if (sortedPoints.length === 0) return 1.0; // Default to no change
  if (sortedPoints.length === 1 && sortedPoints[0].saturation !== undefined) {
    return sortedPoints[0].saturation;
  }

  // Find the two control points that contain our position
  let lower = sortedPoints[0];
  let upper = sortedPoints[sortedPoints.length - 1];

  for (let i = 0; i < sortedPoints.length - 1; i++) {
    if (
      position >= sortedPoints[i].position &&
      position <= sortedPoints[i + 1].position
    ) {
      lower = sortedPoints[i];
      upper = sortedPoints[i + 1];
      break;
    }
  }

  // If either point doesn't have a saturation value, use a default
  const lowerSaturation =
    lower.saturation !== undefined ? lower.saturation : 1.0;
  const upperSaturation =
    upper.saturation !== undefined ? upper.saturation : 1.0;

  // Calculate interpolation factor
  const range = upper.position - lower.position;
  if (range === 0) return lowerSaturation;

  const factor = (position - lower.position) / range;

  // Linear interpolation
  return lowerSaturation + factor * (upperSaturation - lowerSaturation);
}

/**
 * Convert an HSL color to hex format
 */
export function hslToHex(hsl: { h: number; s: number; l: number }): string {
  const { h, s, l } = hsl;
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}
