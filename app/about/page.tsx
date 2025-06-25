"use client"

import { motion, useInView } from "framer-motion"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Target, TrendingUp, Award, Code, GitBranch, Heart, Globe, Zap, Shield, Coins, Car, MapPin } from "lucide-react"

export default function AboutPage() {
  const router = useRouter()

  const timelineData = [
    {
      title: "The Problem",
      description: "Despite thousands of developers pouring sweat into open-source, almost none get paid. Students leave hackathons with polished portfolios—but zero monetization. Maintainers struggle to fund priority issues. Traditional donations rarely translate into shipped code, and existing bounty sites sit outside of GitHub's native workflows.",
      icon: <Target className="w-6 h-6" />,
      color: "bg-red-500"
    },
    {
      title: "The Spark: EasyA Harvard Blockchain Hackathon",
      description: "Originator: Matt first pitched the idea at the EasyA Harvard Blockchain Hackathon—'what if GitHub issues could be funded like Fiverr gigs, but driven by GoFundMe-style donations and settled in crypto?' Name coined: That night, over coffee, the team landed on MergeFund—where funding meets merges.",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-yellow-500"
    },
    {
      title: "Building Momentum: Consensus '25 (Toronto)",
      description: "After Harvard, Isaac and Damien hopped on a plane to Toronto for the Consensus Hackathon (hosted by EasyA). Goals: Deepen relationships with sponsors, refine the funding-to-merge flow, and demo a rough prototype. Outcomes: Secured early commitments for a $15K seed pool and invaluable feedback.",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-blue-500"
    },
    {
      title: "SpurHacks: Isaac's Dedication",
      description: "With the core team back home, Isaac drove 9 hours and slept in his car one night to get to SpurHacks in Toronto. His dedication paid off: Traction: 150 new waitlist signups in 48 hours. Achievement: Won Best Web3 and $3,000 in prizes. Post-hackathon: Isaac was invited to Spur Accelerator with a chance to pitch for one million dollars in funding.",
      icon: <Car className="w-6 h-6" />,
      color: "bg-green-500"
    },

  ]

  const statsData = [
    { label: "Waitlist", value: "150+", description: "developers" },
    { label: "Hackathon Wins", value: "3", description: "major competitions" },
    { label: "Team Size", value: "5", description: "core members" }
  ]

  const teamData = [
    {
      name: "Isaac Gbaba",
      role: "Co-Founder & Developer",
      experience: "Berkeley Labs, PCG, built WaterTAP UI",
    },
    {
      name: "Matthew Boekamp",
      role: "Co-Founder & Developer",
      experience: "Hanover Insurance, full-stack engineer",
    },
    {
      name: "Damien Johnson",
      role: "Co-Founder & Developer",
      experience: "AWS, Accenture, John Deere",
    },
    {
      name: "Evelyn Yaskin",
      role: "Co-Founder & Developer",
      experience: "Fidelity/eMoney frontend engineer",
    },
    {
      name: "Alvin He",
      role: "Co-Founder & Strategist",
      experience: "CVS, prev. Discord + Dell, growth lead",
    }
  ]

  const achievements = [
    "3 consecutive wins for MergeFund",
    "Team has placed at 7+ major hackathons",
    "All co-founders are full-stack ready and battle-tested",
    "Won Best Web3 at SpurHacks ($3,000)",
    "3rd place at Consensus ($1,500)",
    "3rd place at Harvard Blockchain Hackathon",
    "Chance to pitch for $1M in funding"
  ]

  const nextSteps = [
    "Maintainer dashboard: Real-time funding & contributor analytics",
    "Enterprise tier: White-label bounty pools for companies",
    "DAO integration: On-chain governance of collective funds",
    "Mobile app: Push alerts for new bounties & merge confirmations",
    "Series A prep: Demonstrate $250K GMV/month toward a $5M raise"
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"
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
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              variant="outline"
              className="mb-8 bg-white/10 text-white border-white/30 hover:bg-white/20"
              onClick={() => router.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-white"
          >
            Our Story
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed"
          >
            From a Harvard Blockchain Hackathon idea to empowering thousands of developers worldwide. 
            Here's how MergeFund came to life and where we're headed next.
          </motion.p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">The Journey</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From problem identification to solution, here's how MergeFund evolved
            </p>
          </motion.div>

          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-start gap-8 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="flex-1">
                  <Card className="border-border hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-white`}>
                          {item.icon}
                        </div>
                        <CardTitle className="text-2xl">{item.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 ${item.color} rounded-full`}></div>
                  {index < timelineData.length - 1 && (
                    <div className="w-1 h-24 bg-border mt-2"></div>
                  )}
                </div>
                
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Today's Impact</h2>
            <p className="text-xl text-muted-foreground">
              The numbers that show our progress
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Card className="border-border hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
                    <div className="text-muted-foreground">{stat.description}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Built By Hackathon Champions</h2>
            <p className="text-xl text-muted-foreground">
              Meet the founders who started it all
            </p>
          </motion.div>

          {/* Team Photo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center mb-16"
          >
            <div className="relative w-full max-w-4xl">
              <img src="/team-photo.jpeg" alt="MergeFund Team" className="w-full rounded-lg shadow-lg" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </motion.div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {teamData.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-border hover:shadow-lg transition-all duration-300 text-center h-full">
                  <CardContent className="p-8">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <Badge className="mb-3 bg-primary text-primary-foreground">{member.role}</Badge>
                    <p className="text-muted-foreground mb-3">{member.experience}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-border hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                      <p className="text-foreground font-medium">{achievement}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Business Model Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Business Model & Financials</h2>
            <p className="text-xl text-muted-foreground">
              Sustainable growth through fair pricing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Coins className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Take Rate</h3>
                  <div className="text-3xl font-bold text-green-600 mb-2">10%</div>
                  <p className="text-muted-foreground">per bounty</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Target className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Year-1 Target</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">$100K</div>
                  <p className="text-muted-foreground">in volume</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Revenue</h3>
                  <div className="text-3xl font-bold text-purple-600 mb-2">$10K</div>
                  <p className="text-muted-foreground">projected</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="border-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Shield className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Funding Goal</h3>
                  <div className="text-3xl font-bold text-orange-600 mb-2">$100K</div>
                  <p className="text-muted-foreground">target raise</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Next Section */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">What's Next</h2>
            <p className="text-xl text-muted-foreground">
              Our roadmap for the future
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nextSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-border hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-white text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{step}</p>
                    </div>
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
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-lg mb-8">
              <h3 className="text-3xl font-bold mb-4">Join us in funding the future of open-source.</h3>
              <div className="flex justify-center space-x-6 mt-6">
                <Button variant="secondary" size="lg">
                  <Code className="w-5 h-5 mr-2" />
                  View GitHub
                </Button>
                <a href="https://www.linkedin.com/company/mergefund" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                    Get in Touch
                  </Button>
                </a>
              </div>
            </div>
            
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg transition-all duration-200"
              onClick={() => router.push("/waitlist")}
            >
              Join the Movement <Heart className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 