/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, ChevronRight, Menu, X, Sun, Moon } from 'lucide-react';

const FadeIn = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96, y: 30 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay }}
    viewport={{ once: true, margin: "-100px" }}
    className={className}
  >
    {children}
  </motion.div>
);

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      setIsDark(true);
    }
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggle}
      className="relative w-10 h-10 flex items-center justify-center rounded-full border border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
            <Sun size={16} className="text-[var(--color-accent)]" />
          </motion.div>
        ) : (
          <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.25 }}>
            <Moon size={16} className="text-[var(--color-accent)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute w-full z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center transition-all min-h-[80px]">
      <div className="font-bold tracking-[0.15em] text-sm text-[var(--color-accent)] uppercase w-[200px]">Sitzknochen</div>
      
      {/* Desktop Nav */}
      <div className="hidden md:flex flex-1 justify-center items-center space-x-12 text-[11px] font-semibold tracking-[0.15em] uppercase text-[var(--color-muted)]">
        <a href="#models" className="hover:text-[var(--color-accent)] transition-colors">Performance</a>
        <a href="#technology" className="hover:text-[var(--color-accent)] transition-colors">Science</a>
        <a href="#engineering" className="hover:text-[var(--color-accent)] transition-colors">Lab</a>
        <a href="#" className="hover:text-[var(--color-accent)] transition-colors">Archive</a>
      </div>
      
      <div className="hidden md:flex w-[200px] justify-end items-center gap-4">
        <ThemeToggle />
        <button className="px-6 py-3 border border-[var(--color-accent)] bg-transparent text-[var(--color-accent)] font-bold uppercase tracking-[0.1em] text-[10px] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-colors rounded-[6px]">
          Find your fit
        </button>
      </div>

      {/* Mobile Nav Toggle */}
      <button className="md:hidden text-[var(--color-accent)]" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[var(--color-bg)] border-b border-[var(--color-border)] p-6 flex flex-col space-y-6 md:hidden">
          <a href="#models" onClick={() => setIsOpen(false)} className="text-[var(--color-accent)] text-lg font-medium">Performance</a>
          <a href="#technology" onClick={() => setIsOpen(false)} className="text-[var(--color-accent)] text-lg font-medium">Science</a>
          <a href="#engineering" onClick={() => setIsOpen(false)} className="text-[var(--color-accent)] text-lg font-medium">Lab</a>
          <div className="flex items-center justify-between">
            <span className="text-[var(--color-muted)] text-xs uppercase tracking-widest">Theme</span>
            <ThemeToggle />
          </div>
          <button className="px-6 py-3 border border-[var(--color-accent)] bg-transparent text-[var(--color-accent)] font-bold uppercase tracking-[0.1em] text-xs text-center">
            Find your fit
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => (
  <section className="relative w-full h-[100dvh] min-h-[700px] flex flex-col justify-center bg-[var(--color-bg)] border-b border-[var(--color-border)] overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <img 
        src="https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=2800&q=80" 
        alt="Cyclist deeply engaged in a ride" 
        className="w-full h-full object-cover object-[center_30%] opacity-40 mix-blend-luminosity grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] via-[var(--color-bg)]/80 to-transparent"></div>
    </div>
    
    <FadeIn className="relative z-10 flex flex-col items-start w-full px-6 md:px-12 max-w-7xl mx-auto pt-20">
      <h1 className="font-display text-5xl sm:text-[64px] md:text-[80px] lg:text-[100px] xl:text-[120px] font-bold tracking-tighter text-[var(--color-accent)] mb-6 uppercase leading-[1.05] sm:leading-[0.9] max-w-full sm:max-w-[900px] break-words">
        Engineered For<br className="hidden sm:block"/>Your Sit Bones.
      </h1>
      <p className="text-[18px] md:text-[22px] text-[var(--color-muted)] mb-12 max-w-[500px] leading-[1.6]">
        German-made bicycle saddles designed for scientific comfort and long-distance endurance.
      </p>
      <a href="#models" className="inline-flex items-center px-8 py-4 border border-[var(--color-accent)] bg-transparent text-[var(--color-accent)] uppercase text-[12px] font-bold tracking-[0.15em] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-colors group rounded-[6px]">
        Explore Saddles <ArrowRight size={14} className="ml-3 group-hover:translate-x-1 transition-transform" />
      </a>
    </FadeIn>

    <div className="absolute bottom-12 left-6 md:left-12 z-10">
      <p className="text-[10px] md:text-xs text-[var(--color-muted)] uppercase tracking-[0.15em] font-semibold">EST. 2026 / STUTTGART</p>
    </div>
  </section>
);

const SaddleCard = ({ name, desc, type, delay, id, price, image }: { name: string, desc: string, type: string, delay: number, id: string, price: string, image: string }) => (
  <motion.a 
    href="#" 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="group flex flex-col justify-between p-[30px] border-b xl:border-b-0 border-r-0 xl:border-r border-[var(--color-border)] last:border-r-0 hover:bg-[var(--color-surface)] transition-colors duration-300 min-h-[300px]"
  >
    <div>
      <div className="text-[10px] text-[var(--color-muted)] font-semibold uppercase tracking-[0.1em]">{id}</div>
      <h3 className="font-display text-[18px] font-[500] text-[var(--color-accent)] mt-1 opacity-90">{name}</h3>
      <p className="text-[12px] text-[var(--color-muted)] mt-2">{desc}</p>
    </div>
    
    <div className="w-full aspect-[4/3] bg-[var(--color-surface)] rounded-[6px] my-6 relative flex items-center justify-center overflow-hidden border border-[var(--color-border)]">
      <img src={image} alt={name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
    </div>

    <div className="text-[13px] text-[var(--color-accent)] mt-auto flex justify-between items-center opacity-80 pt-2 border-t border-transparent">
      <span>{price}</span>
      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
    </div>
  </motion.a>
);

const Models = () => (
  <section id="models" className="border-t border-[var(--color-border)] bg-[var(--color-bg)] w-full">
    <div className="grid grid-cols-1 xl:grid-cols-3">
      <SaddleCard id="S-01" name="Endurance Pro" desc="Optimized for 100km+ rides." type="Performance" price="€249.00" delay={0} image="https://plus.unsplash.com/premium_photo-1677838847763-0810bff8f40e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <SaddleCard id="S-02" name="Carbon Aero" desc="Minimalist aggressive stance." type="All-Terrain" price="€320.00" delay={0.1} image="https://plus.unsplash.com/premium_photo-1677838847763-0810bff8f40e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <SaddleCard id="S-03" name="Urban Mesh" desc="Breathable daily commute." type="City" price="€189.00" delay={0.2} image="https://plus.unsplash.com/premium_photo-1677838847763-0810bff8f40e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
    </div>
  </section>
);

const Interactive3D = () => (
  <section className="bg-[radial-gradient(circle_at_50%_50%,var(--color-surface)_0%,var(--color-bg)_100%)] relative flex flex-col items-center justify-center min-h-[600px] w-full py-16 px-6 lg:px-12 gap-8 border-b border-[var(--color-border)]">
    {/* Top Right Label */}
    <div className="w-full max-w-7xl flex justify-end">
      <div className="text-right z-10 w-full sm:w-auto">
        <div className="text-[10px] uppercase text-[var(--color-muted)] tracking-[0.1em]">Pressure Peak Reduction</div>
        <div className="text-[24px] font-[300] text-[var(--color-accent)]">-42.8%</div>
      </div>
    </div>

    {/* Center 3D Box */}
    <div className="w-full max-w-7xl relative rounded-[6px] border border-[var(--color-border)] bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,60,0,0.2)_0%,transparent_40%),radial-gradient(ellipse_at_50%_60%,rgba(0,150,255,0.1)_0%,transparent_60%)] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden aspect-square sm:aspect-video lg:aspect-[21/9]">
        
      {/* Decorative sit-bone indicators */}
      <div className="absolute top-[40%] left-[42%] w-8 h-8 sm:w-16 sm:h-16 border border-[var(--color-accent)] rounded-full opacity-30 mix-blend-overlay -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute top-[40%] right-[42%] w-8 h-8 sm:w-16 sm:h-16 border border-[var(--color-accent)] rounded-full opacity-30 mix-blend-overlay -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="absolute inset-0 z-20 pointer-events-auto flex items-center justify-center">
        <iframe 
          title="Bike Seat Concept" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; fullscreen; xr-spatial-tracking" 
          className="w-full h-full object-cover scale-[1.3] lg:scale-[1.1] translate-y-4" 
          src="https://sketchfab.com/models/02371917cd6b43eca21edf51f0d99cfd/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_watermark=0&ui_controls=0&ui_stop=0&transparent=1"
        ></iframe>
      </div>
    </div>

    {/* Bottom Left Stats */}
    <div className="w-full max-w-7xl flex flex-wrap gap-8 lg:gap-12 z-10 pt-4">
      <div className="border-l border-[var(--color-accent)] pl-4">
        <span className="block text-[18px] lg:text-[22px] font-[700] text-[var(--color-accent)]">165g</span>
        <span className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider">Carbon Base</span>
      </div>
      <div className="border-l border-[var(--color-accent)] pl-4">
        <span className="block text-[18px] lg:text-[22px] font-[700] text-[var(--color-accent)]">3D Print</span>
        <span className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider">Lattice Mesh</span>
      </div>
      <div className="border-l border-[var(--color-accent)] pl-4">
        <span className="block text-[18px] lg:text-[22px] font-[700] text-[var(--color-accent)]">± 4.5mm</span>
        <span className="text-[10px] text-[var(--color-muted)] uppercase tracking-wider">Pelvic Tilt</span>
      </div>
    </div>
  </section>
);

const FeatureCheck = ({ text }: { text: string }) => (
  <li className="flex items-start text-[var(--color-muted)] font-medium text-base sm:text-lg leading-snug sm:leading-normal">
    <div className="mt-0.5 sm:mt-1 mr-4 flex-shrink-0">
      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--color-accent)]/80" />
    </div>
    <span>{text}</span>
  </li>
);

const AnatomySection = () => (
  <section id="technology" className="py-32 md:py-48 px-6 md:px-12 bg-[var(--color-bg)] text-[var(--color-accent)] border-t border-[var(--color-border)]">
    <FadeIn className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
      <div className="w-full lg:w-1/2 aspect-square relative rounded-[6px] overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center p-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.02)_0%,transparent_60%)] pointer-events-none z-0"></div>
        <div className="absolute inset-0 z-10 pointer-events-auto">
          <iframe 
            title="Bike Seat Anatomy Structure" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; fullscreen; xr-spatial-tracking" 
            className="w-full h-full object-cover scale-[1.15] md:scale-[1.3] grayscale contrast-[1.2] opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-grab active:cursor-grabbing" 
            src="https://sketchfab.com/models/02371917cd6b43eca21edf51f0d99cfd/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_watermark=0&ui_controls=0&ui_stop=0&transparent=1&autospin=-0.08"
          ></iframe>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.1]">
          Designed for<br/>Your Anatomy
        </h2>
        <p className="text-[var(--color-muted)] text-lg md:text-xl mb-12 leading-relaxed font-light">
          By focusing on targeted sit bone support and a centralized pressure relief channel, we proactively eliminate numbness and discomfort. 
          Scientifically proven through thousands of pressure mapping tests to keep you in the saddle longer.
        </p>
        <ul className="space-y-6">
          <FeatureCheck text="Central relief channel mitigates soft-tissue pressure" />
          <FeatureCheck text="Optimized sit bone contact zones" />
          <FeatureCheck text="Dynamic pelvic tilt support for aggressive riding" />
        </ul>
      </div>
    </FadeIn>
  </section>
);

const EngineeringSection = () => (
  <section id="engineering" className="py-32 md:py-48 px-6 md:px-12 bg-[var(--color-bg)] text-[var(--color-accent)] border-t border-[var(--color-border)]">
    <FadeIn className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
      <div className="w-full lg:w-1/2 aspect-square md:aspect-[4/3] lg:aspect-square relative rounded-[6px] overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] group p-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_60%)] pointer-events-none z-0"></div>
        
        {/* Interactive 3D Model */}
        <div className="absolute inset-0 z-10 pointer-events-auto">
          <iframe 
            title="Bike Seat Materials Detail" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; fullscreen; xr-spatial-tracking" 
            className="w-full h-full object-cover scale-[1.1] md:scale-[1.3] grayscale contrast-125 opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-grab active:cursor-grabbing" 
            src="https://sketchfab.com/models/02371917cd6b43eca21edf51f0d99cfd/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_watermark=0&ui_controls=0&ui_stop=0&transparent=1&autospin=0.1"
          ></iframe>
        </div>

        {/* Technical Overlay Markers */}
        <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-8 opacity-0 md:opacity-100 transition-opacity duration-500">
           <div className="flex justify-between items-start w-full">
              <div className="flex flex-col gap-1 items-start">
                <span className="bg-[var(--color-bg)]/80 backdrop-blur-md border border-[var(--color-border)] px-2 py-1 font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-widest">Base Material</span>
                <span className="bg-[var(--color-surface)]/80 backdrop-blur-md border border-[var(--color-border)] px-2 py-1 font-mono text-[11px] text-[var(--color-accent)] uppercase tracking-widest">Carbon Composite</span>
              </div>
              <svg className="w-8 h-8 text-[var(--color-accent)] opacity-40 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
           </div>
           
           <div className="flex justify-end items-end w-full">
              <div className="flex flex-col gap-1 items-end">
                <span className="bg-[var(--color-bg)]/80 backdrop-blur-md border border-[var(--color-border)] px-2 py-1 font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-widest">Surface Structure</span>
                <span className="bg-[var(--color-surface)]/80 backdrop-blur-md border border-[var(--color-border)] px-2 py-1 font-mono text-[11px] text-[var(--color-accent)] uppercase tracking-widest">3D Elastomer Matrix</span>
              </div>
           </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[var(--color-bg)] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-x-0 bottom-4 text-center z-20 pointer-events-none">
          <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)] font-semibold">Interactive Micro-Structure View</span>
        </div>
      </div>
      <div className="w-full lg:w-1/2">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-[1.1]">
          German engineering,<br/>materials & testing
        </h2>
        <p className="text-[var(--color-muted)] text-lg md:text-xl leading-relaxed font-light mb-10">
          Manufactured with uncompromising precision in Germany. We utilize an advanced 3D-printed elastomer matrix paired with a high-strength, lightweight carbon fiber base. Every individual layer is purpose-built for energy return, compliance, and long-term durability.
        </p>
        <button className="px-8 py-4 border border-[var(--color-accent)] bg-transparent text-[var(--color-accent)] font-semibold uppercase tracking-[0.1em] text-xs hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)] transition-all duration-300 rounded-[6px]">
          Read the whitepaper
        </button>
      </div>
    </FadeIn>
  </section>
);

const HeatmapAnimation = () => {
  return (
    <div className="relative w-full aspect-[4/3] md:aspect-video rounded-[6px] overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_0_50px_rgba(0,0,0,0.05)] flex items-center justify-center group/heatmap">

      {/* 3D Model Embed Background - Grayscaled & brightened so mix-blend-color can tint its mesh */}
      <div className="absolute inset-0 z-0 pointer-events-auto overflow-hidden">
        <iframe 
          title="Pressure Mapping 3D View" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; fullscreen; xr-spatial-tracking" 
          className="w-full h-full object-cover scale-[1.15] md:scale-[1.25] grayscale brightness-[1.8] contrast-[1.2] opacity-80" 
          src="https://sketchfab.com/models/02371917cd6b43eca21edf51f0d99cfd/embed?autostart=1&ui_theme=dark&ui_infos=0&ui_watermark=0&ui_controls=0&ui_stop=0&transparent=1&autospin=0.04"
        ></iframe>
      </div>

      {/* Background Pattern and vignettes */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none z-0" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--color-surface)] to-transparent z-0 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--color-surface)] to-transparent z-0 pointer-events-none" />

      {/* AR Pressure Data Overlays - Uses mix-blend-color or multiply over the brightened gray mesh to conform perfectly to the 3D shape contour */}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center mix-blend-multiply opacity-100 transition-opacity duration-1000 group-hover/heatmap:opacity-50">
        <div className="relative w-full h-full max-w-2xl max-h-[800px] flex items-center justify-center">
            
          {/* Left Sit Bone Heat */}
          <motion.div
            initial={{ 
              background: "radial-gradient(ellipse, rgba(239,68,68,1) 0%, rgba(249,115,22,0.8) 40%, rgba(0,0,0,0) 70%)",
              scale: 0.9, opacity: 1, rotate: -15
            }}
            whileInView={{ 
              background: "radial-gradient(ellipse, rgba(56,189,248,1) 0%, rgba(52,211,153,0.8) 40%, rgba(0,0,0,0) 70%)",
              scale: 1.15, opacity: 0.8, rotate: -15
            }}
            transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            className="absolute w-40 h-64 md:w-56 md:h-80 -translate-x-14 md:-translate-x-20 blur-[15px] rounded-full"
          />
          
          {/* Right Sit Bone Heat */}
          <motion.div
            initial={{ 
              background: "radial-gradient(ellipse, rgba(239,68,68,1) 0%, rgba(249,115,22,0.8) 40%, rgba(0,0,0,0) 70%)",
              scale: 0.9, opacity: 1, rotate: 15
            }}
            whileInView={{ 
              background: "radial-gradient(ellipse, rgba(56,189,248,1) 0%, rgba(52,211,153,0.8) 40%, rgba(0,0,0,0) 70%)",
              scale: 1.15, opacity: 0.8, rotate: 15
            }}
            transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 0.15 }}
            className="absolute w-40 h-64 md:w-56 md:h-80 translate-x-14 md:translate-x-20 blur-[15px] rounded-full"
          />

          {/* Center Relief Area */}
          <motion.div
            initial={{
               background: "radial-gradient(ellipse, rgba(250,204,21,1) 0%, rgba(0,0,0,0) 60%)", opacity: 0.8
            }}
            whileInView={{
               background: "radial-gradient(ellipse, rgba(16,185,129,1) 0%, rgba(0,0,0,0) 60%)", opacity: 0.5
            }}
            transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 0.3 }}
            className="absolute w-16 h-56 md:w-24 md:h-72 rounded-[100%] blur-[15px] translate-y-12"
          />
        </div>
      </div>
      
      {/* Overlay to re-add highlights that multiply might flatten */}
      <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center mix-blend-screen opacity-50">
        <div className="relative w-full h-full max-w-2xl max-h-[800px] flex items-center justify-center">
            {/* Same gradients but for glowing rim lighting */}
              <motion.div
                initial={{ background: "radial-gradient(ellipse, rgba(239,68,68,0.5) 0%, transparent 60%)", scale: 0.9, rotate: -15 }}
                whileInView={{ background: "radial-gradient(ellipse, rgba(56,189,248,0.5) 0%, transparent 60%)", scale: 1.15, rotate: -15 }}
                transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
                className="absolute w-40 h-64 md:w-56 md:h-80 -translate-x-14 md:-translate-x-20 blur-[20px] rounded-full"
              />
              <motion.div
                initial={{ background: "radial-gradient(ellipse, rgba(239,68,68,0.5) 0%, transparent 60%)", scale: 0.9, rotate: 15 }}
                whileInView={{ background: "radial-gradient(ellipse, rgba(56,189,248,0.5) 0%, transparent 60%)", scale: 1.15, rotate: 15 }}
                transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 0.15 }}
                className="absolute w-40 h-64 md:w-56 md:h-80 translate-x-14 md:translate-x-20 blur-[20px] rounded-full"
              />
              
              {/* High-tech scanner line */}
              <motion.div 
                className="absolute left-0 w-full border-t border-sky-400/50 shadow-[0_0_20px_rgba(56,189,248,0.5)] bg-gradient-to-b from-sky-400/10 to-transparent h-12"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 8, ease: "linear", repeat: Infinity }}
              />
        </div>
      </div>

      {/* Tech Markers */}
      <div className="absolute top-6 left-6 flex flex-col gap-1 z-20 pointer-events-none transition-opacity duration-1000 group-hover/heatmap:opacity-0">
        <span className="bg-[var(--color-bg)]/80 backdrop-blur-md border border-[var(--color-border)] px-3 py-1 font-mono text-[10px] text-sky-400 uppercase tracking-widest shadow-[0_0_20px_rgba(56,189,248,0.2)]">Live Pressure Map</span>
        <span className="bg-[var(--color-bg)]/80 backdrop-blur-md border border-[var(--color-border)] px-3 py-1 font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-widest">Sensor Array 8.2</span>
      </div>

      {/* Legend Overlay */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-4 bg-[var(--color-bg)]/80 backdrop-blur-md px-6 py-3 rounded-[6px] border border-[var(--color-border)] z-20 shadow-[0_0_30px_rgba(0,0,0,0.8)] pointer-events-none">
        <span className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-widest hidden md:inline">Peak Stress</span>
        <div className="w-24 md:w-32 h-1.5 rounded-[6px] bg-gradient-to-r from-red-500 via-yellow-500 to-sky-400" />
        <span className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-widest hidden md:inline">Optimal</span>
      </div>
    </div>
  );
};

const PressureSection = () => (
  <section className="py-32 md:py-48 px-6 md:px-12 bg-[var(--color-bg)] text-[var(--color-accent)] border-t border-[var(--color-border)]">
    <div className="max-w-5xl mx-auto text-center mb-16 md:mb-24">
      <FadeIn>
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8">Pressure mapping data</h2>
        <p className="text-lg md:text-xl text-[var(--color-muted)] max-w-2xl mx-auto font-light leading-relaxed">
          Watch as peak pressure dissipates. Our engineering drastically reduces vascular compression points compared to standard industry designs, transferring load safely to your skeletal structure.
        </p>
      </FadeIn>
    </div>
    
    <FadeIn className="max-w-5xl mx-auto relative z-10 w-full flex flex-col items-center">
      <HeatmapAnimation />
      <p className="mt-8 text-[var(--color-muted)] font-mono text-xs uppercase tracking-widest">
        * Simulated transition representing before and after using our saddle
      </p>
    </FadeIn>
  </section>
);

const ScenarioCard = ({ title, desc, img }: { title: string, desc: string, img: string }) => (
  <div className="group relative overflow-hidden rounded-[6px] border border-[var(--color-border)] aspect-[4/5] bg-[var(--color-surface)]">
    <img src={img} alt={title} className="w-full h-full object-cover opacity-40 grayscale group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/20 to-transparent opacity-90 pointer-events-none" />
    <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col items-start translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
      <h3 className="font-display text-[24px] font-bold text-[var(--color-accent)] mb-2">{title}</h3>
      <p className="text-[14px] text-[var(--color-muted)] font-light opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const ScenariosSection = () => (
  <section className="py-32 md:py-48 px-6 md:px-12 bg-[var(--color-bg)] border-t border-[var(--color-border)]">
    <div className="max-w-7xl mx-auto">
      <FadeIn className="mb-16 md:mb-24">
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--color-accent)] leading-[1.1]">
          Tested across<br />all disciplines.
        </h2>
      </FadeIn>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <FadeIn delay={0.1}>
          <ScenarioCard title="Road Racing" desc="Maximum power transfer and aggressive positioning without soft-tissue compromise." img="https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=800&q=80" />
        </FadeIn>
        <FadeIn delay={0.2}>
          <ScenarioCard title="Gravel & CX" desc="Vibration damping lattice structure absorbs rough terrain chatter seamlessly." img="https://images.unsplash.com/photo-1534787238916-9ba6764efd4f?auto=format&fit=crop&w=800&q=80" />
        </FadeIn>
        <FadeIn delay={0.3}>
          <ScenarioCard title="Urban Commute" desc="Breathable, zero-chafing comfort for daily riding in all conditions." img="https://images.unsplash.com/photo-1559163387-e46e8dcb27f0?auto=format&fit=crop&w=800&q=80" />
        </FadeIn>
      </div>
    </div>
  </section>
);

const SpecRow = ({ label, value }: { label: string, value: string }) => (
  <li className="flex justify-between items-center py-5 border-b border-[var(--color-border)] last:border-0">
    <span className="text-[12px] text-[var(--color-muted)] font-mono uppercase tracking-widest">{label}</span>
    <span className="text-[14px] text-[var(--color-accent)] font-medium text-right">{value}</span>
  </li>
);

const PurchaseSection = () => (
  <section id="shop" className="py-32 md:py-48 px-6 md:px-12 bg-[var(--color-bg)] border-t border-[var(--color-border)]">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
      <FadeIn>
        <div className="flex flex-col">
          <h3 className="text-[10px] text-[var(--color-muted)] font-semibold uppercase tracking-[0.2em] mb-6">Technical Specifications</h3>
          <h2 className="font-display text-5xl font-bold mb-12 text-[var(--color-accent)]">Endurance Pro <span className="text-[var(--color-muted)] font-light">3D</span></h2>
          <ul className="flex flex-col border-t border-[var(--color-border)]">
            <SpecRow label="Weight" value="165g (143mm) / 172g (155mm)" />
            <SpecRow label="Dimensions" value="250mm length" />
            <SpecRow label="Rails" value="Carbon 7x9mm Oval" />
            <SpecRow label="Shell" value="Carbon Reinforced Polymer" />
            <SpecRow label="Padding" value="3D Liquid Polymer Matrix" />
            <SpecRow label="Use Case" value="Endurance Road / Gravel" />
          </ul>
        </div>
      </FadeIn>
      
      <FadeIn delay={0.2} className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.05)_0%,transparent_60%)] pointer-events-none z-0 rounded-[6px]" />
        <div className="flex flex-col bg-[var(--color-surface)] p-8 md:p-12 rounded-[6px] border border-[var(--color-border)] shadow-2xl relative z-10 w-full max-w-xl mx-auto lg:ml-auto">
          <div className="flex justify-between items-end mb-8 pb-8 border-b border-[var(--color-border)]">
            <div>
              <div className="text-[12px] text-[var(--color-muted)] font-semibold uppercase tracking-[0.15em] mb-2">Price</div>
              <div className="text-[40px] font-bold text-[var(--color-accent)] leading-none tracking-tight">€249.00</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-[#22c55e] font-bold uppercase tracking-widest flex items-center justify-end gap-2">
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></span>
                In Stock
              </div>
            </div>
          </div>
          
          <div className="space-y-6 mb-10">
            <div className="flex flex-col gap-3">
              <label className="text-[10px] text-[var(--color-muted)] uppercase tracking-[0.1em]">Select Width</label>
              <div className="grid grid-cols-2 gap-4">
                <button className="py-4 border border-[var(--color-accent)] bg-[var(--color-accent)] text-[var(--color-bg)] font-bold text-sm rounded-[6px] transition-colors">
                  143 mm
                </button>
                <button className="py-4 border border-[var(--color-border)] bg-transparent text-[var(--color-muted)] hover:text-[var(--color-accent)] font-bold text-sm rounded-[6px] transition-colors">
                  155 mm
                </button>
              </div>
            </div>
          </div>
          
          <button className="w-full bg-[var(--color-accent)] text-[var(--color-bg)] font-bold uppercase tracking-[0.15em] text-[12px] py-5 rounded-[6px] hover:opacity-80 transition-all mb-8 shadow-[0_0_20px_var(--color-border)]">
            Add to Cart
          </button>
          
          <div className="text-center pt-6">
            <p className="text-[10px] text-[var(--color-muted)] mb-5 uppercase tracking-[0.2em] font-semibold">Also available at partner channels</p>
            <div className="flex justify-center items-center gap-6 opacity-40 font-display font-medium text-[14px] tracking-wider transition-opacity hover:opacity-80">
              <span className="hover:text-[var(--color-accent)] transition-colors cursor-pointer">SIGMA SPORT</span>
              <span className="text-[10px] text-[var(--color-muted)]">•</span>
              <span className="hover:text-[var(--color-accent)] transition-colors cursor-pointer">BIKE24</span>
              <span className="text-[10px] text-[var(--color-muted)]">•</span>
              <span className="hover:text-[var(--color-accent)] transition-colors cursor-pointer">CANYON</span>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] pt-20 pb-10 px-6 md:px-12">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
      <div className="md:col-span-1 border-b border-[var(--color-border)] md:border-none pb-8 md:pb-0">
        <div className="font-bold tracking-[0.2em] text-xl text-[var(--color-accent)] uppercase mb-6">Sitzknochen</div>
        <p className="text-[var(--color-muted)] text-sm mb-6 leading-relaxed pr-4">
          Engineered for your sit bones. German-made bicycle saddles for those who demand performance and long-term comfort.
        </p>
      </div>
      
      <div className="col-span-1">
        <h4 className="text-[var(--color-accent)] font-medium mb-6">Products</h4>
        <ul className="space-y-4 text-sm text-[var(--color-muted)]">
          <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Endurance Pro</a></li>
          <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Gravel X</a></li>
          <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Urban Core</a></li>
          <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Accessories</a></li>
        </ul>
      </div>
      
      <div className="col-span-1">
        <h4 className="text-[var(--color-accent)] font-medium mb-6">Support</h4>
        <ul className="space-y-4 text-sm text-[var(--color-muted)]">
          <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Fit Guide</a></li>
          <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Shipping & Returns</a></li>
          <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Warranty</a></li>
          <li><a href="#" className="hover:text-[var(--color-accent)] transition-colors">Contact Us</a></li>
        </ul>
      </div>
      
      <div className="col-span-1">
        <h4 className="text-[var(--color-accent)] font-medium mb-6">Stay Informed</h4>
        <p className="text-[var(--color-muted)] text-sm mb-4">Subscribe to our newsletter for product releases and technical breakdowns.</p>
        <div className="flex">
          <input type="email" placeholder="Your email" className="bg-transparent border-b border-[var(--color-border)] pb-2 text-[var(--color-accent)] text-sm focus:outline-none focus:border-[var(--color-accent)] w-full transition-colors" />
          <button className="text-[var(--color-accent)] ml-4 font-medium text-sm hover:text-[var(--color-muted)]">Join</button>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center text-xs text-[var(--color-muted)]">
      <p>&copy; 2026 Sitzknochen Saddles GmbH.</p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <a href="#" className="hover:text-[var(--color-accent)]">Privacy Policy</a>
        <a href="#" className="hover:text-[var(--color-accent)]">Terms of Service</a>
        <a href="#" className="hover:text-[var(--color-accent)]">Imprint</a>
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-accent)] font-sans selection:bg-[var(--color-accent)] selection:text-[var(--color-bg)] flex flex-col w-full overflow-x-hidden">
      <Navbar />
      <main className="w-full flex flex-col">
        <Hero />
        
        {/* Main Content Area */}
        <div className="flex flex-col w-full min-w-0 bg-[var(--color-bg)]">
          <Interactive3D />
          <Models />
          <AnatomySection />
          <EngineeringSection />
          <PressureSection />
          <ScenariosSection />
          <PurchaseSection />
          <Footer />
        </div>
      </main>
    </div>
  );
}