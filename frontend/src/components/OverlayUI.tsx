import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Terminal } from 'lucide-react';
import './OverlayUI.css';

export const OverlayUI: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations for hero text
      gsap.fromTo('.hero-title', 
        { y: 100, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'power4.out', stagger: 0.2 }
      );
      
      // We could use scrollTrigger for individual elements here if needed, 
      // but standard CSS layout drives the scroll length.
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      {/* SECTION 1: HERO */}
      <section className="section" style={{ height: '100vh', padding: '0 5vw' }}>
        <div style={{ maxWidth: '1200px', width: '100%' }}>
          <div className="hero-title interactive" style={{ overflow: 'hidden' }}>
            <h1 className="title-large" style={{ color: 'var(--text-primary)' }}>
              ANAND
            </h1>
          </div>
          <div className="hero-title interactive" style={{ overflow: 'hidden' }}>
            <h1 className="title-large" style={{ color: 'var(--accent-color)' }}>
              SINGH
            </h1>
          </div>
          <div className="hero-title interactive" style={{ marginTop: '2rem' }}>
            <p className="subtitle" style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
              <Terminal size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }}/>
              GROWTH ARCHITECT & STRATEGY LEAD
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: METRICS / REAL-TIME FLEX */}
      <section className="section" style={{ height: '100vh', backgroundColor: 'transparent' }}>
        <div style={{ padding: '0 5vw', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%' }}>
          <div className="interactive glass-panel" style={{ padding: '3rem', maxWidth: '500px', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(10, 10, 10, 0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#fff' }}>EXECUTING AT SCALE</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
              Bypassing traditional marketing funnels. Designing deterministic growth engines powered by high-velocity experimentation and data-driven systems.
            </p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '3rem', color: 'var(--accent-color)', fontFamily: 'var(--font-mono)' }}>$12M+</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>ARR GENERATED</p>
              </div>
              <div>
                <h3 style={{ fontSize: '3rem', color: 'var(--accent-color)', fontFamily: 'var(--font-mono)' }}>300%</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>YOY GROWTH</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FOOTER & CREDITS */}
      <section className="section" style={{ minHeight: '50vh', justifyContent: 'flex-end', paddingBottom: '4rem' }}>
        <div className="interactive" style={{ padding: '0 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>CONNECT</h2>
            <a href="https://www.linkedin.com/in/anand-singh-07a44143/" target="_blank" rel="noopener noreferrer" className="custom-link">
              LINKEDIN <ArrowRight size={16} />
            </a>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>ENGINEERED BY</p>
            <a href="https://www.linkedin.com/in/anshumansinghshekhawat/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>
              ANSHUMAN SINGH SHEKHAWAT
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
