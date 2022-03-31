import { useState, useCallback, useEffect } from "react";

const useMediaQuery = (query: string) => {
  const [mounted, setMounted] = useState(false);
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window.matchMedia(query);
    media.addEventListener("change", updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    setMounted(true);
    return () => media.removeEventListener("change", updateTarget);
  }, [mounted]);

  return targetReached;
};

export default useMediaQuery;