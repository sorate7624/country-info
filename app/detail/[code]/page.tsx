'use client';
import * as d3 from 'd3';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import countryLocaleMap from 'country-locale-map';
import { isMobile } from 'react-device-detect';
import { countryData } from '@/app/countryData';
import Image from 'next/image';
import arrowIcon from '@/public/arrow.png';
import DetailStyles from '@/styles/detail.module.scss';
import 'animate.css';
import classnames from 'classnames';

// type
interface CountryInfo {
  name: string;
  alpha2: string;
  alpha3: string;
  numeric: string;
  locales: string[];
  default_locale: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  languages: string[];
  capital: string;
  emoji: string;
  emojiU: string;
  fips: string;
  internet: string;
  continent: string;
  region: string;
}

interface Feature {
  type: string;
  properties: {
    name: string;
  };
  id: string;
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}

export default function Detail() {
  const pathname = usePathname();
  const countryCode = pathname.split('/detail/')[1];
  const [countryInfo, setCountryInfo] = useState<any | undefined>(undefined);
  const [riskLevel, setRiskLevel] = useState(0);
  const [mapColor, setMapColor] = useState('');
  const [feature, setFeature] = useState('');
  const mapContainer = useRef(null);

  useEffect(() => {
    const country = countryLocaleMap.getCountryByAlpha2(countryCode);
    setCountryInfo(country);

    const matchingCountryData = countryData.find(
      (element) => element.country === countryCode.toLocaleLowerCase()
    );
    if (matchingCountryData) {
      setRiskLevel(matchingCountryData.value);
      setFeature(matchingCountryData.feature);
    }
  }, [countryCode]);

  useEffect(() => {
    if (riskLevel) {
      if (riskLevel === 1) {
        setMapColor('#026abf');
      } else if (riskLevel === 2) {
        setMapColor('#fcc33c');
      } else if (riskLevel === 3) {
        setMapColor('#c82612');
      } else if (riskLevel === 4) {
        setMapColor('#2a2a2a');
      } else {
        setMapColor('rgba(255,255,255,.5)');
      }
    }
  }, [riskLevel]);

  useEffect(() => {
    if (countryInfo) {
      drawMap();
    }
  }, [mapColor]);

  const drawMap = () => {
    let width = 440;
    let height = 307;

    if (isMobile) {
      width = 200;
      height = 200;
    }

    const svg = d3
      .select(mapContainer.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // 사용할 지도 데이터 로드
    d3.json(
      'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
    ).then((data) => {
      const franceData = (data as any).features.filter((feature: Feature) => {
        if (countryInfo?.name == 'United States') {
          countryInfo.name = 'USA';
        }
        return feature.properties.name === countryInfo?.name;
      });

      // 지리적 경로 생성기
      const path = d3.geoPath();

      // 프로젝션 설정
      const projection = d3
        .geoMercator()
        .fitSize([width, height], franceData[0]);

      // 지도 그리기
      svg
        .selectAll('path')
        .data(franceData)
        .enter()
        .append('path')
        .attr('d', (features) => {
          const feature = features as Feature;
          const pathString = path.projection(projection)(
            feature.geometry as any
          );
          return pathString || '';
        })
        .style('stroke', '#408AF1')
        .style('fill', mapColor);
    });
  };

  return (
    <>
      <main className={DetailStyles['main']}>
        <h2 className={DetailStyles['title']}>
          <Link href="/">
            <Image src={arrowIcon} alt="arrow" />
          </Link>
        </h2>
        <section
          className={classnames(
            DetailStyles['section'],
            'animate__animated animate__fadeIn'
          )}
        >
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
        </section>
      </main>
    </>
  );
}
