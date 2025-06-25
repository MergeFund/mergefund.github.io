MergeFund is a platform that empowers software developers to earn real cryptocurrency rewards by solving open‑source issues. Our vision is to break down traditional gatekeeping in tech internships and freelance work: students and professionals alike can build portfolio‑worthy projects, get paid for contributions, and grow their reputation — all on one seamless platform.

MergeFund Site Specification

This document describes the end-to-end design, migration steps, deployment architecture, and detailed UI/UX specifications for the MergeFund platform—from the dashboard to FYP-style reports, profile pages, bounty creation flows, and beyond.

1. Technology Stack & Migration

1.1 Original Setup (React + Vite)

Framework: React 18, bundled with Vite

Styling: Tailwind CSS

Fonts: Imported via Google Fonts link in index.html

Deployment: Hosted on GitHub Pages behind Cloudflare DNS proxy

Supabase Integration: Configured in src/lib/supabase.ts

1.2 Migration to Next.js

Scaffold Next.js App

Ran npm create next-app@latest mergefund with TypeScript

Removed Vite config; adopted Next’s built‑in webpack/SWC pipeline

Directory Structure

Moved components into src/components

Converted pages to src/app (App Router) with layout.tsx, page.tsx files

Font Integration

Installed @next/font/google and imported Poppins in layout.tsx:

import { Poppins } from 'next/font/google'
const poppins = Poppins({ weight: ['300','400','500','600','700','800','900'], subsets: ['latin'], variable: '--font-poppins' })

Environment Variables & Supabase

Renamed .env keys to NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

Updated import paths in src/lib/supabase.ts for SSR-safe usage

Routing & Dynamic Pages

Defined dynamic route folders: /app/profile/[username]/page.tsx, /app/bounties/[id]/page.tsx

Utilized generateMetadata for per-page SEO

1.3 Deployment Migration (Cloudflare + Vercel)

Vercel Configuration

Connected GitHub repo to Vercel; set build command to npm run build and output to .next

Added environment variables in Vercel dashboard

Cloudflare DNS & Proxy

Pointed mergefund.org A/CAA records to Vercel’s assigned IPs

Enabled proxy (orange cloud) for CDN and SSL

Cache Settings

Set immutable caching for static assets via Cloudflare Page Rules

Purge cache on each Vercel deployment via webhook

2. Global Design System

Color Palette:

Primary: #6B21A8 (Purple)

Accent: #FFFFFF (White)

Neutral: #F3F4F6 (Light Gray), #374151 (Dark Gray)

Typography:

Font Family: Poppins Variable

Headings: 2rem–3rem, semi-bold

Body: 1rem, regular

Components:

Cards: White background, 2xl rounded corners, soft shadow (shadow-lg), padding p-6

Buttons: p-2 px-4, rounded-lg, hover shadow grow animation via Framer Motion

Grid Layouts: Responsive CSS Grid with grid-cols-1 sm:grid-cols-2 lg:grid-cols-3

Icons: lucide-react for lightweight SVGs

3. Page-by-Page UI/UX Breakdown

3.1 Landing / Waitlist Page

Hero Section

Headline: “Build real impact. Get paid to contribute.”

Subtext: Brief platform blurb + CTA button “Join the Waitlist”

Illustration: Abstract code-contribution graphic

Features Section

Three horizontally aligned cards: “Browse Bounties,” “Earn Crypto Rewards,” “Build Portfolio”

Footer

Links: About, Contact, Privacy, Terms

Social: Icons with purple hover effects

3.2 Auth Flow (Future)

Login / Signup

Modal-based forms

OAuth options (GitHub, Google)

Supabase Auth UI embedded

3.3 Dashboard

Layout

Sidebar (fixed, left): Logo, Nav links (Dashboard, My Bounties, Create Bounty, Reports, Profile, Settings)

Top Bar: Search input, notification bell, user avatar dropdown

Main Area

Welcome Banner: “Good afternoon, [Name]” + quick stats (earnings, open bounties)

Active Bounties Widget: Horizontal scroll of card previews (title, reward, status)

Earnings Chart: Line chart (Plotly) showing earnings over time

Recent Activity Feed: List of commits claimed, comments, bounty status changes

3.4 FYP-Style Reports Page

Card Grid of Reports

Each report card: title, summary, created date, metrics snapshot

Filters above: by date range, bounty type, status

Detailed Report Modal

Opens on card click: full report with charts (bar/line), contributor breakdown, payout summary

Interactions

Save, export CSV/PDF, share link

3.5 Bounty Listing & Detail

Listing

Search bar + filters (tags, reward range, difficulty)

Grid of bounty cards with image/icon, title, short description, reward badge

Detail

Header: Title, reward amount, status badge

Description section: Markdown-rendered text, attachments

Contribution History: List of past submissions and statuses

Sidebar: Quick actions (Claim, Ask a Question), tags, deadline countdown

3.6 Create Bounty Page

Multi-Step Form (3 steps)

Details: Title, description (Markdown editor), repository/issue link

Rewards & Deadlines: Reward amount (USD/crypto selector), deadline date picker

Review & Publish: Summary preview, confirm terms

Validation: Inline errors, disabled “Publish” until all fields valid

3.7 Profile Pages

Public Profile (/profile/[username])

Banner header: avatar, display name, short bio

Stats bar: total bounties claimed, earnings, reviews

Recent Contributions: card list of recent bounties with statuses

Edit Profile (private)

Form: Name, bio, social links, notification preferences

3.8 Settings & Notifications

Settings

Account: Email, password, linked identities

Preferences: Email digest frequency, push notifications

Notifications

Tabbed view: All, Mentions, Rewards, System

Each item: icon, message preview, timestamp, link to context

4. How It All Works Together

Next.js App Router delivers server-side rendered pages and statically optimized routes for speed and SEO.

Supabase backend handles authentication, database, and real-time updates via subscriptions for notifications.

Plotly.js integrated in React components for interactive charts on Dashboard and Reports.

Vercel & Cloudflare ensure global CDN, SSL, and asset caching; Vercel handles CI/CD from GitHub.

Responsive Design: Mobile-first CSS breakpoints; drawer-style sidebar on narrow screens.

Animations: Framer Motion for subtle hover/entry animations to enhance UX without overwhelming.

This specification should serve as a blueprint for front-end developers, designers, and stakeholders to align on the vision, look, and functionality of the MergeFund platform.

