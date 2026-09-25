import { useSyncExternalStore } from "react";
import { getServerSnapshot, getSnapshot, subscribe, type TestSnapshot } from "@/lib/testStore";

/** Test holati; hydration tugaguncha `null` qaytaradi */
export function useTestSnapshot(): TestSnapshot | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
