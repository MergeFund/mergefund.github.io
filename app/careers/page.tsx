"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Linkedin, Users, Heart, Share2, TrendingUp, Zap, Globe } from "lucide-react"
import Link from "next/link"

export default function CareersPage() {
  const router = useRouter()

  const values = [
    {
      title: "Open Source First",
      description: "We believe in the power of open source and want to make it sustainable for developers worldwide.",
      icon: <Heart className="w-8 h-8" />,
      color: "text-red-500"
    },
    {
      title: "Developer Empowerment",
      description: "Our mission is to empower developers to get paid for their valuable contributions to open source.",
      icon: <Users className="w-8 h-8" />,
      color: "text-blue-500"
    },
    {
      title: "Innovation Driven",
      description: "We're building the future of developer compensation through blockchain and AI technology.",
      icon: <Zap className="w-8 h-8" />,
      color: "text-yellow-500"
    },
    {
      title: "Global Impact",
      description: "We're creating opportunities for developers around the world to monetize their skills.",
      icon: <Globe className="w-8 h-8" />,
      color: "text-green-500"
    }
  ]

  const waysToHelp = [
    {
      title: "Follow Our Journey",
      description: "Stay updated with our latest developments, funding news, and future hiring opportunities.",
      action: "Follow on LinkedIn",
      link: "https://www.linkedin.com/company/mergefund",
      icon: <Linkedin className="w-6 h-6" />
    },
    {
      title: "Spread the Word",
      description: "Tell your developer friends about MergeFund and help us grow our community.",
      action: "Share MergeFund",
      link: "#",
      icon: <Share2 className="w-6 h-6" />
    },
    {
      title: "Join the Waitlist",
      description: "Be among the first to know when we launch and start accepting contributors.",
      action: "Get Early Access",
      link: "/waitlist",
      icon: <TrendingUp className="w-6 h-6" />
    }
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
            Join Our Mission
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8"
          >
            We're building the future of developer compensation, one bounty at a time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-white mb-4">🚀 We're Not Hiring Yet, But...</h2>
            <p className="text-white/90 mb-4">
              We're currently focused on building our MVP and securing funding. While we're not hiring yet, 
              we'd love to stay connected with passionate developers who share our vision.
            </p>
            <Badge className="bg-green-500 text-white px-4 py-2 text-lg">
              Pay: Free.99 (for now) 😄
            </Badge>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-border hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-8 text-center">
                    <div className={`${value.color} mb-4 flex justify-center`}>
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Help Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">How You Can Help</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Even though we're not hiring yet, here's how you can support our mission
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {waysToHelp.map((way, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-border hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div className="text-primary mb-4">
                      {way.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{way.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{way.description}</p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        if (way.link === "#") {
                          // Handle share functionality
                          if (navigator.share) {
                            navigator.share({
                              title: 'MergeFund - The Developer Sidehustle Engine',
                              text: 'Check out MergeFund - where developers get paid for open source contributions!',
                              url: window.location.origin
                            })
                          } else {
                            // Fallback: copy to clipboard
                            navigator.clipboard.writeText(window.location.origin)
                            alert('Link copied to clipboard!')
                          }
                        } else if (way.link === "/waitlist") {
                          router.push(way.link)
                        } else {
                          window.open(way.link, '_blank')
                        }
                      }}
                    >
                      {way.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Opportunities Section */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Future Opportunities</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              When we do start hiring, here are the roles we're planning for
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Full-Stack Engineers",
                description: "Build the core platform that connects developers with bounties",
                skills: ["React", "Node.js", "TypeScript", "PostgreSQL"]
              },
              {
                title: "DevOps Engineers",
                description: "Scale our infrastructure and ensure platform reliability",
                skills: ["AWS", "Docker", "Kubernetes", "CI/CD"]
              },
              {
                title: "Product Managers",
                description: "Shape the future of developer compensation and platform features",
                skills: ["Product Strategy", "User Research", "Analytics", "Agile"]
              },
              {
                title: "Community Managers",
                description: "Build and nurture our developer community",
                skills: ["Community Building", "Content Creation", "Event Planning", "Social Media"]
              },
              {
                title: "Blockchain Developers",
                description: "Integrate crypto payments and smart contracts",
                skills: ["Solidity", "Web3", "Ethereum", "Smart Contracts"]
              },
              {
                title: "Data Scientists",
                description: "Build AI systems for contributor scoring and fraud detection",
                skills: ["Python", "Machine Learning", "Data Analysis", "AI/ML"]
              }
            ].map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-border hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold mb-2">{role.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm">{role.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Join the Revolution?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Follow our journey and be the first to know when we start building our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => window.open("https://www.linkedin.com/company/mergefund", "_blank")}
              >
                <Linkedin className="w-5 h-5 mr-2" />
                Follow on LinkedIn
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600"
                onClick={() => router.push("/waitlist")}
              >
                Join the Waitlist
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 