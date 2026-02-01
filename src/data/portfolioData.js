// Portfolio Data - Complete Resume Information
export const portfolioData = {
    // Personal Info
    name: "Venkata Prasanth Golla",
    shortName: "Prasanth",
    title: "Aspiring Software Engineer",
    email: "prasanthgolla29@gmail.com",
    phone: "+91-8919974413",
    location: "Nidadavolu, Andhra Pradesh, India",
    github: "https://github.com/Prasanth631",
    linkedin: "https://www.linkedin.com/in/venkata-prasanth-golla-960220286/",

    // Objective
    objective: "Aspiring Software Engineer with a strong foundation in full-stack development and core software engineering principles, eager to contribute to building, testing, and maintaining scalable applications while continuously learning new technologies and growing in a collaborative Agile environment.",

    // Education - Complete
    education: [
        {
            institution: "KL University",
            degree: "Bachelor of Technology",
            field: "Computer Science and Engineering",
            period: "January 2022 - May 2026",
            grade: "9.21/10.0",
            gradeType: "CGPA"
        },
        {
            institution: "Tirumala Junior College, Katheru",
            degree: "Intermediate Education",
            field: "",
            period: "June 2020 - April 2022",
            grade: "9.37/10.0",
            gradeType: "CGPA"
        }
    ],

    // Technical Skills - Complete
    skills: {
        "Programming Languages": ["Java (OOPs, DSA)", "C"],
        "Database Technologies": ["MySQL", "MongoDB", "PostgreSQL"],
        "Frameworks": ["Spring Boot", "React"],
        "APIs & Cloud": ["RESTful API Development", "AWS"],
        "DevOps & Build Tools": ["Git", "Jenkins", "JUnit", "Docker", "CI/CD Pipelines", "Maven"],
        "Software Engineering": ["SDLC", "Requirement Analysis", "Design", "Development", "Documentation", "Testing"],
        "Soft Skills": ["Positive Attitude", "Communication", "Team Collaboration", "Problem Solving", "Adaptability"]
    },

    // Projects - Complete with ALL highlights
    projects: [
        {
            name: "Student Feedback System",
            tech: ["Spring Boot", "React.js", "MySQL"],
            github: "https://github.com/Prasanth631/StudentFeedbackSystem",
            highlights: [
                "Developed full-stack feedback management platform processing over 500 responses with JWT-based role-based authentication",
                "Built responsive React frontend with real-time form validation, reducing user input errors by 45 percent",
                "Integrated automated email notification system using JavaMail API for instant feedback alerts",
                "Created interactive data visualization dashboards to analyze feedback trends and improve decision-making"
            ]
        },
        {
            name: "Automated CI/CD Pipeline",
            tech: ["Jenkins", "Maven", "Docker", "GitHub"],
            github: "https://github.com/Prasanth631/TermPaperProjectDemo",
            highlights: [
                "Automated build, test, and deployment workflow for Java applications, reducing manual deployment time by 70 percent",
                "Integrated JUnit test automation with email notifications for immediate build failure detection",
                "Configured Jenkins pipeline with Maven for dependency management and artifact generation",
                "Implemented Docker containerization for consistent deployment across environments"
            ]
        }
    ],

    // Hackathons - Complete
    hackathons: [
        {
            name: "Odoo x Adani University Hackathon 2026",
            role: "Participant",
            date: "January 2026",
            project: "CafePOS",
            github: "https://github.com/Prasanth631/OdooHackthon_Team_33",
            description: "24-hour national-level coding marathon",
            highlights: [
                "Developed CafePOS, a full-stack restaurant POS system during a 24-hour national-level coding marathon",
                "Implemented real-time order management with WebSocket, JWT authentication, Razorpay payment gateway, and Kitchen Display System",
                "Built using Spring Boot, React, TypeScript, PostgreSQL, and TailwindCSS with interactive floor management and analytics"
            ],
            tech: ["Spring Boot", "React", "TypeScript", "PostgreSQL", "TailwindCSS", "WebSocket", "JWT", "Razorpay"]
        }
    ],

    // Certifications - Complete with links
    certifications: [
        {
            name: "AWS Certified Cloud Practitioner",
            issuer: "Amazon Web Services",
            year: "2024",
            credentialId: "79efcfdd-49b4-41e8-a176-a93e1de0d943",
            link: "https://www.credly.com/badges/79efcfdd-49b4-41e8-a176-a93e1de0d943/public_url"
        },
        {
            name: "Red Hat Certified Enterprise Application Developer (RHCEAD)",
            issuer: "Red Hat",
            year: "2024",
            credentialId: "259dbe43-bafc-42eb-b8e9-ba931f4e63ad",
            link: "https://www.credly.com/badges/259dbe43-bafc-42eb-b8e9-ba931f4e63ad/public_url"
        }
    ],

    // Resume download
    resumeUrl: "/resume.pdf"
};
