import type { Metadata } from "next";
import { AuDemoClient } from "./components/au-demo-client";

export const metadata: Metadata = {
  title: "Min AU-rejse — UX/frontend-demo",
  description:
    "En lille thinking prototype: et personligt overblik fra studieinteresse til optagelse på Aarhus Universitet. UX-/frontend-case af Frederikke Schmidt.",
};

export default function Page() {
  return <AuDemoClient />;
}
