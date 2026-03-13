import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// ─── Cursor Trail Particle ───────────────────────────────
const TRAIL_LENGTH = 16;

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [trail, setTrail] = useState(
        () => Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 }))
    );

    // Dot (instant)
    const dotX = useMotionValue(-100);
    const dotY = useMotionValue(-100);

    // Ring (trailing with tight spring)
    const ringX = useSpring(dotX, { damping: 40, stiffness: 500, mass: 0.2 });
    const ringY = useSpring(dotY, { damping: 40, stiffness: 500, mass: 0.2 });

    // Store cursor position in a ref for the trail RAF loop
    const posRef = useRef({ x: -200, y: -200 });
    const trailRef = useRef(Array.from({ length: TRAIL_LENGTH }, () => ({ x: -200, y: -200 })));
    const rafRef = useRef(null);

    useEffect(() => {
        const checkVisibility = () => {
            setIsVisible(typeof window !== 'undefined' && window.innerWidth >= 768);
        };
        checkVisibility();
        window.addEventListener('resize', checkVisibility);
        return () => window.removeEventListener('resize', checkVisibility);
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const handleMouseMove = (e) => {
            posRef.current = { x: e.clientX, y: e.clientY };
            dotX.set(e.clientX);
            dotY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('spotlight-card') ||
                target.closest('.spotlight-card') ||
                target.classList.contains('tilt-card') ||
                target.closest('.tilt-card')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        // RAF loop to update trail positions smoothly
        const lerp = (a, b, t) => a + (b - a) * t;
        const tick = () => {
            trailRef.current = trailRef.current.map((pt, i) => {
                const target = i === 0 ? posRef.current : trailRef.current[i - 1];
                return {
                    x: lerp(pt.x, target.x, 0.35),
                    y: lerp(pt.y, target.y, 0.35),
                };
            });
            setTrail([...trailRef.current]);
            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isVisible, dotX, dotY]);

    if (!isVisible) return null;

    return (
        <>
            {/* Cursor Trail particles */}
            {trail.map((pt, i) => {
                const scale = 1 - i / TRAIL_LENGTH;
                const opacity = (1 - i / TRAIL_LENGTH) * 0.35;
                const size = 6 + (1 - i / TRAIL_LENGTH) * 4;
                return (
                    <div
                        key={i}
                        className="cursor-trail-dot"
                        style={{
                            left: pt.x,
                            top: pt.y,
                            width: size,
                            height: size,
                            opacity,
                            transform: `translate(-50%, -50%) scale(${scale})`,
                        }}
                    />
                );
            })}

            {/* Dot - instant follow */}
            <motion.div
                className="cursor-dot"
                style={{ left: dotX, top: dotY }}
                animate={{
                    scale: isHovering ? 0 : 1,
                    opacity: isHovering ? 0 : 1
                }}
                transition={{ duration: 0.15 }}
            />
            {/* Ring - trailing follow */}
            <motion.div
                className="cursor-ring"
                style={{ left: ringX, top: ringY }}
                animate={{
                    scale: isHovering ? 2 : 1,
                    borderColor: isHovering
                        ? 'rgba(255, 255, 255, 0.5)'
                        : 'rgba(255, 255, 255, 0.25)'
                }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Glow - large ambient light */}
            <motion.div
                className="cursor-glow"
                style={{ left: ringX, top: ringY }}
            />
        </>
    );
};

export default CustomCursor;
