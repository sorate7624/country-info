import type { CountryContext } from 'react-svg-worldmap';

export function useCountryHref() {
  const getHref = ({ countryValue, countryCode }: CountryContext) => {
    if (countryValue) {
      return {
        href: `/detail/${countryCode}`,
      };
    }
  };

  return getHref;
}
