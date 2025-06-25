"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Bot, 
  X, 
  Send,
  MessageCircle,
  Sparkles,
  Coins,
  Users,
  Target,
  Rocket
} from "lucide-react"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

const FAQ_DATA = {
  "how does mergefund work": {
    answer: "MergeFund connects developers with open source projects that need help. Here's how it works:\n\n1. **Browse Bounties**: Find open source issues that match your skills\n2. **Submit Solutions**: Work on the code and submit your contribution\n3. **Get Reviewed**: Maintainers review and approve your work\n4. **Earn Rewards**: Get paid in USDC or fiat (in applicable countries)\n\nWe use smart contracts to ensure secure, transparent payments.",
    icon: <Coins className="w-5 h-5" />
  },
  "what are your plans": {
    answer: "Our roadmap includes:\n\n**Phase 1 (Q2 2025)**: Platform launch with core bounty functionality\n**Phase 2 (Q3 2025)**: Advanced features like reputation system and AI matching\n**Phase 3 (Q4 2025)**: Mobile app and enterprise partnerships\n**Phase 4 (2026)**: Global expansion and additional payment methods\n\nWe're focused on building the most trusted platform for open source compensation.",
    icon: <Target className="w-5 h-5" />
  },
  "what are your goals": {
    answer: "Our mission is to make open source sustainable for developers worldwide:\n\n🎯 **Empower Developers**: Help developers earn real income from their contributions\n🌍 **Global Access**: Make opportunities available to developers everywhere\n🔒 **Trust & Security**: Build the most secure and transparent platform\n🚀 **Innovation**: Advance the future of developer compensation\n\nWe want to create a world where every developer can get paid for meaningful open source work.",
    icon: <Rocket className="w-5 h-5" />
  },
  "how do payments work": {
    answer: "Payments on MergeFund are secure and flexible:\n\n💰 **USDC Payments**: Primary payment method using stable cryptocurrency\n💳 **Fiat Payments**: Available in applicable countries\n🔒 **Smart Contract Escrow**: Funds are held securely until work is approved\n⚡ **Instant Payouts**: Get paid immediately upon approval\n\nWe handle all the payment processing so you can focus on coding.",
    icon: <Coins className="w-5 h-5" />
  },
  "who can join": {
    answer: "MergeFund is open to developers worldwide:\n\n👨‍💻 **Developers**: Anyone who can contribute code to open source projects\n🏗️ **Maintainers**: Project owners who need help with their codebase\n🌍 **Global**: Available to developers in supported countries\n\nWhether you're a student, freelancer, or full-time developer, if you can code, you can earn on MergeFund!",
    icon: <Users className="w-5 h-5" />
  }
}

export function AIChatbox({ open, onClose }: { open?: boolean, onClose?: () => void } = {}) {
  const [internalOpen, setInternalOpen] = useState(false)
  const isControlled = typeof open === "boolean"
  const isOpen = isControlled ? open : internalOpen
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Crypto, your AI assistant. I can help you learn about MergeFund, how it works, our plans, and goals. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const findBestMatch = (userInput: string) => {
    const input = userInput.toLowerCase()
    
    for (const [key, data] of Object.entries(FAQ_DATA)) {
      if (input.includes(key) || key.includes(input)) {
        return { key, data }
      }
    }
    
    // Check for partial matches
    for (const [key, data] of Object.entries(FAQ_DATA)) {
      const keywords = key.split(" ")
      if (keywords.some(keyword => input.includes(keyword))) {
        return { key, data }
      }
    }
    
    return null
  }

  const generateResponse = async (userInput: string) => {
    setIsTyping(true)
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))
    
    const match = findBestMatch(userInput)
    
    let response = ""
    if (match) {
      response = match.data.answer
    } else {
      response = "I'm here to help you learn about MergeFund! You can ask me about:\n\n• How MergeFund works\n• Our plans and roadmap\n• Our goals and mission\n• How payments work\n• Who can join the platform\n\nTry asking one of these questions or something similar!"
    }
    
    setIsTyping(false)
    return response
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")

    const response = await generateResponse(inputValue)
    
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      isUser: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, aiMessage])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const suggestedQuestions = [
    "How does MergeFund work?",
    "What are your plans?",
    "How do payments work?",
    "Who can join?"
  ]

  const handleToggle = () => {
    if (isControlled) {
      if (isOpen && onClose) onClose()
      else if (!isOpen && onClose) onClose() // Only close, opening is handled by parent
    } else {
      setInternalOpen((prev) => !prev)
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-96 h-[500px] z-50"
          >
            <Card className="w-full h-full shadow-xl border-0 bg-background/95 backdrop-blur-md">
              <CardContent className="p-0 h-full flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-border bg-gradient-to-r from-primary/10 to-accent/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Crypto</h3>
                      <p className="text-xs text-muted-foreground">AI Assistant</p>
                    </div>
                    <Sparkles className="w-4 h-4 text-accent ml-auto" />
                    <button
                      onClick={handleToggle}
                      className="p-1 hover:bg-muted rounded-md transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.isUser
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm">{message.text}</div>
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-muted text-foreground p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-foreground rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {messages.length === 1 && (
                  <div className="p-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestedQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-7"
                          onClick={() => {
                            setInputValue(question)
                            inputRef.current?.focus()
                          }}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me about MergeFund..."
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      size="icon"
                      className="w-10 h-10"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 