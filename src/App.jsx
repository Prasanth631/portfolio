import { useEffect } from 'react';
import './index.css';
import LuminousDark from './components/LuminousDark';

function App() {
  useEffect(() => {
    let lenis;
    // Dynamically import Lenis to avoid SSR issues
    import('@studio-freight/lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 2,
        infinite: false,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    });

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return <LuminousDark />;
}

export default App;

