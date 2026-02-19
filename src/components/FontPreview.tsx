'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useTypographyToken } from '@/hooks/useTypographyToken';

export default function FontPreview() {
  const { isDarkMode, neutralColorScale, primaryColorScale } = useDesignSystem();

  const display = useTypographyToken('display');
  const overline = useTypographyToken('overline');
  const heading1 = useTypographyToken('heading-1');
  const heading2 = useTypographyToken('heading-2');
  const heading3 = useTypographyToken('heading-3');
  const heading4 = useTypographyToken('heading-4');
  const bodyLarge = useTypographyToken('body-large');
  const body = useTypographyToken('body');
  const label = useTypographyToken('label');
  const caption = useTypographyToken('caption');

  const textPrimary   = isDarkMode ? neutralColorScale['100'] : neutralColorScale['900'];
  const textSecondary = isDarkMode ? neutralColorScale['300'] : neutralColorScale['600'];
  const textMuted     = isDarkMode ? neutralColorScale['500'] : neutralColorScale['400'];
  const borderColor   = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const blockquoteBg  = isDarkMode ? neutralColorScale['800'] : neutralColorScale['50'];

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
            fontFamily: display.fontFamily,
            fontWeight: display.fontWeight,
            fontSize: display.fontSize,
            color: 'rgba(255,255,255,0.9)',
            letterSpacing: '-0.01em',
          }}>
            The craft of type
          </span>
        </div>
      </div>

      {/* Kicker */}
      <p style={{
        fontFamily: overline.fontFamily,
        fontSize: overline.fontSize,
        fontWeight: overline.fontWeight,
        color: primaryColorScale['500'],
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: '12px',
      }}>
        Design · 5 min read
      </p>

      {/* H1 */}
      <h1 style={{
        fontFamily: heading1.fontFamily,
        fontWeight: heading1.fontWeight,
        fontSize: heading1.fontSize,
        color: textPrimary,
        lineHeight: 1.1,
        marginBottom: '16px',
      }}>
        The Art of Typography in Modern Interfaces
      </h1>

      {/* Subtitle / deck */}
      <p style={{
        fontFamily: bodyLarge.fontFamily,
        fontSize: bodyLarge.fontSize,
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
          <p style={{ fontFamily: label.fontFamily, fontSize: label.fontSize, fontWeight: label.fontWeight, color: textPrimary, lineHeight: 1.2 }}>
            Sarah Chen
          </p>
          <p style={{ fontFamily: caption.fontFamily, fontSize: caption.fontSize, color: textMuted, lineHeight: 1.2 }}>
            March 15, 2024
          </p>
        </div>
      </div>

      {/* Lead paragraph */}
      <p style={{
        fontFamily: bodyLarge.fontFamily,
        fontWeight: bodyLarge.fontWeight,
        fontSize: bodyLarge.fontSize,
        lineHeight: 1.75,
        color: textSecondary,
        marginBottom: '20px',
      }}>
        Typography is the invisible architecture of communication. Before a reader processes a single word, they've already formed an impression — warm or cold, authoritative or playful, urgent or contemplative. The font does this work silently, before meaning arrives.
      </p>

      {/* H2 */}
      <h2 style={{
        fontFamily: heading2.fontFamily,
        fontWeight: heading2.fontWeight,
        fontSize: heading2.fontSize,
        color: textPrimary,
        lineHeight: 1.2,
        marginTop: '40px',
        marginBottom: '16px',
      }}>
        Building a Type Hierarchy
      </h2>

      <p style={{
        fontFamily: body.fontFamily,
        fontWeight: body.fontWeight,
        fontSize: body.fontSize,
        lineHeight: 1.75,
        color: textSecondary,
        marginBottom: '20px',
      }}>
        A well-considered hierarchy doesn't just organize content — it creates rhythm, guides the eye, and signals importance before a word is read. The relationship between your heading font and body font is where the personality of a design lives.
      </p>

      <p style={{
        fontFamily: body.fontFamily,
        fontWeight: body.fontWeight,
        fontSize: body.fontSize,
        lineHeight: 1.75,
        color: textSecondary,
        marginBottom: '32px',
      }}>
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
          fontFamily: heading4.fontFamily,
          fontWeight: heading4.fontWeight,
          fontSize: heading4.fontSize,
          color: textPrimary,
          lineHeight: 1.4,
          fontStyle: 'italic',
          margin: 0,
        }}>
          "Good type hierarchy doesn't just organize content — it creates rhythm, guides attention, and signals meaning before a single word is read."
        </p>
      </blockquote>

      {/* H3 */}
      <h3 style={{
        fontFamily: heading3.fontFamily,
        fontWeight: heading3.fontWeight,
        fontSize: heading3.fontSize,
        color: textPrimary,
        lineHeight: 1.3,
        marginTop: '40px',
        marginBottom: '12px',
      }}>
        Pairing Fonts Effectively
      </h3>

      <p style={{
        fontFamily: body.fontFamily,
        fontWeight: body.fontWeight,
        fontSize: body.fontSize,
        lineHeight: 1.75,
        color: textSecondary,
        marginBottom: '20px',
      }}>
        The safest pairings live at the extremes: either closely related (two cuts of the same superfamily) or dramatically different (a display serif with a neutral mono). The danger zone is the middle — two fonts that are similar enough to look accidental but different enough to compete.
      </p>

      <p style={{
        fontFamily: body.fontFamily,
        fontWeight: body.fontWeight,
        fontSize: body.fontSize,
        lineHeight: 1.75,
        color: textSecondary,
        marginBottom: '32px',
      }}>
        Size and weight do more heavy lifting than most designers realize. You can pair two fonts that seem identical at a glance and create a clear hierarchy purely through scale, weight, and letter-spacing.
      </p>

      {/* Small type / caption row */}
      <div style={{
        borderTop: `1px solid ${borderColor}`,
        paddingTop: '16px',
        marginTop: '8px',
      }}>
        <p style={{
          fontFamily: caption.fontFamily,
          fontSize: caption.fontSize,
          color: textMuted,
          lineHeight: 1.6,
        }}>
          Fig. 1 — Caption text and footnotes use reduced type to signal hierarchy without disrupting reading flow. This size is also used for timestamps, labels, and supporting metadata throughout the interface.
        </p>
      </div>
    </article>
  );
}
