import type { Metadata } from "next";
import { ResultScreen } from "@/components/ResultScreen";

export const metadata: Metadata = { title: "Natija — CHTT Test" };

export default function ResultPage() {
  return <ResultScreen />;
}
