import type { Metadata } from "next";
import { TestScreen } from "@/components/TestScreen";

export const metadata: Metadata = { title: "Test — CHTT Test" };

export default function TestPage() {
  return <TestScreen />;
}
