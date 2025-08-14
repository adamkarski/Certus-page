# Certus Project

## Project Overview
This is a Svelte-based website for Certus, a company manufacturing CNC machines. The project uses SvelteKit as the framework.

## Key Technologies
- SvelteKit
- TypeScript
- Swiper.js for carousels
- CSS/SCSS for styling
- Vite as build tool

## Main Structure
- `/src/components/` - Svelte components
- `/src/routes/` - SvelteKit routes
- `/src/lib/` - Shared utilities and stores
- `/static/` - Static assets
- `/certus-service-page/` - Standalone service page

## Key Components
- `NavBar.svelte` - Main navigation with dropdown menus
- `Section_Hero.svelte` - Hero section with Swiper carousel
- Various machine-related components in `/src/components/`

## Known Issues
- Safari iPhone compatibility issues with Swiper initialization
- Character encoding issues in some files

## Build Process
Uses Vite and SvelteKit adapter-static for static site generation.

## Service Page
Contains a separate service page (`certus-service-page/`) with its own HTML/CSS/JS files.