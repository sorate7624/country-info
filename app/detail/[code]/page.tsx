'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DetailStyles from '@/styles/detail.module.scss';
import countryLocaleMap from 'country-locale-map';
import { useEffect, useState } from 'react';

export default function Detail() {
  const pathname = usePathname();
  const countryCode = pathname.split('/detail/')[1];
  const [countryInfo, setCountryInfo] = useState<{}>();

  useEffect(() => {
    setCountryInfo(countryLocaleMap.getCountryByAlpha2(countryCode));
  }, []);
  console.log('countryInfo', countryInfo);

  return (
    <>
      <main className={DetailStyles['main']}>
        <h2 className={DetailStyles['title']}>
          <Link href="/">뒤로가기</Link>
        </h2>
        <section>select</section>
      </main>
    </>
  );
}
