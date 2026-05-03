import { useEffect, useRef } from 'react';
import { CanvasContainer } from './components/CanvasContainer';
import { OverlayUI } from './components/OverlayUI';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useStore } from './store/useStore';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const setScrollProgress = useStore((state) => state.setScrollProgress);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We use a dummy ScrollTrigger spanning the entire height of the document
    // to drive our global scrollProgress state.
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      });
    });

    return () => ctx.revert();
  }, [setScrollProgress]);

  return (
    <div ref={scrollRef} style={{ width: '100%', position: 'relative' }}>
      {/* 3D Canvas fixed in the background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <CanvasContainer />
      </div>

      {/* Scrollable DOM overlay overlaying the canvas */}
      <div className="overlay-container">
        <OverlayUI />
      </div>
    </div>
  );
}

export default App;
