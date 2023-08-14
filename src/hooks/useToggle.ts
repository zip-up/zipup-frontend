import { useState } from "react";

export function useToggle(initValue: boolean = false): [boolean, () => void] {
  const [isToggleOn, setIsToggleOn] = useState(initValue);

  const onToggle = () => {
    setIsToggleOn((prev) => !prev);
  };

  return [isToggleOn, onToggle];
}
