'use client';

import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import * as Select from '@radix-ui/react-select';
import {
  COMPONENT_TOKEN_DEFINITIONS,
  COMPONENT_TOKEN_GROUPS,
  getEffectiveComponentTokenRef,
  getComponentTokenRefOptions,
  isSemanticRef,
} from '@/utils/componentTokens';
import { getPrimitiveRefOptions, getEffectiveMapping } from '@/utils/semanticTokens';
import { SEMANTIC_TOKEN_DEFINITIONS } from '@/utils/semanticTokens';

const toSlug = (name: string) =>
  name.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const ChevronDownIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ComponentTokensPanel() {
  const {
    primaryColorScale,
    accentColorScale,
    neutralColorScale,
    extraPalettes,
    semanticTokenOverrides,
    componentTokenOverrides,
    setComponentTokenOverride,
    resetComponentTokenOverride,
    isDarkMode,
  } = useDesignSystem();

  const [expandedComponents, setExpandedComponents] = useState<Set<string>>(
    new Set(['button-primary', 'button-secondary'])
  );

  const toggleComponent = (id: string) => {
    setExpandedComponents((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const primitiveOptions = getPrimitiveRefOptions(
    extraPalettes.map((p) => ({ slug: toSlug(p.name), label: p.name }))
  );
  const semanticOpts = SEMANTIC_TOKEN_DEFINITIONS.map((t) => ({ id: t.id, label: t.label }));
  const allOptions = getComponentTokenRefOptions(primitiveOptions, semanticOpts);

  const getColorForRef = (ref: string): string => {
    if (ref === 'white') return '#ffffff';
    if (ref === 'transparent') return 'transparent';
    if (isSemanticRef(ref)) {
      const semanticId = ref.slice('semantic:'.length);
      const primitiveRef = getEffectiveMapping(semanticId, semanticTokenOverrides);
      ref = primitiveRef;
    }
    const parts = ref.split('-');
    if (parts.length < 2) return '#999';
    const shade = parts[parts.length - 1];
    const palette = parts.slice(0, -1).join('-');
    if (palette === 'primary') return primaryColorScale[shade] ?? '#999';
    if (palette === 'secondary') return accentColorScale[shade] ?? '#999';
    if (palette === 'neutral') return neutralColorScale[shade] ?? '#999';
    const extra = extraPalettes.find((p) => toSlug(p.name) === palette);
    return extra?.scale[shade] ?? '#999';
  };

  const borderClr = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const bgColor = isDarkMode ? neutralColorScale['800'] : '#fff';
  const bgHover = isDarkMode ? neutralColorScale['700'] : neutralColorScale['50'];
  const textPrimary = isDarkMode ? neutralColorScale['100'] : neutralColorScale['900'];
  const textMuted = isDarkMode ? neutralColorScale['500'] : neutralColorScale['400'];
  const sectionBg = isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';

  return (
    <div className="flex flex-col gap-5">
      <p className="text-xs leading-relaxed" style={{ color: textMuted }}>
        Component tokens let you assign specific colors to individual components. Each token defaults to a semantic token but can be overridden with a primitive or different semantic token.
      </p>

      {COMPONENT_TOKEN_GROUPS.map((group) => {
        const tokens = COMPONENT_TOKEN_DEFINITIONS.filter((t) => t.componentId === group.id);
        if (tokens.length === 0) return null;

        const isExpanded = expandedComponents.has(group.id);

        return (
          <div key={group.id}>
            <button
              onClick={() => toggleComponent(group.id)}
              className="flex items-center justify-between w-full text-left py-1.5"
              style={{ color: textPrimary }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ letterSpacing: '0.09em' }}>
                {group.label}
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
                  const effectiveRef = getEffectiveComponentTokenRef(
                    token.componentId,
                    token.tokenKey,
                    componentTokenOverrides
                  );
                  const tokenId = `${token.componentId}-${token.tokenKey}`;
                  const isOverridden = componentTokenOverrides[tokenId] !== undefined;

                  return (
                    <div
                      key={tokenId}
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
                            onValueChange={(val) => setComponentTokenOverride(token.componentId, token.tokenKey, val)}
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
                              <Select.Value>
                                {isSemanticRef(effectiveRef)
                                  ? `Semantic: ${effectiveRef.slice('semantic:'.length).replace(/-/g, ' ')}`
                                  : effectiveRef}
                              </Select.Value>
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
                                  minWidth: '180px',
                                }}
                              >
                                <Select.Viewport className="p-1">
                                  {allOptions.map((opt) => (
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
                              onClick={() => resetComponentTokenOverride(token.componentId, token.tokenKey)}
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
