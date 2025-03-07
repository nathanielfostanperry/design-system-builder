export type FontCategory =
  | 'serif'
  | 'sans-serif'
  | 'display'
  | 'handwriting'
  | 'monospace';

export type FontOption = {
  family: string;
  category: FontCategory;
  variants: string[];
};
