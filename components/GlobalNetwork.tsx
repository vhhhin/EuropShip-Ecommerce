import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Globe } from 'lucide-react';

// CSS for premium animations
const styles = `
  @keyframes dotPulse {
    0%, 100% { 
      transform: scale(1);
      box-shadow: 0 0 8px rgba(255,140,0,0.8), 0 0 16px rgba(255,120,0,0.6), 0 0 24px rgba(255,100,0,0.4);
    }
    50% { 
      transform: scale(1.15);
      box-shadow: 0 0 12px rgba(255,140,0,1), 0 0 24px rgba(255,120,0,0.8), 0 0 36px rgba(255,100,0,0.6);
    }
  }

  @keyframes starTwinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.8; }
  }

  @keyframes floatParticles {
    0% { transform: translateY(0px) translateX(0px); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
  }

  .global-starfield {
    position: fixed;
    inset: 0;
    z-index: -10;
    background: radial-gradient(circle at center, #0b0615 0%, #05010a 60%, #000000 100%);
    overflow: hidden;
    pointer-events: none;
  }

  .starfield-stars {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .star-particle {
    position: absolute;
    background: white;
    border-radius: 50%;
    animation: starTwinkle var(--duration, 3s) ease-in-out infinite;
  }

  .float-particle {
    position: absolute;
    background: rgba(255, 140, 0, 0.1);
    border-radius: 50%;
    animation: floatParticles linear var(--float-duration, 20s) infinite;
    pointer-events: none;
  }

  .data-center-dot {
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ff8c00;
    box-shadow: 0 0 8px rgba(255,140,0,0.8), 0 0 16px rgba(255,120,0,0.6), 0 0 24px rgba(255,100,0,0.4);
    animation: dotPulse 2s ease-in-out infinite;
    pointer-events: none;
  }

  .globe-container-enhanced {
    position: relative;
    filter: drop-shadow(0 0 40px rgba(255, 120, 0, 0.3));
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

interface Point {
  x: number;
  y: number;
  z: number;
  alpha: number;
}

interface Star {
  x: number;
  y: number;
  opacity: number;
  size: number;
  twinkleDuration: number;
  twinkling: number;
}

interface DataCenter {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  x: number;
  y: number;
  z: number;
}

// Full-page starfield background component
const StarfieldBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Generate random stars
    const starCount = 200;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star-particle';
      star.style.width = Math.random() * 2 + 0.5 + 'px';
      star.style.height = star.style.width;
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.setProperty('--duration', Math.random() * 3 + 2 + 's');
      star.style.animationDelay = Math.random() * 2 + 's';
      container.appendChild(star);
    }

    // Generate floating particles for depth
    const particleCount = 25;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'float-particle';
      particle.style.width = Math.random() * 60 + 40 + 'px';
      particle.style.height = particle.style.width;
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = '-100px';
      particle.style.setProperty('--float-duration', Math.random() * 15 + 20 + 's');
      particle.style.animationDelay = Math.random() * 5 + 's';
      container.appendChild(particle);
    }

    return () => {
      // Cleanup created elements
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return <div ref={containerRef} className="global-starfield" />;
};

interface Point {
  x: number;
  y: number;
  z: number;
  alpha: number;
}

interface Star {
  x: number;
  y: number;
  opacity: number;
  size: number;
  twinkleDuration: number;
  twinkling: number;
}

interface DataCenter {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  x: number;
  y: number;
  z: number;
}

const GlobalNetwork: React.FC = () => {
  const [selectedDataCenter, setSelectedDataCenter] = useState<string | null>(null);
  const [hoveredDataCenter, setHoveredDataCenter] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const projectedDCsRef = useRef<any[]>([]);

  // Interaction & Physics
  const rotationX = useMotionValue(0.45); 
  const rotationY = useMotionValue(0);
  
  const springX = useSpring(rotationX, { stiffness: 40, damping: 30 });
  const springY = useSpring(rotationY, { stiffness: 40, damping: 30 });
  
  const isDragging = useRef(false);
  const lastPointerPos = useRef({ x: 0, y: 0 });
  const idleRotationSpeed = useRef(0.0007); 
  const dragVelocity = useRef(0);

  const checkIsLand = (theta: number, phi: number) => {
    const lat = theta;
    const lon = phi;
    if (lat > 0.55 && lat < 1.25 && lon > 0.0 && lon < 0.9) return true; // Africa
    if (lat > 1.25 && lat < 1.45 && lon > 0.0 && lon < 0.8) return true; // Europe
    if (lat > 0.95 && lat < 1.45 && lon > 4.6 && lon < 5.8) return true; // N. America
    if (lat > 0.4 && lat < 1.05 && lon > 4.5 && lon < 5.2) return true; // S. America
    if (lat > 0.9 && lat < 1.5 && lon > 0.8 && lon < 3.2) return true; // Eurasia
    if (lat > 0.4 && lat < 0.7 && lon > 2.0 && lon < 2.7) return true; // Australia
    if (lat < 0.2) return true; // Antarctica
    return false;
  };

  // Convert lat/lon to 3D sphere coordinates
  const latLonTo3D = (lat: number, lon: number, radius: number = 280) => {
    const theta = (90 - lat) * (Math.PI / 180);
    const phi = (180 + lon) * (Math.PI / 180);
    return {
      x: radius * Math.sin(theta) * Math.cos(phi),
      y: radius * Math.sin(theta) * Math.sin(phi),
      z: radius * Math.cos(theta)
    };
  };

  // Eastern Europe data centers
  const dataCenters = useMemo<DataCenter[]>(() => {
    const centers = [
      { id: 'pl', name: 'Warsaw', country: 'Poland', lat: 52.1, lon: 21.0 },
      { id: 'cz', name: 'Prague', country: 'Czech Republic', lat: 50.1, lon: 14.4 },
      { id: 'sk', name: 'Bratislava', country: 'Slovakia', lat: 48.1, lon: 17.1 },
      { id: 'at', name: 'Vienna', country: 'Austria', lat: 48.2, lon: 16.4 },
      { id: 'hu', name: 'Budapest', country: 'Hungary', lat: 47.5, lon: 19.0 },
      { id: 'ro', name: 'Bucharest', country: 'Romania', lat: 44.4, lon: 26.0 },
      { id: 'bg', name: 'Sofia', country: 'Bulgaria', lat: 42.7, lon: 23.3 },
      { id: 'gr', name: 'Athens', country: 'Greece', lat: 37.9, lon: 23.7 },
      { id: 'hr', name: 'Zagreb', country: 'Croatia', lat: 45.8, lon: 16.0 },
      { id: 'it', name: 'Rome', country: 'Italy', lat: 41.9, lon: 12.5 },
      { id: 'es', name: 'Madrid', country: 'Spain', lat: 40.4, lon: -3.7 },
      { id: 'pt', name: 'Lisbon', country: 'Portugal', lat: 38.7, lon: -9.1 }
    ];
    return centers.map(center => ({
      ...center,
      ...latLonTo3D(center.lat, center.lon)
    }));
  }, []);

  const dots = useMemo(() => {
    const points: Point[] = [];
    const count = 4000;
    const radius = 280;
    for (let i = 0; i < count; i++) {
      const theta = Math.acos(-1 + (2 * i) / count);
      const phi = Math.sqrt(count * Math.PI) * theta;
      const normalizedPhi = phi % (Math.PI * 2);
      if (checkIsLand(theta, normalizedPhi)) {
        points.push({
          x: radius * Math.sin(theta) * Math.cos(phi),
          y: radius * Math.sin(theta) * Math.sin(phi),
          z: radius * Math.cos(theta),
          alpha: 1.0 
        });
      }
    }
    return points;
  }, []);

  const stars = useMemo(() => {
    const starList: Star[] = [];
    const starCount = 150;
    for (let i = 0; i < starCount; i++) {
      starList.push({
        x: Math.random() * 1000,
        y: Math.random() * 1000,
        opacity: Math.random() * 0.6 + 0.3,
        size: Math.random() * 1.5 + 0.5,
        twinkleDuration: Math.random() * 3 + 2,
        twinkling: Math.random() * Math.PI * 2
      });
    }
    return starList;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    let animationId: number;
    const render = () => {
      if (!isDragging.current) {
        dragVelocity.current *= 0.985;
        rotationY.set(rotationY.get() + idleRotationSpeed.current + dragVelocity.current);
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const angleY = springY.get();
      const angleX = springX.get();
      const projected = dots.map(dot => {
        let x = dot.x * Math.cos(angleY) - dot.y * Math.sin(angleY);
        let y = dot.x * Math.sin(angleY) + dot.y * Math.cos(angleY);
        let z = dot.z;
        let yFinal = y * Math.cos(angleX) - z * Math.sin(angleX);
        let zFinal = y * Math.sin(angleX) + z * Math.cos(angleX);
        return { x, y: yFinal, z: zFinal, alpha: dot.alpha };
      });
      projected.sort((a, b) => b.z - a.z);
      projected.forEach(p => {
        if (p.z < -120) return; 
        const distFromCenter = Math.sqrt(p.x * p.x + p.y * p.y);
        const radius = 280;
        const edgeFade = Math.pow(Math.max(0, 1 - distFromCenter / (radius + 1)), 0.6);
        const depthOpacity = (p.z + 280) / 560;
        const finalAlpha = p.alpha * depthOpacity * edgeFade;
        if (finalAlpha < 0.15) return;
        const dotSize = Math.max(3.0, (p.z + 300) / 110);
        ctx.beginPath();
        ctx.arc(centerX + p.x, centerY + p.y, dotSize, 0, Math.PI * 2);
        // Transparent globe - reduced opacity
        const lum = Math.floor(230 + 50 * finalAlpha);
        ctx.fillStyle = `rgba(${lum}, ${lum}, ${lum}, ${Math.min(0.6, finalAlpha * 0.8)})`;
        ctx.fill();
      });

      // Render Eastern Europe data centers (orange points)
      const projectedDCs = dataCenters.map(dc => {
        let x = dc.x * Math.cos(angleY) - dc.y * Math.sin(angleY);
        let y = dc.x * Math.sin(angleY) + dc.y * Math.cos(angleY);
        let z = dc.z;
        let yFinal = y * Math.cos(angleX) - z * Math.sin(angleX);
        let zFinal = y * Math.sin(angleX) + z * Math.cos(angleX);
        return { ...dc, projX: x, projY: yFinal, projZ: zFinal };
      });

      projectedDCs.forEach(dc => {
        if (dc.projZ < -120) return;
        const distFromCenter = Math.sqrt(dc.projX * dc.projX + dc.projY * dc.projY);
        const radius = 280;
        const edgeFade = Math.pow(Math.max(0, 1 - distFromCenter / (radius + 1)), 0.6);
        const depthOpacity = (dc.projZ + 280) / 560;
        const finalAlpha = depthOpacity * edgeFade;
        if (finalAlpha < 0.15) return;
        
        const dotSize = 6.5;
        const glowSize = 10;
        
        // Multi-layer glow effect
        // Outer glow layer
        ctx.beginPath();
        ctx.arc(centerX + dc.projX, centerY + dc.projY, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 100, 0, ${finalAlpha * 0.25})`;
        ctx.fill();
        
        // Mid glow layer
        ctx.beginPath();
        ctx.arc(centerX + dc.projX, centerY + dc.projY, glowSize * 0.65, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 120, 0, ${finalAlpha * 0.45})`;
        ctx.fill();
        
        // Inner glow layer
        ctx.beginPath();
        ctx.arc(centerX + dc.projX, centerY + dc.projY, glowSize * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 140, 0, ${finalAlpha * 0.65})`;
        ctx.fill();
        
        // Main dot - bright core
        ctx.beginPath();
        ctx.arc(centerX + dc.projX, centerY + dc.projY, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 160, 0, ${Math.min(0.95, finalAlpha * 1.0)})`;
        ctx.fill();
        
        // Specular highlight on dot
        ctx.beginPath();
        ctx.arc(centerX + dc.projX - 1.5, centerY + dc.projY - 1.5, dotSize * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 200, 100, ${finalAlpha * 0.8})`;
        ctx.fill();
      });

      // Store projected data centers for click/hover detection
      projectedDCsRef.current = projectedDCs;
      animationId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animationId);
  }, [dots, dataCenters]);

  // Starfield animation effect
  useEffect(() => {
    const canvas = starsCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    let animationId: number;
    let timeElapsed = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeElapsed += 0.016; // ~60 FPS

      stars.forEach(star => {
        // Twinkling animation
        const twinkle = Math.sin(timeElapsed / star.twinkleDuration + star.twinkling) * 0.5 + 0.5;
        const finalOpacity = star.opacity * (0.4 + twinkle * 0.6);

        ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Optional: add a slight glow
        ctx.strokeStyle = `rgba(255, 255, 255, ${finalOpacity * 0.5})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [stars]);

  // Mobile fix: auto-hide selected data center message after 3 seconds or on scroll
  useEffect(() => {
    if (!selectedDataCenter) return;

    // Check if mobile device
    const isMobile = window.innerWidth <= 768;
    if (!isMobile) return;

    // Auto-hide after 3 seconds on mobile
    const autoHideTimeout = window.setTimeout(() => {
      setSelectedDataCenter(null);
    }, 3000);

    // Hide on scroll
    const handleScroll = () => {
      setSelectedDataCenter(null);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.clearTimeout(autoHideTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selectedDataCenter]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastPointerPos.current = { x: e.clientX, y: e.clientY };
    containerRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = (e.clientX - lastPointerPos.current.x) * 0.005;
    const dy = (e.clientY - lastPointerPos.current.y) * 0.005;
    rotationY.set(rotationY.get() - dx);
    rotationX.set(Math.max(-0.6, Math.min(1.2, rotationX.get() + dy)));
    lastPointerPos.current = { x: e.clientX, y: e.clientY };
    dragVelocity.current = -dx * 0.5;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging.current) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const projectedDCs = projectedDCsRef.current;
    if (!projectedDCs) return;
    
    for (const dc of projectedDCs) {
      if (dc.projZ < -120) continue;
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const screenX = centerX + dc.projX;
      const screenY = centerY + dc.projY;
      
      const finalClickX = clickX * scaleX;
      const finalClickY = clickY * scaleY;
      
      const dist = Math.sqrt((finalClickX - screenX) ** 2 + (finalClickY - screenY) ** 2);
      
      if (dist < 20) {
        setSelectedDataCenter(dc.id);
        setTooltipPos({ x: e.clientX, y: e.clientY });
        return;
      }
    }
    
    setSelectedDataCenter(null);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || isDragging.current) {
      setHoveredDataCenter(null);
      return;
    }
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const projectedDCs = projectedDCsRef.current;
    if (!projectedDCs) return;
    
    let found = false;
    
    for (const dc of projectedDCs) {
      if (dc.projZ < -120) continue;
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const screenX = centerX + dc.projX;
      const screenY = centerY + dc.projY;
      
      const clickX = mouseX * scaleX;
      const clickY = mouseY * scaleY;
      
      const dist = Math.sqrt((clickX - screenX) ** 2 + (clickY - screenY) ** 2);
      
      if (dist < 20) {
        setHoveredDataCenter(dc.id);
        setTooltipPos({ x: e.clientX, y: e.clientY });
        found = true;
        break;
      }
    }
    
    if (!found) {
      setHoveredDataCenter(null);
    }
  };

  const handleCanvasMouseLeave = () => {
    setHoveredDataCenter(null);
  };

  return (
    <>
      <StarfieldBackground />
      <section className="py-24 md:py-40 relative flex flex-col items-center">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-current/5 border border-current/10 rounded-full text-[10px] font-bold opacity-60 uppercase tracking-[0.2em] mb-12"
        >
          <div className="w-4 h-4 rounded-full bg-orange-600 flex items-center justify-center shadow-[0_0_12px_#ff8a00]">
            <Globe size={10} className="text-black" />
          </div>
          Global Sovereign Cloud
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-black mb-8 leading-[1.05] tracking-tighter"
        >
          Our European Network <br />
          <span className="opacity-40">EuropShip's strategic presence spans key European nations.</span>
        </motion.h2>

        <div 
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="relative w-full max-w-[880px] aspect-square flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none my-6"
        >
          {/* Starfield background */}
          <canvas ref={starsCanvasRef} width={1000} height={1000} className="absolute w-full h-full z-0 rounded-full" />

          {/* Outer atmospheric glow - Premium diffused effect */}
          <div className="absolute w-[85%] h-[85%] rounded-full bg-gradient-radial from-orange-600/45 via-orange-500/25 to-transparent blur-[100px] z-0" style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(255,140,0,0.5) 0%, rgba(255,120,0,0.35) 40%, rgba(255,90,0,0.15) 60%, transparent 75%)'
          }} />
          
          {/* Secondary outer glow for depth */}
          <div className="absolute w-[90%] h-[90%] rounded-full bg-gradient-to-b from-orange-600/20 via-transparent to-transparent blur-[120px] z-0 opacity-60" />

          {/* Inner glow ring with enhanced orange halo */}
          <div className="absolute w-[68%] h-[68%] rounded-full border-[3px] border-orange-500/70 shadow-[0_0_50px_rgba(255,140,0,0.8),0_0_80px_rgba(255,120,0,0.5),_inset_0_0_80px_rgba(255,140,0,0.3)] z-1" />
          
          {/* Specular highlight - top light */}
          <div className="absolute w-[60%] h-[60%] rounded-full top-[-5%] left-[5%] bg-gradient-to-br from-white/20 via-transparent to-transparent blur-[40px] z-15 pointer-events-none" />
          
          {/* Dark background sphere */}
          <div className="absolute w-[64%] h-[64%] rounded-full bg-[#120A18] shadow-[inset_0_0_120px_rgba(0,0,0,0.98)] -z-5" />
          
          {/* Canvas with globe points */}
          <canvas 
            ref={canvasRef} 
            width={1000} 
            height={1000} 
            className="w-full h-full relative z-10" 
            style={{ cursor: hoveredDataCenter ? 'pointer' : 'grab' }}
            onClick={handleCanvasClick}
            onMouseMove={handleCanvasMouseMove}
            onMouseLeave={handleCanvasMouseLeave}
          />
          
          {/* Top gradient overlay (light fade) */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/[0.08] via-transparent to-transparent rounded-full z-20" />
          
          {/* Bottom gradient overlay (dark fade) */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/70 rounded-full z-20" />
          
          {/* Ambient brightness particles - subtle reflection effect */}
          <div className="absolute w-[70%] h-[70%] rounded-full mix-blend-screen opacity-30 z-5" style={{
            backgroundImage: `
              radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%),
              radial-gradient(circle at 70% 70%, rgba(255,150,100,0.2) 0%, transparent 50%)
            `,
            filter: 'blur(50px)'
          }} />
        </div>

        {/* Legend - Network Map Key */}
        <div className="mt-16 flex flex-col items-center">
          <p className="text-xs font-bold uppercase tracking-[0.15em] opacity-70 mb-4">Network Legend</p>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex gap-8 px-8 py-6 bg-gradient-to-r from-white/8 to-white/5 dark:from-black/20 dark:to-black/10 border border-orange-500/40 rounded-2xl backdrop-blur-xl shadow-2xl"
          >
            {/* Active Locations */}
            <div className="flex items-center gap-3">
              <div className="relative w-5 h-5 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(255,140,0,0.9),0_0_16px_rgba(255,120,0,0.6)]" />
              </div>
              <span className="text-sm font-semibold text-current">Operational Network</span>
            </div>

            {/* Divider */}
            <div className="w-px bg-gradient-to-b from-transparent via-orange-500/40 to-transparent" />

            {/* Planned Locations */}
            <div className="flex items-center gap-3">
              <div className="relative w-5 h-5 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-gray-400 dark:bg-gray-600 shadow-[0_0_6px_rgba(200,200,200,0.6)]" />
              </div>
              <span className="text-sm font-semibold text-current">Global Coverage</span>
            </div>
          </motion.div>
        </div>

        {/* Eastern Europe Network Info */}
        {(hoveredDataCenter || selectedDataCenter) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bg-gradient-to-br from-white/96 to-white/92 dark:from-slate-900/96 dark:to-slate-900/92 backdrop-blur-xl px-5 py-4 rounded-xl shadow-2xl border border-orange-500/30 z-50 pointer-events-none"
            style={{
              left: `${tooltipPos.x + 12}px`,
              top: `${tooltipPos.y + 12}px`,
              transform: 'translate(0, 0)'
            }}
          >
            {dataCenters.find(dc => dc.id === (selectedDataCenter || hoveredDataCenter)) && (
              <div className="flex items-center gap-3 min-w-max">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(255,140,0,0.9)]" />
                <div>
                  <p className="text-xs font-bold text-orange-600">
                    📍 {dataCenters.find(dc => dc.id === (selectedDataCenter || hoveredDataCenter))?.country}
                  </p>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-tight font-medium">
                    {dataCenters.find(dc => dc.id === (selectedDataCenter || hoveredDataCenter))?.name}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
    </>
  );
};

export default GlobalNetwork;