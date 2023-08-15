'use client';
import * as React from 'react';
import { countryData } from './countryData';
import type { CountryContext } from 'react-svg-worldmap';
import WorldMap from 'react-svg-worldmap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFaceLaugh,
  faFaceMeh,
  faFaceFrown,
  faFaceDizzy,
} from '@fortawesome/free-regular-svg-icons';
import countryLocaleMap from 'country-locale-map';
import HomeStyles from '@/styles/home.module.scss';

export default async function Home() {
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
          : 'white'
        : 'white',
    fillOpacity: countryValue,
    stroke: countryValue ? 'black' : 'transparent',
    strokeWidth: 1,
    strokeOpacity: 0.2,
    cursor: countryValue ? 'pointer' : 'default',
  });

  const countryClick = ({
    countryName,
    countryCode,
    countryValue,
  }: CountryContext) => {
    if (countryValue) {
      let countryInfo = countryLocaleMap.getCountryByAlpha2(
        countryCode.toUpperCase()
      );
      console.log('countryInfo', countryInfo);
      console.log(
        'countryName, countryCode, countryValue:',
        countryName,
        countryCode,
        countryValue
      );
    }
  };

  const getHref = ({ countryName, countryCode }: CountryContext) => ({
    href: `/detail/${countryCode}`,
  });

  return (
    <>
      <main className={HomeStyles['main']}>
        <section>
          <h2 className={HomeStyles['title']}>Select country!</h2>
          <WorldMap
            color="blue"
            backgroundColor="transparent"
            // size="responsive"
            // size="xxl"
            data={countryData}
            hrefFunction={getHref}
            // onClickFunction={countryClick}
            styleFunction={getStyle}
            tooltipTextFunction={({ countryName }: CountryContext) =>
              `${countryName}`
            }
            richInteraction={true}
          />
        </section>
        <aside className={HomeStyles['aside']}>
          <ul>
            <li className={HomeStyles['good']}>
              <FontAwesomeIcon icon={faFaceLaugh} size="2xl" />
              <span>good</span>
            </li>
            <li className={HomeStyles['warning']}>
              <FontAwesomeIcon icon={faFaceMeh} size="2xl" />
              <span>warning</span>
            </li>
            <li className={HomeStyles['bad']}>
              <FontAwesomeIcon icon={faFaceFrown} size="2xl" />
              <span>bad</span>
            </li>
            <li className={HomeStyles['very-bad']}>
              <FontAwesomeIcon icon={faFaceDizzy} size="2xl" />
              <span>very bad</span>
            </li>
          </ul>
        </aside>
      </main>
    </>
  );
}
