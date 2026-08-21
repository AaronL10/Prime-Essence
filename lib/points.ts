export const GS_PER_POINT = 1000;
export const POINTS_DISCOUNT_CAP_RATIO = 0.5;

export function formatPoints(points: number): string {
  return points.toLocaleString("es-AR");
}