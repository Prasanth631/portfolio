import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── Loading / Intro Screen ────────────────────────
   Shows a 2.5-second branded animation before the
   portfolio content appears. Stores a flag in
   sessionStorage so it only shows once per browser session.
────────────────────────────────────────────────────── */

const LETTERS = ['P', 'G']; // Initials

const LoadingScreen = ({ onComplete }) => {
    const [phase, setPhase] = useState('enter'); // enter → expand → exit

    useEffect(() => {
        // Phase 1: letters come in (0 → 0.8s)
        // Phase 2: hold + expand ring (0.8 → 1.8s)
        // Phase 3: exit wipe (1.8 → 2.5s)
        const t1 = setTimeout(() => setPhase('expand'), 900);
        const t2 = setTimeout(() => setPhase('exit'), 1800);
        const t3 = setTimeout(() => onComplete(), 2600);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, [onComplete]);

    return (
        <AnimatePresence>
            {phase !== 'done' && (
                <motion.div
                    className="loader-overlay"
                    initial={{ opacity: 1 }}
                    animate={phase === 'exit' ? { opacity: 0, scale: 1.04 } : { opacity: 1 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Background grid */}
                    <div className="loader-grid" />

                    {/* Expanding ring */}
                    <motion.div
                        className="loader-ring"
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={
                            phase === 'expand'
                                ? { scale: 3.5, opacity: 0 }
                                : phase === 'enter'
                                    ? { scale: 1, opacity: 0.5 }
                                    : { scale: 5, opacity: 0 }
                        }
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                    />

                    {/* Initials */}
                    <div className="loader-brand">
                        {LETTERS.map((letter, i) => (
                            <motion.span
                                key={i}
                                className="loader-letter"
                                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{
                                    delay: 0.1 + i * 0.15,
                                    duration: 0.6,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </div>

                    {/* Tagline */}
                    <motion.p
                        className="loader-tagline"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.6 }}
                    >
                        Building scalable applications
                    </motion.p>

                    {/* Progress bar */}
                    <motion.div
                        className="loader-bar-track"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.div
                            className="loader-bar-fill"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 0.3, duration: 1.8, ease: 'easeInOut' }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
