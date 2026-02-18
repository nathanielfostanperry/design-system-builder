'use client';

import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';

function EmptyState({ label, hint }: { label: string; hint: string }) {
  return (
    <span className="italic opacity-30">
      {hint}
    </span>
  );
}

function Section({
  title,
  children,
  accent,
}: {
  title: string;
  children: React.ReactNode;
  accent: string;
}) {
  return (
    <div className="flex gap-8">
      <div className="w-32 flex-shrink-0 pt-0.5">
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: accent, letterSpacing: '0.1em' }}
        >
          {title}
        </span>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default function BrandDocs() {
  const {
    brandSettings,
    primaryColorScale, accentColorScale, neutralColorScale,
    isDarkMode, headingFont, bodyFont,
  } = useDesignSystem();

  const [copied, setCopied] = useState(false);

  const textPrimary   = isDarkMode ? neutralColorScale['100'] : neutralColorScale['900'];
  const textSecondary = isDarkMode ? neutralColorScale['400'] : neutralColorScale['500'];
  const borderClr     = isDarkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
  const accent        = isDarkMode ? primaryColorScale['400'] : primaryColorScale['600'];
  const tagBg         = isDarkMode ? neutralColorScale['800'] : neutralColorScale['100'];
  const cardBg        = isDarkMode ? neutralColorScale['800'] : '#ffffff';
  const pageBg        = isDarkMode ? neutralColorScale['900'] : neutralColorScale['50'];

  const hasName        = !!brandSettings.name.trim();
  const hasMission     = !!brandSettings.mission.trim();
  const hasPositioning = !!brandSettings.positioning.trim();
  const hasValues      = brandSettings.values.length > 0;
  const hasVoice       = brandSettings.voice.length > 0;
  const hasIndustry    = !!brandSettings.industry;

  const generateMarkdown = () => {
    let md = `# Brand Identity${hasName ? ` — ${brandSettings.name}` : ''}\n\n`;
    if (hasIndustry)    md += `**Industry:** ${brandSettings.industry}\n\n`;
    if (hasMission)     md += `## Mission\n\n${brandSettings.mission}\n\n`;
    if (hasPositioning) md += `## Positioning\n\n${brandSettings.positioning}\n\n`;
    if (hasValues)      md += `## Brand Values\n\n${brandSettings.values.map((v) => `- ${v}`).join('\n')}\n\n`;
    if (hasVoice)       md += `## Voice & Tone\n\n${brandSettings.voice.map((v) => `- ${v}`).join('\n')}\n`;
    return md.trim();
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="min-h-full"
      style={{ backgroundColor: pageBg }}
    >
      {/* Document header */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-8 py-3 border-b"
        style={{ backgroundColor: pageBg, borderColor: borderClr }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: textSecondary, letterSpacing: '0.1em' }}
          >
            brand-identity.md
          </span>
          {hasName && (
            <>
              <span style={{ color: borderClr }}>·</span>
              <span className="text-xs" style={{ color: textSecondary }}>
                {brandSettings.name}
              </span>
            </>
          )}
        </div>
        <button
          onClick={copyMarkdown}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs border transition-colors"
          style={{
            backgroundColor: cardBg,
            borderColor: borderClr,
            color: textSecondary,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2H3.5A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {copied ? 'Copied!' : 'Copy Markdown'}
        </button>
      </div>

      <div className="px-8 py-10 max-w-3xl">

        {/* Title */}
        <div className="mb-10">
          <h1
            className="text-3xl font-bold mb-1"
            style={{ fontFamily: headingFont.family, color: textPrimary }}
          >
            {hasName ? brandSettings.name : 'Brand Identity'}
          </h1>
          {hasIndustry && (
            <p className="text-sm" style={{ color: textSecondary, fontFamily: bodyFont.family }}>
              {brandSettings.industry}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-8">

          {/* Divider */}
          <div style={{ borderTop: `1px solid ${borderClr}` }} />

          {/* Mission */}
          <Section title="Mission" accent={accent}>
            {hasMission ? (
              <p
                className="text-lg leading-relaxed"
                style={{ fontFamily: bodyFont.family, color: textPrimary }}
              >
                &ldquo;{brandSettings.mission}&rdquo;
              </p>
            ) : (
              <p className="text-base" style={{ color: textSecondary, fontFamily: bodyFont.family }}>
                <EmptyState label="Mission" hint="Add your mission in the Brand panel →" />
              </p>
            )}
          </Section>

          <div style={{ borderTop: `1px solid ${borderClr}` }} />

          {/* Positioning */}
          <Section title="Positioning" accent={accent}>
            {hasPositioning ? (
              <p
                className="text-base leading-relaxed"
                style={{ fontFamily: bodyFont.family, color: textPrimary }}
              >
                {brandSettings.positioning}
              </p>
            ) : (
              <p className="text-base" style={{ color: textSecondary, fontFamily: bodyFont.family }}>
                <EmptyState label="Positioning" hint="Add your positioning statement →" />
              </p>
            )}
          </Section>

          <div style={{ borderTop: `1px solid ${borderClr}` }} />

          {/* Values */}
          <Section title="Values" accent={accent}>
            {hasValues ? (
              <div className="flex flex-wrap gap-2">
                {brandSettings.values.map((v) => (
                  <span
                    key={v}
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: isDarkMode ? primaryColorScale['900'] : primaryColorScale['50'],
                      color: isDarkMode ? primaryColorScale['300'] : primaryColorScale['700'],
                      border: `1px solid ${isDarkMode ? primaryColorScale['800'] : primaryColorScale['100']}`,
                      fontFamily: bodyFont.family,
                    }}
                  >
                    {v}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-base" style={{ color: textSecondary, fontFamily: bodyFont.family }}>
                <EmptyState label="Values" hint="Add brand values in the Brand panel →" />
              </p>
            )}
          </Section>

          <div style={{ borderTop: `1px solid ${borderClr}` }} />

          {/* Voice */}
          <Section title="Voice & Tone" accent={accent}>
            {hasVoice ? (
              <div className="flex flex-wrap gap-2">
                {brandSettings.voice.map((v) => (
                  <span
                    key={v}
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: isDarkMode ? accentColorScale['900'] : accentColorScale['50'],
                      color: isDarkMode ? accentColorScale['300'] : accentColorScale['700'],
                      border: `1px solid ${isDarkMode ? accentColorScale['800'] : accentColorScale['100']}`,
                      fontFamily: bodyFont.family,
                    }}
                  >
                    {v}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-base" style={{ color: textSecondary, fontFamily: bodyFont.family }}>
                <EmptyState label="Voice" hint="Select voice attributes in the Brand panel →" />
              </p>
            )}
          </Section>

          <div style={{ borderTop: `1px solid ${borderClr}` }} />

          {/* Color palette preview */}
          <Section title="Colors" accent={accent}>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Primary', scale: primaryColorScale },
                { label: 'Secondary', scale: accentColorScale },
              ].map(({ label, scale }) => (
                <div key={label}>
                  <p className="text-xs mb-1.5" style={{ color: textSecondary, fontFamily: bodyFont.family }}>
                    {label}
                  </p>
                  <div className="flex gap-1">
                    {['100', '200', '300', '400', '500', '600', '700', '800', '900'].map((shade) => (
                      <div
                        key={shade}
                        className="flex-1 h-6 rounded-sm"
                        style={{ backgroundColor: scale[shade] }}
                        title={`${label} ${shade}: ${scale[shade]}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
}
