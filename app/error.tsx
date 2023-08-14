'use client';

import ErrorStyles from '../styles/error.module.scss';

export default function Error({
  error,
  reset,
}: {
  error: object;
  reset: () => void;
}) {
  return (
    <main className={ErrorStyles['wrapper']}>
      <div className={ErrorStyles['inner']}>
        <h3 className={ErrorStyles['title']}>Error</h3>
        <button
          onClick={() => {
            reset();
          }}
          className={ErrorStyles['refresh-btn']}
        >
          Refresh
        </button>
      </div>
    </main>
  );
}
