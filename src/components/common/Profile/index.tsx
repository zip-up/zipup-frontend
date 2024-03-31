import { css } from 'styled-system/css';
import Image from 'next/image';
interface ProfileProps {
  src: string;
  width: string;
  height: string;
  isFull?: boolean;
}

export default function Profile({ src, width, height, isFull = false }: ProfileProps) {
  console.log(width, height);

  const size = isFull ? { width: '100%', height: '100%' } : { width, height };

  return (
    <div className={css({ width: '5rem', height: '5rem', overflow: 'hidden' })}>
      <img
        src={src}
        alt="프로필 이미지"
        style={{
          borderRadius: isFull ? '100%' : '5rem',
          objectFit: 'cover',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}
