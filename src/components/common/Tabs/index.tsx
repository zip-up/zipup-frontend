import { css, cx } from 'styled-system/css';

import * as style from './style';

interface TabsProps {
  data: string[];
  activeTab: string;
  onSetActiveTab: (value: string) => void;
}

function Tabs({ data, activeTab, onSetActiveTab }: TabsProps) {
  return (
    <div className={style.tabs}>
      {data.map(item => (
        <div
          key={item}
          className={cx(
            style.tabItem,
            css({
              fontWeight: activeTab === item ? '600' : '400',
              color: activeTab === item ? 'main.blue' : 'text.200',
            }),
          )}
          onClick={() => onSetActiveTab(item)}
        >
          {item}
        </div>
      ))}
      <div
        className={style.indicator}
        style={{ transform: `translateX(${data.indexOf(activeTab) * 100}%)` }}
      />
    </div>
  );
}

export default Tabs;
