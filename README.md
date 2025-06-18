# MergeFund - Next.js

MergeFund incentivizes developers with cryptocurrency rewards for contributing to open-source projects. Build your reputation while earning real rewards.

## Features

- **Crypto Rewards**: Earn cryptocurrency for solving GitHub issues
- **Transparent Payouts**: Smart contracts ensure automatic and transparent reward distribution
- **Reputation System**: Build a verifiable track record of quality contributions
- **Global Opportunities**: Access bounties from projects worldwide

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mergefund-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── lib/                # Utility libraries
│   └── supabase.ts     # Supabase client
└── assets/             # Static assets
public/
└── assets/             # Public assets
```

## Supabase Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Create a `waitlist` table with the following columns:
   - `id` (uuid, primary key)
   - `name` (text)
   - `email` (text)
   - `role` (text)
   - `github_profile` (text, nullable)
   - `created_at` (timestamp with time zone, default: now())

3. Add your Supabase URL and anon key to `.env.local`

## Deployment

### Cloudflare Pages Deployment

1. **Push your code to GitHub**

2. **Connect to Cloudflare Pages**:
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Click "Create a project"
   - Connect your GitHub repository

3. **Configure Build Settings**:
   - **Framework preset**: Next.js
   - **Build command**: `npm run build`
   - **Build output directory**: `.next`
   - **Node.js version**: 18 (or higher)

4. **Add Environment Variables**:
   In your Cloudflare Pages project settings, add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://iybchsakopqvccjythby.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Deploy**: Click "Save and Deploy"

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## Environment Variables

The following environment variables are required:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

**Note**: These variables are prefixed with `NEXT_PUBLIC_` because they need to be available in the browser for client-side Supabase operations.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
