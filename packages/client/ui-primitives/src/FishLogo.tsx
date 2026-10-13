import type { IconProps } from './icons/props.ts'

/** Native viewBox of {@link FISH_LOGO_PATH} (width and height in user units). */
export const FISH_LOGO_VIEWBOX = { width: 63.25, height: 63.25 }

/**
 * The four-dot brand mark as one monochrome path (circle subpaths), exported for
 * consumers that compose their own svg (entrance effects, masks) around the same
 * geometry. The rendered mark keeps its four brand colors; use this only where a
 * single-fill silhouette is required.
 */
export const FISH_LOGO_PATH = 'M23.375 9.5A9.5 9.5 0 1 0 42.375 9.5A9.5 9.5 0 1 0 23.375 9.5ZM9.625 26A6.25 6.25 0 1 0 22.125 26A6.25 6.25 0 1 0 9.625 26ZM25.625 42.5A7.25 7.25 0 1 0 40.125 42.5A7.25 7.25 0 1 0 25.625 42.5ZM45.125 59A4.25 4.25 0 1 0 53.625 59A4.25 4.25 0 1 0 45.125 59Z'

/** Brand dot colors in mark order (top blue, left cyan, center teal, bottom purple). */
const FISH_LOGO_COLORS = ['#197FED', '#00C7FD', '#00C4C5', '#9D69FF']

/** Dot centers and radii in {@link FISH_LOGO_VIEWBOX} user units, mark order. */
const FISH_LOGO_DOTS: readonly (readonly [number, number, number])[] = [
  [32.875, 9.5, 9.5],
  [15.875, 26, 6.25],
  [32.875, 42.5, 7.25],
  [49.375, 59, 4.25],
]

/**
 * Render the four-dot brand mark.
 * @param props.size - width and height in px (the mark viewbox is square; default 24).
 * @param props.className - extra class for layout placement.
 * @returns the mark svg (aria-hidden; pair with the wordmark for accessibility).
 */
export function FishLogo({ size = 24, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      className={className}
      viewBox={`0 0 ${FISH_LOGO_VIEWBOX.width} ${FISH_LOGO_VIEWBOX.height}`}
      fill="none"
      aria-hidden="true"
    >
      {FISH_LOGO_DOTS.map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={FISH_LOGO_COLORS[i]} />
      ))}
    </svg>
  )
}
