import { css } from 'styled-system/css';

interface ProfileProps {
  src: string;
  width: string;
  height: string;
  isFull?: boolean;
}

export default function Profile({ src, width, height, isFull = false }: ProfileProps) {
  console.log(width, height);

  const size = isFull
    ? { width: '100%', height: '100%' }
    : { width: `${width}rem`, height: `${height}rem` };

  return (
    <div className={css(size)}>
      <img
        src={src}
        alt="프로필 이미지"
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%',
          borderRadius: isFull ? '100%' : width,
        }}
      />
    </div>
  );
}
