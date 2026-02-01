import { useState } from 'react';
import { motion } from 'framer-motion';
import Flashlight from './Flashlight';
import SpotlightCard from './SpotlightCard';
import { portfolioData } from '../data/portfolioData';

const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const stagger = {
    animate: { transition: { staggerChildren: 0.1 } }
};

console.log("Portfolio Version: Luminous Dark - Build " + new Date().toISOString());

const Nav = () => (
    <nav className="nav">
        <div className="container nav-inner">
            <motion.a
                href="#"
                className="body-sm link-hover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                {portfolioData.shortName}
            </motion.a>
            <motion.div
                className="flex gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <a href="#about" className="body-sm link-hover dim-text">About</a>
                <a href="#work" className="body-sm link-hover dim-text">Work</a>
                <a href="#skills" className="body-sm link-hover dim-text">Skills</a>
                <a href="#contact" className="body-sm link-hover dim-text">Contact</a>
            </motion.div>
        </div>
    </nav>
);

const Hero = () => (
    <section className="section pt-32 md:pt-0">
        <div className="container">
            <motion.div variants={stagger} initial="initial" animate="animate">
                <motion.p className="body-sm mb-4 md:mb-8" variants={fadeIn}>
                    {portfolioData.title}
                </motion.p>
                <motion.h1 className="display-xl mb-4 md:mb-8" variants={fadeIn}>
                    {portfolioData.name}
                </motion.h1>
                <motion.p className="body-lg max-w-2xl dim-text mb-4" variants={fadeIn}>
                    {portfolioData.objective}
                </motion.p>
                <motion.div className="flex flex-col md:flex-row flex-wrap gap-3 md:gap-4 mt-8 md:mt-12" variants={fadeIn}>
                    <a
                        href={portfolioData.resumeUrl}
                        download="Prasanth_Golla_Resume.pdf"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium tracking-wide hover:bg-white/90 transition-colors"
                    >
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                        </svg>
                        Download Resume
                    </a>
                    <a href="#work" className="body-sm link-hover px-6 py-3 border border-white/20 hover:border-white/40 transition-colors text-center">
                        View Work →
                    </a>
                    <a href={portfolioData.github} target="_blank" className="body-sm link-hover dim-text px-6 py-3 text-center">
                        GitHub
                    </a>
                </motion.div>
            </motion.div>
        </div>
    </section>
);

const About = () => (
    <section id="about" className="py-24">
        <div className="container">
            <div className="grid md:grid-cols-2 gap-16">
                <div>
                    <p className="body-sm mb-8">About</p>
                    <h2 className="display-md mb-8 text-white">
                        Full-Stack Developer focused on building scalable applications
                    </h2>
                </div>
                <div>
                    <p className="body-lg dim-text mb-8">{portfolioData.objective}</p>

                    {/* Education */}
                    <div className="mt-12 space-y-6">
                        <p className="body-sm">Education</p>
                        {portfolioData.education.map((edu, idx) => (
                            <SpotlightCard key={idx} className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-white font-medium">{edu.institution}</h4>
                                    <span className="body-sm">{edu.grade}</span>
                                </div>
                                <p className="dim-text text-sm">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                                <p className="body-sm mt-2">{edu.period}</p>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const Projects = () => (
    <section id="work" className="py-24">
        <div className="container">
            <p className="body-sm mb-4">Selected Work</p>
            <h2 className="display-md text-white mb-12">Projects & Hackathons</h2>

            {/* Hackathon Feature */}
            <SpotlightCard className="mb-8 p-8">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                    <div>
                        <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-medium rounded mb-4">
                            🏆 {portfolioData.hackathons[0].description}
                        </span>
                        <h3 className="display-md text-white">{portfolioData.hackathons[0].project}</h3>
                        <p className="body-sm mt-2">{portfolioData.hackathons[0].name} • {portfolioData.hackathons[0].date}</p>
                    </div>
                    <a
                        href={portfolioData.hackathons[0].github}
                        target="_blank"
                        className="body-sm link-hover dim-text"
                    >
                        View Code →
                    </a>
                </div>
                <ul className="space-y-3 mb-6">
                    {portfolioData.hackathons[0].highlights.map((h, i) => (
                        <li key={i} className="dim-text text-sm flex gap-3">
                            <span className="text-white/40">→</span>
                            {h}
                        </li>
                    ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                    {portfolioData.hackathons[0].tech.map((t, i) => (
                        <span key={i} className="body-sm px-2 py-1 bg-white/5 rounded">{t}</span>
                    ))}
                </div>
            </SpotlightCard>

            {/* Regular Projects */}
            <div className="project-grid">
                {portfolioData.projects.map((project, idx) => (
                    <SpotlightCard key={idx}>
                        <div className="flex justify-between items-start mb-4">
                            <span className="body-sm text-white/40">{String(idx + 1).padStart(2, '0')}</span>
                            <a
                                href={project.github}
                                target="_blank"
                                className="body-sm link-hover dim-text"
                            >
                                GitHub →
                            </a>
                        </div>
                        <h3 className="display-md text-white mb-4">{project.name}</h3>
                        <ul className="space-y-2 mb-6">
                            {project.highlights.map((h, i) => (
                                <li key={i} className="dim-text text-sm flex gap-2">
                                    <span className="text-white/40 shrink-0">•</span>
                                    <span>{h}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tech.map((t, i) => (
                                <span key={i} className="body-sm">{t}</span>
                            ))}
                        </div>
                    </SpotlightCard>
                ))}
            </div>
        </div>
    </section>
);

const Skills = () => (
    <section id="skills" className="py-24">
        <div className="container">
            <p className="body-sm mb-4">Expertise</p>
            <h2 className="display-md text-white mb-12">Technical Skills</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(portfolioData.skills).map(([category, items]) => (
                    <SpotlightCard key={category}>
                        <p className="body-sm mb-6 text-white">{category}</p>
                        <ul className="space-y-2">
                            {items.map((skill, i) => (
                                <li key={i} className="dim-text text-sm flex items-center gap-2">
                                    <span className="w-1 h-1 bg-white/40 rounded-full"></span>
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </SpotlightCard>
                ))}
            </div>
        </div>
    </section>
);

const Certifications = () => (
    <section className="py-24">
        <div className="container">
            <p className="body-sm mb-4">Credentials</p>
            <h2 className="display-md text-white mb-12">Certifications</h2>

            <div className="grid md:grid-cols-2 gap-6">
                {portfolioData.certifications.map((cert, idx) => (
                    <SpotlightCard key={idx}>
                        <div className="flex items-start gap-4">
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold shrink-0"
                                style={{
                                    background: cert.issuer.includes('AWS')
                                        ? 'linear-gradient(135deg, #ff9900, #ffb84d)'
                                        : 'linear-gradient(135deg, #ee0000, #ff4444)',
                                    color: 'white'
                                }}
                            >
                                {cert.issuer.includes('AWS') ? 'AWS' : 'RH'}
                            </div>
                            <div className="flex-1">
                                <h4 className="text-white font-medium mb-1">{cert.name}</h4>
                                <p className="body-sm">{cert.issuer} • {cert.year}</p>
                            </div>
                            <a
                                href={cert.link}
                                target="_blank"
                                className="body-sm link-hover dim-text shrink-0"
                            >
                                Verify →
                            </a>
                        </div>
                    </SpotlightCard>
                ))}
            </div>
        </div>
    </section>
);

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: 'YOUR_WEB3FORMS_ACCESS_KEY', // Replace with your key
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
        <section id="contact" className="py-24">
            <div className="container">
                <div className="grid md:grid-cols-2 gap-16">
                    <div>
                        <p className="body-sm mb-4">Get in Touch</p>
                        <h2 className="display-lg text-white mb-8">Let's work together</h2>
                        <p className="body-lg dim-text mb-12">
                            Currently open to new opportunities. Feel free to reach out for collaborations or just a friendly chat.
                        </p>

                        <div className="space-y-6">
                            <div>
                                <p className="body-sm mb-2">Email</p>
                                <a href={`mailto:${portfolioData.email}`} className="text-white link-hover">
                                    {portfolioData.email}
                                </a>
                            </div>
                            <div>
                                <p className="body-sm mb-2">Phone</p>
                                <a href={`tel:${portfolioData.phone}`} className="text-white link-hover">
                                    {portfolioData.phone}
                                </a>
                            </div>
                            <div>
                                <p className="body-sm mb-2">Location</p>
                                <p className="text-white">{portfolioData.location}</p>
                            </div>
                        </div>

                        <div className="flex gap-6 mt-12">
                            <a href={portfolioData.github} target="_blank" className="body-sm link-hover dim-text">GitHub</a>
                            <a href={portfolioData.linkedin} target="_blank" className="body-sm link-hover dim-text">LinkedIn</a>
                            <a href={`mailto:${portfolioData.email}`} className="body-sm link-hover dim-text">Email</a>
                        </div>
                    </div>

                    <div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="body-sm block mb-2">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-white/30 focus:outline-none transition-colors"
                                    placeholder="Your name"
                                    disabled={status === 'sending'}
                                />
                            </div>
                            <div>
                                <label className="body-sm block mb-2">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-white/30 focus:outline-none transition-colors"
                                    placeholder="your@email.com"
                                    disabled={status === 'sending'}
                                />
                            </div>
                            <div>
                                <label className="body-sm block mb-2">Message</label>
                                <textarea
                                    rows="5"
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:border-white/30 focus:outline-none transition-colors resize-none"
                                    placeholder="Your message..."
                                    disabled={status === 'sending'}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full bg-white text-black py-4 font-medium tracking-wide hover:bg-white/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                <p className="text-center text-sm text-green-400 flex items-center justify-center gap-2">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                        <path d="M22 4L12 14.01l-3-3" />
                                    </svg>
                                    Message sent successfully!
                                </p>
                            )}
                            {status === 'error' && (
                                <p className="text-center text-sm text-red-400">
                                    Failed to send. Please try again or email directly.
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="py-8 border-t border-white/5">
        <div className="container">
            <div className="flex flex-wrap justify-between items-center gap-4">
                <p className="body-sm dim-text">
                    © 2026 {portfolioData.name}
                </p>
                <div className="flex gap-6">
                    <a href={portfolioData.github} target="_blank" className="body-sm link-hover dim-text">GitHub</a>
                    <a href={portfolioData.linkedin} target="_blank" className="body-sm link-hover dim-text">LinkedIn</a>
                </div>
            </div>
        </div>
    </footer>
);

const LuminousDark = () => (
    <div className="min-h-screen relative">
        <div className="noise-overlay" />
        <Flashlight />
        <Nav />
        <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Certifications />
            <Contact />
        </main>
        <Footer />
    </div>
);

export default LuminousDark;
