'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';

const getFontWeight = (weight: string) => {
  switch (weight) {
    case 'thin': return '300';
    case 'regular': return '400';
    case 'bold': return '700';
    case 'extrabold': return '800';
    default: return '400';
  }
};

const getFontSize = (size: string): string => {
  switch (size) {
    case 'xxs': return '0.625rem';
    case 'xs':  return '0.75rem';
    case 'sm':  return '0.875rem';
    case 'regular': return '1rem';
    case 'lg':  return '1.25rem';
    case 'xl':  return '1.5rem';
    case 'xxl': return '2rem';
    default: return '1rem';
  }
};

const getHeadingSize = (level: number, baseSize: string): string => {
  const baseSizeRem = parseFloat(getFontSize(baseSize));
  const multipliers: Record<number, number> = { 1: 3, 2: 2.25, 3: 1.75, 4: 1.5, 5: 1.25, 6: 1.1 };
  return `${baseSizeRem * multipliers[level]}rem`;
};

export default function FontPreview() {
  const { headingFont, bodyFont, isDarkMode, neutralColorScale, primaryColorScale } = useDesignSystem();

  const textPrimary   = isDarkMode ? neutralColorScale['100'] : neutralColorScale['900'];
  const textSecondary = isDarkMode ? neutralColorScale['300'] : neutralColorScale['600'];
  const textMuted     = isDarkMode ? neutralColorScale['500'] : neutralColorScale['400'];
  const borderColor   = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const blockquoteBg  = isDarkMode ? neutralColorScale['800'] : neutralColorScale['50'];

  const h = (level: number) => ({
    fontFamily: headingFont.family,
    fontWeight: getFontWeight(headingFont.weight),
    fontSize: getHeadingSize(level, headingFont.size),
    color: textPrimary,
  });

  const body = {
    fontFamily: bodyFont.family,
    fontWeight: getFontWeight(bodyFont.weight),
    fontSize: getFontSize(bodyFont.size),
    lineHeight: 1.75,
    color: textSecondary,
  };

  return (
    <article className="max-w-2xl mx-auto pb-12">

      {/* Hero image */}
      <div
        className="w-full mb-8 overflow-hidden"
        style={{
          aspectRatio: '16/7',
          borderRadius: '12px',
          background: `linear-gradient(135deg, ${primaryColorScale['800']} 0%, ${primaryColorScale['500']} 55%, ${primaryColorScale['300']} 100%)`,
          position: 'relative',
        }}
      >
        {/* Abstract decorative shapes */}
        <div style={{
          position: 'absolute', inset: 0, overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', width: '320px', height: '320px',
            borderRadius: '50%', right: '-60px', top: '-80px',
            background: 'rgba(255,255,255,0.08)',
          }} />
          <div style={{
            position: 'absolute', width: '200px', height: '200px',
            borderRadius: '50%', left: '15%', bottom: '-60px',
            background: 'rgba(255,255,255,0.06)',
          }} />
          <div style={{
            position: 'absolute', width: '1px', height: '100%',
            left: '40%', background: 'rgba(255,255,255,0.1)',
          }} />
        </div>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: headingFont.family,
            fontWeight: getFontWeight(headingFont.weight),
            fontSize: getHeadingSize(2, headingFont.size),
            color: 'rgba(255,255,255,0.9)',
            letterSpacing: '-0.01em',
          }}>
            The craft of type
          </span>
        </div>
      </div>

      {/* Kicker */}
      <p style={{
        fontFamily: bodyFont.family,
        fontSize: getFontSize('xs'),
        fontWeight: '600',
        color: primaryColorScale['500'],
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: '12px',
      }}>
        Design · 5 min read
      </p>

      {/* H1 */}
      <h1 style={{ ...h(1), lineHeight: 1.1, marginBottom: '16px' }}>
        The Art of Typography in Modern Interfaces
      </h1>

      {/* Subtitle / deck */}
      <p style={{
        fontFamily: bodyFont.family,
        fontSize: getFontSize('lg'),
        color: textSecondary,
        lineHeight: 1.6,
        marginBottom: '28px',
      }}>
        How intentional font pairing and scale transform the way people read, feel, and remember what they encounter.
      </p>

      {/* Byline divider */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        paddingBottom: '28px', marginBottom: '28px',
        borderBottom: `1px solid ${borderColor}`,
      }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
          background: `linear-gradient(135deg, ${primaryColorScale['600']}, ${primaryColorScale['400']})`,
        }} />
        <div>
          <p style={{ fontFamily: bodyFont.family, fontSize: getFontSize('sm'), fontWeight: '600', color: textPrimary, lineHeight: 1.2 }}>
            Sarah Chen
          </p>
          <p style={{ fontFamily: bodyFont.family, fontSize: getFontSize('xs'), color: textMuted, lineHeight: 1.2 }}>
            March 15, 2024
          </p>
        </div>
      </div>

      {/* Lead paragraph */}
      <p style={{ ...body, fontSize: getFontSize('lg'), marginBottom: '20px' }}>
        Typography is the invisible architecture of communication. Before a reader processes a single word, they've already formed an impression — warm or cold, authoritative or playful, urgent or contemplative. The font does this work silently, before meaning arrives.
      </p>

      {/* H2 */}
      <h2 style={{ ...h(2), lineHeight: 1.2, marginTop: '40px', marginBottom: '16px' }}>
        Building a Type Hierarchy
      </h2>

      <p style={{ ...body, marginBottom: '20px' }}>
        A well-considered hierarchy doesn't just organize content — it creates rhythm, guides the eye, and signals importance before a word is read. The relationship between your heading font and body font is where the personality of a design lives.
      </p>

      <p style={{ ...body, marginBottom: '32px' }}>
        Contrast is the engine. A geometric sans-serif headline paired with a humanist serif body creates productive tension: precision and warmth, structure and warmth, each making the other more distinct.
      </p>

      {/* Blockquote */}
      <blockquote style={{
        background: blockquoteBg,
        borderLeft: `3px solid ${primaryColorScale['500']}`,
        borderRadius: '0 8px 8px 0',
        padding: '20px 24px',
        margin: '0 0 32px 0',
      }}>
        <p style={{
          fontFamily: headingFont.family,
          fontWeight: getFontWeight(headingFont.weight),
          fontSize: getHeadingSize(4, headingFont.size),
          color: textPrimary,
          lineHeight: 1.4,
          fontStyle: 'italic',
          margin: 0,
        }}>
          "Good type hierarchy doesn't just organize content — it creates rhythm, guides attention, and signals meaning before a single word is read."
        </p>
      </blockquote>

      {/* H3 */}
      <h3 style={{ ...h(3), lineHeight: 1.3, marginTop: '40px', marginBottom: '12px' }}>
        Pairing Fonts Effectively
      </h3>

      <p style={{ ...body, marginBottom: '20px' }}>
        The safest pairings live at the extremes: either closely related (two cuts of the same superfamily) or dramatically different (a display serif with a neutral mono). The danger zone is the middle — two fonts that are similar enough to look accidental but different enough to compete.
      </p>

      <p style={{ ...body, marginBottom: '32px' }}>
        Size and weight do more heavy lifting than most designers realize. You can pair two fonts that seem identical at a glance and create a clear hierarchy purely through scale, weight, and letter-spacing.
      </p>

      {/* Small type / caption row */}
      <div style={{
        borderTop: `1px solid ${borderColor}`,
        paddingTop: '16px',
        marginTop: '8px',
      }}>
        <p style={{
          fontFamily: bodyFont.family,
          fontSize: getFontSize('xs'),
          color: textMuted,
          lineHeight: 1.6,
        }}>
          Fig. 1 — Caption text and footnotes use reduced type to signal hierarchy without disrupting reading flow. This size is also used for timestamps, labels, and supporting metadata throughout the interface.
        </p>
      </div>
    </article>
  );
}
