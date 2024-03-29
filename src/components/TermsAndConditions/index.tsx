import classNames from 'classnames';
import { css } from '@styled-system/css';
import Terms from './Terms';
import * as style from './styles';
import { useEffect, useState } from 'react';

export type TermsType = {
  title: string;
  subtitle: string;
  link: string;
};

interface TermsAndConditionsProps {
  onSetIsValid: (value: boolean) => void;
  data: TermsType[];
  height?: string;
}

export default function TermsAndConditions({
  onSetIsValid,
  data,
  height,
}: TermsAndConditionsProps) {
  const [checkedStates, setCheckedStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const allChecked = data.every(item => checkedStates[item.title]);
    onSetIsValid(allChecked);
  }, [checkedStates, onSetIsValid, data]);

  const handleCheck = (title: string, isChecked: boolean) => {
    setCheckedStates(prev => ({ ...prev, [title]: isChecked }));
  };

  return (
    <div
      className={classNames(style.message, css({ flexDirection: 'column' }))}
      style={{ height: height || '10.2rem' }}
    >
      {data.map(item => (
        <Terms
          key={item.title}
          data={item}
          onCheck={handleCheck}
          isChecked={checkedStates[item.title] || false}
        />
      ))}
    </div>
  );
}
