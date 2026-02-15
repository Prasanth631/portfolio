import { motion } from 'framer-motion';

const TextReveal = ({ children, className = '', delay = 0 }) => {
    const words = typeof children === 'string' ? children.split(' ') : [children];

    return (
        <motion.span
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    className="inline-block mr-[0.3em]"
                    variants={{
                        hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
                        visible: {
                            opacity: 1,
                            y: 0,
                            filter: 'blur(0px)',
                            transition: {
                                duration: 0.5,
                                delay: delay + i * 0.04,
                                ease: [0.22, 1, 0.36, 1]
                            }
                        }
                    }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
};

export default TextReveal;
