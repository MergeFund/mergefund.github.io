"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  Code,
  Award,
  Heart,
  AlertCircle,
} from "lucide-react"
import { motion } from "framer-motion"

const slides = [
  {
    id: 1,
    type: "cover",
    title: "MergeFund – The Developer $idehustle ",
    subtitle: "Fiverr meets GitHub. Get paid to build open source.",
    tagline: "Where GitHub meets Fiverr & GoFundMe",
    description: "Get paid to build open source. The $idehustle for developers.",
  },
  {
    id: 2,
    type: "problem",
    title: "The Problem",
    keyStats: [
      "Over 90% of open-source contributors receive no compensation, despite contributing to critical infrastructure used by tech companies worldwide.",
      "According to the Linux Foundation and Harvard's Lab for Innovation Science, less than 3% of OSS contributors are paid full-time, even though open-source software powers an estimated 96% of enterprise applications.",
      "Open-source value creation is massive: $400B+ in economic impact annually (source: McKinsey + GitHub ecosystem data)."
    ],
    declineStats: {
      title: "📉 Declining Contributions",
      points: [
        "Shrinking Core Teams: Active contributor count is flatlining; GitHub growth has slowed since 2019.",
        "Developer Burnout: 89% of OSS projects lose core contributors within 3 years. Only 27% recover.",
        "Project Stagnation: Many projects plateau after early growth. Volunteers can't sustain scaling issues."
      ],
      summary: "The internet runs on unpaid labor. That's not sustainable."
    }
  },
  {
    id: 3,
    type: "solution",
    title: "The Solution",
    description: "Get paid to contribute to open-source.",
    benefits: [
      "Earn verified, direct payouts through GitHub-linked bounties",
      "Maintain public proof of work — no resumes needed",
      "Plug into existing repositories — minimal overhead"
    ],
    whyItWorks: [
      "No crypto wallets required",
      "Instant payouts (10–15% platform fee)",
      "Verified contributor system (AI + GitHub checks)",
      "Recurring bounty cycles for long-term earning"
    ]
  },
  {
    id: 3.5,
    type: "competitiveAdvantage",
    title: "How MergeFund Beats the Competition",
    competitors: ["MergeFund", "Gitcoin", "Fiverr", "Open Collective"],
    criteria: [
      { label: "Direct payouts to GitHub accounts", values: [true, false, false, false] },
      { label: "No crypto required", values: [true, false, false, true] },
      { label: "OSS-native (public proof of work)", values: [true, true, false, true] },
      { label: "Recurring bounties for long-term earning", values: [true, true, false, false] },
      { label: "Instant payouts (no waiting)", values: [true, false, false, false] },
      { label: "Low platform fees (10–15%)", values: [true, false, false, true] },
      { label: "No resume/interview needed", values: [true, true, false, true] },
      { label: "Verified contributor system", values: [true, false, false, false] },
      { label: "OSS project focus", values: [true, true, false, true] },
      { label: "Community & hackathon partnerships", values: [true, true, false, false] }
    ],
    description: "MergeFund combines the best of Gitcoin, Fiverr, and Open Collective, but is purpose-built for open-source developers who want to get paid fast, with no crypto or resume hurdles."
  },
  {
    id: 4,
    type: "market",
    title: "Market Overview",
    marketOverview: {
      tam: "$400B",
      tamDescription: "Annual value created by global OSS contributions (McKinsey, GitHub)",
      sam: "$3B",
      samDescription: "GitHub ecosystem: repos with hiring, bounties, or active funding",
      som: "$30M (3 Years)",
      somDescription: "0.5% of GitHub repos adopt MergeFund",
      somTargets: [
        "Recurring bounty/tip volume from maintainers",
        "Developer tool and hackathon partnerships"
      ]
    }
  },
  {
    id: 5,
    type: "timing",
    title: "Why Now",
    reasons: [
      "GitHub: 65M+ developers and growing",
      "Grant fatigue: Web3 DAO funding declining (Gitcoin down YoY)",
      "OSS maintainers lack resources to manage contributors",
      "Rise of bounty-based compensation as the next model",
      "Perfect timing for a low-friction, scalable OSS payout platform"
    ]
  },
  {
    id: 6,
    type: "business",
    title: "Business Model",
    revenueStreams: [
      "Platform Fees: 10–15% on each payout (bounties, tips, hackathon prizes)",
      "Freemium: Free for early adopters, paid tiers after usage thresholds"
    ],
    additionalRevenue: [
      "Promoted Repos (paid feature slots)",
      "Premium Analytics (dashboard subscriptions)",
      "Hackathon Services (setup fees + revenue share)"
    ],
    description: "Free to start — paid when value grows. Clean incentives."
  },
  {
    id: 7,
    type: "traction",
    title: "Traction",
    achievements: [
      "100+ developers signed up in one weekend at SpurHacks",
      "3 Major Hackathon Wins:",
      "🥇 Best Web3 – SpurHacks",
      "🥉 3rd Place – Consensus Hackathon",
      "🥉 3rd Place – Harvard Blockchain Hackathon",
      "EasyA Verbal Commitment: $15K post-launch repo funding to pilot MergeFund with their ecosystem",
      "12k views this week on LinkedIn and 8k views on tiktok ",
      "Silicon Valley Bank reached out to schedule a meeting"
    ],
    description: "Strong community, top-tier validation — before public release"
  },
  {
    id: 8,
    type: "roadmap",
    title: "Roadmap (Gantt Chart)",
    phases: [
      {
        phase: "Phase 1 (0–3 months)",
        goals: [
          "MVP: Custodial payments (via Stripe)",
          "GitHub OAuth, fee logic, basic platform",
          "Core platform development and testing"
        ]
      },
      {
        phase: "Phase 2 (4–6 months)",
        goals: [
          "Launch bounty system and smart contract escrow ($10K audit)",
          "Begin hybrid model: custodial + on-chain",
          "Pilot repos and community launch",
          "Partner launch with EasyA and others"
        ]
      },
      {
        phase: "Phase 3 (7–12 months)",
        goals: [
          "Full migration to smart contracts (final $30K audit)",
          "Add AI vetting, contributor badges, premium features",
          "Expand to 1000+ devs, hosted hackathons, analytics"
        ]
      }
    ],
    description: "Timeline aligns with growth, trust, and lean execution"
  },
  {
    id: 9,
    type: "financials",
    title: "Financial Model & Break-Even Strategy",
    breakEvenTarget: "$300,000",
    revenueModel: [
      {
        stream: "Platform Fees (10%)",
        revenue: "$225K",
        assumptions: "$2.25M in bounty volume (~7,500 bounties @ $300 avg)"
      },
      {
        stream: "Premium Repo Plans",
        revenue: "$50K",
        assumptions: "100 repos × $50/mo × 10 months"
      },
      {
        stream: "Grants/Sponsorships",
        revenue: "$25K",
        assumptions: "OSS DAOs, GitHub Fund, etc."
      }
    ],
    growthKPIs: [
      { metric: "Bounties Completed", goal: "7,500" },
      { metric: "Active Contributors", goal: "4,000–5,000" },
      { metric: "Active Repos", goal: "250–300" },
      { metric: "Monthly Bounty Flow", goal: "$200–300K" }
    ],
    timeline: [
      { month: "July", milestone: "Build kickoff, repo outreach begins" },
      { month: "August", milestone: "Finalize MVP, early repo testing" },
      { month: "September", milestone: "MVP launches (GitHub ↔ Stripe), first live bounty" },
      { month: "October", milestone: "First 20–50 bounties, growth begins" },
      { month: "November", milestone: "Premium repo plans go live, feedback loop solidified" },
      { month: "December", milestone: "100 repos onboarded, 5K contributors signed up" }
    ],
    whyRealistic: [
      "5 full-time founders",
      "6-month runway locked",
      "Product scope is well-bounded",
      "OSS grants + Stripe/GitHub integrations = strong GTM",
      "Proven space: Gitcoin, Stack Overflow Teams, Fiverr"
    ]
  },
  {
    id: 10,
    type: "financialSummary",
    title: "12-Month Financial Summary",
    phases: [
      {
        name: "Phase 1: MVP Build",
        period: "Jul-Sep",
        cost: "$140,450",
        monthlyBurn: "$46,800",
        revenue: "$0",
        keyExpenses: [
          "Engineering (5 FTs): $120,000",
          "Rent Stipends: $15,000",
          "Infra & Tools: $450",
          "Hardware & Legal: $2,700",
          "Misc Dev Buffer: $2,300"
        ]
      },
      {
        name: "Phase 2: Go-to-Market",
        period: "Oct-Dec",
        cost: "$156,400",
        monthlyBurn: "$52,100",
        revenue: "$25K",
        keyExpenses: [
          "Engineering (5 FTs): $120,000",
          "Rent Stipends: $15,000",
          "Bounty Pool: $15,000",
          "Infra & Tools: $450",
          "Growth & Community: $5,000",
          "QA & User Feedback: $950"
        ]
      },
      {
        name: "Phase 3: Growth & Scale",
        period: "Jan-Mar",
        cost: "$180,000",
        monthlyBurn: "$60,000",
        revenue: "$100K",
        keyExpenses: [
          "Engineering (5 FTs): $120,000",
          "Rent Stipends: $15,000",
          "Bounty Pool Expansion: $25,000",
          "Infra & Tools: $450",
          "Growth & Marketing: $10,000",
          "Premium Features Dev: $9,550"
        ]
      },
      {
        name: "Phase 4: Break-Even",
        period: "Apr-Jun",
        cost: "$200,000",
        monthlyBurn: "$66,700",
        revenue: "$175K",
        keyExpenses: [
          "Engineering (5 FTs): $120,000",
          "Rent Stipends: $15,000",
          "Bounty Pool: $30,000",
          "Infra & Tools: $450",
          "Growth & Marketing: $15,000",
          "Platform Optimization: $19,550"
        ]
      }
    ],
    totalInvestment: "$676,850",
    totalRevenue: "$300K",
    breakEvenStatus: "✅ Break-Even Achieved"
  },
  {
    id: 11,
    type: "team",
    title: "Team",
    members: [
      { name: "Isaac Gbaba", role: "Product lead + front-end engineer. Designs UX, owns roadmap." },
      { name: "Matt", role: "Smart contract lead. Handles Solidity, payout logic, contract testing." },
      { name: "Damien", role: "Full-stack engineer. Owns backend systems, API integration, dev experience." },
      { name: "Evelyn", role: "UI/UX . Crafts interfaces and interaction flows." },
      { name: "Alvin", role: "Growth + Partnerships. Manages outreach, and partnerships." }
    ],
    description: "Small, technical team already executing and shipping"
  },
  
  {
    id: 12,
    type: "ask",
    title: "Ask",
    minAsk: "$50K → Barebones Launch & Audit",
    idealAsk: "$700K → Complete platform + break-even path",
    fundUsage: [
      "Engineering (5 founders full-time): $480K (12 months)",
      "Rent Stipends (West Coast): $60K (12 months)",
      "Bounty Pools: $70K (phased rollout)",
      "Growth & Marketing: $40K (scaled approach)",
      "Infra & Tools: $1.8K (full year)",
      "Platform Development: $29.1K (premium features)"
    ],
    description: "At $50K, we can complete auditing and launch a barebones MVP. However, since founders will need to take on side work to live, production speed will be much slower and less aggressive than the ideal scenario. MergeFund is a full-time commitment for all five founders. We're relocating to the West Coast to embed ourselves in the open-source and Web3 ecosystem. We're raising $700K to cover 12 months of product development, bounties, and go-to-market, with a clear path to break-even by month 12."
  },
  {
    id: 13,
    type: "exit",
    title: "Exit Strategy",
    points: [
      "OSS becomes core infra → MergeFund becomes standard payout layer",
      "Acquisition targets: GitHub, Devfolio, Gitcoin, Open Collective",
      "Long-term: DAO or token-based rewards optional (post scale)",
      "Clear exits, but value-first execution"
    ]
  }
];

function SlideNavigation({ currentSlide, slides, goToSlide }: any) {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-10">
      <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
        {slides.map((_: any, index: number) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-purple-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowRight':
        case ' ':
          event.preventDefault()
          nextSlide()
          break
        case 'ArrowLeft':
          event.preventDefault()
          prevSlide()
          break
        case 'Home':
          event.preventDefault()
          goToSlide(0)
          break
        case 'End':
          event.preventDefault()
          goToSlide(slides.length - 1)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Touch/swipe functionality
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
  }

  const slide = slides[currentSlide]

  const renderSlideContent = () => {
    switch (slide.type) {
      case "cover":
        return (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-20 px-4 flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-white via-purple-50/30 to-blue-50/40 backdrop-blur-xl rounded-3xl shadow-2xl relative overflow-hidden"
          >
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
            </div>
            
            <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto relative z-10">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="text-center"
              >
                {/* Logo and Brand */}
                <div className="mb-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                    <Code className="w-12 h-12 text-white" />
                  </div>
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 text-sm px-6 py-2 rounded-full shadow-lg mb-6">
                  {slide.subtitle}
                </Badge>
            </div>

                {/* Main Title */}
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-6xl md:text-7xl font-bold text-center text-gray-900 mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent"
                >
                  {slide.title}
                </motion.h1>

                {/* Tagline */}
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-2xl md:text-3xl text-gray-700 font-medium mb-6"
                >
                  {slide.tagline}
                </motion.p>

                {/* Description */}
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
                >
                  {slide.description}
                </motion.p>

                {/* Call to Action */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mt-12"
                >
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <ArrowRight className="w-5 h-5 mr-2" />
                    Explore the Future
                  </Button>
                  </motion.div>

                {/* Additional Info */}
                  <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="mt-16 flex items-center justify-center space-x-8 text-sm text-gray-500"
                >
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    <span>Built for Developers</span>
              </div>
                  <div className="flex items-center space-x-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span>Hackathon Winners</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>GitHub Native</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>
        )
      case "problem":
        return (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-16 px-4 flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-white/80 to-red-50/60 backdrop-blur-xl rounded-3xl shadow-2xl"
          >
            <div className="w-full max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-red-100 text-red-600 border-red-200 text-base px-4 py-2 rounded-full shadow-sm">
                The Problem
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">{slide.title}</h1>
              <div className="space-y-6 mb-8">
                {(slide.keyStats ?? []).map((point: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="rounded-xl bg-white/70 backdrop-blur-lg shadow p-6 text-left"
                  >
                    <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0 float-left mr-4" />
                    <span className="text-lg text-foreground leading-relaxed">{point}</span>
                  </motion.div>
                ))}
              </div>
              {/* Declining Contributions Section */}
              {slide.declineStats && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4 text-red-700 flex items-center justify-center">
                    <span role="img" aria-label="decline" className="mr-2">📉</span> {slide.declineStats.title}
                  </h2>
                  <div className="space-y-4 mb-4 text-left">
                    {(slide.declineStats.points ?? []).map((point: string, idx: number) => (
                      <div key={idx} className="rounded-xl bg-white/80 shadow p-4 border-l-4 border-red-300">
                        <span className="text-base text-gray-800">{point}</span>
                </div>
                    ))}
                </div>
                  <div className="rounded-xl bg-yellow-50 border-l-4 border-yellow-400 p-4 text-left">
                    <span className="font-semibold text-yellow-800">{slide.declineStats.summary}</span>
                </div>
                </div>
              )}
            </div>
          </motion.section>
        )
      case "solution":
        return (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-16 px-4 flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-white/80 to-green-50/60 backdrop-blur-xl rounded-3xl shadow-2xl"
          >
            <div className="w-full max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-green-100 text-green-600 border-green-200 text-base px-4 py-2 rounded-full shadow-sm">
                Solution
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">{slide.title}</h1>
              <div className="space-y-6">
                {(slide.benefits ?? []).map((point: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="rounded-xl bg-white/70 backdrop-blur-lg shadow p-6 flex items-center gap-4"
                  >
                    <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
                    <span className="text-xl text-foreground leading-relaxed">{point}</span>
                  </motion.div>
                ))}
              </div>
              
              {/* Why It Works Flow */}
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Why It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {(slide.whyItWorks ?? []).map((point: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                      className="rounded-xl bg-gradient-to-br from-green-50 to-green-100 p-6 text-center shadow-lg"
                    >
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-white font-bold text-lg">{idx + 1}</span>
                </div>
                      <p className="text-sm font-medium text-foreground leading-relaxed">{point}</p>
                  </motion.div>
                ))}
                </div>
              </div>
            </div>
          </motion.section>
        )
      case "timing":
        return (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-16 px-4 flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-white/80 to-pink-50/60 backdrop-blur-xl rounded-3xl shadow-2xl"
          >
            <div className="w-full max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-pink-100 text-pink-600 border-pink-200 text-base px-4 py-2 rounded-full shadow-sm">
                Why Now
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">{slide.title}</h1>
              <div className="space-y-6">
                {(slide.reasons ?? []).map((point: string, idx: number) => (
                <motion.div
                    key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="rounded-xl bg-white/70 backdrop-blur-lg shadow p-6 flex items-center gap-4"
                >
                    <AlertCircle className="w-8 h-8 text-pink-500 flex-shrink-0" />
                    <span className="text-xl text-foreground leading-relaxed">{point}</span>
                </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )
      case "business":
        return (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-16 px-4 flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-white/80 to-purple-50/60 backdrop-blur-xl rounded-3xl shadow-2xl"
          >
            <div className="w-full max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-purple-100 text-purple-600 border-purple-200 text-base px-4 py-2 rounded-full shadow-sm">
                Business Model
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">{slide.title}</h1>
              <div className="space-y-6">
                {(slide.revenueStreams ?? []).map((point: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="rounded-xl bg-white/70 backdrop-blur-lg shadow p-6 flex items-center gap-4"
                  >
                    <CheckCircle className="w-8 h-8 text-purple-500 flex-shrink-0" />
                    <span className="text-xl text-foreground leading-relaxed">{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )
      case "traction":
        return (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-16 px-4 flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-white/80 to-pink-50/60 backdrop-blur-xl rounded-3xl shadow-2xl"
          >
            <div className="w-full max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-pink-100 text-pink-600 border-pink-200 text-base px-4 py-2 rounded-full shadow-sm">
                Traction
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">{slide.title}</h1>
              <div className="space-y-6">
                {(slide.achievements ?? []).map((point: string, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="rounded-xl bg-white/70 backdrop-blur-lg shadow p-6 flex items-center gap-4"
                  >
                    <Award className="w-8 h-8 text-pink-600 flex-shrink-0" />
                    <span className="text-xl text-foreground leading-relaxed">{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )
      case "market":
        return (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-16 px-4 flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-white/80 to-blue-50/60 backdrop-blur-xl rounded-3xl shadow-2xl"
          >
            <div className="w-full max-w-6xl mx-auto text-center">
              <Badge className="mb-4 bg-blue-100 text-blue-600 border-blue-200 text-base px-4 py-2 rounded-full shadow-sm">
                Market Overview
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">{slide.title}</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="rounded-2xl bg-white/70 backdrop-blur-lg shadow-lg border border-white/40 p-6">
                  <div className="text-2xl font-bold text-primary mb-2">{slide.marketOverview?.tam}</div>
                  <div className="text-sm font-semibold text-muted-foreground mb-2">TAM</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{slide.marketOverview?.tamDescription}</p>
            </div>
                <div className="rounded-2xl bg-white/70 backdrop-blur-lg shadow-lg border border-white/40 p-6">
                  <div className="text-2xl font-bold text-primary mb-2">{slide.marketOverview?.sam}</div>
                  <div className="text-sm font-semibold text-muted-foreground mb-2">SAM</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{slide.marketOverview?.samDescription}</p>
                  </div>
                <div className="rounded-2xl bg-white/70 backdrop-blur-lg shadow-lg border border-white/40 p-6">
                  <div className="text-2xl font-bold text-primary mb-2">{slide.marketOverview?.som}</div>
                  <div className="text-sm font-semibold text-muted-foreground mb-2">SOM</div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{slide.marketOverview?.somDescription}</p>
                  <ul className="text-xs text-muted-foreground space-y-1 text-left">
                    {(slide.marketOverview?.somTargets ?? []).map((target: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{target}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>
        )
      
      case "exit":
        return (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-16 px-4 flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-white/80 to-green-50/60 backdrop-blur-xl rounded-3xl shadow-2xl"
          >
            <div className="w-full max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-green-100 text-green-600 border-green-200 text-base px-4 py-2 rounded-full shadow-sm">
                Exit Strategy
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">{slide.title}</h1>
              <ul className="list-disc pl-6 text-left text-lg text-gray-700 space-y-2 mb-8">
                {(slide.points ?? []).map((point: string, idx: number) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          </motion.section>
        )
      case "roadmap":
        // Gantt chart data for 12-month roadmap
        const ganttPhases = [
          {
            name: "Phase 1 - MVP Build",
            color: "bg-blue-500",
            start: 0,
            end: 2,
            deliverables: [
              "Core MVP (GitHub OAuth, Stripe payouts, bounty engine)",
              "5 founders full-time",
              "Minimum Viable Option"
            ],
            totalCost: "$140,450",
            milestone: "MVP live with GitHub ↔ Stripe payout, tested internally and with early users"
          },
          {
            name: "Phase 2 - Go-to-Market",
            color: "bg-green-500",
            start: 3,
            end: 5,
            deliverables: [
              "Bounty pool launch",
              "Community growth",
              "Real GitHub issues with Stripe payouts"
            ],
            totalCost: "$156,400",
            milestone: "10+ contributors paid, 3–5 partner repos onboarded, bounty cycle validated, Twitter/Discord traction live"
          },
          {
            name: "Phase 3 - Growth & Scale",
            color: "bg-yellow-500",
            start: 6,
            end: 8,
            deliverables: [
              "Premium features launch",
              "100+ repos onboarded",
              "Contributor retention optimization"
            ],
            totalCost: "$180,000",
            milestone: "250+ active repos, 4K+ contributors, $100K+ monthly bounty flow, premium revenue starts"
          },
          {
            name: "Phase 4 - Break-Even",
            color: "bg-purple-500",
            start: 9,
            end: 11,
            deliverables: [
              "Full platform optimization",
              "300+ repos",
              "5K+ contributors",
              "Break-even achieved"
            ],
            totalCost: "$200,000",
            milestone: "Break-even achieved, $300K+ annual revenue, 7.5K+ bounties completed, sustainable growth"
          }
        ];
        const months = Array.from({length: 12}, (_, i) => i);
        return (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-8 px-4 flex flex-col items-center justify-center min-h-[80vh] bg-white rounded-3xl shadow-2xl"
          >
            <div className="w-full max-w-7xl mx-auto text-center">
              <Badge className="mb-4 bg-green-100 text-green-600 border-green-200 text-sm px-4 py-2 rounded-full shadow-sm">
                🗓️ MergeFund Master Plan (Year 1) - "Fiverr meets GitHub. Real code. Real pay."
              </Badge>
              <h1 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">🚀 12-Month Execution Roadmap (July 2025 - June 2026)</h1>
              {/* Gantt Chart Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0 text-left text-sm leading-relaxed">
                  <thead>
                    <tr>
                      <th className="bg-blue-900 text-white font-bold px-4 py-3 border border-gray-200 w-32 text-base">PHASE</th>
                      <th className="bg-blue-900 text-white font-bold px-4 py-3 border border-gray-200 w-48 text-base">DELIVERABLES</th>
                      {months.map((m) => (
                        <th key={m} className="bg-blue-900 text-white font-bold px-2 py-3 border border-gray-200 text-center text-base">{m}</th>
                      ))}
                      <th className="bg-blue-900 text-white font-bold px-4 py-3 border border-gray-200 w-20 text-base">COST</th>
                      <th className="bg-blue-900 text-white font-bold px-4 py-3 border border-gray-200 w-40 text-base">MILESTONE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ganttPhases.map((phase, idx) => (
                      <tr key={phase.name} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-200 px-4 py-4 font-semibold text-gray-800 align-top whitespace-nowrap text-base">{phase.name}</td>
                        <td className="border border-gray-200 px-4 py-4 text-gray-600 align-top text-sm whitespace-normal break-words">
                          {phase.deliverables.map((deliverable: string, idx: number) => (
                            <div key={idx} className="mb-1 leading-relaxed">
                              {deliverable}
                            </div>
                          ))}
                        </td>
                        {months.map((m) => (
                          <td key={m} className="border border-gray-200 px-2 py-4 text-center align-middle">
                            {m >= phase.start && m <= phase.end ? (
                              <div className={`${phase.color} h-6 w-full rounded-md shadow-sm`}></div>
                            ) : null}
                          </td>
                        ))}
                        <td className="border border-gray-200 px-4 py-4 font-bold text-gray-700 align-top whitespace-nowrap text-base">{phase.totalCost}</td>
                        <td className="border border-gray-200 px-4 py-4 text-gray-600 align-top text-xs leading-relaxed">{phase.milestone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.section>
        )
      case "financials":
        return (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-16 px-4 flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-white/80 to-purple-50/60 backdrop-blur-xl rounded-3xl shadow-2xl"
          >
            <div className="w-full max-w-6xl mx-auto text-center">
              <Badge className="mb-4 bg-purple-100 text-purple-600 border-purple-200 text-base px-4 py-2 rounded-full shadow-sm">
                Financial Model & Break-Even Strategy
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">{slide.title}</h1>
              
              {/* Break-Even Target */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="mb-8 rounded-xl bg-white/70 backdrop-blur-lg shadow p-6"
              >
                <h2 className="text-2xl font-bold mb-4 text-foreground">💸 Break-Even Target (12 Months)</h2>
                <span className="text-4xl font-bold text-primary">{slide.breakEvenTarget}</span>
              </motion.div>

              {/* Revenue Model */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="rounded-xl bg-white/70 backdrop-blur-lg shadow p-6"
                >
                  <h2 className="text-xl font-bold mb-4 text-foreground">💼 Revenue Model</h2>
                  <div className="space-y-3">
                    {(slide.revenueModel ?? []).map((model: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <div>
                          <div className="font-semibold text-foreground">{model.stream}</div>
                          <div className="text-sm text-muted-foreground">{model.assumptions}</div>
                        </div>
                        <div className="text-xl font-bold text-primary">{model.revenue}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Growth KPIs */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="rounded-xl bg-white/70 backdrop-blur-lg shadow p-6"
                >
                  <h2 className="text-xl font-bold mb-4 text-foreground">📈 Growth KPIs (By Month 12)</h2>
                  <div className="space-y-3">
                    {(slide.growthKPIs ?? []).map((kpi: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium text-foreground">{kpi.metric}</span>
                        <span className="font-bold text-green-600">{kpi.goal}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="mb-8 rounded-xl bg-white/70 backdrop-blur-lg shadow p-6"
              >
                <h2 className="text-xl font-bold mb-4 text-foreground">🗓️ Month-by-Month Timeline</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(slide.timeline ?? []).map((timeline: any, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="font-bold text-blue-600 min-w-[60px]">{timeline.month}</div>
                      <div className="text-sm text-foreground">{timeline.milestone}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Why Realistic */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 shadow-lg"
              >
                <h2 className="text-xl font-bold mb-4">🧠 Why It's Realistic</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(slide.whyRealistic ?? []).map((reason: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                      <span className="text-sm">{reason}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center text-sm opacity-90">
                  You're not inventing behavior — just monetizing what devs are already doing.
                </div>
              </motion.div>
            </div>
          </motion.section>
        )
      case "team":
        return (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-16 px-4 flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-white/80 to-purple-50/60 backdrop-blur-xl rounded-3xl shadow-2xl"
          >
            <div className="w-full max-w-5xl mx-auto text-center">
              <Badge className="mb-4 bg-purple-100 text-purple-600 border-purple-200 text-base px-4 py-2 rounded-full shadow-sm">
                Team
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">{slide.title}</h1>
              {/* Team Photo */}
                    <motion.div
                initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                      viewport={{ once: true }}
                className="mb-12"
              >
                <img 
                  src="/team-photo.jpeg" 
                  alt="MergeFund Team" 
                  className="w-full max-w-4xl mx-auto rounded-2xl shadow-2xl"
                />
                    </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {(slide.members ?? []).map((member: any, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                    className="rounded-xl bg-white/80 backdrop-blur-lg shadow p-6 text-left flex items-start gap-4"
                    >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">{member.name.charAt(0)}</span>
                </div>
                    <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                      <p className="text-base text-muted-foreground leading-relaxed">{member.role}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-2xl text-center shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Team Description</h3>
                <p className="text-lg leading-relaxed">{slide.description}</p>
              </div>
            </div>
          </motion.section>
        )
      case "ask":
        return (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-16 px-4 flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-white/80 to-purple-50/60 backdrop-blur-xl rounded-3xl shadow-2xl"
          >
            <div className="w-full max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-purple-100 text-purple-600 border-purple-200 text-base px-4 py-2 rounded-full shadow-sm">
                Ask
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">{slide.title}</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-2xl bg-white/70 backdrop-blur-lg shadow-lg border border-white/40 p-8 flex flex-col items-center gap-4"
                >
                  <span className="text-lg font-semibold text-muted-foreground">Minimum Ask</span>
                  <span className="text-3xl font-bold text-primary">{slide.minAsk}</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="rounded-2xl bg-white/70 backdrop-blur-lg shadow-lg border border-white/40 p-8 flex flex-col items-center gap-4"
                >
                  <span className="text-lg font-semibold text-muted-foreground">Ideal Ask</span>
                  <span className="text-3xl font-bold text-primary">{slide.idealAsk}</span>
                </motion.div>
              </div>
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-foreground">Fund Usage</h2>
                <div className="space-y-4">
                  {(slide.fundUsage ?? []).map((item: string, idx: number) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="rounded-xl bg-white/70 backdrop-blur-lg shadow p-4 text-center"
                    >
                      <span className="text-lg text-foreground">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="w-full max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 shadow-lg"
                >
                  <p className="text-xl leading-relaxed">{slide.description}</p>
                </motion.div>
              </div>
            </div>
          </motion.section>
        )
      case "financialSummary":
        return (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-16 px-4 flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-white/80 to-blue-50/60 backdrop-blur-xl rounded-3xl shadow-2xl"
          >
            <div className="w-full max-w-7xl mx-auto text-center">
              <Badge className="mb-4 bg-blue-100 text-blue-600 border-blue-200 text-base px-4 py-2 rounded-full shadow-sm">
                📊 12-Month Financial Summary
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">{slide.title}</h1>
              
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-xl bg-white/70 backdrop-blur-lg shadow p-6"
                >
                  <h3 className="text-lg font-bold mb-2 text-foreground">💰 Total Investment</h3>
                  <span className="text-3xl font-bold text-blue-600">{slide.totalInvestment}</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="rounded-xl bg-white/70 backdrop-blur-lg shadow p-6"
                >
                  <h3 className="text-lg font-bold mb-2 text-foreground">📈 Total Revenue</h3>
                  <span className="text-3xl font-bold text-green-600">{slide.totalRevenue}</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="rounded-xl bg-white/70 backdrop-blur-lg shadow p-6"
                >
                  <h3 className="text-lg font-bold mb-2 text-foreground">🎯 Status</h3>
                  <span className="text-2xl font-bold text-purple-600">{slide.breakEvenStatus}</span>
                </motion.div>
              </div>

              {/* Phase Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(slide.phases ?? []).map((phase: any, idx: number) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className={`rounded-xl p-6 shadow-lg ${
                      idx === 0 ? 'bg-blue-50 border border-blue-200' :
                      idx === 1 ? 'bg-green-50 border border-green-200' :
                      idx === 2 ? 'bg-yellow-50 border border-yellow-200' :
                      'bg-purple-50 border border-purple-200'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h3 className={`text-lg font-bold ${
                        idx === 0 ? 'text-blue-800' :
                        idx === 1 ? 'text-green-800' :
                        idx === 2 ? 'text-yellow-800' :
                        'text-purple-800'
                      }`}>
                        {phase.name}
                      </h3>
                      <span className="text-sm font-semibold text-gray-600">{phase.period}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Cost</div>
                        <div className="font-bold text-lg">{phase.cost}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Monthly Burn</div>
                        <div className="font-bold text-lg">{phase.monthlyBurn}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600">Revenue</div>
                        <div className="font-bold text-lg">{phase.revenue}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-gray-700 mb-2">Key Expenses:</h4>
                      {(phase.keyExpenses ?? []).map((expense: string, expIdx: number) => (
                        <div key={expIdx} className="text-xs text-gray-600 flex justify-between">
                          <span>{expense.split(':')[0]}:</span>
                          <span className="font-semibold">{expense.split(':')[1]}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>
        )
      case "competitiveAdvantage":
        return (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-16 px-4 flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-white/80 to-blue-50/60 backdrop-blur-xl rounded-3xl shadow-2xl"
          >
            <div className="w-full max-w-5xl mx-auto text-center">
              <Badge className="mb-4 bg-blue-100 text-blue-600 border-blue-200 text-base px-4 py-2 rounded-full shadow-sm">
                Competitive Advantage
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">{slide.title}</h1>
              <div className="overflow-x-auto mb-8">
                <table className="min-w-full border-separate border-spacing-0 text-left text-base leading-relaxed shadow-lg rounded-xl bg-white/80">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 font-bold text-blue-900 bg-blue-100 border border-blue-200 text-base">Feature</th>
                      {(slide.competitors ?? []).map((comp: string, idx: number) => (
                        <th key={idx} className={`px-4 py-3 font-bold border border-blue-200 text-base ${idx === 0 ? 'text-green-700 bg-green-50' : 'text-gray-700 bg-gray-50'}`}>{comp}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(slide.criteria ?? []).map((row: any, idx: number) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                        <td className="px-4 py-3 border border-blue-100 font-medium text-gray-800 text-left">{row.label}</td>
                        {row.values.map((val: boolean, cidx: number) => (
                          <td key={cidx} className={`px-4 py-3 border border-blue-100 text-center text-xl ${cidx === 0 ? 'text-green-600 font-bold' : 'text-gray-500'}`}>{val ? '✅' : '❌'}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="text-lg text-gray-700 max-w-2xl mx-auto bg-blue-50 rounded-xl p-6 shadow">
                {slide.description}
              </div>
            </div>
          </motion.section>
        )
      default:
        return null
    }
  }

  return (
    <div 
      className="min-h-screen bg-white"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Navigation */}
      <SlideNavigation currentSlide={currentSlide} slides={slides} goToSlide={goToSlide} />
      
      {/* Slide Content */}
      <div className="container mx-auto px-8 py-16 min-h-screen flex items-center">
        <div className="w-full">{renderSlideContent()}</div>
      </div>
      
      {/* Navigation Buttons */}
      <div className="fixed bottom-8 left-8">
        <Button
          onClick={prevSlide}
          variant="outline"
          size="lg"
          disabled={currentSlide === 0}
          className="bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Previous
        </Button>
      </div>
      <div className="fixed bottom-8 right-8">
        <Button
          onClick={nextSlide}
          variant="outline"
          size="lg"
          disabled={currentSlide === slides.length - 1}
          className="bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-200"
        >
          Next
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
      
      {/* Slide Counter */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <span className="text-sm font-medium">
            {currentSlide + 1} / {slides.length}
          </span>
        </div>
      </div>
      
      {/* Navigation Instructions */}
      <div className="fixed top-8 right-8 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
        <div className="text-xs text-gray-600 space-y-1">
          <div>← → Arrow keys</div>
          <div>Spacebar: Next</div>
          <div>Swipe on mobile</div>
        </div>
      </div>
    </div>
  )
} 