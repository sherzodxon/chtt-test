import { useEffect, useState } from "react";

/** `deadline` gacha qolgan vaqt (ms). Vaqt timestamp'dan hisoblanadi, shuning uchun refresh uni qayta boshlamaydi. */
export function useCountdown(deadline: number, onExpire: () => void): number {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, []);

  const remaining = Math.max(0, deadline - now);

  useEffect(() => {
    if (remaining === 0) onExpire();
  }, [remaining, onExpire]);

  return remaining;
}
