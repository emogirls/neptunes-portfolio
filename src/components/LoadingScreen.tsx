import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onDone?: () => void;
}

export function LoadingScreen({ onDone }: LoadingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"trident" | "exit">("trident");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || phase === "exit") return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const ctx = canvas.getContext("2d")!;

    // Animation state
    let angle = 0;
    const cx = W / 2;
    const cy = H / 2;

    // Phase timings (ms)
    const APPEAR_DURATION = 700;
    const HOLD_BEFORE_SPIN = 400;
    const SPIN_DURATION = 1800;
    const HOLD_AFTER_SPIN = 500;
    const TOTAL_BEFORE_EXIT = APPEAR_DURATION + HOLD_BEFORE_SPIN + SPIN_DURATION + HOLD_AFTER_SPIN;

    const startTime = performance.now();
    let raf: number;
    let exited = false;

    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function easeOutExpo(t: number) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function drawTridentPath(ctx: CanvasRenderingContext2D, s: number) {
      ctx.beginPath();
      
      // Top tip
      ctx.moveTo(0, -1.2 * s);
      
      // Right arrow head
      ctx.lineTo(0.25 * s, -0.35 * s);
      // Arrow bottom
      ctx.quadraticCurveTo(0.15 * s, -0.35 * s, 0.08 * s, -0.45 * s);
      
      // Right shaft
      ctx.lineTo(0.08 * s, 0.1 * s);
      
      // Right inner U-curve
      ctx.bezierCurveTo(
        0.15 * s, 0.5 * s, 
        0.45 * s, 0.5 * s, 
        0.45 * s, -0.6 * s
      );
      
      // Right prong tip to barb
      ctx.quadraticCurveTo(
        0.55 * s, -0.4 * s, 
        0.65 * s, -0.15 * s
      );
      
      // Right barb cut
      ctx.lineTo(0.5 * s, -0.25 * s);
      
      // Right outer curve
      ctx.bezierCurveTo(
        0.8 * s, -0.1 * s, 
        0.7 * s, 0.7 * s, 
        0.2 * s, 0.75 * s
      );
      
      // Base Right
      ctx.lineTo(0.25 * s, 0.75 * s);
      ctx.lineTo(0.25 * s, 0.85 * s);
      ctx.lineTo(0.12 * s, 0.85 * s);
      ctx.lineTo(0.12 * s, 1.0 * s);
      
      // Center bottom
      ctx.lineTo(0, 1.0 * s);
      
      // Base Left
      ctx.lineTo(-0.12 * s, 1.0 * s);
      ctx.lineTo(-0.12 * s, 0.85 * s);
      ctx.lineTo(-0.25 * s, 0.85 * s);
      ctx.lineTo(-0.25 * s, 0.75 * s);
      ctx.lineTo(-0.2 * s, 0.75 * s);
      
      // Left outer curve
      ctx.bezierCurveTo(
        -0.7 * s, 0.7 * s, 
        -0.8 * s, -0.1 * s, 
        -0.5 * s, -0.25 * s
      );
      
      // Left barb cut
      ctx.lineTo(-0.65 * s, -0.15 * s);
      
      // Left barb to tip
      ctx.quadraticCurveTo(
        -0.55 * s, -0.4 * s, 
        -0.45 * s, -0.6 * s
      );
      
      // Left inner U-curve
      ctx.bezierCurveTo(
        -0.45 * s, 0.5 * s, 
        -0.15 * s, 0.5 * s, 
        -0.08 * s, 0.1 * s
      );
      
      // Left shaft
      ctx.lineTo(-0.08 * s, -0.45 * s);
      
      // Left arrow bottom
      ctx.quadraticCurveTo(-0.15 * s, -0.35 * s, -0.25 * s, -0.35 * s);
      
      // Back to top tip
      ctx.lineTo(0, -1.2 * s);
      
      ctx.closePath();
    }

    function drawTrident(alpha: number, scale: number) {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);

      ctx.save();
      
      const s = Math.min(W, H) * 0.28; // scale in px
      
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.scale(scale, scale);
      
      // Shift so the bounding box is centered on the rotation axis
      // Top is -1.2s, bottom is 1.0s, center is -0.1s
      ctx.translate(0, 0.1 * s);
      
      ctx.globalAlpha = alpha;

      // Main metallic body
      drawTridentPath(ctx, s);
      
      // Exact high-contrast silver/black CSS gradient provided by user
      const grad = ctx.createLinearGradient(-s * 0.65, -s * 1.3, s * 0.65, s * 1.4);
      grad.addColorStop(0.25, "#FFFFFF");
      grad.addColorStop(0.42, "#322f2f");
      grad.addColorStop(0.53, "#7e7c7c");
      grad.addColorStop(0.72, "#272626");
      grad.addColorStop(1.00, "#FFFFFF");
      ctx.fillStyle = grad;
      ctx.fill();

      // Inner border highlight
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "rgba(255,255,255,0.4)";
      ctx.stroke();

      ctx.restore();
    }

    function tick(now: number) {
      const elapsed = now - startTime;

      // PHASE 1: Appear (scale in)
      if (elapsed < APPEAR_DURATION) {
        const t = easeOutExpo(elapsed / APPEAR_DURATION);
        drawTrident(t, t * 0.3 + 0.7);
      }
      // PHASE 2: Hold steady
      else if (elapsed < APPEAR_DURATION + HOLD_BEFORE_SPIN) {
        drawTrident(1, 1);
      }
      // PHASE 3: Spin 180°
      else if (elapsed < APPEAR_DURATION + HOLD_BEFORE_SPIN + SPIN_DURATION) {
        const t = (elapsed - APPEAR_DURATION - HOLD_BEFORE_SPIN) / SPIN_DURATION;
        angle = Math.PI * easeInOutCubic(t);
        drawTrident(1, 1);
      }
      // PHASE 4: Hold inverted
      else if (elapsed < TOTAL_BEFORE_EXIT) {
        angle = Math.PI;
        drawTrident(1, 1);
      }
      // PHASE 5: Trigger exit
      else {
        angle = Math.PI;
        drawTrident(1, 1);
        if (!exited) {
          exited = true;
          setPhase("exit");
        }
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // When exit phase fires, wait for animation then call onDone
  useEffect(() => {
    if (phase === "exit") {
      const t = setTimeout(() => onDone?.(), 900);
      return () => clearTimeout(t);
    }
  }, [phase, onDone]);

  return (
    <AnimatePresence>
      {phase === "trident" && (
        <motion.div
          key="trident"
          className="fixed z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
          style={{ top: "-50vh", bottom: "-50vh", left: "-50vw", right: "-50vw" }}
        >
          <canvas ref={canvasRef} style={{ width: '100vw', height: '100vh' }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}