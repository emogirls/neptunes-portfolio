import { useEffect, useRef, type ReactNode } from 'react';
import { useSpring } from 'framer-motion';

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollY = useSpring(0, {
    stiffness: 80,
    damping: 20,
    mass: 0.5,
  });

  useEffect(() => {
    // Set up the container to fill the page and act as content host
    const container = containerRef.current;
    if (!container) return;

    // Keep a target scroll value
    let targetScroll = 0;

    const setContainerHeight = () => {
      document.body.style.height = `${container.scrollHeight}px`;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetScroll = Math.max(
        0,
        Math.min(targetScroll + e.deltaY, container.scrollHeight - window.innerHeight)
      );
      scrollY.set(targetScroll);
    };

    const onTouch = (() => {
      let lastY = 0;
      return {
        start: (e: TouchEvent) => { lastY = e.touches[0].clientY; },
        move: (e: TouchEvent) => {
          e.preventDefault();
          const delta = lastY - e.touches[0].clientY;
          lastY = e.touches[0].clientY;
          targetScroll = Math.max(
            0,
            Math.min(targetScroll + delta, container.scrollHeight - window.innerHeight)
          );
          scrollY.set(targetScroll);
        }
      };
    })();

    // Sync the spring value to the container's transform
    const unsubscribe = scrollY.on('change', (v) => {
      container.style.transform = `translateY(${-v}px)`;
      // Keep native scroll in sync so anchor links / hash routing still work
      window.scrollTo({ top: v, behavior: 'instant' });
    });

    // Handle anchor link clicks — smooth spring scroll to target
    const onAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || href === '#') { 
        e.preventDefault();
        targetScroll = 0;
        scrollY.set(0);
        return;
      }
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      const top = (el as HTMLElement).offsetTop;
      targetScroll = Math.max(0, Math.min(top, container.scrollHeight - window.innerHeight));
      scrollY.set(targetScroll);
    };

    // Allow external native scrolls (e.g., browser scroll restoration) to sync
    const onNativeScroll = () => {
      const native = window.scrollY;
      if (Math.abs(native - targetScroll) > 50) {
        targetScroll = native;
        scrollY.set(native);
      }
    };

    setContainerHeight();
    const ro = new ResizeObserver(setContainerHeight);
    ro.observe(container);

    // Fix the container in place
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.willChange = 'transform';

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouch.start, { passive: true });
    window.addEventListener('touchmove', onTouch.move, { passive: false });
    window.addEventListener('scroll', onNativeScroll, { passive: true });
    document.addEventListener('click', onAnchorClick);

    return () => {
      unsubscribe();
      ro.disconnect();
      document.body.style.height = '';
      container.style.position = '';
      container.style.top = '';
      container.style.left = '';
      container.style.width = '';
      container.style.transform = '';
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouch.start);
      window.removeEventListener('touchmove', onTouch.move);
      window.removeEventListener('scroll', onNativeScroll);
      document.removeEventListener('click', onAnchorClick);
    };
  }, [scrollY]);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
}
