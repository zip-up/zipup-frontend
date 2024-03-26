import * as style from './styles';

interface StatusTagProps {
  isCompleted?: boolean;
  daysLeft?: number;
}

export default function StatusTag({ isCompleted = false, daysLeft = 0 }: StatusTagProps) {
  return (
    <>
      {isCompleted ? (
        <div className={style.statusTag({ bg: 'black' })}>완료</div>
      ) : (
        <div className={style.statusTag({ bg: 'blue' })}>D-{daysLeft}</div>
      )}
    </>
  );
}
