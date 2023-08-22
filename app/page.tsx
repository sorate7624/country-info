'use client';
import * as React from 'react';
import { countryData } from './countryData';
import type { CountryContext } from 'react-svg-worldmap';
import WorldMap from 'react-svg-worldmap';
import { isMobile } from 'react-device-detect';
import { useCountryStyle } from './hooks/useCountryStyle';
import { useCountryHref } from './hooks/useCountryHref';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFaceLaugh,
  faFaceMeh,
  faFaceFrown,
  faFaceGrimace,
  faFaceDizzy,
} from '@fortawesome/free-regular-svg-icons';
import 'animate.css';
import HomeStyles from '@/styles/home.module.scss';

export default async function Home() {
  const getStyle = useCountryStyle();
  const getHref = useCountryHref();

  return (
    <>
      <main className={HomeStyles['main']}>
        <section className="animate__animated animate__fadeIn">
          <h2 className={HomeStyles['title']}>Select country!</h2>
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
                <FontAwesomeIcon icon={faFaceGrimace} size="2xl" />
                <span>very bad</span>
              </li>
              <li className={HomeStyles['prohibit']}>
                <FontAwesomeIcon icon={faFaceDizzy} size="2xl" />
                <span>Prohibit</span>
              </li>
            </ul>
          </aside>
          <WorldMap
            backgroundColor="transparent"
            size={isMobile ? undefined : 900}
            data={countryData}
            hrefFunction={getHref}
            styleFunction={getStyle}
            tooltipTextFunction={({ countryName }: CountryContext) =>
              `${countryName}`
            }
            tooltipTextColor="white"
            richInteraction={true}
          />
        </section>
      </main>
    </>
  );
}
