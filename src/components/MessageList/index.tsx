import { MessageInfo } from '@typings/funding';
import MessageBox from './MessageBox';
import * as style from './styles';

interface MessageListProps {
  messages: MessageInfo[];
}

export default function MessageList({ messages }: MessageListProps) {
  return (
    <article className={style.msgsWrapper}>
      <h2 className={style.title}>친구들의 메세지</h2>
      {messages.map(msg => (
        <MessageBox msg={msg} key={msg.id} />
      ))}
    </article>
  );
}
