interface CountryInfo {
  name: string;
  alpha2: string;
  alpha3: string;
  numeric: number;
  locales: string[];
  default_locale: string;
  currency: string;
  currency_name: string;
  languages: string[];
  capital: string;
  emoji: string;
  emojiU: string;
  fips: string;
  internet: string;
  continent: string;
  region: string;
  currency_symbol: string;
}

export default CountryInfo;
