import { m } from "framer-motion";
import { varContainer } from "./variants";

/**
 * [whileInView: Elemen dapat dianimasikan saat masuk atau keluar dari viewport](https://www.framer.com/motion/scroll-animations/#scroll-triggered-animations)
 *
 * + viewport: [Viewport](https://www.framer.com/motion/scroll-animations/###viewport)
 *
 *    + once: Hanya memicu sekali
 */
export default function MotionViewport({ children, className, ...other }) {
  return (
    <m.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer()}
      className={className}
      {...other}
    >
      {children}
    </m.div>
  );
}
