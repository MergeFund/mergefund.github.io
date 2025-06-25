"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  ArrowLeft, 
  ArrowRight, 
  Users, 
  Lightning, 
  Gift, 
  Bell, 
  CheckCircle, 
  GithubLogo, 
  LinkedinLogo, 
  Envelope, 
  User, 
  Briefcase 
} from "@phosphor-icons/react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function WaitlistPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [githubProfile, setGithubProfile] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    if (!name.trim()) {
      setError("Please enter your name")
      setIsSubmitting(false)
      return
    }

    if (!email) {
      setError("Please enter your email address")
      setIsSubmitting(false)
      return
    }

    if (!role.trim()) {
      setError("Please select your role")
      setIsSubmitting(false)
      return
    }

    try {
      const { error: supabaseError } = await supabase
        .from('waitlist')
        .insert([
          {
            name: name.trim(),
            email: email,
            role: role.trim(),
            github_profile: githubProfile || null
          }
        ])

      if (supabaseError) {
        if (supabaseError.code === '23505') {
          setError("This email is already on our waitlist!")
        } else {
          setError("Something went wrong. Please try again.")
        }
        setIsSubmitting(false)
        return
      }

      // Success
      setIsSubmitted(true)
      setIsSubmitting(false)
    } catch (error) {
      setError("Something went wrong. Please try again.")
      setIsSubmitting(false)
    }
  }

  const benefits = [
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Early Access",
      description: "Be among the first to access the platform when we launch"
    },
    {
      icon: <Lightning className="w-6 h-6" />,
      title: "Priority Support",
      description: "Get priority customer support during the beta phase"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Exclusive Community",
      description: "Join our private Discord for early adopters"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Launch Notifications",
      description: "Get notified immediately when we go live"
    }
  ]

  const stats = [
    { label: "Current Waitlist", value: "150+", description: "developers" },
    { label: "Launch Target", value: "Q2 2025", description: "estimated" },
    { label: "Early Access", value: "First 500", description: "users" }
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar isLoggedIn={false} onLogout={() => {}} />
        
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-foreground"
            >
              Welcome to MergeFund
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-muted-foreground mb-8 leading-relaxed"
            >
              You're now on our exclusive waitlist. We'll notify you as soon as MergeFund launches and you can start earning real rewards for your open source contributions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-background to-muted/30 rounded-2xl p-8 mb-8 border border-border shadow-sm"
            >
              <h3 className="font-semibold text-lg mb-6 text-foreground">What happens next?</h3>
              <ul className="text-left space-y-4 text-muted-foreground">
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Confirmation Email</span>
                    <p className="text-sm mt-1">You'll receive a welcome email at launch</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bell className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Progress Updates</span>
                    <p className="text-sm mt-1">We'll keep you updated on our development progress</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Gift className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Early Access</span>
                    <p className="text-sm mt-1">You'll get priority access when we launch</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                variant="outline"
                onClick={() => router.push("/")}
                className="px-8 py-3 h-12 border-2 border-border hover:border-primary/50 transition-all duration-200 rounded-lg shadow-sm font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <Button
                onClick={() => window.open("https://www.linkedin.com/company/mergefund", "_blank")}
                className="px-8 py-3 h-12 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 rounded-lg shadow-sm font-medium"
              >
                <LinkedinLogo className="w-4 h-4 mr-2" />
                Follow on LinkedIn
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

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
            Join the Waitlist
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Be among the first developers to earn real rewards for open source contributions. 
            Sign up now and get early access when we launch.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto"
          >
            <div className="grid md:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                  <div className="text-white/60 text-xs">{stat.description}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sign Up Form */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="border-border shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold">Get Early Access</CardTitle>
                    <p className="text-muted-foreground">
                      Join 150+ developers already on our waitlist
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-foreground">Name *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                          <Input
                            id="name"
                            type="text"
                            placeholder="Your Name"
                            className="pl-10 h-12 bg-background border-2 border-border hover:border-primary/50 focus:border-primary transition-colors duration-200 rounded-lg shadow-sm"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-foreground">Email Address *</Label>
                        <div className="relative">
                          <Envelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            className="pl-10 h-12 bg-background border-2 border-border hover:border-primary/50 focus:border-primary transition-colors duration-200 rounded-lg shadow-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="role" className="text-sm font-medium text-foreground">Role *</Label>
                        <Select value={role} onValueChange={setRole} required>
                          <SelectTrigger className="w-full h-12 bg-background border-2 border-border hover:border-primary/50 focus:border-primary transition-colors duration-200 rounded-lg shadow-sm">
                            <SelectValue placeholder="Select your role" className="text-foreground placeholder:text-muted-foreground" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border-2 border-border rounded-lg shadow-lg">
                            <SelectItem value="Developer" className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer py-3">
                              Developer
                            </SelectItem>
                            <SelectItem value="Maintainer" className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer py-3">
                              Maintainer
                            </SelectItem>
                            <SelectItem value="Both" className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer py-3">
                              Both
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="github" className="text-sm font-medium text-foreground">GitHub Profile (Optional)</Label>
                        <div className="relative">
                          <GithubLogo className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                          <Input
                            id="github"
                            type="text"
                            placeholder="your-github-profile"
                            className="pl-10 h-12 bg-background border-2 border-border hover:border-primary/50 focus:border-primary transition-colors duration-200 rounded-lg shadow-sm"
                            value={githubProfile}
                            onChange={(e) => setGithubProfile(e.target.value)}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          We'll use this to verify your GitHub profile when we launch
                        </p>
                      </div>

                      {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                          <p className="text-sm text-red-600">{error}</p>
                        </div>
                      )}

                      <Button
                        type="submit"
                        className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 rounded-lg shadow-sm font-medium text-base"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Joining Waitlist...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            Join Waitlist
                            <ArrowRight className="w-5 h-5 ml-2" />
                          </div>
                        )}
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        By joining, you agree to receive updates about MergeFund's launch. 
                        We respect your privacy and won't spam you.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-4">Why Join the Waitlist?</h2>
                  <p className="text-muted-foreground mb-8">
                    Get exclusive benefits and be among the first to experience the future of developer compensation.
                  </p>
                </div>

                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="text-primary">{benefit.icon}</div>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{benefit.title}</h3>
                        <p className="text-muted-foreground text-sm">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-muted/50 rounded-lg p-6">
                  <h3 className="font-semibold mb-3">Stay Connected</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Follow our journey and get the latest updates
                  </p>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open("https://www.linkedin.com/company/mergefund", "_blank")}
                    >
                      <LinkedinLogo className="w-4 h-4 mr-2" />
                      Follow on LinkedIn
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => router.push("/about")}
                    >
                      Learn More About Us
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 