import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const AnimatedCounter = ({ target, suffix = '', prefix = '', duration = 2, className = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });
    const hasAnimated = useRef(false);

    useEffect(() => {
        if (!isInView || hasAnimated.current) return;
        hasAnimated.current = true;

        const isDecimal = String(target).includes('.');
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            // Easing: ease out cubic
            const progress = 1 - Math.pow(1 - step / steps, 3);
            current = target * progress;

            if (step >= steps) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(isDecimal ? parseFloat(current.toFixed(2)) : Math.floor(current));
            }
        }, (duration * 1000) / steps);

        return () => clearInterval(timer);
    }, [isInView, target, duration]);

    return (
        <motion.span
            ref={ref}
            className={className}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
            {prefix}{count}{suffix}
        </motion.span>
    );
};

export default AnimatedCounter;
