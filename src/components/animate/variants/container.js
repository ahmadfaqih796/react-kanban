export const varContainer = (props = {}) => {
  const staggerIn = props.staggerIn || 0.05;
  const delayIn = props.delayIn || 0.05; // Memperbaiki kesalahan dari 'staggerIn' ke 'delayIn'
  const staggerOut = props.staggerOut || 0.05; // Memperbaiki kesalahan dari 'staggerIn' ke 'staggerOut'

  return {
    animate: {
      transition: {
        staggerChildren: staggerIn,
        delayChildren: delayIn,
      },
    },
    exit: {
      transition: {
        staggerChildren: staggerOut,
        staggerDirection: -1,
      },
    },
  };
};
