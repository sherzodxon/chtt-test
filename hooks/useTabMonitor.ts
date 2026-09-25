import { useEffect } from "react";

/**
 * Sahifa yashirin holatga o‘tganini (`visibilitychange`) kuzatadi — boshqa tab, oynani yig‘ish, boshqa ilovaga o‘tish.
 * Refresh/yopish paytida brauzer ham `hidden` yuboradi; `beforeunload` bayrog‘i bu holatni chiqish deb hisoblamaydi.
 */
export function useTabMonitor(enabled: boolean, onLeave: () => void) {
  useEffect(() => {
    if (!enabled) return;

    let unloading = false;
    const handleBeforeUnload = () => {
      unloading = true;
    };
    const handlePageShow = () => {
      unloading = false;
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && !unloading) onLeave();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("pageshow", handlePageShow);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("pageshow", handlePageShow);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled, onLeave]);
}
