import Image from 'next/image';
import earthIcon from '@/public/earth.png';
import LoadingStyles from '../styles/loading.module.scss';

export default function Loading() {
  return (
    <main className={LoadingStyles['wrapper']}>
      <div className={LoadingStyles['inner']}>
        <Image src={earthIcon} alt="earth" />
        <h3 className={LoadingStyles['loading']}>Loading...</h3>
      </div>
    </main>
  );
}
