import MessageBox from './MessageBox';
import * as style from './styles';

export default function MessageList() {
  return (
    <article className={style.msgsWrapper}>
      <h2 className={style.title}>친구들의 메세지</h2>
      <MessageBox />
    </article>
  );
}
