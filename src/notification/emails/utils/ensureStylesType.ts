import type { CSSProperties } from 'react';

export default function ensureStylesType<T extends string>(styles: Record<T, CSSProperties>): Record<T, CSSProperties> {
  return styles;
}
