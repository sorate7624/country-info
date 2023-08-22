export function useMapColor(riskLevel: number) {
  let mapColor = '';

  if (riskLevel) {
    if (riskLevel === 1) {
      mapColor = '#026abf';
    } else if (riskLevel === 2) {
      mapColor = '#fcc33c';
    } else if (riskLevel === 3) {
      mapColor = '#c82612';
    } else if (riskLevel === 4) {
      mapColor = '#2a2a2a';
    } else {
      mapColor = 'rgba(255,255,255,.5)';
    }
  }

  return mapColor;
}
