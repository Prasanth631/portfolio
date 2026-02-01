# Prasanth Golla - Portfolio

A cinematic "Luminous Dark" personal portfolio website built with React, Vite, and Tailwind CSS. This project features high-end visual effects including a flashlight cursor, spotlight project cards, and noise grain overlays to create an immersive user experience.

## Features

- **Luminous Dark Theme**: A dark, cinematic aesthetic with a virtual flashlight cursor that reveals content.
- **Spotlight Interactions**: Cards and elements light up their borders based on mouse proximity.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop screens.
- **Animation**: Smooth page transitions and element reveals using Framer Motion.
- **Resume Integration**: One-click PDF download and comprehensive display of education, skills, and certifications.
- **Contact Form**: Functional contact form integrated with Web3Forms for direct email delivery.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Deployment**: GitHub Pages / Vercel

## Getting Started

### Prerequisites

Ensure you have Node.js installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Prasanth631/portfolio.git
   ```

2. Navigate to the project directory:
   ```bash
   cd portfolio
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment

### GitHub Pages

This project is configured to deploy to GitHub Pages.

1. Run the deploy script:
   ```bash
   npm run deploy
   ```
   This command builds the project and pushes the `dist` folder to the `gh-pages` branch.

### Vercel / Netlify

The project is also compatible with Vercel and Netlify. Simply connect your repository, and it will automatically detect the settings. The build command is `npm run build` and the output directory is `dist`.

## Project Structure

- `src/components`: React components (LuminousDark, Flashlight, SpotlightCard).
- `src/data`: Structured data for the portfolio (resume content).
- `src/index.css`: Global styles and Tailwind configuration.
- `public`: Static assets like the resume PDF and favicon.

## License

This project is open source and available for personal and educational use.
