import { useState } from "react";

export function useToggle(): [boolean, () => void] {
  const [isToggleOn, setIsToggleOn] = useState(false);

  const onToggle = () => {
    setIsToggleOn((prev) => !prev);
  };

  return [isToggleOn, onToggle];
}
