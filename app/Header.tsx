import Link from 'next/link';
import HeaderStyles from '@/styles/header.module.scss';

export default function Header() {
  return (
    <header className={HeaderStyles['header']}>
      <h1>
        <Link href="/">
          <span>Country info</span>
          <span>Country info</span>
        </Link>
      </h1>
    </header>
  );
}
