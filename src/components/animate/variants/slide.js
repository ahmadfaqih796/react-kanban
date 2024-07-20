// slide.js

import { varTranEnter, varTranExit } from "./transition";

// ----------------------------------------------------------------------

export const varSlide = (props = {}) => {
  const distance = props.distance || 160;
  const durationIn = props.durationIn;
  const durationOut = props.durationOut;
  const easeIn = props.easeIn;
  const easeOut = props.easeOut;

  return {
    // IN
    inUp: {
      initial: { y: distance },
      animate: {
        y: 0,
        transition: varTranEnter({ duration: durationIn, ease: easeIn }),
      },
      exit: {
        y: distance,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
    inDown: {
      initial: { y: -distance },
      animate: {
        y: 0,
        transition: varTranEnter({ duration: durationIn, ease: easeIn }),
      },
      exit: {
        y: -distance,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
    inLeft: {
      initial: { x: -distance },
      animate: {
        x: 0,
        transition: varTranEnter({ duration: durationIn, ease: easeIn }),
      },
      exit: {
        x: -distance,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
    inRight: {
      initial: { x: distance },
      animate: {
        x: 0,
        transition: varTranEnter({ duration: durationIn, ease: easeIn }),
      },
      exit: {
        x: distance,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },

    // OUT
    outUp: {
      initial: { y: 0 },
      animate: {
        y: -distance,
        transition: varTranEnter({ duration: durationIn, ease: easeIn }),
      },
      exit: {
        y: 0,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
    outDown: {
      initial: { y: 0 },
      animate: {
        y: distance,
        transition: varTranEnter({ duration: durationIn, ease: easeIn }),
      },
      exit: {
        y: 0,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
    outLeft: {
      initial: { x: 0 },
      animate: {
        x: -distance,
        transition: varTranEnter({ duration: durationIn, ease: easeIn }),
      },
      exit: {
        x: 0,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
    outRight: {
      initial: { x: 0 },
      animate: {
        x: distance,
        transition: varTranEnter({ duration: durationIn, ease: easeIn }),
      },
      exit: {
        x: 0,
        transition: varTranExit({ duration: durationOut, ease: easeOut }),
      },
    },
  };
};
