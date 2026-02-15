import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Dot (instant)
    const dotX = useMotionValue(-100);
    const dotY = useMotionValue(-100);

    // Ring (trailing with tight spring)
    const ringX = useSpring(dotX, { damping: 40, stiffness: 500, mass: 0.2 });
    const ringY = useSpring(dotY, { damping: 40, stiffness: 500, mass: 0.2 });

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

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [isVisible, dotX, dotY]);

    if (!isVisible) return null;

    return (
        <>
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
