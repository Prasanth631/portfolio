import { useState } from 'react';

// ─── Tech Stack Marquee with real logos ─────────────────
// SVGs from devicons / simpleicons CDN — no emoji!

const TECH_ITEMS = [
    { label: 'React',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { label: 'Spring Boot',  logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
    { label: 'Java',         logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { label: 'TypeScript',   logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { label: 'PostgreSQL',   logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
    { label: 'MySQL',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { label: 'MongoDB',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { label: 'Docker',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { label: 'Jenkins',      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg' },
    { label: 'AWS',          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
    { label: 'Git',          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { label: 'Maven',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg' },
    { label: 'C',            logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
    { label: 'Linux',        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    { label: 'GitHub',       logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
];

// Triple for seamless loop (translateX(-33.333%))
const ITEMS = [...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS];

const Marquee = () => {
    const [paused, setPaused] = useState(false);

    return (
        <section className="marquee-section" aria-label="Tech stack ticker">
            <div
                className="marquee-viewport"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                <div className={`marquee-track ${paused ? 'marquee-paused' : ''}`}>
                    {ITEMS.map((item, i) => (
                        <span key={i} className="marquee-item">
                            <img
                                src={item.logo}
                                alt={item.label}
                                className="marquee-logo"
                                loading="lazy"
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                            <span className="marquee-label">{item.label}</span>
                            <span className="marquee-sep">·</span>
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Marquee;
