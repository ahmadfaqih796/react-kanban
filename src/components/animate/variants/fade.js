// fade.js

import { varTranEnter, varTranExit } from "./transition";

// ----------------------------------------------------------------------

export const varFade = (props = {}) => {
  const distance = props.distance || 120;
  const durationIn = props.durationIn;
  const durationOut = props.durationOut;
  const easeIn = props.easeIn;
  const easeOut = props.easeOut;

  return {
    // IN
    in: {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: varTranEnter({ duration: durationIn, ease: easeIn }),
      },
      exit: {
        opacity: 0,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
    inUp: {
      initial: { y: distance, opacity: 0 },
      animate: {
        y: 0,
        opacity: 1,
        transition: varTranEnter({ duration: durationIn, ease: easeIn }),
      },
      exit: {
        y: distance,
        opacity: 0,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
    inDown: {
      initial: { y: -distance, opacity: 0 },
      animate: {
        y: 0,
        opacity: 1,
        transition: varTranEnter({ duration: durationIn, ease: easeIn }),
      },
      exit: {
        y: -distance,
        opacity: 0,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
    inLeft: {
      initial: { x: -distance, opacity: 0 },
      animate: {
        x: 0,
        opacity: 1,
        transition: varTranEnter({ duration: durationIn, ease: easeIn }),
      },
      exit: {
        x: -distance,
        opacity: 0,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
    inRight: {
      initial: { x: distance, opacity: 0 },
      animate: {
        x: 0,
        opacity: 1,
        transition: varTranEnter({ duration: durationIn, ease: easeIn }),
      },
      exit: {
        x: distance,
        opacity: 0,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },

    // OUT
    out: {
      initial: { opacity: 1 },
      animate: {
        opacity: 0,
        transition: varTranEnter({ duration: durationIn, ease: easeIn }),
      },
      exit: {
        opacity: 1,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
    outUp: {
      initial: { y: 0, opacity: 1 },
      animate: {
        y: -distance,
        opacity: 0,
        transition: varTranEnter({ duration: durationIn, ease: easeIn }),
      },
      exit: {
        y: 0,
        opacity: 1,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
    outDown: {
      initial: { y: 0, opacity: 1 },
      animate: {
        y: distance,
        opacity: 0,
        transition: varTranEnter({ duration: durationIn, ease: easeIn }),
      },
      exit: {
        y: 0,
        opacity: 1,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
    outLeft: {
      initial: { x: 0, opacity: 1 },
      animate: {
        x: -distance,
        opacity: 0,
        transition: varTranEnter({ duration: durationIn, ease: easeIn }),
      },
      exit: {
        x: 0,
        opacity: 1,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
    outRight: {
      initial: { x: 0, opacity: 1 },
      animate: {
        x: distance,
        opacity: 0,
        transition: varTranEnter({ duration: durationIn, ease: easeIn }),
      },
      exit: {
        x: 0,
        opacity: 1,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
  };
};
