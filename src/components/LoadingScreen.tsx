import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

const PATH = "M 10 50 C 60 0, 90 100, 140 50 C 190 0, 220 100, 270 50 C 320 0, 350 100, 400 50 C 450 0, 480 100, 530 50";
const VIEWBOX_WIDTH = 540;
const VIEWBOX_HEIGHT = 100;

function getPointAtLength(pathEl: SVGPathElement, t: number) {
  const total = pathEl.getTotalLength();
  return pathEl.getPointAtLength(t * total);
}

export function LoadingScreen() {
  const pathRef = useRef<SVGPathElement>(null);
  const crayonX = useMotionValue(10);
  const crayonY = useMotionValue(50);
  const crayonRotate = useMotionValue(-45);
  const progress = useMotionValue(0);

  const pathLength = useTransform(progress, [0, 1], [0, 1]);

  useEffect(() => {
    const controls = animate(progress, 1, {
      duration: 2,
      ease: "easeInOut",
      onUpdate(latest) {
        if (!pathRef.current) return;
        const pt = getPointAtLength(pathRef.current, latest);
        const ptAhead = getPointAtLength(pathRef.current, Math.min(latest + 0.01, 1));
        const dx = ptAhead.x - pt.x;
        const dy = ptAhead.y - pt.y;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) - 45;
        crayonX.set(pt.x);
        crayonY.set(pt.y);
        crayonRotate.set(angle);
      }
    });
    return () => controls.stop();
  }, []);

  const SVG_W = 500;
  const SCALE_X = SVG_W / VIEWBOX_WIDTH;
  const SCALE_Y = 128 / VIEWBOX_HEIGHT;

  const crayonSvgX = useTransform(crayonX, x => x * SCALE_X - 16);
  const crayonSvgY = useTransform(crayonY, y => y * SCALE_Y - 16);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6"
      style={{
        backgroundColor: 'var(--color-paper)',
        backgroundImage: 'linear-gradient(90deg, transparent 4rem, var(--color-accent) 4rem, var(--color-accent) 4.1rem, transparent 4.1rem), linear-gradient(transparent 1.9rem, #d1cfc7 1.9rem, #d1cfc7 2rem, transparent 2rem)',
        backgroundSize: '100% 100%, 100% 2rem'
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="relative flex flex-col items-center max-w-lg w-full">
        <div className="relative w-full" style={{ height: 128 }}>
          <svg
            viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              d={PATH}
              fill="transparent"
              stroke="transparent"
              strokeWidth="0"
            />
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

          {/* Crayon SVG icon following the path */}
          <motion.svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            style={{
              position: 'absolute',
              left: crayonSvgX,
              top: crayonSvgY,
              rotate: crayonRotate,
              transformOrigin: '16px 16px',
            }}
          >
            {/* Crayon body */}
            <rect x="9" y="2" width="6" height="14" rx="1" fill="var(--color-accent)" stroke="var(--color-ink)" strokeWidth="1.5" />
            {/* Crayon tip */}
            <path d="M9 16 L12 22 L15 16 Z" fill="#e8c080" stroke="var(--color-ink)" strokeWidth="1.5" strokeLinejoin="round" />
            {/* Crayon label band */}
            <rect x="9" y="11" width="6" height="2.5" fill="white" opacity="0.5" />
            {/* Crayon top flat end */}
            <rect x="9" y="2" width="6" height="2" rx="1" fill="var(--color-ink)" opacity="0.2" />
          </motion.svg>
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