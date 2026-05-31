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

const fragmentShader = /* glsl */`
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;

  float blob(vec2 uv, vec2 center, float radius, float softness) {
    float d = distance(uv, center);
    return 1.0 - smoothstep(0.0, radius, pow(d, softness));
  }

  vec3 linearToSRGB(vec3 color) {
    return pow(clamp(color, 0.0, 1.0), vec3(1.0 / 2.2));
  }

  void main() {
    vec2 uv = vUv;

    vec3 base = vec3(0.02, 0.02, 0.06);

    vec3 wine    = vec3(0.15, 0.10, 0.40);
    vec3 mauve   = vec3(0.25, 0.15, 0.50);
    vec3 rose    = vec3(0.35, 0.20, 0.60);
    vec3 shadow  = vec3(0.01, 0.01, 0.04);

    float b1 = blob(uv, vec2(0.72, 0.52), 0.68, 0.75);
    float b2 = blob(uv, vec2(0.90, 0.82), 0.55, 0.80);
    float b3 = blob(uv, vec2(0.08, 0.88), 0.50, 0.70);
    float b4 = blob(uv, vec2(0.05, 0.10), 0.40, 0.80);

    vec3 color = base;

    color = mix(color, wine,   b1 * 0.70);
    color = mix(color, mauve,  b2 * 0.55);
    color = mix(color, rose,   b2 * b1 * 0.30);
    color = mix(color, shadow, b3 * 0.60);
    color = mix(color, shadow, b4 * 0.50);

    float vignette = 1.0 - smoothstep(0.35, 1.10, distance(uv, vec2(0.55, 0.50)));
    color = mix(base * 0.5, color, vignette * 0.85 + 0.15);

    float drift = sin(uTime * 0.12) * 0.012;
    color += vec3(drift * 0.4, drift * 0.15, drift * 0.3);
    color = clamp(color, 0.0, 1.0);

    gl_FragColor = vec4(linearToSRGB(color), 1.0);
  }
`;

export function Background() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { spotify } = useSpotify();

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    mount.appendChild(renderer.domElement);

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

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    let raf: number;
    let start = performance.now();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      uniforms.uTime.value = (performance.now() - start) / 1000;
      renderer.render(scene, camera);
    };
    animate();

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
      
      {/* Ambient Spotify Blur */}
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
