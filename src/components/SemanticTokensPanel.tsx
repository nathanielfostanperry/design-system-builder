'use client';

import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import * as Select from '@radix-ui/react-select';
import {
  SEMANTIC_TOKEN_DEFINITIONS,
  SEMANTIC_CATEGORIES,
  getEffectiveMapping,
  getPrimitiveRefOptions,
} from '@/utils/semanticTokens';
const toSlug = (name: string) =>
  name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const ChevronDownIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function SemanticTokensPanel() {
  const {
    primaryColorScale,
    accentColorScale,
    neutralColorScale,
    extraPalettes,
    semanticTokenOverrides,
    setSemanticTokenOverride,
    resetSemanticTokenOverride,
    isDarkMode,
  } = useDesignSystem();

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['background', 'text', 'border', 'interactive'])
  );

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const primitiveOptions = getPrimitiveRefOptions(
    extraPalettes.map((p) => toSlug(p.name))
  );

  const borderClr = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const bgColor = isDarkMode ? neutralColorScale['800'] : '#fff';
  const bgHover = isDarkMode ? neutralColorScale['700'] : neutralColorScale['50'];
  const textPrimary = isDarkMode ? neutralColorScale['100'] : neutralColorScale['900'];
  const textMuted = isDarkMode ? neutralColorScale['500'] : neutralColorScale['400'];
  const sectionBg = isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';

  const getColorForRef = (ref: string): string => {
    if (ref === 'white') return '#ffffff';
    const [palette, shade] = ref.split('-');
    if (!palette || !shade) return '#999';
    if (palette === 'primary') return primaryColorScale[shade] ?? '#999';
    if (palette === 'secondary') return accentColorScale[shade] ?? '#999';
    if (palette === 'neutral') return neutralColorScale[shade] ?? '#999';
    const extra = extraPalettes.find((p) => toSlug(p.name) === palette);
    return extra?.scale[shade] ?? '#999';
  };

  return (
    <div className="flex flex-col gap-5">
      <p className="text-xs leading-relaxed" style={{ color: textMuted }}>
        Semantic tokens map purpose-driven names to primitive colors. When your color scales change, semantic tokens update automatically. Override any mapping below.
      </p>

      {SEMANTIC_CATEGORIES.map((cat) => {
        const tokens = SEMANTIC_TOKEN_DEFINITIONS.filter((t) => t.category === cat.id);
        if (tokens.length === 0) return null;

        const isExpanded = expandedCategories.has(cat.id);

        return (
          <div key={cat.id}>
            <button
              onClick={() => toggleCategory(cat.id)}
              className="flex items-center justify-between w-full text-left py-1.5"
              style={{ color: textPrimary }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ letterSpacing: '0.09em' }}>
                {cat.label}
              </span>
              <span className="text-xs" style={{ color: textMuted }}>
                {isExpanded ? '−' : '+'}
              </span>
            </button>

            {isExpanded && (
              <div
                className="rounded-lg overflow-hidden mt-1"
                style={{ border: `1px solid ${borderClr}`, backgroundColor: sectionBg }}
              >
                {tokens.map((token, i) => {
                  const effectiveRef = getEffectiveMapping(token.id, semanticTokenOverrides);
                  const isOverridden = semanticTokenOverrides[token.id] !== undefined;

                  return (
                    <div
                      key={token.id}
                      className="px-3 py-2.5 flex flex-col gap-1.5"
                      style={{ borderTop: i > 0 ? `1px solid ${borderClr}` : 'none' }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium" style={{ color: textPrimary }}>
                            {token.label}
                          </span>
                          {isOverridden && (
                            <span className="ml-1.5 text-xs" style={{ color: textMuted }}>
                              (overridden)
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Select.Root
                            value={effectiveRef}
                            onValueChange={(val) => setSemanticTokenOverride(token.id, val)}
                          >
                            <Select.Trigger
                              className="flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs outline-none transition-colors hover:opacity-80"
                              style={{
                                backgroundColor: bgColor,
                                borderColor: borderClr,
                                color: textPrimary,
                                minWidth: '100px',
                              }}
                            >
                              <span
                                className="w-2.5 h-2.5 rounded-full flex-shrink-0 border border-white/20"
                                style={{ backgroundColor: getColorForRef(effectiveRef) }}
                              />
                              <Select.Value>{effectiveRef}</Select.Value>
                              <Select.Icon className="ml-auto opacity-50">
                                <ChevronDownIcon />
                              </Select.Icon>
                            </Select.Trigger>

                            <Select.Portal>
                              <Select.Content
                                className="rounded-md shadow-lg z-50 overflow-hidden max-h-64"
                                sideOffset={4}
                                style={{
                                  backgroundColor: bgColor,
                                  border: `1px solid ${borderClr}`,
                                  minWidth: '140px',
                                }}
                              >
                                <Select.Viewport className="p-1">
                                  {primitiveOptions.map((opt) => (
                                    <Select.Item
                                      key={opt.value}
                                      value={opt.value}
                                      className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-md cursor-pointer outline-none transition-colors"
                                      style={{ color: textPrimary }}
                                      onFocus={(e) => (e.currentTarget.style.backgroundColor = bgHover)}
                                      onBlur={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                    >
                                      <span
                                        className="w-2.5 h-2.5 rounded-full flex-shrink-0 border border-white/20"
                                        style={{ backgroundColor: getColorForRef(opt.value) }}
                                      />
                                      <Select.ItemText>{opt.label}</Select.ItemText>
                                    </Select.Item>
                                  ))}
                                </Select.Viewport>
                              </Select.Content>
                            </Select.Portal>
                          </Select.Root>
                          {isOverridden && (
                            <button
                              onClick={() => resetSemanticTokenOverride(token.id)}
                              className="px-2 py-1 text-xs rounded-md border transition-colors"
                              style={{
                                backgroundColor: bgColor,
                                borderColor: borderClr,
                                color: textMuted,
                              }}
                              title="Reset to default"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: textMuted }}>
                        {token.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
