import {useRef} from "react";

type ConstructorCallback = () => void;

const useConstructor = (callback: ConstructorCallback): void => {
  const isRun = useRef(false);

  if (!isRun.current) {
    callback();

    isRun.current = true;
  }
}
export default useConstructor;