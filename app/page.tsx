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
    stroke: 'black',
    strokeWidth: 1,
    strokeOpacity: 0.2,
    cursor: 'pointer',
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
    }
  };

  return (
    <>
      <main className={HomeStyles['main']}>
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
        <section>
          <WorldMap
            color="blue"
            backgroundColor="transparent"
            // size="responsive"
            // size="xxl"
            data={countryData}
            // hrefFunction={getHref}
            onClickFunction={countryClick}
            styleFunction={getStyle}
            tooltipTextFunction={({ countryName }: CountryContext) =>
              `${countryName}`
            }
          />
        </section>
      </main>
      <div className={HomeStyles['bubble-area']}>
        <div className={HomeStyles['small']}></div>
        <div className={HomeStyles['s-medium']}></div>
        <div className={HomeStyles['medium']}></div>
        <div className={HomeStyles['large']}></div>
        <div className={HomeStyles['small-l']}></div>
      </div>
    </>
  );
}
