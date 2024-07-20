import { m } from "framer-motion";
import { varContainer } from "./variants/container";

/**
 * Kontainer Motion Umum
 *
 * Variants: [Variants dapat digunakan untuk menetapkan animasi pada seluruh subtree komponen dengan satu properti animasi](https://www.framer.com/motion/animation/#variants)
 *
 * Variants adalah serangkaian objek yang telah ditentukan sebelumnya
 * const variants = {
 *   visible: { opacity: 1 },
 *   hidden: { opacity: 0 },
 * }
 *
 * Perlu menentukan nama atribut inital dan animate
 * <motion.div
 *  initial="hidden"
 *  animate="visible"
 *  variants={variants}
 * />
 */
export default function MotionContainer({ children, className }) {
  return (
    <m.div
      // Menentukan nama atribut initial, animate, dan exit, sehingga komponen anak tidak perlu menyebutkan ini lagi
      initial="initial"
      animate="animate"
      exit="exit"
      variants={varContainer()}
      className={className}
    >
      {children}
    </m.div>
  );
}
