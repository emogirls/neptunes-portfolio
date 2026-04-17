import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const PATH = "M 10 50 C 60 0, 90 100, 140 50 C 190 0, 220 100, 270 50 C 320 0, 350 100, 400 50 C 450 0, 480 100, 530 50";

function getPointAtProgress(pathEl: SVGPathElement, t: number) {
  const total = pathEl.getTotalLength();
  return pathEl.getPointAtLength(t * total);
}

export function LoadingScreen() {
  const pathRef = useRef<SVGPathElement>(null);

  const crayonX = useMotionValue(-60);
  const crayonY = useMotionValue(50);
  const crayonRotate = useMotionValue(45);
  const progress = useMotionValue(0);
  const pathLength = useTransform(progress, [0, 1], [0, 1]);

  useEffect(() => {
    const controls = animate(progress, 1, {
      duration: 2,
      ease: "easeInOut",
      onUpdate(latest) {
        if (!pathRef.current) return;
        const pt = getPointAtProgress(pathRef.current, latest);
        const ptAhead = getPointAtProgress(pathRef.current, Math.min(latest + 0.015, 1));
        const dx = ptAhead.x - pt.x;
        const dy = ptAhead.y - pt.y;
        // The crayon SVG points down-right naturally, rotate to match tangent
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 45;
        crayonX.set(pt.x);
        crayonY.set(pt.y);
        crayonRotate.set(angle);
      },
    });
    return () => controls.stop();
  }, []);

  // The SVG viewBox is 0 0 540 100, rendered at w-full h-32 (128px)
  // We need to convert path coords → pixel offsets within that container
  // preserveAspectRatio="none" means linear scale
  // We'll use percentage-based positioning via transforms instead
  const VBOX_W = 540;
  const VBOX_H = 100;

  // icon is 28px, offset so tip (bottom-right of the pen icon) is at the draw point
  const ICON_SIZE = 28;

  const crayonLeft = useTransform(crayonX, x => `calc(${(x / VBOX_W) * 100}% - ${ICON_SIZE * 0.85}px)`);
  const crayonTop = useTransform(crayonY, y => `calc(${(y / VBOX_H) * 100}% - ${ICON_SIZE * 0.85}px)`);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6"
      style={{
        backgroundColor: 'var(--color-paper)',
        backgroundImage:
          'linear-gradient(90deg, transparent 4rem, var(--color-accent) 4rem, var(--color-accent) 4.1rem, transparent 4.1rem), linear-gradient(transparent 1.9rem, #d1cfc7 1.9rem, #d1cfc7 2rem, transparent 2rem)',
        backgroundSize: '100% 100%, 100% 2rem',
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center max-w-lg w-full">
        {/* Drawing area */}
        <div className="relative w-full" style={{ height: 128 }}>
          <svg
            viewBox="0 0 540 100"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            {/* Hidden reference path for getPointAtLength */}
            <path
              ref={pathRef}
              d={PATH}
              fill="none"
              stroke="transparent"
              strokeWidth="0"
            />
            {/* Animated drawn path */}
            <motion.path
              d={PATH}
              fill="transparent"
              stroke="var(--color-ink)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength }}
            />
          </svg>

          {/* Crayon icon — absolutely positioned, tracks the path tip */}
          <motion.div
            style={{
              position: 'absolute',
              left: crayonLeft,
              top: crayonTop,
              width: ICON_SIZE,
              height: ICON_SIZE,
              rotate: crayonRotate,
              transformOrigin: '85% 85%',
              pointerEvents: 'none',
            }}
          >
            <svg
              width={ICON_SIZE}
              height={ICON_SIZE}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.6287 5.12132L4.31497 16.435M15.6287 5.12132L19.1642 8.65685M15.6287 5.12132L17.0429 3.70711C17.4334 3.31658 18.0666 3.31658 18.4571 3.70711L20.5784 5.82843C20.969 6.21895 20.969 6.85212 20.5784 7.24264L19.1642 8.65685M7.85051 19.9706L4.31497 16.435M7.85051 19.9706L19.1642 8.65685M7.85051 19.9706L3.25431 21.0312L4.31497 16.435"
                stroke="var(--color-ink)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>

        <motion.h2
          className="font-handwriting text-4xl font-bold mt-8 text-ink"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Drawing something great...
        </motion.h2>
      </div>
    </motion.div>
  );
}