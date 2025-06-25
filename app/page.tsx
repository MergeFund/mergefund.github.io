"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TrendingUp, Coins, Lock, Globe, Shield, Users, Zap, Award, Code, GitBranch, Heart } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [typewriterText, setTypewriterText] = useState("")
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [featuredTypewriter, setFeaturedTypewriter] = useState("")
  const [featuredCurrentPhrase, setFeaturedCurrentPhrase] = useState(0)
  const [featuredIsDeleting, setFeaturedIsDeleting] = useState(false)
  const router = useRouter()
  const repoPartnersRef = useRef<HTMLDivElement>(null)

  // Framer Motion hooks
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -100])

  const phrases = ["Build real impact.", "Get paid to contribute."]

  const featuredPhrases = ["Example of Bounties", "High-Value Opportunities", "Premium Projects"]

  useEffect(() => {
    const loggedIn = localStorage?.getItem("isLoggedIn") === "true"
    if (loggedIn) {
      setIsLoggedIn(true)
    }
  }, [])

  // Hero typewriter effect
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100
    const pauseTime = isDeleting ? 500 : 2000

    const timer = setTimeout(() => {
      const currentText = phrases[currentPhrase]

      if (!isDeleting && typewriterText === currentText) {
        setTimeout(() => setIsDeleting(true), pauseTime)
        return
      }

      if (isDeleting && typewriterText === "") {
        setIsDeleting(false)
        setCurrentPhrase((prev) => (prev + 1) % phrases.length)
        return
      }

      if (isDeleting) {
        setTypewriterText(currentText.substring(0, typewriterText.length - 1))
      } else {
        setTypewriterText(currentText.substring(0, typewriterText.length + 1))
      }
    }, typeSpeed)

    return () => clearTimeout(timer)
  }, [typewriterText, currentPhrase, isDeleting, phrases])

  // Featured bounties typewriter effect
  useEffect(() => {
    const typeSpeed = featuredIsDeleting ? 60 : 120
    const pauseTime = featuredIsDeleting ? 800 : 3000

    const timer = setTimeout(() => {
      const currentText = featuredPhrases[featuredCurrentPhrase]

      if (!featuredIsDeleting && featuredTypewriter === currentText) {
        setTimeout(() => setFeaturedIsDeleting(true), pauseTime)
        return
      }

      if (featuredIsDeleting && featuredTypewriter === "") {
        setFeaturedIsDeleting(false)
        setFeaturedCurrentPhrase((prev) => (prev + 1) % featuredPhrases.length)
        return
      }

      if (featuredIsDeleting) {
        setFeaturedTypewriter(currentText.substring(0, featuredTypewriter.length - 1))
      } else {
        setFeaturedTypewriter(currentText.substring(0, featuredTypewriter.length + 1))
      }
    }, typeSpeed)

    return () => clearTimeout(timer)
  }, [featuredTypewriter, featuredCurrentPhrase, featuredIsDeleting, featuredPhrases])

  const handleLogout = () => {
    setIsLoggedIn(false)
    if (typeof window !== "undefined") {
      localStorage?.removeItem("isLoggedIn")
      localStorage?.removeItem("user")
    }
  }

  const navigateTo = (path: string) => {
    const loggedIn = typeof window !== "undefined" && localStorage?.getItem("isLoggedIn") === "true"
    if (loggedIn) {
      router.push(path)
    } else {
      router.push("/login")
    }
  }

  const scrollToRepoPartners = () => {
    repoPartnersRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Use the sophisticated Navbar component */}
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 px-4 bg-background relative overflow-hidden">
        {/* Floating background elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="h-32 md:h-40 flex items-center justify-center mb-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-accent relative">
                {typewriterText}
                <span className="animate-pulse">|</span>
              </span>
              {typewriterText.includes("impact") && (
                <style jsx>{`
                  @keyframes glow {
                    0%, 100% { text-shadow: 0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor; }
                    50% { text-shadow: 0 0 10px currentColor, 0 0 20px currentColor, 0 0 30px currentColor; }
                  }
                  .impact-glow {
                    animation: glow 2s ease-in-out infinite;
                    background: linear-gradient(45deg, hsl(var(--accent)), hsl(var(--primary)));
                    background-clip: text;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-size: 200% 200%;
                    animation: glow 2s ease-in-out infinite, gradient-shift 3s ease-in-out infinite;
                  }
                  @keyframes gradient-shift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                  }
                `}</style>
              )}
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Empowering software developers to earn real rewards by solving open‑source issues. Connect
            with projects, showcase your skills, and get rewarded for your contributions.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
            <Button
              size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg transition-all duration-200"
              onClick={() => router.push("/waitlist")}
            >
              Start Contributing <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              onClick={() => router.push("/waitlist")}
            >
              Explore Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              onClick={scrollToRepoPartners}
            >
              I Own a Repo
            </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Bounties */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="h-16 flex items-center justify-center mb-4">
              <h2 className="text-4xl md:text-5xl font-bold text-accent">
                {featuredTypewriter}
                <span className="animate-pulse">|</span>
              </h2>
            </div>
            <p className="text-lg text-muted-foreground">High-value opportunities waiting for skilled developers</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Implement OAuth 2.0 Authentication",
                project: "NextAuth.js",
                reward: "$2,500",
                difficulty: "Advanced",
                tags: ["TypeScript", "OAuth", "Security"],
                description:
                  "Add comprehensive OAuth 2.0 support with multiple providers including GitHub, Google, and Discord",
              },
              {
                title: "Performance Optimization",
                project: "React Query",
                reward: "$1,800",
                difficulty: "Intermediate",
                tags: ["React", "Performance", "Caching"],
                description: "Optimize query caching mechanisms and reduce overall bundle size by 30%",
              },
              {
                title: "Mobile Responsive Design",
                project: "Tailwind UI",
                reward: "$1,200",
                difficulty: "Beginner",
                tags: ["CSS", "Responsive", "Mobile"],
                description: "Make all component library elements fully responsive across mobile devices",
              },
            ].map((bounty, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card
                  className="border-border bg-card hover:shadow-lg transition-all duration-300 cursor-pointer group h-full"
                onClick={() => router.push("/waitlist")}
              >
                <CardHeader className="space-y-3">
                  <div className="flex justify-between items-start">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 font-semibold">
                      {bounty.reward}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        bounty.difficulty === "Advanced"
                          ? "border-red-300 text-red-700 dark:border-red-700 dark:text-red-400"
                          : bounty.difficulty === "Intermediate"
                            ? "border-yellow-300 text-yellow-700 dark:border-yellow-700 dark:text-yellow-400"
                            : "border-green-300 text-green-700 dark:border-green-700 dark:text-green-400"
                      }
                    >
                      {bounty.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-accent transition-colors">{bounty.title}</CardTitle>
                  <CardDescription className="text-accent font-semibold">{bounty.project}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{bounty.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {bounty.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs bg-muted">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 border-border hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              onClick={() => router.push("/waitlist")}
            >
              View All Bounties
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose MergeFund Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Floating elements */}
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors">
                Why Choose Us
              </Badge>
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              The Future of Open Source
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join the most trusted platform where developers earn real rewards for meaningful contributions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Coins className="w-8 h-8" />,
                title: "Real Rewards",
                description: "Earn USDC or fiat payments in applicable countries for your meaningful contributions to open source projects",
                gradient: "from-green-400 to-emerald-500",
                stats: ""
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Secure Payments",
                description: "Blockchain-secured transactions with smart contract escrow protection",
                gradient: "from-blue-400 to-cyan-500",
                stats: "100% secure"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Global Community",
                description: "Connect and collaborate with developers from around the world",
                gradient: "from-purple-400 to-pink-500",
                stats: ""
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Build Reputation",
                description: "Showcase your expertise and grow your professional profile",
                gradient: "from-yellow-400 to-orange-500",
                stats: "Verified profiles"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Instant Payouts",
                description: "Get paid immediately upon project completion and approval",
                gradient: "from-red-400 to-pink-500",
                stats: ""
              },
              {
                icon: <GitBranch className="w-8 h-8" />,
                title: "Quality Projects",
                description: "Curated bounties from top-tier open source projects",
                gradient: "from-indigo-400 to-purple-500",
                stats: ""
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                <Card
                  className="group relative overflow-hidden border-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer"
                  onClick={() => router.push("/waitlist")}
                >
                  <motion.div
                    className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient}`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  />
                  <CardContent className="p-6">
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 5 }}
                    >
                      <div className="text-white">{feature.icon}</div>
                    </motion.div>
                    <CardTitle className="text-xl font-bold mb-3 text-white group-hover:text-white/90 transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-white/80 mb-4 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {feature.stats}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-5 h-5 text-red-400" />
              </motion.div>
              <span className="text-white/90 font-medium"></span>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/60">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2"
              >
                <Code className="w-5 h-5" />
                <span className="text-sm">Open Source First</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2"
              >
                <Shield className="w-5 h-5" />
                <span className="text-sm">Enterprise Security</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm">Global Network</span>
              </motion.div>
            </div>
          </motion.div>
                </div>
      </section>

      {/* Repository Partners Section */}
      <section ref={repoPartnersRef} className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              For Repository Partners
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Accelerate Your Open Source Development
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Partner with MergeFund to get a dedicated profile, accept community donations, and create bounties to speed up development
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: <Users className="w-8 h-8" />,
                title: "Dedicated Profile",
                description: "Get your own MergeFund profile page showcasing your project, team, and contribution opportunities",
                gradient: "from-blue-400 to-cyan-500"
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Community Donations",
                description: "Your community can donate directly to your MergeFund account to support development",
                gradient: "from-pink-400 to-rose-500"
              },
              {
                icon: <Code className="w-8 h-8" />,
                title: "Create Bounties",
                description: "Use donated funds to create bounties on your issues and attract skilled developers",
                gradient: "from-green-400 to-emerald-500"
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "Speed Up Development",
                description: "Get critical issues resolved faster by incentivizing developers with real rewards",
                gradient: "from-yellow-400 to-orange-500"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Quality Control",
                description: "Review and approve contributions before payments are released to maintain code quality",
                gradient: "from-purple-400 to-indigo-500"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Grow Your Community",
                description: "Attract more contributors and build a sustainable funding model for your project",
                gradient: "from-red-400 to-pink-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="border-border hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6`}>
                      <div className="text-white">{feature.icon}</div>
              </div>
                    <CardTitle className="text-xl font-bold mb-3">{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-lg mb-8">
              <h3 className="text-3xl font-bold mb-4">Ready to Partner with MergeFund?</h3>
              <p className="text-xl text-white/90 mb-6">
                Join leading open source projects already using MergeFund to accelerate their development
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-purple-600 hover:bg-gray-100"
                  onClick={() => router.push("/waitlist")}
                >
                  Partner with Us
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-600"
                  onClick={() => router.push("/support")}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How We Stack Up to Competitors Section */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Competitive Advantage
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              How We Stack Up to Competitors
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See why developers choose MergeFund over other platforms
            </p>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-semibold text-foreground">Platform</th>
                  <th className="text-center p-4 font-semibold text-foreground">Payment Method</th>
                  <th className="text-center p-4 font-semibold text-foreground">Fees</th>
                  <th className="text-center p-4 font-semibold text-foreground">Focus</th>
                  <th className="text-center p-4 font-semibold text-foreground">Security</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  {
                    name: "MergeFund",
                    payment: "USDC + Fiat",
                    fees: "10%",
                    focus: "Open Source",
                    security: "Smart Contracts",
                    highlight: true
                  },
                  {
                    name: "Gitcoin",
                    payment: "Platform Tokens",
                    fees: "Variable",
                    focus: "Community",
                    security: "Traditional",
                    highlight: false
                  },
                  {
                    name: "Bountysource",
                    payment: "Fiat/Crypto",
                    fees: "15-20%",
                    focus: "General",
                    security: "Traditional",
                    highlight: false
                  },
                  {
                    name: "Upwork",
                    payment: "Fiat Only",
                    fees: "20%",
                    focus: "Freelancing",
                    security: "Traditional",
                    highlight: false
                  },
                  {
                    name: "Algora",
                    payment: "Crypto",
                    fees: "Variable",
                    focus: "Blockchain",
                    security: "Smart Contracts",
                    highlight: false
                  },
                  {
                    name: "Bounty Hub",
                    payment: "Limited",
                    fees: "10%",
                    focus: "GitHub",
                    security: "Traditional",
                    highlight: false
                  }
                ].map((platform, index) => (
                  <motion.tr 
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      backgroundColor: "rgba(0,0,0,0.02)",
                      transition: { duration: 0.2 }
                    }}
                    className={`${
                      platform.highlight ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                    }`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span className={`font-semibold ${platform.highlight ? 'text-primary' : 'text-foreground'}`}>
                          {platform.name}
                        </span>
                        {platform.highlight && (
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                            viewport={{ once: true }}
                          >
                            <Badge className="bg-primary text-primary-foreground text-xs">
                              Recommended
                            </Badge>
                          </motion.div>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-center text-muted-foreground">{platform.payment}</td>
                    <td className="p-4 text-center">
                      <span className={`font-medium ${platform.highlight ? 'text-primary' : 'text-foreground'}`}>
                        {platform.fees}
                      </span>
                    </td>
                    <td className="p-4 text-center text-muted-foreground">{platform.focus}</td>
                    <td className="p-4 text-center text-muted-foreground">{platform.security}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Key Advantages */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 grid md:grid-cols-3 gap-8"
          >
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="text-center p-6 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Coins className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Flexible Payments</h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Get paid in USDC or fiat payments in applicable countries
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="text-center p-6 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Shield className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Smart Contract Security</h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Blockchain-escrowed payments ensure you always get paid for your work
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="text-center p-6 rounded-lg bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Code className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Open Source Focus</h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Dedicated platform for open source projects and meaningful contributions
              </p>
            </motion.div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg transition-all duration-200"
                onClick={() => router.push("/waitlist")}
              >
                Start Earning on MergeFund <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* Founded With Former Employees Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold mb-8 text-foreground"
          >
            Founded by former employees of
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16"
          >
            {[
              { src: "/AWS_logo-1050x1050.webp", alt: "AWS", className: "h-16 md:h-20 w-16 md:w-20 object-contain opacity-70 hover:opacity-100 transition-opacity duration-200" },
              { src: "/Accenture.svg.png", alt: "Accenture", className: "h-16 md:h-20 w-16 md:w-20 object-contain opacity-70 hover:opacity-100 transition-opacity duration-200" },
              { src: "/fidelity-investments-logo.jpg", alt: "Fidelity Investments", className: "h-16 md:h-20 w-16 md:w-20 object-contain opacity-70 hover:opacity-100 transition-opacity duration-200" },
              { src: "/johndeere.jpg", alt: "John Deere", className: "h-16 md:h-20 w-16 md:w-20 object-contain opacity-70 hover:opacity-100 transition-opacity duration-200" },
              { src: "/Hanover_Insurance_logo.svg.png", alt: "Hanover Insurance", className: "h-16 md:h-20 w-16 md:w-20 object-contain opacity-70 hover:opacity-100 transition-opacity duration-200" },
              { src: "/PCG Logo.png", alt: "PCG", className: "h-16 md:h-20 w-16 md:w-20 object-contain opacity-70 hover:opacity-100 transition-opacity duration-200" },
              { src: "/Dell Logo.jpg", alt: "Dell", className: "h-16 md:h-20 w-16 md:w-20 object-contain opacity-70 hover:opacity-100 transition-opacity duration-200" },
              { src: "/berkeley lab logo .png", alt: "Berkeley Lab", className: "h-16 md:h-20 w-16 md:w-20 object-contain opacity-70 hover:opacity-100 transition-opacity duration-200" },
            ].map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
                className="flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={logo.className}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="about" className="py-20 px-4 bg-background">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Ready to start earning?</h2>
          <p className="text-xl text-muted-foreground mb-12">
            Join thousands of developers already earning real rewards on MergeFund
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg transition-all duration-200 hover:scale-105"
            onClick={() => router.push("/waitlist")}
          >
            Get Started Today <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 relative">
                  <img src="/mergefundIcon.png" alt="MergeFund Logo" className="w-full h-full object-contain" />
                </div>
                <span className="text-xl font-bold">MergeFund</span>
              </div>
              <p className="text-muted-foreground">
                Empowering developers to earn real rewards for meaningful open-source contributions.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-background">Platform</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <button
                    onClick={() => router.push("/waitlist")}
                    className="hover:text-accent transition-colors duration-200"
                  >
                    Discover
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/waitlist")}
                    className="hover:text-accent transition-colors duration-200"
                  >
                    Bounties
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/waitlist")}
                    className="hover:text-accent transition-colors duration-200"
                  >
                    Leaderboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/waitlist")}
                    className="hover:text-accent transition-colors duration-200"
                  >
                    Projects
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-background">Resources</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-accent transition-colors duration-200">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors duration-200">
                    API Reference
                  </a>
                </li>
                <li>
                  <button
                    className="hover:text-accent transition-colors duration-200 text-left w-full"
                    onClick={() => router.push("/support")}
                  >
                    Support Center
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors duration-200">
                    Developer Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-background">Company</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-accent transition-colors duration-200">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-accent transition-colors duration-200">
                    Careers
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors duration-200">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-accent transition-colors duration-200">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 MergeFund. All rights reserved.</p>
          </div>
        </div>
        <div className="mt-8 text-center text-muted-foreground">
          <h4 className="font-semibold mb-2 text-lg">Contact MergeFund</h4>
          <p>Email: <a href="mailto:support@mergefund.org" className="underline hover:text-accent">support@mergefund.org</a></p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <a href="https://www.linkedin.com/in/isaacgbaba" target="_blank" rel="noopener noreferrer" className="hover:text-accent underline">Isaac Gbaba (Co-Founder)</a>
            <a href="https://www.linkedin.com/in/matthewboekamp" target="_blank" rel="noopener noreferrer" className="hover:text-accent underline">Matthew Boekamp (Co-Founder)</a>
            <a href="https://www.linkedin.com/in/damien-johnson-aws" target="_blank" rel="noopener noreferrer" className="hover:text-accent underline">Damien Johnson (Co-Founder)</a>
            <a href="https://www.linkedin.com/in/evelynyaskin" target="_blank" rel="noopener noreferrer" className="hover:text-accent underline">Evelyn Yaskin (Co-Founder)</a>
            <a href="https://www.linkedin.com/in/alvinhe" target="_blank" rel="noopener noreferrer" className="hover:text-accent underline">Alvin He (Co-Founder)</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
