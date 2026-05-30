import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useSpotify } from '../lib/SpotifyContext';
import { motion, AnimatePresence } from 'framer-motion';

const vertexShader = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// Rich dark wine/mauve gradient — multi-point ambient light blobs
// Matches the reference: deep plum base, warm rose/mauve blobs off-center
const fragmentShader = /* glsl */`
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;

  // Smooth falloff for each light blob
  float blob(vec2 uv, vec2 center, float radius, float softness) {
    float d = distance(uv, center);
    return 1.0 - smoothstep(0.0, radius, pow(d, softness));
  }

  // sRGB gamma encoding for display
  vec3 linearToSRGB(vec3 color) {
    return pow(clamp(color, 0.0, 1.0), vec3(1.0 / 2.2));
  }

  void main() {
    vec2 uv = vUv;

    // ── Base colour: very dark blue-black ─────────────────────────────────
    vec3 base = vec3(0.02, 0.02, 0.06);

    // ── Colour palette (linear space) ─────────────────────────────────────
    vec3 wine    = vec3(0.15, 0.10, 0.40); // dark blue/purple
    vec3 mauve   = vec3(0.25, 0.15, 0.50);  // medium purple
    vec3 rose    = vec3(0.35, 0.20, 0.60);  // bright purple accent
    vec3 shadow  = vec3(0.01, 0.01, 0.04); // near-black shadow

    // ── Light blobs — positioned like the reference image ─────────────────
    // Main warm blob: right-center area
    float b1 = blob(uv, vec2(0.72, 0.52), 0.68, 0.75);
    // Secondary: bottom-right corner warmth
    float b2 = blob(uv, vec2(0.90, 0.82), 0.55, 0.80);
    // Left-bottom shadow pull (makes left darker)
    float b3 = blob(uv, vec2(0.08, 0.88), 0.50, 0.70);
    // Slight upper-left shadow
    float b4 = blob(uv, vec2(0.05, 0.10), 0.40, 0.80);

    // ── Composite ─────────────────────────────────────────────────────────
    vec3 color = base;

    // Warm wine fills the right half softly
    color = mix(color, wine,   b1 * 0.70);
    // Richer mauve highlights in bottom-right
    color = mix(color, mauve,  b2 * 0.55);
    // Rose touch for depth
    color = mix(color, rose,   b2 * b1 * 0.30);
    // Shadow blobs pull left corners dark
    color = mix(color, shadow, b3 * 0.60);
    color = mix(color, shadow, b4 * 0.50);

    // Vignette: edges are deeper
    float vignette = 1.0 - smoothstep(0.35, 1.10, distance(uv, vec2(0.55, 0.50)));
    color = mix(base * 0.5, color, vignette * 0.85 + 0.15);

    // Very subtle slow drift for life (barely perceptible)
    float drift = sin(uTime * 0.12) * 0.012;
    color += vec3(drift * 0.4, drift * 0.15, drift * 0.3);
    color = clamp(color, 0.0, 1.0);

    // Gamma encode for display
    gl_FragColor = vec4(linearToSRGB(color), 1.0);
  }
`;

export function Background() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { spotify } = useSpotify();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // ── Scene ─────────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(mount.clientWidth, mount.clientHeight) },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });
    scene.add(new THREE.Mesh(geometry, material));

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    // ── Animation loop ────────────────────────────────────────────────────
    let raf: number;
    let start = performance.now();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      uniforms.uTime.value = (performance.now() - start) / 1000;
      renderer.render(scene, camera);
    };
    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#05050f'
      }}
    >
      <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />
      <AnimatePresence>
        {spotify && (
          <motion.div
            key={spotify.track_id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              inset: '-10%',
              width: '120%',
              height: '120%',
              backgroundImage: `url(${spotify.album_art_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(80px) brightness(0.35)',
              zIndex: 1
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
