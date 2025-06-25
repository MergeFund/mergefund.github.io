"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Clock, Users, MessageCircle, Heart } from "lucide-react"
import Link from "next/link"

export default function SupportPage() {
  const router = useRouter()

  const contactMethods = [
    {
      title: "Email Support",
      description: "For general inquiries, technical issues, and platform questions",
      contact: "support@mergefund.org",
      icon: <Mail className="w-6 h-6" />,
      responseTime: "24-48 hours",
      color: "text-blue-600"
    },
    {
      title: "Founder Direct Contact",
      description: "For urgent matters, partnerships, or strategic discussions",
      contact: "Direct LinkedIn messages",
      icon: <Users className="w-6 h-6" />,
      responseTime: "1-3 business days",
      color: "text-purple-600"
    }
  ]

  const founders = [
    {
      name: "Isaac Gbaba",
      role: "Co-Founder & Developer",
      linkedin: "https://www.linkedin.com/in/isaacgbaba",
      company: "Berkeley Labs, PCG"
    },
    {
      name: "Matthew Boekamp", 
      role: "Co-Founder & Developer",
      linkedin: "https://www.linkedin.com/in/matthewboekamp",
      company: "Hanover Insurance"
    },
    {
      name: "Damien Johnson",
      role: "Co-Founder & Developer", 
      linkedin: "https://www.linkedin.com/in/damien-johnson-aws",
      company: "AWS, Accenture, John Deere"
    },
    {
      name: "Evelyn Yaskin",
      role: "Co-Founder & Developer",
      linkedin: "https://www.linkedin.com/in/evelynyaskin", 
      company: "Fidelity/eMoney"
    },
    {
      name: "Alvin He",
      role: "Co-Founder & Strategist",
      linkedin: "https://www.linkedin.com/in/alvinhe",
      company: "CVS, prev. Discord + Dell"
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
            Support Center
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed"
          >
            We're here to help you succeed on MergeFund. Our founders are extremely busy but will try their very best to respond with swiftness to any question.
          </motion.p>
        </div>
      </section>

      {/* Contact Methods */}
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
              Get Help
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              How Can We Help You?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose the best way to reach out based on your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-border hover:shadow-lg transition-all duration-300 h-full">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg bg-primary/10 ${method.color}`}>
                        {method.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{method.title}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>Response time: {method.responseTime}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{method.description}</p>
                    {method.title === "Email Support" ? (
                      <a href={`mailto:${method.contact}`}>
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                          <Mail className="w-4 h-4 mr-2" />
                          Send Email
                        </Button>
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Contact: <span className="font-medium">{method.contact}</span>
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
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
              Meet Our Team
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Our Founders
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experienced developers and entrepreneurs building the future of open source compensation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-border hover:shadow-lg transition-all duration-300 h-full">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{founder.name}</h3>
                    <p className="text-accent font-semibold mb-2">{founder.role}</p>
                    <p className="text-sm text-muted-foreground mb-4">{founder.company}</p>
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Connect on LinkedIn
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Response Time Notice */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Card className="max-w-4xl mx-auto border-primary/20 bg-primary/5">
              <CardContent className="p-8">
                <div className="flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-primary mr-3" />
                  <h3 className="text-2xl font-bold text-foreground">Important Notice</h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  Our founders are <strong>extremely busy</strong> building MergeFund and managing their existing commitments, 
                  but they will try their very best to respond with swiftness to any question you may have.
                </p>
                <p className="text-muted-foreground">
                  For the fastest response, please use our support email for general inquiries. 
                  Direct LinkedIn messages are best for urgent matters or strategic discussions.
                </p>
              </CardContent>
            </Card>
          </motion.div>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of developers already earning real rewards on MergeFund
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => router.push("/waitlist")}
              >
                Join the Waitlist
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600"
                onClick={() => router.push("/about")}
              >
                Learn More About Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 