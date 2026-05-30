import { useEffect, useRef, useState, type ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
  disabled?: boolean;
}

export function SmoothScroll({ children, disabled = false }: SmoothScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const disabledRef = useRef(disabled);
  
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)').matches : false
  );

  // Sync disabled state to ref so we don't trigger effect teardowns when loading finishes
  useEffect(() => {
    disabledRef.current = disabled;
    if (disabled) {
      window.scrollTo(0, 0);
    }
  }, [disabled]);

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    
    // On mobile, just render normally and let iOS/Android native scroll handle physics
    if (!container || isMobile) {
      if (container) {
        document.body.style.height = '';
        container.style.position = '';
        container.style.transform = '';
      }
      return;
    }

    let targetY = window.scrollY;
    let currentY = window.scrollY;
    let rafId: number;

    const setBodyHeight = () => {
      document.body.style.height = `${container.getBoundingClientRect().height}px`;
    };

    setBodyHeight();
    const ro = new ResizeObserver(setBodyHeight);
    ro.observe(container);

    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.willChange = 'transform';

    const onScroll = () => {
      if (!disabledRef.current) {
        targetY = window.scrollY;
      } else {
        // Lock scroll at top if disabled
        window.scrollTo(0, 0);
        targetY = 0;
        currentY = 0;
      }
    };

    const update = () => {
      if (!disabledRef.current) {
        // LERP (Linear Interpolation) gives that buttery Locomotive Scroll feel
        currentY += (targetY - currentY) * 0.08;
        
        // Snap to whole pixels when very close to stop sub-pixel jitter
        if (Math.abs(targetY - currentY) < 0.5) {
          currentY = targetY;
        }

        container.style.transform = `translate3d(0, -${currentY}px, 0)`;
      }
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    rafId = requestAnimationFrame(update);

    const onAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || href === '#') return;
      
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      
      const top = (el as HTMLElement).getBoundingClientRect().top + currentY;
      window.scrollTo({ top, behavior: 'instant' });
    };
    document.addEventListener('click', onAnchorClick);

    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onAnchorClick);
      cancelAnimationFrame(rafId);
      
      document.body.style.height = '';
      container.style.position = '';
      container.style.top = '';
      container.style.left = '';
      container.style.width = '';
      container.style.transform = '';
    };
  }, [isMobile]); // Intentionally omitting disabled to prevent body-height collapse glitches

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
}
