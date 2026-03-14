import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const HeroCodeWindow = () => {
    const [history, setHistory] = useState([
        { type: 'output', text: 'Welcome to Prasanth OS v1.0.0' },
        { type: 'output', text: 'Type "help" to see available commands.' }
    ]);
    const [input, setInput] = useState('');
    const containerRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom of terminal when history changes
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            const newHistory = [...history, { type: 'input', text: input }];
            
            if (cmd === '') {
                // Do nothing but add to history
            } else if (cmd === 'help') {
                newHistory.push({ type: 'output', text: 'Commands: about, skills, experience, contact, clear' });
            } else if (cmd === 'about') {
                newHistory.push({ type: 'output', text: `${portfolioData.name} — ${portfolioData.objective}` });
            } else if (cmd === 'skills') {
                newHistory.push({ type: 'output', text: `[ "React", "Spring Boot", "AWS", "Node.js", "MySQL", "MongoDB" ]` });
            } else if (cmd === 'experience') {
                newHistory.push({ type: 'output', text: 'Loading projects... check out the "Featured Work" section below!' });
            } else if (cmd === 'contact') {
                newHistory.push({ type: 'output', text: `Email: ${portfolioData.email} | GitHub: Prasanth631` });
            } else if (cmd === 'clear') {
                setHistory([{ type: 'output', text: 'Terminal cleared. Type "help" for commands.' }]);
                setInput('');
                return;
            } else {
                newHistory.push({ type: 'error', text: `command not found: ${cmd}` });
            }
            
            setHistory(newHistory);
            setInput('');
        }
    };

    return (
        <motion.div 
            className="code-window terminal-window"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => inputRef.current?.focus()}
        >
            {/* Window Header */}
            <div className="code-window-header">
                <div className="code-window-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                </div>
                <div className="code-window-title">bash — visitor:~$</div>
            </div>

            {/* Terminal Body acts as a label to guarantee mobile keyboard focus */}
            <label htmlFor="terminal-input" ref={containerRef} className="code-window-body terminal-body cursor-text">
                {history.map((line, i) => (
                    <div key={i} className={`terminal-line ${line.type === 'error' ? 'error' : line.type === 'input' ? 'input-echo' : 'output'}`}>
                        {line.type === 'input' && <span className="prompt">visitor:~$ </span>}
                        {line.text}
                    </div>
                ))}
                
                {/* Active Input Line */}
                <div className="terminal-input-line">
                    <span className="prompt">visitor:~$ </span>
                    <input
                        id="terminal-input"
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleCommand}
                        className="terminal-input"
                        spellCheck="false"
                        autoFocus
                    />
                </div>
            </label>
        </motion.div>
    );
};

export default HeroCodeWindow;
