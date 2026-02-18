'use client';

import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import type { BrandValueEntry, BrandVoicePrinciple, IsIsNotRow } from '@/context/DesignSystemContext';

type SubTab = 'values' | 'positioning' | 'voice';

// ── Shared micro-components ───────────────────────────────────────────────────

function useStyles() {
  const { isDarkMode, neutralColorScale } = useDesignSystem();
  return {
    isDarkMode,
    neutralColorScale,
    border:   isDarkMode ? 'rgba(255,255,255,0.1)'  : 'rgba(0,0,0,0.1)',
    bg:       isDarkMode ? neutralColorScale['800']  : '#fff',
    bgSub:    isDarkMode ? neutralColorScale['850'] ?? neutralColorScale['900'] : neutralColorScale['50'],
    text:     isDarkMode ? neutralColorScale['100']  : neutralColorScale['900'],
    muted:    isDarkMode ? neutralColorScale['500']  : neutralColorScale['400'],
    label:    isDarkMode ? neutralColorScale['400']  : neutralColorScale['500'],
    tagBg:    isDarkMode ? neutralColorScale['700']  : neutralColorScale['100'],
  };
}

function Label({ children }: { children: React.ReactNode }) {
  const s = useStyles();
  return (
    <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: s.label, display: 'block', marginBottom: 5 }}>
      {children}
    </span>
  );
}

function Hint({ children }: { children: React.ReactNode }) {
  const s = useStyles();
  return <p style={{ fontSize: '11px', color: s.muted, marginTop: 4, lineHeight: 1.5 }}>{children}</p>;
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
      {hint && <Hint>{hint}</Hint>}
    </div>
  );
}

function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  const s = useStyles();
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%', padding: '6px 10px', borderRadius: 6,
        border: `1px solid ${s.border}`, backgroundColor: s.bg,
        color: s.text, fontSize: 13, fontFamily: 'inherit', outline: 'none',
      }}
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 3 }: { value: string; onChange: (v: string) => void; placeholder?: string; rows?: number }) {
  const s = useStyles();
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: '100%', padding: '6px 10px', borderRadius: 6,
        border: `1px solid ${s.border}`, backgroundColor: s.bg,
        color: s.text, fontSize: 13, fontFamily: 'inherit', outline: 'none',
        resize: 'vertical', lineHeight: 1.6,
      }}
    />
  );
}

function SectionDivider({ label }: { label: string }) {
  const s = useStyles();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
      <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: s.muted, whiteSpace: 'nowrap' }}>
        {label}
      </span>
      <div style={{ flex: 1, height: 1, backgroundColor: s.border }} />
    </div>
  );
}

function AddButton({ onClick, label }: { onClick: () => void; label: string }) {
  const s = useStyles();
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', padding: '6px 0', borderRadius: 6,
        border: `1px dashed ${s.border}`, backgroundColor: 'transparent',
        color: s.muted, fontSize: 12, cursor: 'pointer', transition: 'opacity 0.15s',
      }}
    >
      + {label}
    </button>
  );
}

// ── Is / Is Not table ─────────────────────────────────────────────────────────

function IsIsNotTable({
  rows,
  onChange,
}: {
  rows: IsIsNotRow[];
  onChange: (rows: IsIsNotRow[]) => void;
}) {
  const s = useStyles();
  const update = (i: number, field: 'is' | 'isNot', val: string) => {
    const next = rows.map((r, idx) => idx === i ? { ...r, [field]: val } : r);
    onChange(next);
  };
  const add = () => onChange([...rows, { is: '', isNot: '' }]);
  const remove = (i: number) => onChange(rows.filter((_, idx) => idx !== i));

  const inputSt: React.CSSProperties = {
    flex: 1, padding: '5px 8px', borderRadius: 5,
    border: `1px solid ${s.border}`, backgroundColor: s.bg,
    color: s.text, fontSize: 12, fontFamily: 'inherit', outline: 'none',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 20px', gap: 4, marginBottom: 2 }}>
        <span style={{ fontSize: 10, color: s.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Is</span>
        <span style={{ fontSize: 10, color: s.muted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Is Not</span>
        <span />
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 20px', gap: 4 }}>
          <input value={row.is}    onChange={(e) => update(i, 'is',    e.target.value)} style={inputSt} placeholder="Quality…"   />
          <input value={row.isNot} onChange={(e) => update(i, 'isNot', e.target.value)} style={inputSt} placeholder="Not this…"  />
          <button onClick={() => remove(i)} style={{ color: s.muted, fontSize: 14, background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 1 }}>×</button>
        </div>
      ))}
      <button onClick={add} style={{ fontSize: 11, color: s.muted, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: '2px 0' }}>
        + Add row
      </button>
    </div>
  );
}

// ── Values tab ────────────────────────────────────────────────────────────────

function ValuesTab() {
  const { brandSettings, setBrandField, addBrandValue, updateBrandValue, removeBrandValue } = useDesignSystem();
  const s = useStyles();
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) => setExpanded((prev) => prev === id ? null : id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <SectionDivider label="Core Values" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {brandSettings.valueEntries.map((v) => (
          <ValueCard
            key={v.id}
            entry={v}
            isExpanded={expanded === v.id}
            onToggle={() => toggle(v.id)}
            onChange={(field, val) => updateBrandValue(v.id, field, val)}
            onRemove={() => removeBrandValue(v.id)}
          />
        ))}
        <AddButton onClick={addBrandValue} label="Add value" />
      </div>

      <SectionDivider label="Value Hierarchy" />
      <Field label="Priority order" hint="When values conflict, resolve in this order. One per line.">
        <Textarea
          value={brandSettings.valueHierarchy}
          onChange={(v) => setBrandField('valueHierarchy', v)}
          placeholder={"1. [Highest priority]\n2. [Second priority]\n3. [Third priority]"}
          rows={4}
        />
      </Field>

      <SectionDivider label="Hard Limits" />
      <Field label="Absolute limits" hint="Things this brand will never do, say, or be associated with.">
        <Textarea
          value={brandSettings.hardLimits}
          onChange={(v) => setBrandField('hardLimits', v)}
          placeholder={"- [Never do this]\n- [Never say this]\n- [Never be associated with this]"}
          rows={4}
        />
      </Field>
    </div>
  );
}

function ValueCard({
  entry, isExpanded, onToggle, onChange, onRemove,
}: {
  entry: BrandValueEntry;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (field: keyof BrandValueEntry, val: string) => void;
  onRemove: () => void;
}) {
  const s = useStyles();
  const cardSt: React.CSSProperties = {
    border: `1px solid ${s.border}`,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: s.bgSub,
  };
  const headerSt: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px',
    cursor: 'pointer',
  };
  const inputSt: React.CSSProperties = {
    flex: 1, background: 'none', border: 'none', outline: 'none',
    color: s.text, fontSize: 13, fontFamily: 'inherit', fontWeight: 500,
  };

  return (
    <div style={cardSt}>
      <div style={headerSt} onClick={onToggle}>
        <span style={{ fontSize: 10, color: s.muted, transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s', display: 'inline-block' }}>▶</span>
        <input
          value={entry.name}
          onChange={(e) => { e.stopPropagation(); onChange('name', e.target.value); }}
          onClick={(e) => e.stopPropagation()}
          placeholder="Value name…"
          style={inputSt}
        />
        <button onClick={(e) => { e.stopPropagation(); onRemove(); }} style={{ color: s.muted, fontSize: 14, background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 1 }}>×</button>
      </div>
      {isExpanded && (
        <div style={{ padding: '0 10px 12px', display: 'flex', flexDirection: 'column', gap: 10, borderTop: `1px solid ${s.border}` }}>
          <div style={{ paddingTop: 10 }}>
            <Label>In one sentence</Label>
            <Textarea value={entry.sentence} onChange={(v) => onChange('sentence', v)} placeholder="A precise, active statement of what this value means…" rows={2} />
          </div>
          <div>
            <Label>In practice this means</Label>
            <Textarea value={entry.inPractice} onChange={(v) => onChange('inPractice', v)} placeholder={"- Concrete behavior 1\n- Concrete behavior 2\n- Concrete behavior 3"} rows={3} />
          </div>
          <div>
            <Label>This does not mean</Label>
            <Textarea value={entry.notMeans} onChange={(v) => onChange('notMeans', v)} placeholder={"- Common misreading to guard against\n- Another misreading"} rows={2} />
          </div>
          <div>
            <Label>A decision passes this value if</Label>
            <Textarea value={entry.passesIf} onChange={(v) => onChange('passesIf', v)} placeholder="A single testable question…" rows={2} />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Positioning tab ───────────────────────────────────────────────────────────

function PositioningTab() {
  const { brandSettings, setBrandField } = useDesignSystem();
  const bf = (key: keyof typeof brandSettings) => brandSettings[key] as string;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <SectionDivider label="Brand Purpose" />
      <Field label="Why does this brand exist?" hint="Specific enough to exclude things this brand would not do.">
        <Textarea value={bf('purpose')} onChange={(v) => setBrandField('purpose', v)} placeholder="The change this brand exists to make in the world…" rows={3} />
      </Field>

      <SectionDivider label="The Person This Brand Serves" />
      <Field label="Primary audience" hint="Psychographic, not just demographic. What do they believe? Distrust?">
        <Textarea value={bf('primaryAudience')} onChange={(v) => setBrandField('primaryAudience', v)} placeholder="Describe them…" rows={3} />
      </Field>
      <Field label="Secondary audience">
        <Textarea value={bf('secondaryAudience')} onChange={(v) => setBrandField('secondaryAudience', v)} placeholder="If relevant…" rows={2} />
      </Field>
      <Field label="Who this brand is not for" hint="Be specific.">
        <Textarea value={bf('notFor')} onChange={(v) => setBrandField('notFor', v)} placeholder="Not intended for…" rows={2} />
      </Field>

      <SectionDivider label="The Problem This Brand Solves" />
      <Field label="Tension in the market" hint="What is broken or missing?">
        <Textarea value={bf('marketTension')} onChange={(v) => setBrandField('marketTension', v)} placeholder="The gap this brand occupies…" rows={3} />
      </Field>
      <Field label="What the audience has tried" hint="Why do alternatives fall short?">
        <Textarea value={bf('audienceTried')} onChange={(v) => setBrandField('audienceTried', v)} placeholder="Alternatives and their shortcomings…" rows={2} />
      </Field>
      <Field label="What this brand uniquely offers" hint="Avoid generic claims. If a competitor could say it, cut it.">
        <Textarea value={bf('uniqueOffer')} onChange={(v) => setBrandField('uniqueOffer', v)} placeholder="The specific, defensible differentiator…" rows={3} />
      </Field>

      <SectionDivider label="Competitive Position" />
      <Field label="Category">
        <Input value={bf('category')} onChange={(v) => setBrandField('category', v)} placeholder="What category does this brand compete in?" />
      </Field>
      <Field label="Key competitors" hint="2–4 competitors, brief contrast for each.">
        <Textarea value={bf('competitors')} onChange={(v) => setBrandField('competitors', v)} placeholder={"Competitor A — differs because…\nCompetitor B — differs because…"} rows={3} />
      </Field>
      <Field label="Positioning statement" hint="For [audience] who [need], [brand] is the [category] that [differentiator].">
        <Textarea value={bf('positioningStatement')} onChange={(v) => setBrandField('positioningStatement', v)} placeholder="For [audience] who…" rows={3} />
      </Field>

      <SectionDivider label="Strategic Intent" />
      <Field label="What does success look like in 3 years?">
        <Textarea value={bf('successIn3Years')} onChange={(v) => setBrandField('successIn3Years', v)} placeholder="A specific, vivid description…" rows={3} />
      </Field>
      <Field label="Known for above all else" hint="One thing only.">
        <Input value={bf('knownFor')} onChange={(v) => setBrandField('knownFor', v)} placeholder="One thing…" />
      </Field>

      <SectionDivider label="Is / Is Not" />
      <IsIsNotTable
        rows={brandSettings.positioningIsIsNot}
        onChange={(rows) => setBrandField('positioningIsIsNot', rows)}
      />
    </div>
  );
}

// ── Voice tab ─────────────────────────────────────────────────────────────────

function VoiceTab() {
  const { brandSettings, setBrandField, addVoicePrinciple, updateVoicePrinciple, removeVoicePrinciple } = useDesignSystem();
  const [expanded, setExpanded] = useState<string | null>(null);
  const bf = (key: keyof typeof brandSettings) => brandSettings[key] as string;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <SectionDivider label="Voice Principles" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {brandSettings.voicePrinciples.map((p) => (
          <PrincipleCard
            key={p.id}
            principle={p}
            isExpanded={expanded === p.id}
            onToggle={() => setExpanded((prev) => prev === p.id ? null : p.id)}
            onChange={(field, val) => updateVoicePrinciple(p.id, field, val)}
            onRemove={() => removeVoicePrinciple(p.id)}
          />
        ))}
        <AddButton onClick={addVoicePrinciple} label="Add principle" />
      </div>

      <SectionDivider label="Is / Is Not" />
      <IsIsNotTable
        rows={brandSettings.voiceIsIsNot}
        onChange={(rows) => setBrandField('voiceIsIsNot', rows)}
      />

      <SectionDivider label="Vocabulary" />
      <Field label="Words & phrases this brand uses" hint="List specific words. Explain briefly why each belongs.">
        <Textarea value={bf('wordsUse')} onChange={(v) => setBrandField('wordsUse', v)} placeholder={"Word/phrase — reason it belongs\nWord/phrase — reason it belongs"} rows={3} />
      </Field>
      <Field label="Words & phrases this brand avoids" hint="Jargon, buzzwords, or anything that undermines the voice.">
        <Textarea value={bf('wordsAvoid')} onChange={(v) => setBrandField('wordsAvoid', v)} placeholder={"Word/phrase — why to avoid\nWord/phrase — why to avoid"} rows={3} />
      </Field>

      <SectionDivider label="Voice Across Registers" />
      <Field label="When informing">
        <Textarea value={bf('whenInforming')} onChange={(v) => setBrandField('whenInforming', v)} placeholder="How the voice behaves when explaining or educating…" rows={2} />
      </Field>
      <Field label="When persuading">
        <Textarea value={bf('whenPersuading')} onChange={(v) => setBrandField('whenPersuading', v)} placeholder="How the voice behaves when making an argument…" rows={2} />
      </Field>
      <Field label="When responding">
        <Textarea value={bf('whenResponding')} onChange={(v) => setBrandField('whenResponding', v)} placeholder="How the voice behaves when replying to questions or feedback…" rows={2} />
      </Field>
      <Field label="When celebrating">
        <Textarea value={bf('whenCelebrating')} onChange={(v) => setBrandField('whenCelebrating', v)} placeholder="How the voice behaves in moments of success or announcement…" rows={2} />
      </Field>
    </div>
  );
}

function PrincipleCard({
  principle, isExpanded, onToggle, onChange, onRemove,
}: {
  principle: BrandVoicePrinciple;
  isExpanded: boolean;
  onToggle: () => void;
  onChange: (field: keyof BrandVoicePrinciple, val: string) => void;
  onRemove: () => void;
}) {
  const s = useStyles();
  return (
    <div style={{ border: `1px solid ${s.border}`, borderRadius: 8, overflow: 'hidden', backgroundColor: s.bgSub }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', cursor: 'pointer' }} onClick={onToggle}>
        <span style={{ fontSize: 10, color: s.muted, transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s', display: 'inline-block' }}>▶</span>
        <input
          value={principle.name}
          onChange={(e) => { e.stopPropagation(); onChange('name', e.target.value); }}
          onClick={(e) => e.stopPropagation()}
          placeholder="Principle name…"
          style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: s.text, fontSize: 13, fontFamily: 'inherit', fontWeight: 500 }}
        />
        <button onClick={(e) => { e.stopPropagation(); onRemove(); }} style={{ color: s.muted, fontSize: 14, background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 1 }}>×</button>
      </div>
      {isExpanded && (
        <div style={{ padding: '0 10px 12px', display: 'flex', flexDirection: 'column', gap: 10, borderTop: `1px solid ${s.border}` }}>
          <div style={{ paddingTop: 10 }}>
            <Label>What this means</Label>
            <Textarea value={principle.whatMeans} onChange={(v) => onChange('whatMeans', v)} placeholder="A precise description of this voice quality — not an adjective, but an active explanation…" rows={3} />
          </div>
          <div>
            <Label>Why this brand speaks this way</Label>
            <Textarea value={principle.why} onChange={(v) => onChange('why', v)} placeholder="The strategic or cultural reason behind this principle…" rows={2} />
          </div>
          <div>
            <Label>In practice</Label>
            <Textarea value={principle.inPractice} onChange={(v) => onChange('inPractice', v)} placeholder={"- Specific, observable behavior\n- Specific, observable behavior\n- Specific, observable behavior"} rows={3} />
          </div>
          <div>
            <Label>Never</Label>
            <Textarea value={principle.never} onChange={(v) => onChange('never', v)} placeholder={"- Specific thing this principle forbids\n- Another forbidden thing"} rows={2} />
          </div>
        </div>
      )}
    </div>
  );
}

// ── Root component ────────────────────────────────────────────────────────────

const INDUSTRY_OPTIONS = [
  'Technology', 'Healthcare', 'Finance', 'Retail', 'Education',
  'Media & Entertainment', 'Professional Services', 'Non-profit',
  'Real Estate', 'Food & Beverage', 'Other',
];

export default function BrandPanel() {
  const { brandSettings, setBrandField } = useDesignSystem();
  const [activeTab, setActiveTab] = useState<SubTab>('values');
  const s = useStyles();

  const tabBorder = s.border;
  const activeTabStyle = (tab: SubTab): React.CSSProperties => ({
    padding: '5px 10px',
    fontSize: 12,
    fontWeight: activeTab === tab ? 600 : 400,
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: `2px solid ${activeTab === tab ? s.text : 'transparent'}`,
    color: activeTab === tab ? s.text : s.muted,
    background: 'none',
    cursor: 'pointer',
    transition: 'color 0.15s',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {/* Identity strip */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <div>
            <Label>Brand Name</Label>
            <Input value={brandSettings.name} onChange={(v) => setBrandField('name', v)} placeholder="Acme Inc." />
          </div>
          <div>
            <Label>Owner</Label>
            <Input value={brandSettings.owner} onChange={(v) => setBrandField('owner', v)} placeholder="Name / Role" />
          </div>
        </div>
        <div>
          <Label>Industry</Label>
          <select
            value={brandSettings.industry}
            onChange={(e) => setBrandField('industry', e.target.value)}
            style={{
              width: '100%', padding: '6px 10px', borderRadius: 6,
              border: `1px solid ${s.border}`, backgroundColor: s.bg,
              color: s.text, fontSize: 13, fontFamily: 'inherit', outline: 'none',
            }}
          >
            <option value="">Select industry…</option>
            {INDUSTRY_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>

      {/* Sub-tab nav */}
      <div style={{ display: 'flex', gap: 0, borderBottom: `1px solid ${tabBorder}`, marginBottom: 16 }}>
        {(['values', 'positioning', 'voice'] as SubTab[]).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={activeTabStyle(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'values'      && <ValuesTab />}
      {activeTab === 'positioning' && <PositioningTab />}
      {activeTab === 'voice'       && <VoiceTab />}
    </div>
  );
}
