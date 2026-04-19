import type { Transition } from "framer-motion";

// AirPods-style gentle spring — the soft bounce you get when a device connects
export const pair: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 22,
  mass: 0.9,
};
