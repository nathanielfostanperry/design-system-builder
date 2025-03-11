export type FontCategory =
  | 'serif'
  | 'sans-serif'
  | 'display'
  | 'handwriting'
  | 'monospace';

export type FontWeight = 'thin' | 'regular' | 'bold' | 'extrabold';
export type FontSize = 'xxs' | 'xs' | 'sm' | 'regular' | 'lg' | 'xl' | 'xxl';

export type FontOption = {
  family: string;
  category: FontCategory;
  variants: string[];
  weight: FontWeight;
  size: FontSize;
};
