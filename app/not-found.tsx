import ErrorStyles from '../styles/error.module.scss';

export default function NotFound() {
  return (
    <main className={ErrorStyles['wrapper']}>
      <div className={ErrorStyles['inner']}>
        <h3 className={ErrorStyles['title']}>404 Not found</h3>
      </div>
    </main>
  );
}
