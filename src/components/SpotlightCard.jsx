import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const SpotlightCard = ({ children, className = '' }) => {
    const cardRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    }, []);

    return (
        <motion.div
            ref={cardRef}
            className={`spotlight-card ${className}`}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
        >
            {children}
        </motion.div>
    );
};

export default SpotlightCard;
