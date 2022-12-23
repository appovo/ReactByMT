import { useState } from "react";
export function useForceUpdate() {
  // eslint-disable-next-line
  const [updateCounter, setUpdateCounter] = useState(0);
  function forceUpdate() {
    setUpdateCounter((prevCounter) => prevCounter + 1);
  }

  return forceUpdate;
}
