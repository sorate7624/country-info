import Link from 'next/link';
import HeaderStyles from '@/styles/header.module.scss';

export default function Header() {
  return (
    <header className={HeaderStyles['header']}>
      <h1>
        <Link href="/">Travel Recommandation</Link>
      </h1>
    </header>
  );
}
