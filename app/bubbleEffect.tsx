import HomeStyles from '../styles/home.module.scss';

export default function BubbleEffect() {
  return (
    <div className={HomeStyles['bubble-area']}>
      <div className={HomeStyles['small']}></div>
      <div className={HomeStyles['s-medium']}></div>
      <div className={HomeStyles['medium']}></div>
      <div className={HomeStyles['large']}></div>
      <div className={HomeStyles['small-l']}></div>
    </div>
  );
}
