// zoom.js

import { varTranEnter, varTranExit } from "./transition";

// ----------------------------------------------------------------------

export const varZoom = (props = {}) => {
  const distance = props.distance || 720;
  const durationIn = props.durationIn;
  const durationOut = props.durationOut;
  const easeIn = props.easeIn;
  const easeOut = props.easeOut;

  return {
    // IN
    in: {
      initial: { scale: 0, opacity: 0 },
      animate: {
        scale: 1,
        opacity: 1,
        transition: varTranEnter({ duration: durationIn, ease: easeIn }),
      },
      exit: {
        scale: 0,
        opacity: 0,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
    inUp: {
      initial: { scale: 0, opacity: 0, translateY: distance },
      animate: {
        scale: 1,
        opacity: 1,
        translateY: 0,
        transition: varTranEnter({ duration: durationIn, ease: easeIn }),
      },
      exit: {
        scale: 0,
        opacity: 0,
        translateY: distance,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
    inDown: {
      initial: { scale: 0, opacity: 0, translateY: -distance },
      animate: {
        scale: 1,
        opacity: 1,
        translateY: 0,
        transition: varTranEnter({ duration: durationIn, ease: easeIn }),
      },
      exit: {
        scale: 0,
        opacity: 0,
        translateY: -distance,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
    inLeft: {
      initial: { scale: 0, opacity: 0, translateX: -distance },
      animate: {
        scale: 1,
        opacity: 1,
        translateX: 0,
        transition: varTranEnter({ duration: durationIn, ease: easeIn }),
      },
      exit: {
        scale: 0,
        opacity: 0,
        translateX: -distance,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
    inRight: {
      initial: { scale: 0, opacity: 0, translateX: distance },
      animate: {
        scale: 1,
        opacity: 1,
        translateX: 0,
        transition: varTranEnter({ duration: durationIn, ease: easeIn }),
      },
      exit: {
        scale: 0,
        opacity: 0,
        translateX: distance,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },

    // OUT
    out: {
      initial: { scale: 1, opacity: 1 },
      animate: {
        scale: 0,
        opacity: 0,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
    outUp: {
      initial: { scale: 1, opacity: 1 },
      animate: {
        scale: 0,
        opacity: 0,
        translateY: -distance,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
    outDown: {
      initial: { scale: 1, opacity: 1 },
      animate: {
        scale: 0,
        opacity: 0,
        translateY: distance,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
    outLeft: {
      initial: { scale: 1, opacity: 1 },
      animate: {
        scale: 0,
        opacity: 0,
        translateX: -distance,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
    outRight: {
      initial: { scale: 1, opacity: 1 },
      animate: {
        scale: 0,
        opacity: 0,
        translateX: distance,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
  };
};
