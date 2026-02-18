'use client';

import { useDesignSystem } from '@/context/DesignSystemContext';

export function useComponentSettings(componentId: string): Record<string, string> {
  const { componentSettingsMap } = useDesignSystem();
  return componentSettingsMap[componentId] ?? {};
}
