import { ElementRef, useEffect, useRef, useState } from "react";

export default function useAnimatedUnmount(visible: boolean) {
  const [shouldRender, setShouldRender] = useState(visible);
  const animatedElementRef = useRef<any>(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    }

    function handleAnimationEnd() {
      setShouldRender(false);
    }
    const elementRef = animatedElementRef.current;
    if (!visible && animatedElementRef.current && elementRef) {
      elementRef.addEventListener("animationend", handleAnimationEnd);
    }

    return () =>
      elementRef &&
      elementRef.removeEventListener("animationend", handleAnimationEnd);
  }, [visible]);

  return { shouldRender, animatedElementRef };
}
