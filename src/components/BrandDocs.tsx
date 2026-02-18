'use client';

import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import type { BrandSettings, IsIsNotRow } from '@/context/DesignSystemContext';

type DocTab = 'values' | 'positioning' | 'voice';

// ── Shared doc renderers ──────────────────────────────────────────────────────

function useDocStyles() {
  const { isDarkMode, neutralColorScale, primaryColorScale, headingFont, bodyFont } = useDesignSystem();
  return {
    isDarkMode,
    textPrimary:   isDarkMode ? neutralColorScale['100'] : neutralColorScale['900'],
    textSecondary: isDarkMode ? neutralColorScale['400'] : neutralColorScale['500'],
    border:        isDarkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
    accent:        isDarkMode ? primaryColorScale['400']  : primaryColorScale['600'],
    tagBg:         isDarkMode ? neutralColorScale['800']  : neutralColorScale['100'],
    headingFont: headingFont.family,
    bodyFont: bodyFont.family,
    neutralColorScale,
  };
}

function Placeholder({ text }: { text: string }) {
  const s = useDocStyles();
  return <span style={{ color: s.textSecondary, fontStyle: 'italic', opacity: 0.5 }}>{text}</span>;
}

function DocHeading({ children }: { children: React.ReactNode }) {
  const s = useDocStyles();
  return (
    <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: s.accent, fontFamily: s.bodyFont, marginBottom: 12 }}>
      {children}
    </h2>
  );
}

function DocSubheading({ children }: { children: React.ReactNode }) {
  const s = useDocStyles();
  return (
    <h3 style={{ fontSize: 14, fontWeight: 700, color: s.textPrimary, fontFamily: s.headingFont, marginBottom: 6 }}>
      {children}
    </h3>
  );
}

function DocParagraph({ children }: { children: React.ReactNode }) {
  const s = useDocStyles();
  return (
    <p style={{ fontSize: 14, lineHeight: 1.7, color: s.textPrimary, fontFamily: s.bodyFont, whiteSpace: 'pre-wrap' }}>
      {children}
    </p>
  );
}

function DocRule() {
  const s = useDocStyles();
  return <div style={{ borderTop: `1px solid ${s.border}`, margin: '20px 0' }} />;
}

function DocLabel({ children }: { children: React.ReactNode }) {
  const s = useDocStyles();
  return (
    <p style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: s.textSecondary, marginBottom: 4, fontFamily: s.bodyFont }}>
      {children}
    </p>
  );
}

function IsIsNotTableView({ rows }: { rows: IsIsNotRow[] }) {
  const s = useDocStyles();
  const filled = rows.filter((r) => r.is || r.isNot);
  if (filled.length === 0) {
    return <DocParagraph><Placeholder text="Add rows in the Brand panel →" /></DocParagraph>;
  }
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: s.bodyFont }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: '6px 12px', borderBottom: `1px solid ${s.border}`, color: s.textSecondary, fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Is</th>
          <th style={{ textAlign: 'left', padding: '6px 12px', borderBottom: `1px solid ${s.border}`, color: s.textSecondary, fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Is Not</th>
        </tr>
      </thead>
      <tbody>
        {filled.map((row, i) => (
          <tr key={i} style={{ borderBottom: `1px solid ${s.border}` }}>
            <td style={{ padding: '6px 12px', color: s.textPrimary }}>{row.is || <Placeholder text="—" />}</td>
            <td style={{ padding: '6px 12px', color: s.textSecondary }}>{row.isNot || <Placeholder text="—" />}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ── Markdown generators ───────────────────────────────────────────────────────

function generateValuesMarkdown(b: BrandSettings): string {
  const today = new Date().toISOString().split('T')[0];
  let md = `# Brand Values\n`;
  md += `> **Kernel Layer — Rules Engine**\n`;
  md += `> This file defines the non-negotiable principles that govern every brand decision.\n`;
  md += `> The Brand OS treats this file with the highest authority. No output, decision, or expression\n`;
  md += `> may contradict what is defined here. When in conflict with any other file, this file wins.\n\n`;
  md += `---\n\n`;
  md += `## How to use this file\n`;
  md += `Each value should be defined with enough specificity that it can be used to *reject* something,\n`;
  md += `not just approve it. A value that everything passes is not doing its job.\n`;
  md += `For each value, define what it means in practice and — critically — what it does not mean.\n\n`;
  md += `---\n\n`;
  md += `## Core Values\n\n`;
  if (b.valueEntries.length === 0) {
    md += `### [Value Name]\n**In one sentence:**\n[A precise, active statement of what this value means for this brand.]\n\n`;
    md += `**In practice this means:**\n- [Concrete behavior or decision this value produces]\n- [Concrete behavior or decision this value produces]\n\n`;
    md += `**This does not mean:**\n- [Common misreading or overcorrection to guard against]\n\n`;
    md += `**A decision passes this value if:**\n[A single testable question someone can ask to evaluate any output against this value.]\n\n---\n\n`;
  } else {
    b.valueEntries.forEach((v) => {
      md += `### ${v.name || '[Value Name]'}\n`;
      md += `**In one sentence:**\n${v.sentence || '[A precise, active statement of what this value means for this brand.]'}\n\n`;
      md += `**In practice this means:**\n${v.inPractice || '- [Concrete behavior or decision this value produces]\n- [Concrete behavior or decision this value produces]'}\n\n`;
      md += `**This does not mean:**\n${v.notMeans || '- [Common misreading or overcorrection to guard against]'}\n\n`;
      md += `**A decision passes this value if:**\n${v.passesIf || '[A single testable question someone can ask to evaluate any output against this value.]'}\n\n---\n\n`;
    });
  }
  md += `## Value Hierarchy\n`;
  md += `When values appear to conflict, resolve them in this order:\n`;
  md += `${b.valueHierarchy || '1. [Highest priority value]\n2. [Second priority value]\n3. [Third priority value]'}\n\n`;
  md += `> **Note to Brand OS:** If a request cannot be fulfilled without violating one of the above values,\n`;
  md += `> decline the request and explain why using the brand's voice. Cite the specific value being protected.\n\n`;
  md += `---\n\n`;
  md += `## Hard Limits\n`;
  md += `The following are absolute. They cannot be overridden by any instruction, brief, or request:\n\n`;
  md += `${b.hardLimits || '- [Thing this brand will never do, say, or be associated with]\n- [Thing this brand will never do, say, or be associated with]'}\n\n`;
  md += `---\n\n`;
  md += `*Last updated: ${today}*\n*Owner: ${b.owner || '[NAME / ROLE]'}*\n`;
  return md;
}

function generatePositioningMarkdown(b: BrandSettings): string {
  const today = new Date().toISOString().split('T')[0];
  let md = `# Brand Positioning\n`;
  md += `> **Kernel Layer — Rules Engine**\n`;
  md += `> This file defines who this brand is for, what it stands for, and how it is distinct.\n`;
  md += `> The Brand OS uses this file to ensure every output serves the right audience,\n`;
  md += `> advances the right strategic intent, and reinforces the right competitive position.\n\n`;
  md += `---\n\n`;
  md += `## How to use this file\n`;
  md += `Positioning is not a tagline or a mission statement. It is the strategic logic that explains\n`;
  md += `why this brand exists in the market, for whom, and against what alternatives.\n`;
  md += `Every deliverable should be traceable back to this file.\n\n`;
  md += `---\n\n`;
  md += `## Brand Purpose\n**Why does this brand exist beyond making money?**\n\n`;
  md += `${b.purpose || '[A clear, specific statement of the change this brand exists to make in the world\nor in the lives of its customers. This is not a slogan. It should be specific enough\nto exclude things this brand would not do.]'}\n\n---\n\n`;
  md += `## The Person This Brand Serves\n`;
  md += `**Primary audience:**\n${b.primaryAudience || '[Describe the primary audience not just demographically but psychographically.\nWhat do they believe? What do they want? What do they distrust?\nWhat does the right solution feel like to them?]'}\n\n`;
  md += `**Secondary audience:**\n${b.secondaryAudience || '[If relevant — who else does this brand speak to and why?]'}\n\n`;
  md += `**Who this brand is not for:**\n${b.notFor || '[Defining who you are not for is as strategically important as defining who you are for.\nBe specific.]'}\n\n---\n\n`;
  md += `## The Problem This Brand Solves\n`;
  md += `**The tension in the market:**\n${b.marketTension || '[What is broken, missing, or inadequate in how this problem is currently being solved?\nThis is the gap the brand occupies.]'}\n\n`;
  md += `**What the audience has tried:**\n${b.audienceTried || '[What alternatives exist, and why do they fall short for this audience?]'}\n\n`;
  md += `**What this brand uniquely offers:**\n${b.uniqueOffer || '[The specific, defensible thing this brand does that others don\'t or can\'t.\nAvoid generic claims. If a competitor could say this too, it is not positioning.]'}\n\n---\n\n`;
  md += `## Competitive Position\n`;
  md += `**Category:**\n${b.category || '[What category does this brand compete in or redefine?]'}\n\n`;
  md += `**Key competitors:**\n${b.competitors || '[List 2-4 direct or indirect competitors and briefly note how this brand differs from each.]'}\n\n`;
  md += `**Positioning statement:**\n${b.positioningStatement || '[Optional but useful. Format: For [audience] who [need], [brand] is the [category]\nthat [differentiator] because [reason to believe].]'}\n\n---\n\n`;
  md += `## Strategic Intent\n`;
  md += `**What does success look like in 3 years?**\n${b.successIn3Years || '[A specific, vivid description of the position this brand wants to hold in its market\nand in the minds of its audience.]'}\n\n`;
  md += `**What does this brand want to be known for above all else?**\n${b.knownFor || '[One thing. If there are three answers here, there is no positioning.]'}\n\n---\n\n`;
  md += `## What This Brand Is and Is Not\n| This brand is | This brand is not |\n|---|---|\n`;
  b.positioningIsIsNot.forEach((r) => { md += `| ${r.is || '[Attribute]'} | ${r.isNot || '[Its opposite or common misread]'} |\n`; });
  md += `\n---\n\n`;
  md += `> **Note to Brand OS:** When producing any deliverable, verify it serves the primary audience\n`;
  md += `> defined above and advances the strategic intent. If a request would reposition the brand\n`;
  md += `> toward the wrong audience or undermine the competitive position, flag this before proceeding.\n\n`;
  md += `---\n\n`;
  md += `*Last updated: ${today}*\n*Owner: ${b.owner || '[NAME / ROLE]'}*\n`;
  return md;
}

function generateVoiceMarkdown(b: BrandSettings): string {
  const today = new Date().toISOString().split('T')[0];
  let md = `# Brand Voice\n`;
  md += `> **Kernel Layer — Rules Engine**\n`;
  md += `> This file defines the foundational principles that govern how this brand speaks.\n`;
  md += `> The *principles* of voice live here as rules. The *expression* of voice —\n`;
  md += `> specific tone shifts, vocabulary, and surface-level guidance — lives in the interface layer.\n`;
  md += `> This file defines what the voice fundamentally is. The interface layer shows how it renders.\n\n`;
  md += `---\n\n`;
  md += `## How to use this file\n`;
  md += `Voice principles should be specific enough to constrain an AI model and distinctive enough\n`;
  md += `that outputs feel like this brand rather than any brand. If a principle could apply to\n`;
  md += `every brand, it is not a principle — it is filler. Push every entry until it would cause\n`;
  md += `the system to make a different decision than it would have made without it.\n\n`;
  md += `---\n\n`;
  md += `## Voice Principles\n\n`;
  if (b.voicePrinciples.length === 0) {
    md += `### [Principle Name]\n**What this means:**\n[A precise description of this voice quality — not an adjective, but an active explanation\nof how this quality manifests in language.]\n\n`;
    md += `**Why this brand speaks this way:**\n[The strategic or cultural reason behind this principle.]\n\n`;
    md += `**In practice:**\n- [Specific, observable behavior this principle produces in writing]\n- [Specific, observable behavior this principle produces in writing]\n\n`;
    md += `**Never:**\n- [Specific thing this principle forbids]\n- [Specific thing this principle forbids]\n\n---\n\n`;
  } else {
    b.voicePrinciples.forEach((p) => {
      md += `### ${p.name || '[Principle Name]'}\n`;
      md += `**What this means:**\n${p.whatMeans || '[A precise description of this voice quality — not an adjective, but an active explanation\nof how this quality manifests in language.]'}\n\n`;
      md += `**Why this brand speaks this way:**\n${p.why || '[The strategic or cultural reason behind this principle. Connecting voice to values\ngives the model the reasoning it needs to apply the principle in novel situations.]'}\n\n`;
      md += `**In practice:**\n${p.inPractice || '- [Specific, observable behavior this principle produces in writing]\n- [Specific, observable behavior this principle produces in writing]'}\n\n`;
      md += `**Never:**\n${p.never || '- [Specific thing this principle forbids]\n- [Specific thing this principle forbids]'}\n\n---\n\n`;
    });
  }
  md += `## What This Voice Is and Is Not\n| This voice is | This voice is not |\n|---|---|\n`;
  b.voiceIsIsNot.forEach((r) => { md += `| ${r.is || '[Quality]'} | ${r.isNot || '[Its misread or opposite]'} |\n`; });
  md += `\n---\n\n`;
  md += `## Vocabulary\n`;
  md += `**Words and phrases this brand uses:**\n${b.wordsUse || '[List specific words, phrases, or constructions that are distinctly this brand\'s.\nExplain briefly why each belongs.]'}\n\n`;
  md += `**Words and phrases this brand avoids:**\n${b.wordsAvoid || '[List specific words, phrases, or constructions this brand never uses.\nInclude industry jargon, overused buzzwords, or anything that would undermine the voice.]'}\n\n`;
  md += `---\n\n`;
  md += `## Voice Across Registers\n`;
  md += `Voice stays consistent. Tone shifts by context. These are the foundational register rules:\n\n`;
  md += `**When the brand is informing:**\n${b.whenInforming || '[How the voice behaves when explaining, educating, or sharing information.]'}\n\n`;
  md += `**When the brand is persuading:**\n${b.whenPersuading || '[How the voice behaves when making an argument or call to action.]'}\n\n`;
  md += `**When the brand is responding:**\n${b.whenResponding || '[How the voice behaves when replying to questions, complaints, or feedback.]'}\n\n`;
  md += `**When the brand is celebrating:**\n${b.whenCelebrating || '[How the voice behaves in moments of success, announcement, or recognition.]'}\n\n`;
  md += `---\n\n`;
  md += `> **Note to Brand OS:** Apply these principles to every piece of written output regardless\n`;
  md += `> of format or length. A subject line, a legal disclaimer, and a long-form article\n`;
  md += `> should all be recognizably the same brand. If a requested output format would make it\n`;
  md += `> impossible to apply these principles, flag this and suggest an alternative approach.\n`;
  md += `> Never sacrifice voice for brevity without noting the tradeoff.\n\n`;
  md += `---\n\n`;
  md += `*Last updated: ${today}*\n*Owner: ${b.owner || '[NAME / ROLE]'}*\n`;
  return md;
}

// ── Instructional callout ─────────────────────────────────────────────────────

function HowToUse({ children }: { children: React.ReactNode }) {
  const s = useDocStyles();
  return (
    <div style={{ borderLeft: `3px solid ${s.border}`, paddingLeft: 16, marginBottom: 20 }}>
      <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: s.textSecondary, marginBottom: 6 }}>
        How to use this file
      </p>
      <p style={{ fontSize: 13, lineHeight: 1.7, color: s.textSecondary, fontFamily: s.bodyFont }}>
        {children}
      </p>
    </div>
  );
}

function NoteToOS({ children }: { children: React.ReactNode }) {
  const s = useDocStyles();
  return (
    <div style={{ borderLeft: `3px solid ${s.accent}`, paddingLeft: 16, marginTop: 4 }}>
      <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: s.accent, marginBottom: 6 }}>
        Note to Brand OS
      </p>
      <p style={{ fontSize: 13, lineHeight: 1.7, color: s.textSecondary, fontFamily: s.bodyFont }}>
        {children}
      </p>
    </div>
  );
}

// ── Document views ────────────────────────────────────────────────────────────

function ValuesDoc({ b }: { b: BrandSettings }) {
  return (
    <>
      <HowToUse>
        Each value should be defined with enough specificity that it can be used to <em>reject</em> something, not just approve it. A value that everything passes is not doing its job. For each value, define what it means in practice and — critically — what it does not mean.
      </HowToUse>
      <DocRule />
      <DocHeading>Core Values</DocHeading>
      {b.valueEntries.length === 0 ? (
        <DocParagraph><Placeholder text="Add brand values in the Brand panel →" /></DocParagraph>
      ) : (
        b.valueEntries.map((v) => (
          <div key={v.id} style={{ marginBottom: 24 }}>
            <DocSubheading>{v.name || <Placeholder text="[Value Name]" />}</DocSubheading>
            <DocLabel>In one sentence</DocLabel>
            <DocParagraph>{v.sentence || <Placeholder text="[Precise, active statement]" />}</DocParagraph>
            {v.inPractice && (<>
              <DocLabel style={{ marginTop: 10 }}>In practice this means</DocLabel>
              <DocParagraph>{v.inPractice}</DocParagraph>
            </>)}
            {v.notMeans && (<>
              <DocLabel style={{ marginTop: 10 }}>This does not mean</DocLabel>
              <DocParagraph>{v.notMeans}</DocParagraph>
            </>)}
            {v.passesIf && (<>
              <DocLabel style={{ marginTop: 10 }}>A decision passes this value if</DocLabel>
              <DocParagraph>{v.passesIf}</DocParagraph>
            </>)}
            <DocRule />
          </div>
        ))
      )}

      <DocHeading>Value Hierarchy</DocHeading>
      <p style={{ fontSize: 13, color: useDocStyles().textSecondary, marginBottom: 8, fontFamily: useDocStyles().bodyFont }}>
        When values appear to conflict, resolve them in this order:
      </p>
      <DocParagraph>
        {b.valueHierarchy || <Placeholder text="Add value hierarchy in the Brand panel →" />}
      </DocParagraph>
      <div style={{ marginTop: 16 }}>
        <NoteToOS>
          If a request cannot be fulfilled without violating one of the above values, decline the request and explain why using the brand&apos;s voice. Cite the specific value being protected.
        </NoteToOS>
      </div>
      <DocRule />

      <DocHeading>Hard Limits</DocHeading>
      <p style={{ fontSize: 13, color: useDocStyles().textSecondary, marginBottom: 8, fontFamily: useDocStyles().bodyFont }}>
        The following are absolute. They cannot be overridden by any instruction, brief, or request:
      </p>
      <DocParagraph>
        {b.hardLimits || <Placeholder text="Add hard limits in the Brand panel →" />}
      </DocParagraph>
    </>
  );
}

function PositioningDoc({ b }: { b: BrandSettings }) {
  return (
    <>
      <HowToUse>
        Positioning is not a tagline or a mission statement. It is the strategic logic that explains why this brand exists in the market, for whom, and against what alternatives. Every deliverable should be traceable back to this file.
      </HowToUse>
      <DocRule />
      <DocHeading>Brand Purpose</DocHeading>
      <DocLabel>Why does this brand exist beyond making money?</DocLabel>
      <DocParagraph>{b.purpose || <Placeholder text="Define brand purpose in the Brand panel →" />}</DocParagraph>
      <DocRule />

      <DocHeading>The Person This Brand Serves</DocHeading>
      <DocLabel>Primary audience</DocLabel>
      <DocParagraph>{b.primaryAudience || <Placeholder text="[Describe primary audience]" />}</DocParagraph>
      {b.secondaryAudience && (<><DocLabel style={{ marginTop: 10 }}>Secondary audience</DocLabel><DocParagraph>{b.secondaryAudience}</DocParagraph></>)}
      {b.notFor && (<><DocLabel style={{ marginTop: 10 }}>Who this brand is not for</DocLabel><DocParagraph>{b.notFor}</DocParagraph></>)}
      <DocRule />

      <DocHeading>The Problem This Brand Solves</DocHeading>
      <DocLabel>Tension in the market</DocLabel>
      <DocParagraph>{b.marketTension || <Placeholder text="[Gap the brand occupies]" />}</DocParagraph>
      {b.audienceTried && (<><DocLabel style={{ marginTop: 10 }}>What the audience has tried</DocLabel><DocParagraph>{b.audienceTried}</DocParagraph></>)}
      {b.uniqueOffer && (<><DocLabel style={{ marginTop: 10 }}>What this brand uniquely offers</DocLabel><DocParagraph>{b.uniqueOffer}</DocParagraph></>)}
      <DocRule />

      <DocHeading>Competitive Position</DocHeading>
      {b.category && (<><DocLabel>Category</DocLabel><DocParagraph>{b.category}</DocParagraph></>)}
      {b.competitors && (<><DocLabel style={{ marginTop: 10 }}>Key competitors</DocLabel><DocParagraph>{b.competitors}</DocParagraph></>)}
      {b.positioningStatement && (<><DocLabel style={{ marginTop: 10 }}>Positioning statement</DocLabel><DocParagraph>{b.positioningStatement}</DocParagraph></>)}
      <DocRule />

      <DocHeading>Strategic Intent</DocHeading>
      {b.successIn3Years && (<><DocLabel>Success in 3 years</DocLabel><DocParagraph>{b.successIn3Years}</DocParagraph></>)}
      {b.knownFor && (<><DocLabel style={{ marginTop: 10 }}>Known for above all else</DocLabel><DocParagraph>{b.knownFor}</DocParagraph></>)}
      <DocRule />

      <DocHeading>What This Brand Is and Is Not</DocHeading>
      <IsIsNotTableView rows={b.positioningIsIsNot} />
      <div style={{ marginTop: 20 }}>
        <NoteToOS>
          When producing any deliverable, verify it serves the primary audience defined above and advances the strategic intent. If a request would reposition the brand toward the wrong audience or undermine the competitive position, flag this before proceeding.
        </NoteToOS>
      </div>
    </>
  );
}

function VoiceDoc({ b }: { b: BrandSettings }) {
  return (
    <>
      <HowToUse>
        Voice principles should be specific enough to constrain an AI model and distinctive enough that outputs feel like this brand rather than any brand. If a principle could apply to every brand, it is not a principle — it is filler. Push every entry until it would cause the system to make a different decision than it would have made without it.
      </HowToUse>
      <DocRule />
      <DocHeading>Voice Principles</DocHeading>
      {b.voicePrinciples.length === 0 ? (
        <DocParagraph><Placeholder text="Add voice principles in the Brand panel →" /></DocParagraph>
      ) : (
        b.voicePrinciples.map((p) => (
          <div key={p.id} style={{ marginBottom: 24 }}>
            <DocSubheading>{p.name || <Placeholder text="[Principle Name]" />}</DocSubheading>
            <DocLabel>What this means</DocLabel>
            <DocParagraph>{p.whatMeans || <Placeholder text="[Precise description]" />}</DocParagraph>
            {p.why && (<><DocLabel style={{ marginTop: 10 }}>Why this brand speaks this way</DocLabel><DocParagraph>{p.why}</DocParagraph></>)}
            {p.inPractice && (<><DocLabel style={{ marginTop: 10 }}>In practice</DocLabel><DocParagraph>{p.inPractice}</DocParagraph></>)}
            {p.never && (<><DocLabel style={{ marginTop: 10 }}>Never</DocLabel><DocParagraph>{p.never}</DocParagraph></>)}
            <DocRule />
          </div>
        ))
      )}

      <DocHeading>What This Voice Is and Is Not</DocHeading>
      <IsIsNotTableView rows={b.voiceIsIsNot} />
      <DocRule />

      <DocHeading>Vocabulary</DocHeading>
      <DocLabel>Words & phrases this brand uses</DocLabel>
      <DocParagraph>{b.wordsUse || <Placeholder text="[List specific words and why each belongs]" />}</DocParagraph>
      <div style={{ marginTop: 12 }}>
        <DocLabel>Words & phrases this brand avoids</DocLabel>
        <DocParagraph>{b.wordsAvoid || <Placeholder text="[Jargon, buzzwords to avoid]" />}</DocParagraph>
      </div>
      <DocRule />

      <DocHeading>Voice Across Registers</DocHeading>
      <p style={{ fontSize: 13, color: useDocStyles().textSecondary, marginBottom: 12, fontFamily: useDocStyles().bodyFont }}>
        Voice stays consistent. Tone shifts by context. These are the foundational register rules:
      </p>
      {[
        { label: 'When the brand is informing',   value: b.whenInforming,   placeholder: '[How the voice behaves when explaining, educating, or sharing information.]' },
        { label: 'When the brand is persuading',  value: b.whenPersuading,  placeholder: '[How the voice behaves when making an argument or call to action.]' },
        { label: 'When the brand is responding',  value: b.whenResponding,  placeholder: '[How the voice behaves when replying to questions, complaints, or feedback.]' },
        { label: 'When the brand is celebrating', value: b.whenCelebrating, placeholder: '[How the voice behaves in moments of success, announcement, or recognition.]' },
      ].map(({ label, value, placeholder }) => (
        <div key={label} style={{ marginBottom: 12 }}>
          <DocLabel>{label}</DocLabel>
          <DocParagraph>{value || <Placeholder text={placeholder} />}</DocParagraph>
        </div>
      ))}
      <div style={{ marginTop: 16 }}>
        <NoteToOS>
          Apply these principles to every piece of written output regardless of format or length. A subject line, a legal disclaimer, and a long-form article should all be recognizably the same brand. If a requested output format would make it impossible to apply these principles, flag this and suggest an alternative approach. Never sacrifice voice for brevity without noting the tradeoff.
        </NoteToOS>
      </div>
    </>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

const DOCS: { id: DocTab; file: string; label: string }[] = [
  { id: 'values',      file: 'brand-values.md',      label: 'Values' },
  { id: 'positioning', file: 'brand-positioning.md',  label: 'Positioning' },
  { id: 'voice',       file: 'brand-voice.md',        label: 'Voice' },
];

export default function BrandDocs() {
  const { brandSettings, isDarkMode, neutralColorScale, primaryColorScale } = useDesignSystem();
  const [activeDoc, setActiveDoc] = useState<DocTab>('values');
  const [copied, setCopied] = useState(false);

  const s = {
    pageBg:  isDarkMode ? neutralColorScale['900'] : neutralColorScale['50'],
    headerBg: isDarkMode ? neutralColorScale['900'] : '#fff',
    border:  isDarkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)',
    text:    isDarkMode ? neutralColorScale['100'] : neutralColorScale['900'],
    muted:   isDarkMode ? neutralColorScale['400'] : neutralColorScale['500'],
    tabActive: isDarkMode ? neutralColorScale['100'] : neutralColorScale['900'],
    accent:  isDarkMode ? primaryColorScale['400']  : primaryColorScale['600'],
    cardBg:  isDarkMode ? neutralColorScale['800']  : '#ffffff',
  };

  const getMd = () => {
    if (activeDoc === 'values')      return generateValuesMarkdown(brandSettings);
    if (activeDoc === 'positioning') return generatePositioningMarkdown(brandSettings);
    return generateVoiceMarkdown(brandSettings);
  };

  const copyMd = () => {
    navigator.clipboard.writeText(getMd());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeFile = DOCS.find((d) => d.id === activeDoc)!;

  return (
    <div className="min-h-full" style={{ backgroundColor: s.pageBg }}>
      {/* Doc tab bar */}
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-6 border-b"
        style={{ backgroundColor: s.headerBg, borderColor: s.border, minHeight: 44 }}
      >
        <div className="flex items-center gap-0">
          {DOCS.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setActiveDoc(doc.id)}
              className="px-3 py-2.5 text-xs flex items-center gap-1.5"
          style={{
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              borderBottom: `2px solid ${activeDoc === doc.id ? s.accent : 'transparent'}`,
              color: activeDoc === doc.id ? s.tabActive : s.muted,
              fontWeight: activeDoc === doc.id ? 600 : 400,
              background: 'none',
              cursor: 'pointer',
              transition: 'color 0.15s',
            }}
            >
              <span style={{ opacity: 0.5, fontFamily: 'monospace' }}>📄</span>
              {doc.file}
            </button>
          ))}
        </div>
        <button
          onClick={copyMd}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs border transition-colors"
          style={{ backgroundColor: s.cardBg, borderColor: s.border, color: s.muted }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2H3.5A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {copied ? 'Copied!' : 'Copy Markdown'}
        </button>
      </div>

      {/* Document body */}
      <div className="px-8 py-8 max-w-3xl">
        {/* Doc header */}
        <div className="mb-8" style={{ borderLeft: `3px solid ${s.accent}`, paddingLeft: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: s.accent, marginBottom: 4 }}>
            Kernel Layer — Rules Engine
          </p>
          <h1 className="text-2xl font-bold mb-1" style={{ color: s.text }}>
            Brand {activeFile.label}
            {brandSettings.name ? ` — ${brandSettings.name}` : ''}
          </h1>
          {brandSettings.industry && (
            <p style={{ fontSize: 13, color: s.muted }}>{brandSettings.industry}</p>
          )}
        </div>

        {activeDoc === 'values'      && <ValuesDoc      b={brandSettings} />}
        {activeDoc === 'positioning' && <PositioningDoc b={brandSettings} />}
        {activeDoc === 'voice'       && <VoiceDoc       b={brandSettings} />}

        {/* Footer */}
        <div style={{ marginTop: 32, paddingTop: 16, borderTop: `1px solid ${s.border}` }}>
          <p style={{ fontSize: 11, color: s.muted, fontStyle: 'italic' }}>
            Last updated: {new Date().toISOString().split('T')[0]}
            {brandSettings.owner ? ` · Owner: ${brandSettings.owner}` : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
