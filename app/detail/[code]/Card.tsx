'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import countryLocaleMap from 'country-locale-map';
import { useMapColor } from '@/app/hooks/useMapColor';
import { useDrawMap } from '@/app/hooks/useDrawMap';
import CardProps from '@/app/types/CardProps';
import DetailStyles from '@/styles/detail.module.scss';

export default function Card({ countryData }: CardProps) {
  const pathname = usePathname();
  const countryCode = pathname.split('/detail/')[1];
  const [countryInfo, setCountryInfo] = useState<any | undefined>(undefined);
  const [feature, setFeature] = useState('');
  const mapColor = useMapColor(countryData.value);
  const mapContainer = useDrawMap(countryInfo, mapColor);

  useEffect(() => {
    setCountryInfo(countryLocaleMap.getCountryByAlpha2(countryCode));
    setFeature(countryData.feature);
  }, [countryCode]);

  return (
    <>
      <div className={DetailStyles['country-name']}>
        <span className={DetailStyles['flag']}>{countryInfo?.emoji}</span>
        <span>{countryInfo?.name}</span>
      </div>
      <div ref={mapContainer} className={DetailStyles['map']}></div>
      <div className={DetailStyles['country-info']}>
        <span>Region:</span>
        <span>{countryInfo?.region}</span>
      </div>
      <div className={DetailStyles['country-info']}>
        <span>Capital:</span>
        <span>{countryInfo?.capital}</span>
      </div>
      <div className={DetailStyles['country-info']}>
        <span>Languages:</span>
        <span>{countryInfo?.languages.join(', ')}</span>
      </div>
      <div className={DetailStyles['country-info']}>
        <span>Numeric: </span>
        <span>+{countryInfo?.numeric}</span>
      </div>
      <div className={DetailStyles['country-info']}>
        <span>Currency:</span>
        <span>{countryInfo?.currency}</span>
      </div>
      <div className={DetailStyles['country-info']}>
        <span>Currency name:</span>
        <span>
          {countryInfo?.currency_name} ({countryInfo?.currency_symbol})
        </span>
      </div>
      <div className={DetailStyles['country-info']}>
        <span>Feature: </span>
        <span>{feature}</span>
      </div>
    </>
  );
}
