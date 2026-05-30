import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Matter from "matter-js";

interface LoadingScreenProps {
  onDone?: () => void;
}

export function LoadingScreen({ onDone }: LoadingScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [phase, setPhase] = useState<"cross" | "exit">("cross");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

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

    function drawHeraldCrossPath(ctx: CanvasRenderingContext2D, s: number) {
      const L = 0.65 * s;
      const B = 1.35 * s;
      const w1 = 0.08 * s; // width at center
      const w3 = 0.36 * s; // width at points
      const p_inset = 0.24 * s; // how far back the points are from the tip
      
      // Control points for Top Arm
      const cp_tip_x = w3 * 0.3;
      const cp_tip_y_T = -L + p_inset * 0.8;
      const cp_arm_x = w1 * 0.6;
      const cp_arm_y_T = -L * 0.35;
      
      // Control points for Bottom Arm
      const cp_tip_y_B = B - p_inset * 0.8;
      const cp_arm_y_B = B * 0.35;
      
      // Control points for Right Arm
      const cp_tip_y_R = L - p_inset * 0.8;
      const cp_arm_x_R = L * 0.35;
      const cp_arm_y_R = w1 * 0.6;
      
      // Control points for Left Arm
      const cp_tip_y_L = -L + p_inset * 0.8;
      const cp_arm_x_L = -L * 0.35;
      const cp_arm_y_L = w1 * 0.6;

      ctx.beginPath();
      
      // TOP ARM
      ctx.moveTo(0, -L);
      ctx.quadraticCurveTo(cp_tip_x, cp_tip_y_T, w3, -L + p_inset);
      ctx.quadraticCurveTo(cp_arm_x, cp_arm_y_T, w1, -w1);
      
      // RIGHT ARM
      ctx.quadraticCurveTo(cp_arm_x_R, -cp_arm_y_R, L - p_inset, -w3);
      ctx.quadraticCurveTo(cp_tip_y_R, -cp_tip_x, L, 0);
      ctx.quadraticCurveTo(cp_tip_y_R, cp_tip_x, L - p_inset, w3);
      ctx.quadraticCurveTo(cp_arm_x_R, cp_arm_y_R, w1, w1);
      
      // BOTTOM ARM
      ctx.quadraticCurveTo(cp_arm_x, cp_arm_y_B, w3, B - p_inset);
      ctx.quadraticCurveTo(cp_tip_x, cp_tip_y_B, 0, B);
      ctx.quadraticCurveTo(-cp_tip_x, cp_tip_y_B, -w3, B - p_inset);
      ctx.quadraticCurveTo(-cp_arm_x, cp_arm_y_B, -w1, w1);
      
      // LEFT ARM
      ctx.quadraticCurveTo(cp_arm_x_L, cp_arm_y_L, -L + p_inset, w3);
      ctx.quadraticCurveTo(cp_tip_y_L, cp_tip_x, -L, 0);
      ctx.quadraticCurveTo(cp_tip_y_L, -cp_tip_x, -L + p_inset, -w3);
      ctx.quadraticCurveTo(cp_arm_x_L, -cp_arm_y_L, -w1, -w1);
      
      // TOP ARM LEFT SIDE
      ctx.quadraticCurveTo(-cp_arm_x, cp_arm_y_T, -w3, -L + p_inset);
      ctx.quadraticCurveTo(-cp_tip_x, cp_tip_y_T, 0, -L);
      
      ctx.closePath();
    }

    function drawCross(alpha: number, scale: number) {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);

      ctx.save();
      
      const s = Math.min(W, H) * 0.31; // cross scale in px
      
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.scale(scale, scale);
      
      // Shift so the bounding box is centered on the rotation axis
      const visualOffset = (1.35 - 0.65) * s / 2;
      ctx.translate(0, -visualOffset);
      
      ctx.globalAlpha = alpha;

      // Draw dark outline (larger, slightly blurred)
      ctx.save();
      ctx.shadowColor = "rgba(0,0,0,0.9)";
      ctx.shadowBlur = 18;
      drawHeraldCrossPath(ctx, s * 1.06);
      ctx.fillStyle = "#1a1a1a";
      ctx.fill();
      ctx.restore();

      // Main metallic body
      drawHeraldCrossPath(ctx, s);
      const grad = ctx.createLinearGradient(-s*0.4, -s, s*0.4, s*1.35);
      grad.addColorStop(0.0, "#ffffff");
      grad.addColorStop(0.4, "#e0e0e0");
      grad.addColorStop(0.7, "#888888");
      grad.addColorStop(1.0, "#222222");
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
        drawCross(t, t * 0.3 + 0.7);
      }
      // PHASE 2: Hold steady
      else if (elapsed < APPEAR_DURATION + HOLD_BEFORE_SPIN) {
        drawCross(1, 1);
      }
      // PHASE 3: Spin 180°
      else if (elapsed < APPEAR_DURATION + HOLD_BEFORE_SPIN + SPIN_DURATION) {
        const t = (elapsed - APPEAR_DURATION - HOLD_BEFORE_SPIN) / SPIN_DURATION;
        angle = Math.PI * easeInOutCubic(t);
        drawCross(1, 1);
      }
      // PHASE 4: Hold inverted
      else if (elapsed < TOTAL_BEFORE_EXIT) {
        angle = Math.PI;
        drawCross(1, 1);
      }
      // PHASE 5: Trigger exit
      else {
        angle = Math.PI;
        drawCross(1, 1);
        if (!exited) {
          exited = true;
          setPhase("exit");
        }
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  // When exit phase fires, wait for animation then call onDone
  useEffect(() => {
    if (phase === "exit") {
      const t = setTimeout(() => onDone?.(), 900);
      return () => clearTimeout(t);
    }
  }, [phase, onDone]);

  // Matter.js engine for particle burst on exit
  const burstRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (phase !== "exit") return;
    const canvas = burstRef.current;
    if (!canvas) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const { Engine, Render, Runner, Bodies, Body, World, Events } = Matter;

    const engine = Engine.create({ gravity: { x: 0, y: 0.4 } });
    const render = Render.create({
      canvas,
      engine,
      options: {
        width: W,
        height: H,
        background: "transparent",
        wireframes: false,
      },
    });

    // Spawn cross-shaped fragments bursting from center
    const fragments: Matter.Body[] = [];
    const cx = W / 2;
    const cy = H / 2;
    const count = 28;

    for (let i = 0; i < count; i++) {
      const ang = (i / count) * Math.PI * 2;
      const speed = 8 + Math.random() * 14;
      const size = 6 + Math.random() * 16;
      const isRect = Math.random() > 0.4;

      const b = isRect
        ? Bodies.rectangle(cx, cy, size, size * (1 + Math.random() * 2), {
            render: { fillStyle: "#ffffff", strokeStyle: "transparent" },
            angle: Math.random() * Math.PI,
            frictionAir: 0.018,
          })
        : Bodies.circle(cx, cy, size / 2, {
            render: { fillStyle: "#ffffff", strokeStyle: "transparent" },
            frictionAir: 0.018,
          });

      Body.setVelocity(b, {
        x: Math.cos(ang) * speed,
        y: Math.sin(ang) * speed - 4,
      });
      Body.setAngularVelocity(b, (Math.random() - 0.5) * 0.4);
      fragments.push(b);
    }

    World.add(engine.world, fragments);
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Fade fragments out after 0.6s
    let fadeStart: number | null = null;
    const ctx = canvas.getContext("2d")!;
    Events.on(render, "afterRender", () => {
      if (fadeStart === null) fadeStart = performance.now();
      const elapsed = performance.now() - fadeStart!;
      const alpha = Math.max(0, 1 - elapsed / 600);
      ctx.save();
      ctx.globalCompositeOperation = "destination-in";
      ctx.globalAlpha = alpha;
      ctx.fillStyle = `rgba(0,0,0,${1 - alpha})`;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();
    });

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  }, [phase]);

  return (
    <AnimatePresence>
      {phase === "cross" && (
        <motion.div
          key="cross"
          className="fixed inset-0 z-[9999]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ background: "#000" }}
        >
          <canvas ref={canvasRef} className="w-full h-full" />
        </motion.div>
      )}

      {phase === "exit" && (
        <motion.div
          key="exit"
          className="fixed inset-0 z-[9998] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
          style={{ background: "#000" }}
        >
          <canvas ref={burstRef} className="w-full h-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}