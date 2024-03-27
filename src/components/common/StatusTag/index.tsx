import * as style from './styles';

interface StatusTagProps {
  isCompleted?: boolean;
  daysLeft?: number;
  isFloating?: boolean;
}

export default function StatusTag({
  isCompleted = false,
  daysLeft = 0,
  isFloating = false,
}: StatusTagProps) {
  const size = isFloating ? 'floating' : 'static';

  return (
    <>
      {isCompleted ? (
        <div className={style.statusTag({ bg: 'black', size })}>완료</div>
      ) : (
        <div className={style.statusTag({ bg: 'blue', size })}>D-{daysLeft}</div>
      )}
    </>
  );
}
