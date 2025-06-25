"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Trophy, Users, Globe, Code, Video, FileText, Coins, Zap, Shield, Award, Link, Calendar, MapPin } from "lucide-react"

export default function HackathonsPage() {
  const router = useRouter()

  const features = [
    {
      title: "Global Hosting",
      description: "Host hackathons worldwide with our platform. Create custom pages with your logo, tracks, and bounties.",
      icon: <Globe className="w-8 h-8" />,
      color: "text-blue-600"
    },
    {
      title: "Custom Branding",
      description: "Full customization with your company logo, colors, and branding. Make it your own hackathon experience.",
      icon: <Award className="w-8 h-8" />,
      color: "text-purple-600"
    },
    {
      title: "Track Management",
      description: "Create multiple tracks and categories. Set specific bounties and prizes for each track.",
      icon: <Code className="w-8 h-8" />,
      color: "text-green-600"
    },
    {
      title: "Special Invite Links",
      description: "Generate unique invite links for participants to join directly to your hackathon page.",
      icon: <Link className="w-8 h-8" />,
      color: "text-orange-600"
    },
    {
      title: "Project Submissions",
      description: "Students submit GitHub repos, demo videos, and attachments. All organized in one place.",
      icon: <Video className="w-8 h-8" />,
      color: "text-red-600"
    },
    {
      title: "Instant Payouts",
      description: "Winners get paid immediately in USDC or fiat when selected. No waiting, no delays.",
      icon: <Coins className="w-8 h-8" />,
      color: "text-emerald-600"
    }
  ]

  const submissionProcess = [
    {
      step: "1",
      title: "Project Submission",
      description: "Participants submit their GitHub repository, demo video, and any additional attachments through our platform.",
      icon: <Code className="w-6 h-6" />
    },
    {
      step: "2",
      title: "Judging & Review",
      description: "Your team reviews submissions on the hackathon projects page, similar to Devpost but with integrated payments.",
      icon: <Users className="w-6 h-6" />
    },
    {
      step: "3",
      title: "Winner Selection",
      description: "Select winners and runners-up. Our platform handles all the payment logistics automatically.",
      icon: <Trophy className="w-6 h-6" />
    },
    {
      step: "4",
      title: "Instant Payout",
      description: "Winners receive payments immediately in USDC or fiat, depending on their location and preference.",
      icon: <Zap className="w-6 h-6" />
    }
  ]

  const benefits = [
    {
      title: "Seamless Experience",
      description: "Everything from registration to payout happens on one platform. No need for multiple tools.",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Global Reach",
      description: "Access developers worldwide. Our platform supports multiple currencies and payment methods.",
      icon: <Globe className="w-6 h-6" />
    },
    {
      title: "Reduced Overhead",
      description: "No need to manage payments, track submissions, or handle logistics. We handle it all.",
      icon: <Coins className="w-6 h-6" />
    },
    {
      title: "Professional Branding",
      description: "Custom pages that reflect your brand. Professional presentation for participants and sponsors.",
      icon: <Award className="w-6 h-6" />
    }
  ]

  const pricing = [
    {
      plan: "Basic",
      price: "2%",
      description: "per transaction",
      features: [
        "Custom hackathon page",
        "Track management",
        "Project submissions",
        "Basic analytics",
        "Email support"
      ]
    },
    {
      plan: "Professional",
      price: "2.5%",
      description: "per transaction",
      features: [
        "Everything in Basic",
        "Advanced analytics",
        "Custom branding",
        "Priority support",
        "API access",
        "White-label options"
      ]
    },
    {
      plan: "Enterprise",
      price: "Contact Sales",
      description: "custom pricing",
      features: [
        "Everything in Professional",
        "Dedicated support",
        "Custom integrations",
        "On-site assistance",
        "Volume discounts",
        "SLA guarantees"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={false} onLogout={() => {}} />

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
            Host Hackathons Worldwide
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-8"
          >
            Create, manage, and host hackathons globally with MergeFund. From custom branding to instant payouts, 
            we provide everything you need to run successful hackathons at scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-purple-600 hover:bg-gray-100"
              onClick={() => router.push("/waitlist")}
            >
              Host a Hackathon
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600"
              onClick={() => router.push("/support")}
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
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
              Platform Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Everything You Need to Host
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete hackathon management platform with custom branding, global reach, and instant payouts
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-border hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className={`p-3 rounded-lg bg-primary/10 ${feature.color} w-fit mb-4`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From submission to payout, here's how our hackathon platform works
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {submissionProcess.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-border hover:shadow-lg transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {step.step}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{step.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                          {step.icon}
                          <span>Step {step.step}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Why Choose MergeFund?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The advantages of hosting your hackathons on our platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-border hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {benefit.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                        <p className="text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Pricing
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Competitive rates for hackathon hosting. Lower fees for higher volume and enterprise customers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className={`border-border hover:shadow-lg transition-all duration-300 h-full ${
                  plan.plan === "Professional" ? "border-primary ring-2 ring-primary/20" : ""
                }`}>
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.plan}</CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-primary">{plan.price}</span>
                      <span className="text-muted-foreground ml-2">{plan.description}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full mt-6"
                      variant={plan.plan === "Professional" ? "default" : "outline"}
                      onClick={() => router.push("/waitlist")}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Host Your Hackathon?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join companies worldwide who trust MergeFund to power their hackathons. 
              From setup to payout, we handle everything.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => router.push("/waitlist")}
              >
                Start Hosting
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600"
                onClick={() => router.push("/support")}
              >
                Contact Sales
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 