// src/utils/animations.js
// Reusable Framer Motion variants used across the app.

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export const slideUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export const slideLeft = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export const slideRight = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
})

export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.03,
    y: -6,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
}

export const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
}

export const drawerVariants = {
  hidden: { x: '100%' },
  visible: {
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    x: '100%',
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
}

export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
}

export const toastVariants = {
  hidden: { opacity: 0, y: -24, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    x: 60,
    transition: { duration: 0.25 },
  },
}

export const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
}

export const badgeBounce = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.4, 0.9, 1.1, 1],
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
}