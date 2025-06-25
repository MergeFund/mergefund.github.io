"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/lib/auth"
import { X, Save, User, Github, Twitter, Linkedin, Palette } from "lucide-react"

interface ProfileCustomizationProps {
  isOpen: boolean
  onClose: () => void
  profile: any
  onProfileUpdate: () => void
}

export function ProfileCustomization({ isOpen, onClose, profile, onProfileUpdate }: ProfileCustomizationProps) {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    bio: profile?.bio || "",
    github_username: profile?.github_username || "",
    twitter_username: profile?.twitter_username || "",
    linkedin_username: profile?.linkedin_username || "",
    account_type: profile?.account_type || "developer",
    avatar_url: profile?.avatar_url || "",
  })
  const [skills, setSkills] = useState<string[]>(profile?.skills || [])
  const [newSkill, setNewSkill] = useState("")
  const [saving, setSaving] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          bio: formData.bio,
          github_username: formData.github_username,
          twitter_username: formData.twitter_username,
          linkedin_username: formData.linkedin_username,
          account_type: formData.account_type,
          avatar_url: formData.avatar_url,
          skills: skills,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (error) throw error

      onProfileUpdate()
      onClose()
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const accountTypeOptions = [
    { value: "developer", label: "Developer", description: "Contribute to bounties and build reputation" },
    { value: "repo_owner", label: "Repository Owner", description: "Post bounties and manage repositories" },
    { value: "both", label: "Both", description: "Full access to all features" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Palette className="w-5 h-5 mr-2" />
            Customize Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Avatar Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={formData.avatar_url || "/placeholder.svg"} alt="Profile" />
                  <AvatarFallback>
                    <User className="w-8 h-8" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Label htmlFor="avatar_url">Avatar URL</Label>
                  <Input
                    id="avatar_url"
                    value={formData.avatar_url}
                    onChange={(e) => handleInputChange("avatar_url", e.target.value)}
                    placeholder="https://example.com/avatar.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter a URL to your profile picture or upload to an image hosting service
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => handleInputChange("full_name", e.target.value)}
                  placeholder="Your full name"
                />
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="account_type">Account Type</Label>
                <Select
                  value={formData.account_type}
                  onValueChange={(value) => handleInputChange("account_type", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {accountTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div>
                          <div className="font-medium">{option.label}</div>
                          <div className="text-xs text-gray-500">{option.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Label htmlFor="github_username" className="flex items-center">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub Username
                </Label>
                <Input
                  id="github_username"
                  value={formData.github_username}
                  onChange={(e) => handleInputChange("github_username", e.target.value)}
                  placeholder="your-github-username"
                />
              </div>

              <div>
                <Label htmlFor="twitter_username" className="flex items-center">
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter Username
                </Label>
                <Input
                  id="twitter_username"
                  value={formData.twitter_username}
                  onChange={(e) => handleInputChange("twitter_username", e.target.value)}
                  placeholder="your-twitter-handle"
                />
              </div>

              <div>
                <Label htmlFor="linkedin_username" className="flex items-center">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn Username
                </Label>
                <Input
                  id="linkedin_username"
                  value={formData.linkedin_username}
                  onChange={(e) => handleInputChange("linkedin_username", e.target.value)}
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
                <Button type="button" onClick={addSkill} variant="outline">
                  Add
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => removeSkill(skill)} />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving} className="bg-purple-700 hover:bg-purple-800">
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
