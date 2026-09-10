import { useEffect, useRef, useState } from 'react';

// Eases 0 -> target once `start` becomes true. Mirrors the cubic ease-out
// counter in the original inline script.
export function useCountUp(target, start, duration = 1500) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!start || started.current) return;
    started.current = true;

    let raf;
    let t0 = null;
    const tick = (ts) => {
      if (t0 === null) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);

  return value;
}
