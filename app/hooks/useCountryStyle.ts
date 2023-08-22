import type { CountryContext } from 'react-svg-worldmap';

export function useCountryStyle() {
  const getStyle = ({ countryValue }: CountryContext) => ({
    fill:
      countryValue && countryValue <= 4
        ? countryValue === 1
          ? '#026ABF'
          : countryValue === 2
          ? '#FCC33C'
          : countryValue === 3
          ? '#C82612'
          : countryValue === 4
          ? '#2A2A2A'
          : '#0047A0'
        : 'rgba(255,255,255,.5)',
    fillOpacity: countryValue,
    stroke: countryValue ? 'black' : 'transparent',
    strokeWidth: 1,
    strokeOpacity: 0.2,
    cursor: countryValue ? 'pointer' : 'default',
  });

  return getStyle;
}
