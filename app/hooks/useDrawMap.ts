import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import type CountryInfo from '@/app/types/CountryInfo';
import type Feature from '@/app/types/Feature';

export function useDrawMap(countryInfo: CountryInfo, mapColor: string) {
  const mapContainer = useRef(null);

  useEffect(() => {
    if (countryInfo) {
      const svg = d3.select(mapContainer.current);

      if (svg.select('svg').empty()) {
        drawMap();
      }
    }
  }, [countryInfo, mapColor]);

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

  return mapContainer;
}
