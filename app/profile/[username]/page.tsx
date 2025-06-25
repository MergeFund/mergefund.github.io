"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Edit,
  MapPin,
  Calendar,
  Github,
  Twitter,
  Linkedin,
  DollarSign,
  Trophy,
  Star,
  TrendingUp,
  Save,
  X,
  Camera,
  Mail,
  Phone,
  Globe,
  Building,
  Heart,
  Gift,
  Award,
  Target,
  Clock,
  Code,
  GitPullRequest,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Upload,
  User,
  Settings,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react"
import Image from "next/image"

// User profiles data from demo
const USER_PROFILES = [
  {
    id: "alexcoder",
    username: "alexcoder",
    fullName: "Alex Rodriguez",
    bio: "Backend engineer focused on scalable systems and cloud architecture. Expert in microservices, DevOps, and database optimization. Love solving complex technical challenges.",
    location: "Austin, TX",
    company: "CloudTech Solutions",
    jobTitle: "Senior Backend Engineer",
    education: "Software Engineering, UT Austin",
    website: "https://alexcodes.dev",
    email: "alex@example.com",
    phone: "+1 (555) 456-7890",
    githubUsername: "alexcoder",
    twitterUsername: "alexcodes",
    linkedinUsername: "alexcoder",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=alexcoder",
    coverUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=300&fit=crop",
    skills: ["Go", "Kubernetes", "Docker", "AWS", "PostgreSQL", "Redis", "gRPC", "Terraform", "Python", "Java"],
    interests: ["Cloud Computing", "DevOps", "System Design", "Gaming", "Cycling", "Cooking"],
    totalEarnings: 15420,
    bountiesCompleted: 67,
    reputationScore: 2850,
    globalRank: 1,
    successRate: 96,
    avgCompletionTime: "2.8 days",
    rating: 4.9,
    badges: ["Elite Contributor", "GitHub Master", "Bounty Hunter", "Speed Demon"],
    streak: 12,
    joinDate: "2022-11-10",
    lastActive: "2024-01-16",
    isPublicProfile: true,
    showEmail: false,
    showPhone: true,
    showEarnings: false,
  },
  {
    id: "sarahdev",
    username: "sarahdev",
    fullName: "Sarah Chen",
    bio: "Creative UI/UX designer with a passion for creating beautiful, user-friendly interfaces. Specialized in design systems, accessibility, and modern web design trends.",
    location: "New York, NY",
    company: "Design Studio Pro",
    jobTitle: "Lead UI/UX Designer",
    education: "Design, Parsons School of Design",
    website: "https://sarahdesigns.com",
    email: "sarah@example.com",
    phone: "+1 (555) 987-6543",
    githubUsername: "sarahdev",
    twitterUsername: "sarahdesigns",
    linkedinUsername: "sarahdev",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarahdev",
    coverUrl: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&h=300&fit=crop",
    skills: [
      "Figma",
      "Adobe Creative Suite",
      "Sketch",
      "Prototyping",
      "User Research",
      "Design Systems",
      "HTML/CSS",
      "React",
    ],
    interests: ["Design Trends", "Typography", "Color Theory", "Art", "Travel", "Yoga"],
    totalEarnings: 12890,
    bountiesCompleted: 54,
    reputationScore: 2640,
    globalRank: 2,
    successRate: 98,
    avgCompletionTime: "2.1 days",
    rating: 4.8,
    badges: ["Senior Developer", "Bug Hunter", "Team Player"],
    streak: 8,
    joinDate: "2023-05-20",
    lastActive: "2024-01-14",
    isPublicProfile: true,
    showEmail: true,
    showPhone: false,
    showEarnings: true,
  },
  {
    id: "mikejs",
    username: "mikejs",
    fullName: "Mike Johnson",
    bio: "Full-stack JavaScript developer with expertise in React, Node.js, and modern web technologies. Passionate about creating performant, scalable applications.",
    location: "Seattle, WA",
    company: "Tech Innovations Inc.",
    jobTitle: "Senior Full Stack Developer",
    education: "Computer Science, University of Washington",
    website: "https://mikejs.dev",
    email: "mike@example.com",
    phone: "+1 (555) 321-9876",
    githubUsername: "mikejs",
    twitterUsername: "mikejsdev",
    linkedinUsername: "mikejs",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=mikejs",
    coverUrl: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=300&fit=crop",
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "GraphQL", "MongoDB", "AWS", "Docker"],
    interests: ["Web Development", "Open Source", "Gaming", "Music", "Basketball"],
    totalEarnings: 11250,
    bountiesCompleted: 48,
    reputationScore: 2380,
    globalRank: 3,
    successRate: 94,
    avgCompletionTime: "3.1 days",
    rating: 4.7,
    badges: ["JavaScript Expert", "React Master", "UI Wizard"],
    streak: 15,
    joinDate: "2023-01-15",
    lastActive: "2024-01-15",
    isPublicProfile: true,
    showEmail: false,
    showPhone: false,
    showEarnings: true,
  },
  {
    id: "johndeveloper",
    username: "johndeveloper",
    fullName: "John Developer",
    bio: "Full-stack developer passionate about open source. Love working on React, Node.js, and blockchain projects. Always excited to tackle challenging problems and contribute to meaningful projects.",
    location: "San Francisco, CA",
    company: "Tech Innovations Inc.",
    jobTitle: "Senior Full Stack Developer",
    education: "Computer Science, Stanford University",
    website: "https://johndeveloper.dev",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    githubUsername: "johndeveloper",
    twitterUsername: "johndev",
    linkedinUsername: "johndeveloper",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=johndeveloper",
    coverUrl: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=1200&h=300&fit=crop",
    skills: [
      "React",
      "Node.js",
      "TypeScript",
      "Python",
      "Solidity",
      "PostgreSQL",
      "AWS",
      "Docker",
      "GraphQL",
      "Next.js",
    ],
    interests: ["Open Source", "Blockchain", "AI/ML", "Photography", "Hiking", "Chess"],
    totalEarnings: 9840,
    bountiesCompleted: 42,
    reputationScore: 2120,
    globalRank: 4,
    successRate: 94,
    avgCompletionTime: "3.2 days",
    rating: 4.9,
    badges: ["Rising Star", "Team Player"],
    streak: 5,
    joinDate: "2023-03-15",
    lastActive: "2024-01-15",
    isPublicProfile: true,
    showEmail: false,
    showPhone: false,
    showEarnings: true,
  },
  {
    id: "emmacode",
    username: "emmacode",
    fullName: "Emma Wilson",
    bio: "Data scientist and Python expert with a passion for machine learning and data visualization. Love turning complex data into actionable insights.",
    location: "Boston, MA",
    company: "DataTech Analytics",
    jobTitle: "Senior Data Scientist",
    education: "Data Science, MIT",
    website: "https://emmawilson.dev",
    email: "emma@example.com",
    phone: "+1 (555) 654-3210",
    githubUsername: "emmacode",
    twitterUsername: "emmadata",
    linkedinUsername: "emmacode",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=emmacode",
    coverUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=300&fit=crop",
    skills: ["Python", "Machine Learning", "TensorFlow", "Pandas", "Jupyter", "SQL", "R", "Tableau"],
    interests: ["Data Science", "Machine Learning", "Statistics", "Reading", "Running", "Photography"],
    totalEarnings: 8650,
    bountiesCompleted: 38,
    reputationScore: 1950,
    globalRank: 5,
    successRate: 92,
    avgCompletionTime: "4.2 days",
    rating: 4.6,
    badges: ["Python Expert", "Data Scientist"],
    streak: 3,
    joinDate: "2023-07-10",
    lastActive: "2024-01-13",
    isPublicProfile: true,
    showEmail: false,
    showPhone: false,
    showEarnings: true,
  },
]

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const username = params.username as string

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isDonating, setIsDonating] = useState(false)
  const [donationAmount, setDonationAmount] = useState("")
  const [activeTab, setActiveTab] = useState("overview")

  // Find the profile data based on username
  const [profileData, setProfileData] = useState(() => {
    const foundProfile = USER_PROFILES.find((p) => p.username === username)
    return foundProfile || USER_PROFILES[3] // Default to johndeveloper
  })

  const [newSkill, setNewSkill] = useState("")
  const [newInterest, setNewInterest] = useState("")

  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)
  const [isUploadingCover, setIsUploadingCover] = useState(false)

  useEffect(() => {
    // Check authentication
    const checkAuth = () => {
      try {
        if (typeof window !== "undefined") {
          const loggedIn = localStorage.getItem("isLoggedIn") === "true"
          const userData = localStorage.getItem("user")

          if (!loggedIn) {
            router.push("/")
            return
          }

          setIsLoggedIn(true)

          // Set current user - if no user data, create default user matching the username
          if (userData) {
            const parsedUser = JSON.parse(userData)
            setCurrentUser(parsedUser)
          } else {
            // Create a default current user that matches the viewed profile for demo purposes
            const defaultUser = { username: username }
            setCurrentUser(defaultUser)
            localStorage.setItem("user", JSON.stringify(defaultUser))
          }

          // Find and set profile data
          const foundProfile = USER_PROFILES.find((p) => p.username === username)
          if (foundProfile) {
            setProfileData(foundProfile)
          }
        }
      } catch (error) {
        console.error("Auth check error:", error)
        router.push("/")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router, username])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
    router.push("/")
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsUploadingAvatar(true)

      // Create a URL for the uploaded file
      const imageUrl = URL.createObjectURL(file)

      // Update profile data with new avatar
      setProfileData({
        ...profileData,
        avatarUrl: imageUrl,
      })

      // Simulate upload delay
      setTimeout(() => {
        setIsUploadingAvatar(false)
      }, 1000)
    }
  }

  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIsUploadingCover(true)

      // Create a URL for the uploaded file
      const imageUrl = URL.createObjectURL(file)

      // Update profile data with new cover
      setProfileData({
        ...profileData,
        coverUrl: imageUrl,
      })

      // Simulate upload delay
      setTimeout(() => {
        setIsUploadingCover(false)
      }, 1000)
    }
  }

  const handleSaveProfile = () => {
    // Save to localStorage for persistence
    const updatedProfiles = USER_PROFILES.map((profile) =>
      profile.username === profileData.username ? profileData : profile,
    )

    if (typeof window !== "undefined") {
      localStorage.setItem("userProfiles", JSON.stringify(updatedProfiles))
    }

    setIsEditing(false)
    alert("Profile updated successfully!")
  }

  const handleDonate = () => {
    if (!donationAmount || Number.parseFloat(donationAmount) <= 0) {
      alert("Please enter a valid donation amount")
      return
    }

    alert(`Thank you for donating $${donationAmount} to ${profileData.fullName}!`)
    setIsDonating(false)
    setDonationAmount("")
  }

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter((skill) => skill !== skillToRemove),
    })
  }

  const addInterest = () => {
    if (newInterest.trim() && !profileData.interests.includes(newInterest.trim())) {
      setProfileData({
        ...profileData,
        interests: [...profileData.interests, newInterest.trim()],
      })
      setNewInterest("")
    }
  }

  const removeInterest = (interestToRemove: string) => {
    setProfileData({
      ...profileData,
      interests: profileData.interests.filter((interest) => interest !== interestToRemove),
    })
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Elite Contributor":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "GitHub Master":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "Bounty Hunter":
        return "bg-red-100 text-red-800 border-red-300"
      case "Speed Demon":
        return "bg-orange-100 text-orange-800 border-orange-300"
      case "Senior Developer":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "Bug Hunter":
        return "bg-green-100 text-green-800 border-green-300"
      case "Team Player":
        return "bg-teal-100 text-teal-800 border-teal-300"
      case "JavaScript Expert":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      case "React Master":
        return "bg-cyan-100 text-cyan-800 border-cyan-300"
      case "UI Wizard":
        return "bg-pink-100 text-pink-800 border-pink-300"
      case "Rising Star":
        return "bg-indigo-100 text-indigo-800 border-indigo-300"
      case "Python Expert":
        return "bg-emerald-100 text-emerald-800 border-emerald-300"
      case "Data Scientist":
        return "bg-violet-100 text-violet-800 border-violet-300"
      case "Problem Solver":
        return "bg-lime-100 text-lime-800 border-lime-300"
      default:
        return "bg-purple-100 text-purple-800 border-purple-300"
    }
  }

  // For demo purposes, allow editing if user is logged in and viewing any profile
  // In a real app, this would check if currentUser.id === profileData.id
  const isOwnProfile = isLoggedIn && currentUser && (currentUser.username === username || !currentUser.username)

  // Add this right before the return statement for debugging
  console.log("Debug - currentUser:", currentUser, "username:", username, "isOwnProfile:", isOwnProfile)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <div className="container mx-auto px-4 py-8">
        {/* Cover Photo */}
        <div className="relative h-64 w-full mb-8 overflow-hidden rounded-lg">
          <Image src={profileData.coverUrl || "/placeholder.svg"} alt="Cover photo" fill className="object-cover" />
          {isOwnProfile && (
            <>
              <input id="cover-upload" type="file" accept="image/*" onChange={handleCoverUpload} className="hidden" />
              <label htmlFor="cover-upload">
                <Button
                  size="sm"
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
                  disabled={isUploadingCover}
                  asChild
                >
                  <span>
                    <Camera className="w-4 h-4 mr-2" />
                    {isUploadingCover ? "Uploading..." : "Change Cover"}
                  </span>
                </Button>
              </label>
            </>
          )}
        </div>

        {/* Profile Header (overlapping the cover) */}
        <div className="container mx-auto px-4 -mt-1 mb-8 relative z-10">
          <Card className="bg-card text-card-foreground rounded-lg shadow-lg ">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <AvatarImage src={profileData.avatarUrl || "/placeholder.svg"} alt={profileData.fullName} />
                    <AvatarFallback className="text-2xl bg-gray-100">
                      {profileData.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isOwnProfile && (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                        id="avatar-upload"
                      />
                      <label htmlFor="avatar-upload">
                        <Button
                          size="sm"
                          className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0 bg-purple-600 hover:bg-purple-700 cursor-pointer"
                          disabled={isUploadingAvatar}
                          asChild
                        >
                          <span>
                            <Camera className="w-4 h-4" />
                          </span>
                        </Button>
                      </label>
                    </>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground mb-1">{profileData.fullName}</h1>
                      <p className="text-xl text-muted-foreground mb-2">@{profileData.username}</p>
                      <p className="text-muted-foreground mb-2">
                        {profileData.jobTitle} at {profileData.company}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {isOwnProfile ? (
                        <Button onClick={() => setIsEditing(true)} className="bg-purple-600 hover:bg-purple-700">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                      ) : (
                        <Button
                          onClick={() => setIsDonating(true)}
                          variant="outline"
                          className="border-purple-600 text-purple-600 hover:bg-purple-50"
                        >
                          <Gift className="w-4 h-4 mr-2" />
                          Donate
                        </Button>
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 max-w-3xl">{profileData.bio}</p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {profileData.location}
                    </div>
                    <div className="flex items-center">
                      <Building className="w-4 h-4 mr-1" />
                      {profileData.company}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Joined {new Date(profileData.joinDate).toLocaleDateString()}
                    </div>
                    {profileData.website && (
                      <a
                        href={profileData.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center hover:text-purple-600"
                      >
                        <Globe className="w-4 h-4 mr-1" />
                        Website
                      </a>
                    )}
                  </div>

                  <div className="flex items-center space-x-4">
                    {profileData.githubUsername && (
                      <a
                        href={`https://github.com/${profileData.githubUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {profileData.twitterUsername && (
                      <a
                        href={`https://twitter.com/${profileData.twitterUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {profileData.linkedinUsername && (
                      <a
                        href={`https://linkedin.com/in/${profileData.linkedinUsername}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards - All Purple Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8" />
                <div className="ml-4">
                  <p className="text-sm font-medium opacity-90">Total Earnings</p>
                  <p className="text-2xl font-bold">${profileData.totalEarnings.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Trophy className="h-8 w-8" />
                <div className="ml-4">
                  <p className="text-sm font-medium opacity-90">Bounties Completed</p>
                  <p className="text-2xl font-bold">{profileData.bountiesCompleted}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-700 to-purple-800 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8" />
                <div className="ml-4">
                  <p className="text-sm font-medium opacity-90">Reputation Score</p>
                  <p className="text-2xl font-bold">{profileData.reputationScore}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-800 to-purple-900 text-white">
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8" />
                <div className="ml-4">
                  <p className="text-sm font-medium opacity-90">Global Rank</p>
                  <p className="text-2xl font-bold">#{profileData.globalRank}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">{profileData.successRate}%</p>
              <p className="text-sm text-muted-foreground">Success Rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">{profileData.avgCompletionTime}</p>
              <p className="text-sm text-muted-foreground">Avg Completion Time</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">{profileData.rating}/5.0</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Badges */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Achievements & Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {profileData.badges.map((badge) => (
                <Badge key={badge} className={`${getBadgeColor(badge)} px-3 py-1 text-sm font-medium border`}>
                  {badge}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skills & Interests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="w-5 h-5 mr-2" />
                Skills & Technologies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill) => (
                  <Badge key={skill} className="text-sm bg-purple-100 text-purple-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Interests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profileData.interests.map((interest) => (
                  <Badge key={interest} variant="outline" className="text-sm">
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="repositories">Repositories</TabsTrigger>
            <TabsTrigger value="contributions">Contributions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Professional Info</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Job Title:</strong> {profileData.jobTitle}
                      </p>
                      <p>
                        <strong>Company:</strong> {profileData.company}
                      </p>
                      <p>
                        <strong>Education:</strong> {profileData.education}
                      </p>
                      <p>
                        <strong>Location:</strong> {profileData.location}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Platform Stats</h4>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Current Streak:</strong> {profileData.streak} days 🔥
                      </p>
                      <p>
                        <strong>Last Active:</strong> {new Date(profileData.lastActive).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Member Since:</strong> {new Date(profileData.joinDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
                      action: "Completed bounty",
                      description: "Fixed authentication bug in React app",
                      reward: "$500",
                      date: "2 days ago",
                    },
                    {
                      icon: <GitPullRequest className="w-5 h-5 text-blue-600" />,
                      action: "Started bounty",
                      description: "Add dark mode to dashboard",
                      reward: "$300",
                      date: "5 days ago",
                    },
                    {
                      icon: <Award className="w-5 h-5 text-purple-600" />,
                      action: "Earned achievement",
                      description: "Bug Hunter - Fixed 10 critical bugs",
                      reward: "Badge",
                      date: "1 week ago",
                    },
                    {
                      icon: <Star className="w-5 h-5 text-yellow-600" />,
                      action: "Received rating",
                      description: "5-star rating for API integration work",
                      reward: "+50 rep",
                      date: "1 week ago",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-shrink-0 mt-1">{activity.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium">{activity.action}</h4>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.date}</p>
                      </div>
                      <div className="font-bold text-green-600">{activity.reward}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="repositories">
            <Card>
              <CardHeader>
                <CardTitle>Contributed Repositories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "react-dashboard",
                      description: "Modern React dashboard with TypeScript",
                      language: "TypeScript",
                      stars: 234,
                      contributions: 15,
                    },
                    {
                      name: "api-gateway",
                      description: "Microservices API gateway built with Node.js",
                      language: "JavaScript",
                      stars: 89,
                      contributions: 8,
                    },
                    {
                      name: "blockchain-wallet",
                      description: "Secure cryptocurrency wallet application",
                      language: "Solidity",
                      stars: 156,
                      contributions: 12,
                    },
                  ].map((repo, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-lg">{repo.name}</h4>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{repo.description}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                            {repo.language}
                          </span>
                          <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1" />
                            {repo.stars}
                          </span>
                        </div>
                        <span>{repo.contributions} contributions</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contributions">
            <Card>
              <CardHeader>
                <CardTitle>Contribution History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: "Pull Request",
                      title: "Add user authentication system",
                      repo: "web-app-starter",
                      status: "Merged",
                      date: "3 days ago",
                    },
                    {
                      type: "Issue",
                      title: "Fix responsive design on mobile",
                      repo: "ui-components",
                      status: "Closed",
                      date: "1 week ago",
                    },
                    {
                      type: "Pull Request",
                      title: "Implement dark mode toggle",
                      repo: "dashboard-template",
                      status: "Under Review",
                      date: "2 weeks ago",
                    },
                  ].map((contribution, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {contribution.type === "Pull Request" ? (
                            <GitPullRequest className="w-5 h-5 text-green-600" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">{contribution.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {contribution.repo} • {contribution.date}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          contribution.status === "Merged"
                            ? "default"
                            : contribution.status === "Closed"
                              ? "secondary"
                              : "outline"
                        }
                        className={
                          contribution.status === "Merged"
                            ? "bg-green-100 text-green-800"
                            : contribution.status === "Closed"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {contribution.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Profile Modal */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Edit Profile
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Profile Pictures */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Profile Pictures</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <Avatar className="w-20 h-20 mb-2">
                      <AvatarImage src={profileData.avatarUrl || "/placeholder.svg"} alt="Profile" />
                      <AvatarFallback>
                        <User className="w-8 h-8" />
                      </AvatarFallback>
                    </Avatar>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                      id="modal-avatar-upload"
                    />
                    <label htmlFor="modal-avatar-upload">
                      <Button size="sm" variant="outline" className="bg-white cursor-pointer" asChild>
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          {isUploadingAvatar ? "Uploading..." : "Change Avatar"}
                        </span>
                      </Button>
                    </label>
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="avatarUrl">Avatar URL</Label>
                    <Input
                      id="avatarUrl"
                      value={profileData.avatarUrl}
                      onChange={(e) => setProfileData({ ...profileData, avatarUrl: e.target.value })}
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="coverUrl">Cover Photo URL</Label>
                  <Input
                    id="coverUrl"
                    value={profileData.coverUrl}
                    onChange={(e) => setProfileData({ ...profileData, coverUrl: e.target.value })}
                    placeholder="https://example.com/cover.jpg"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={profileData.username}
                      onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows={3}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Professional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={profileData.jobTitle}
                      onChange={(e) => setProfileData({ ...profileData, jobTitle: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={profileData.company}
                      onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="education">Education</Label>
                  <Input
                    id="education"
                    value={profileData.education}
                    onChange={(e) => setProfileData({ ...profileData, education: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </span>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={profileData.showEmail}
                          onCheckedChange={(checked) => setProfileData({ ...profileData, showEmail: checked })}
                        />
                        <span className="text-xs text-muted-foreground">
                          {profileData.showEmail ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        </span>
                      </div>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="flex items-center justify-between">
                      <span className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        Phone
                      </span>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={profileData.showPhone}
                          onCheckedChange={(checked) => setProfileData({ ...profileData, showPhone: checked })}
                        />
                        <span className="text-xs text-muted-foreground">
                          {profileData.showPhone ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        </span>
                      </div>
                    </Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Social Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="github" className="flex items-center">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub Username
                  </Label>
                  <Input
                    id="github"
                    value={profileData.githubUsername}
                    onChange={(e) => setProfileData({ ...profileData, githubUsername: e.target.value })}
                    placeholder="your-github-username"
                  />
                </div>

                <div>
                  <Label htmlFor="twitter" className="flex items-center">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter Username
                  </Label>
                  <Input
                    id="twitter"
                    value={profileData.twitterUsername}
                    onChange={(e) => setProfileData({ ...profileData, twitterUsername: e.target.value })}
                    placeholder="your-twitter-handle"
                  />
                </div>

                <div>
                  <Label htmlFor="linkedin" className="flex items-center">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn Username
                  </Label>
                  <Input
                    id="linkedin"
                    value={profileData.linkedinUsername}
                    onChange={(e) => setProfileData({ ...profileData, linkedinUsername: e.target.value })}
                    placeholder="your-linkedin-username"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skills & Technologies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill (e.g., React, Python)"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" onClick={addSkill} variant="outline" className="bg-white">
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => removeSkill(skill)} />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interests */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Interests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    placeholder="Add an interest (e.g., Photography, Hiking)"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addInterest())}
                  />
                  <Button type="button" onClick={addInterest} variant="outline" className="bg-white">
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((interest) => (
                    <Badge key={interest} variant="outline" className="flex items-center gap-1">
                      {interest}
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-red-500"
                        onClick={() => removeInterest(interest)}
                      />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Public Profile</Label>
                    <p className="text-sm text-muted-foreground">Make your profile visible to everyone</p>
                  </div>
                  <Switch
                    checked={profileData.isPublicProfile}
                    onCheckedChange={(checked) => setProfileData({ ...profileData, isPublicProfile: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Show Earnings</Label>
                    <p className="text-sm text-muted-foreground">Display your total earnings publicly</p>
                  </div>
                  <Switch
                    checked={profileData.showEarnings}
                    onCheckedChange={(checked) => setProfileData({ ...profileData, showEarnings: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsEditing(false)} className="bg-white">
                Cancel
              </Button>
              <Button onClick={handleSaveProfile} className="bg-purple-600 hover:bg-purple-700">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Donation Modal */}
      <Dialog open={isDonating} onOpenChange={setIsDonating}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Gift className="w-5 h-5 mr-2" />
              Donate to {profileData.fullName}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="text-center">
              <Avatar className="w-16 h-16 mx-auto mb-2">
                <AvatarImage src={profileData.avatarUrl || "/placeholder.svg"} alt={profileData.fullName} />
                <AvatarFallback>
                  {profileData.fullName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <p className="text-muted-foreground">Support {profileData.fullName}'s work</p>
            </div>

            <div>
              <Label htmlFor="donationAmount">Donation Amount ($)</Label>
              <Input
                id="donationAmount"
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                placeholder="Enter amount"
                min="1"
              />
            </div>

            <div className="flex gap-2">
              {[5, 10, 25, 50].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => setDonationAmount(amount.toString())}
                  className="flex-1 bg-white"
                >
                  ${amount}
                </Button>
              ))}
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsDonating(false)} className="bg-white">
                Cancel
              </Button>
              <Button onClick={handleDonate} className="bg-purple-600 hover:bg-purple-700">
                <Gift className="w-4 h-4 mr-2" />
                Donate ${donationAmount}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
