import Link from 'next/link';
import Image from 'next/image';
import arrowIcon from '@/public/arrow.png';
import DetailStyles from '@/styles/detail.module.scss';
import 'animate.css';
import classnames from 'classnames';
import Card from './Card';
import { connectDB } from '@/util/database';
import { notFound } from 'next/navigation';
import DetailProps from '@/app/types/DetailProps';

export default async function Detail({ params }: DetailProps) {
  const db = (await connectDB).db('pang_db');
  if (!params) {
    return notFound();
  }
  let result;

  if (Array.isArray(params.code)) {
    result = await db.collection('country_info').findOne({
      country: { $in: params.code.map((code) => code.toLocaleLowerCase()) },
    });
  } else if (typeof params.code === 'string') {
    result = (await db.collection('country_info').findOne({
      country: params.code.toLocaleLowerCase(),
    })) as any;
  }

  if (result === null) {
    return notFound();
  }

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
          <Card countryData={result} />
        </section>
      </main>
    </>
  );
}
