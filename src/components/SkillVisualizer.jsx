import React from 'react';
import { motion } from 'framer-motion';

const SkillVisualizer = ({ skill, index }) => {
    // Fallback for simple string skills
    if (typeof skill === 'string') {
        return (
            <motion.span
                className="skill-pill"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ scale: 1.08 }}
            >
                {skill}
            </motion.span>
        );
    }

    // Circular Ring Visualization for structured skills
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (skill.level / 100) * circumference;

    return (
        <motion.div 
            className="skill-ring-card"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.05 }}
        >
            <div className="skill-ring-svg-container">
                <svg width="44" height="44" viewBox="0 0 44 44">
                    <circle 
                        className="skill-ring-bg" 
                        cx="22" cy="22" r={radius} 
                        strokeWidth="3" fill="none" 
                    />
                    <motion.circle 
                        className="skill-ring-fill" 
                        cx="22" cy="22" r={radius} 
                        strokeWidth="3" fill="none" 
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: circumference }}
                        whileInView={{ strokeDashoffset }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 + (index * 0.1) }}
                        style={{ strokeDasharray: circumference }}
                    />
                </svg>
                <div className="skill-ring-value">{skill.level}</div>
            </div>
            <span className="skill-ring-name">{skill.name}</span>
        </motion.div>
    );
};

export default SkillVisualizer;
