import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import Flashlight from './Flashlight';
import Marquee from './Marquee';
import LoadingScreen from './LoadingScreen';
import SpotlightCard from './SpotlightCard';
import TiltCard from './TiltCard';
import MagneticButton from './MagneticButton';
import TextReveal from './TextReveal';
import AnimatedCounter from './AnimatedCounter';
import HeroCodeWindow from './HeroCodeWindow';
import { portfolioData } from '../data/portfolioData';

// ─── Animation Variants ────────────────────────
const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const stagger = {
    animate: { transition: { staggerChildren: 0.12 } }
};

const slideUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
};

// ─── Typing Effect Hook ────────────────────────
const useTypingEffect = (words, speed = 100, pause = 2000) => {
    const [displayText, setDisplayText] = useState('');
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = words[wordIndex];
        let timeout;

        if (!isDeleting && displayText === currentWord) {
            timeout = setTimeout(() => setIsDeleting(true), pause);
        } else if (isDeleting && displayText === '') {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
        } else {
            timeout = setTimeout(() => {
                setDisplayText(
                    isDeleting
                        ? currentWord.substring(0, displayText.length - 1)
                        : currentWord.substring(0, displayText.length + 1)
                );
            }, isDeleting ? speed / 2 : speed);
        }

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, wordIndex, words, speed, pause]);

    return displayText;
};

// ─── Floating Gradient Orbs ─────────────────────
const GradientOrbs = () => (
    <div className="gradient-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
    </div>
);

// ─── Scroll Progress Bar ────────────────────────
const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    return (
        <motion.div
            className="scroll-progress"
            style={{ scaleX: scrollYProgress }}
        />
    );
};

// ─── Theme Toggle ───────────────────────────────
const ThemeToggle = () => {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme === 'dark' ? (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ) : (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            )}
        </button>
    );
};

// ─── Navigation ─────────────────────────────────
const Nav = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { label: 'About', href: '#about' },
        { label: 'Work', href: '#work' },
        { label: 'Skills', href: '#skills' },
        { label: 'Contact', href: '#contact' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            const sections = ['contact', 'skills', 'work', 'about'];
            for (const id of sections) {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 200) {
                        setActiveSection(id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`nav ${isScrolled ? 'nav-scrolled' : ''}`}>
            <ScrollProgress />
            <div className="container nav-inner">
                <motion.a
                    href="#"
                    className="nav-logo"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    {portfolioData.shortName}
                </motion.a>

                {/* Desktop Nav */}
                <motion.div
                    className="nav-links"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={`nav-link ${activeSection === link.href.slice(1) ? 'nav-link-active' : ''}`}
                        >
                            {link.label}
                            {activeSection === link.href.slice(1) && (
                                <motion.span
                                    className="nav-indicator"
                                    layoutId="nav-indicator"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                />
                            )}
                        </a>
                    ))}
                </motion.div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <ThemeToggle />
                    {/* Mobile Hamburger */}
                    <button
                        className="hamburger"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                        style={{ marginLeft: '1rem' }}
                    >
                        <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
                        <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
                        <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.href}
                                href={link.href}
                                className="mobile-menu-link"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

// ─── Resume Modal ───────────────────────────────
const ResumeModal = ({ isOpen, onClose }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                className="resume-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="resume-modal"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Modal Header */}
                    <div className="resume-modal-header">
                        <h3 className="resume-modal-title">Resume</h3>
                        <div className="resume-modal-actions">
                            <a
                                href={portfolioData.resumeUrl}
                                download="Prasanth_Golla_Resume.pdf"
                                className="btn btn-sm btn-outline"
                            >
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                                </svg>
                                Download
                            </a>
                            <a
                                href={portfolioData.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-outline"
                            >
                                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                </svg>
                                Open
                            </a>
                            <button className="resume-close-btn" onClick={onClose}>
                                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* PDF Embed */}
                    <div className="resume-modal-body">
                        <iframe
                            src={portfolioData.resumeUrl}
                            title="Resume"
                            className="resume-iframe"
                        />
                    </div>
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

// ─── Hero Section ───────────────────────────────
const Hero = () => {
    const [showResume, setShowResume] = useState(false);

    return (
        <section className="section hero-section">
            <GradientOrbs />
            <div className="container hero-container">
                <div className="hero-grid">
                    <motion.div variants={stagger} initial="initial" animate="animate">
                        <motion.div className="hero-badge" variants={fadeIn}>
                            <span className="hero-badge-dot" />
                            Open to opportunities
                        </motion.div>

                        <motion.h1 className="hero-name" variants={fadeIn}>
                            {portfolioData.name}
                        </motion.h1>

                        <motion.p className="hero-description" variants={fadeIn}>
                            {portfolioData.objective}
                        </motion.p>

                        {/* Stats Bar */}
                        <motion.div className="hero-stats" variants={fadeIn}>
                            {portfolioData.stats.map((stat, i) => (
                                <div key={i} className="hero-stat">
                                    <AnimatedCounter
                                        target={stat.value}
                                        suffix={stat.suffix}
                                        className="hero-stat-value"
                                        duration={1.5}
                                    />
                                    <span className="hero-stat-label">{stat.label}</span>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div className="hero-actions" variants={fadeIn}>
                            <button
                                onClick={() => setShowResume(true)}
                                className="btn btn-primary"
                            >
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />
                                </svg>
                                View Resume
                            </button>
                            <a href="#work" className="btn btn-outline">
                                View Work
                                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </motion.div>

                        <ResumeModal isOpen={showResume} onClose={() => setShowResume(false)} />
                    </motion.div>

                    {/* Right side: Code Window */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                        <HeroCodeWindow />
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="scroll-indicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <motion.div
                    className="scroll-indicator-line"
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span>Scroll</span>
            </motion.div>
        </section>
    );
};

// ─── About Section ──────────────────────────────
const About = () => (
    <section id="about" className="py-32">
        <div className="container">
            <motion.div {...slideUp} className="section-header">
                <span className="section-label">About</span>
                <h2 className="section-title">
                    <TextReveal>Full-Stack Developer focused on building scalable applications</TextReveal>
                </h2>
            </motion.div>

            <div className="about-grid">
                <motion.div {...slideUp} className="about-text">
                    <p className="body-lg dim-text">{portfolioData.objective}</p>
                </motion.div>

                {/* Education Timeline */}
                <motion.div {...slideUp} className="about-education">
                    <span className="section-label">Education</span>
                    <div className="timeline">
                        {portfolioData.education.map((edu, idx) => (
                            <motion.div
                                key={idx}
                                className="timeline-item"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                            >
                                <div className="timeline-dot" />
                                <SpotlightCard className="timeline-card">
                                    <div className="timeline-card-header">
                                        <h4>{edu.institution}</h4>
                                        <span className="timeline-grade">{edu.grade}</span>
                                    </div>
                                    <p className="dim-text text-sm">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                                    <p className="body-sm mt-2">{edu.period}</p>
                                </SpotlightCard>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
);

// ─── Projects Section ───────────────────────────
const Projects = () => (
    <section id="work" className="py-32">
        <div className="container">
            <motion.div {...slideUp} className="section-header">
                <span className="section-label">Selected Work</span>
                <h2 className="section-title">
                    <TextReveal>Projects & Hackathons</TextReveal>
                </h2>
            </motion.div>

            {/* Hackathon Feature */}
            <motion.div {...slideUp}>
                <TiltCard className="featured-project">
                    <div className="featured-project-header">
                        <div>
                            <span className="featured-badge">
                                <span className="featured-badge-pulse" />
                                {portfolioData.hackathons[0].description}
                            </span>
                            <h3 className="featured-project-title">{portfolioData.hackathons[0].project}</h3>
                            <p className="body-sm mt-2">{portfolioData.hackathons[0].name} &bull; {portfolioData.hackathons[0].date}</p>
                        </div>
                        <MagneticButton
                            as="a"
                            href={portfolioData.hackathons[0].github}
                            target="_blank"
                            className="btn btn-ghost"
                        >
                            Source Code
                            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                            </svg>
                        </MagneticButton>
                    </div>
                    <ul className="featured-highlights">
                        {portfolioData.hackathons[0].highlights.map((h, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <span className="highlight-arrow">→</span>
                                {h}
                            </motion.li>
                        ))}
                    </ul>
                    <div className="tech-stack">
                        {portfolioData.hackathons[0].tech.map((t, i) => (
                            <motion.span
                                key={i}
                                className="tech-pill"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                            >
                                {t}
                            </motion.span>
                        ))}
                    </div>
                </TiltCard>
            </motion.div>

            {/* Regular Projects */}
            <div className="project-grid mt-8">
                {portfolioData.projects.map((project, idx) => (
                    <TiltCard key={idx} className="project-card">
                        <div className="project-card-top">
                            <span className="project-number">{String(idx + 1).padStart(2, '0')}</span>
                            <MagneticButton
                                as="a"
                                href={project.github}
                                target="_blank"
                                className="btn btn-ghost btn-sm"
                            >
                                GitHub
                                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                </svg>
                            </MagneticButton>
                        </div>
                        <h3 className="project-card-title">{project.name}</h3>
                        <ul className="project-highlights">
                            {project.highlights.map((h, i) => (
                                <li key={i}>
                                    <span className="highlight-dot" />
                                    <span>{h}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="tech-stack mt-auto">
                            {project.tech.map((t, i) => (
                                <span key={i} className="tech-pill tech-pill-sm">{t}</span>
                            ))}
                        </div>
                    </TiltCard>
                ))}
            </div>
        </div>
    </section>
);

// ─── Skills Section ─────────────────────────────
const Skills = () => (
    <section id="skills" className="py-32">
        <div className="container">
            <motion.div {...slideUp} className="section-header">
                <span className="section-label">Expertise</span>
                <h2 className="section-title">
                    <TextReveal>Technical Skills</TextReveal>
                </h2>
            </motion.div>

            <div className="skills-bento">
                {Object.entries(portfolioData.skills).map(([category, items], catIdx) => (
                    <SpotlightCard
                        key={category}
                        className={`skills-card ${catIdx === 0 ? 'skills-card-lg' : ''}`}
                    >
                        <p className="skills-category">{category}</p>
                        <div className="skills-pills">
                            {items.map((skill, i) => (
                                <motion.span
                                    key={i}
                                    className="skill-pill"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                    whileHover={{ scale: 1.08 }}
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </SpotlightCard>
                ))}
            </div>
        </div>
    </section>
);

// ─── Certifications Section ─────────────────────
const Certifications = () => (
    <section className="py-32">
        <div className="container">
            <motion.div {...slideUp} className="section-header">
                <span className="section-label">Credentials</span>
                <h2 className="section-title">
                    <TextReveal>Certifications</TextReveal>
                </h2>
            </motion.div>

            <div className="cert-grid">
                {portfolioData.certifications.map((cert, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15 }}
                    >
                        <SpotlightCard className="cert-card">
                            <div className="cert-card-inner">
                                <div
                                    className="cert-icon"
                                    style={{
                                        background: cert.issuer.includes('AWS')
                                            ? 'linear-gradient(135deg, #ff9900, #ffb84d)'
                                            : 'linear-gradient(135deg, #ee0000, #ff4444)'
                                    }}
                                >
                                    {cert.issuer.includes('AWS') ? 'AWS' : 'RH'}
                                </div>
                                <div className="cert-info">
                                    <h4>{cert.name}</h4>
                                    <p>{cert.issuer} &bull; {cert.year}</p>
                                    <p className="cert-credential">ID: {cert.credentialId.slice(0, 8)}...</p>
                                </div>
                                <MagneticButton
                                    as="a"
                                    href={cert.link}
                                    target="_blank"
                                    className="btn btn-ghost btn-sm"
                                >
                                    Verify
                                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <path d="M22 4L12 14.01l-3-3" />
                                    </svg>
                                </MagneticButton>
                            </div>
                            <div className="cert-shimmer" />
                        </SpotlightCard>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

// ─── Contact Section ────────────────────────────
const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle');
    const [focused, setFocused] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: 'YOUR_WEB3FORMS_ACCESS_KEY',
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    subject: `Portfolio Contact from ${formData.name}`,
                    from_name: 'Portfolio Contact Form',
                    to: portfolioData.email
                })
            });

            const result = await response.json();
            if (result.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };



    return (
        <section id="contact" className="py-32">
            <div className="container">
                <motion.div {...slideUp} className="section-header section-header-center">
                    <span className="section-label">Get in Touch</span>
                    <h2 className="section-title">
                        <TextReveal>Let's work together</TextReveal>
                    </h2>
                    <p className="section-subtitle">
                        Currently open to new opportunities. Feel free to reach out for collaborations or just a friendly chat.
                    </p>
                </motion.div>

                <div className="contact-grid">
                    {/* Contact Info */}
                    <motion.div {...slideUp} className="contact-info">
                        <div className="contact-cards">
                            {[
                                { label: 'Email', value: portfolioData.email, href: `mailto:${portfolioData.email}`, icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6' },
                                { label: 'Phone', value: portfolioData.phone, href: `tel:${portfolioData.phone}`, icon: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z' },
                                { label: 'Location', value: portfolioData.location, href: null, icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z' }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    className="contact-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className="contact-card-icon">
                                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                            <path d={item.icon} />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="body-sm">{item.label}</p>
                                        {item.href ? (
                                            <a href={item.href} className="text-white link-hover">{item.value}</a>
                                        ) : (
                                            <p className="text-white">{item.value}</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="social-links">
                            {portfolioData.socialLinks.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.url}
                                    target={link.icon !== 'mail' ? '_blank' : undefined}
                                    className="social-btn"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div {...slideUp}>
                        <div className="contact-form-card spotlight-card"
                            style={{ padding: '2rem', position: 'relative' }}>
                            <form onSubmit={handleSubmit}>
                                <div className="floating-field">
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className="floating-input"
                                        placeholder=" "
                                        disabled={status === 'sending'}
                                    />
                                    <label className="floating-label">Your Name</label>
                                </div>
                                <div className="floating-field">
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        className="floating-input"
                                        placeholder=" "
                                        disabled={status === 'sending'}
                                    />
                                    <label className="floating-label">Email Address</label>
                                </div>
                                <div className="floating-field">
                                    <textarea
                                        rows="4"
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="floating-input floating-textarea"
                                        placeholder=" "
                                        disabled={status === 'sending'}
                                    />
                                    <label className="floating-label">Your Message</label>
                                </div>
                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="btn btn-primary btn-full"
                                >
                                    {status === 'sending' ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                            </svg>
                                            Send Message
                                        </>
                                    )}
                                </button>

                                {status === 'success' && (
                                    <motion.p
                                        className="form-status form-status-success"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        Message sent successfully!
                                    </motion.p>
                                )}
                                {status === 'error' && (
                                    <motion.p
                                        className="form-status form-status-error"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        Failed to send. Please try again or email directly.
                                    </motion.p>
                                )}
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// ─── Footer ─────────────────────────────────────
const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-inner">
                    <p className="footer-copyright">
                        &copy; {new Date().getFullYear()} {portfolioData.name}
                    </p>
                    <div className="footer-links">
                        {portfolioData.socialLinks.map((link, i) => (
                            <a key={i} href={link.url} target={link.icon !== 'mail' ? '_blank' : undefined} className="footer-link">
                                {link.name}
                            </a>
                        ))}
                    </div>
                    <button className="btn-back-top" onClick={scrollToTop}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M18 15l-6-6-6 6" />
                        </svg>
                        Top
                    </button>
                </div>
            </div>
        </footer>
    );
};

// ─── Main Component ─────────────────────────────
const LuminousDark = () => {
    const [isLoading, setIsLoading] = useState(() => {
        // Only show loader once per session
        return !sessionStorage.getItem('intro-seen');
    });

    const handleLoadComplete = () => {
        sessionStorage.setItem('intro-seen', '1');
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen relative">
            {isLoading && <LoadingScreen onComplete={handleLoadComplete} />}
            <div className="noise-overlay" />
            <Flashlight />
            <Nav />
            <main>
                <Hero />
                <Marquee />
                <About />
                <Projects />
                <Skills />
                <Certifications />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default LuminousDark;
