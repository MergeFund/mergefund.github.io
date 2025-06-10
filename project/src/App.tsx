import React, { useState } from 'react';
import { 
  Github, 
  Code, 
  Zap, 
  DollarSign, 
  Star, 
  Users, 
  Clock, 
  Shield, 
  Sparkles,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  CheckCircle,
  GitPullRequest,
  Coins
} from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'developer',
    githubProfile: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would connect to your backend or email service
    console.log('Form submitted:', formData);
    alert('Thanks for joining the waitlist! We\'ll be in touch soon.');
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E] text-white font-['Poppins']">
      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4] flex items-center justify-center">
              <Github className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4] bg-clip-text text-transparent">
              MergeFund
            </span>
          </div>
          <button className="bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4] px-6 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
            Join Waitlist
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Earn <span className="bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4] bg-clip-text text-transparent">Crypto</span> for<br />
            Solving GitHub Issues
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            MergeFund incentivizes developers with cryptocurrency rewards for contributing to open-source projects. 
            Build your reputation while earning real rewards.
          </p>
          <button className="group bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4] px-12 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto">
            <span>Join the Developer Waitlist</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          {/* Mockup Dashboard */}
          <div className="mt-20 relative">
            <div className="bg-gradient-to-r from-[#8A2BE2]/20 to-[#FF69B4]/20 rounded-3xl p-8 backdrop-blur-sm border border-purple-500/20">
              <div className="bg-[#1A1A2E] rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-4">MergeFund Dashboard</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-r from-[#8A2BE2]/10 to-[#FF69B4]/10 rounded-xl p-4 border border-purple-500/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <Coins className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-300">Total Earned</span>
                    </div>
                    <div className="text-2xl font-bold text-white">$2,450</div>
                  </div>
                  <div className="bg-gradient-to-r from-[#8A2BE2]/10 to-[#FF69B4]/10 rounded-xl p-4 border border-purple-500/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <GitPullRequest className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-300">PRs Merged</span>
                    </div>
                    <div className="text-2xl font-bold text-white">23</div>
                  </div>
                  <div className="bg-gradient-to-r from-[#8A2BE2]/10 to-[#FF69B4]/10 rounded-xl p-4 border border-purple-500/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-300">Reputation</span>
                    </div>
                    <div className="text-2xl font-bold text-white">4.9</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-20 bg-[#16213E]/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            How <span className="bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4] bg-clip-text text-transparent">It Works</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4] p-1 group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full bg-[#1A1A2E] rounded-full flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Post Bounties</h3>
              <p className="text-gray-300 leading-relaxed">
                Repository owners post bounties on GitHub issues with crypto rewards to incentivize quality contributions.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4] p-1 group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full bg-[#1A1A2E] rounded-full flex items-center justify-center">
                  <Code className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Solve & Submit</h3>
              <p className="text-gray-300 leading-relaxed">
                Developers solve issues and submit pull requests. Our platform tracks contributions automatically.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4] p-1 group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full bg-[#1A1A2E] rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-purple-400" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">Get Rewarded</h3>
              <p className="text-gray-300 leading-relaxed">
                Smart contracts automatically release crypto rewards when pull requests are merged and approved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Why Choose <span className="bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4] bg-clip-text text-transparent">MergeFund?</span>
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Benefits for Developers */}
            <div className="bg-gradient-to-br from-[#8A2BE2]/10 to-[#FF69B4]/10 rounded-3xl p-8 border border-purple-500/20">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4] flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">For Developers</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Earn Cryptocurrency</h4>
                    <p className="text-gray-300">Get paid in crypto for your open-source contributions. Build wealth while building software.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Transparent Payouts</h4>
                    <p className="text-gray-300">Smart contracts ensure automatic and transparent reward distribution. No delays, no disputes.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Build Reputation</h4>
                    <p className="text-gray-300">Showcase your skills and build a verifiable track record of quality contributions.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Global Opportunities</h4>
                    <p className="text-gray-300">Access bounties from projects worldwide. Work on what interests you most.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits for Maintainers */}
            <div className="bg-gradient-to-br from-[#FF69B4]/10 to-[#8A2BE2]/10 rounded-3xl p-8 border border-pink-500/20">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF69B4] to-[#8A2BE2] flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">For Maintainers</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Attract Top Talent</h4>
                    <p className="text-gray-300">Incentivize skilled developers to contribute to your projects with crypto rewards.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Faster Issue Resolution</h4>
                    <p className="text-gray-300">Get critical bugs fixed and features implemented faster with financial incentives.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Transparent Funding</h4>
                    <p className="text-gray-300">Track exactly how your development budget is being spent with blockchain transparency.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Quality Assurance</h4>
                    <p className="text-gray-300">Our reputation system ensures only quality contributors work on your issues.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sign-Up Form Section */}
      <section className="px-6 py-20 bg-[#16213E]/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Join the <span className="bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4] bg-clip-text text-transparent">Revolution</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Be among the first to experience the future of open-source development. 
            Join our waitlist and get early access to MergeFund.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-[#8A2BE2]/20 to-[#FF69B4]/20 rounded-3xl p-8 backdrop-blur-sm border border-purple-500/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-[#1A1A2E] border border-purple-500/30 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/25 transition-all"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-[#1A1A2E] border border-purple-500/30 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/25 transition-all"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="bg-[#1A1A2E] border border-purple-500/30 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/25 transition-all"
                >
                  <option value="developer">Developer</option>
                  <option value="maintainer">Project Maintainer</option>
                  <option value="both">Both</option>
                </select>
                <input
                  type="text"
                  name="githubProfile"
                  placeholder="GitHub Profile (Optional)"
                  value={formData.githubProfile}
                  onChange={handleInputChange}
                  className="bg-[#1A1A2E] border border-purple-500/30 rounded-xl px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/25 transition-all"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4] px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Join the Waitlist</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-purple-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4] flex items-center justify-center">
                <Github className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#8A2BE2] to-[#FF69B4] bg-clip-text text-transparent">
                MergeFund
              </span>
            </div>
            
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8A2BE2]/20 to-[#FF69B4]/20 border border-purple-500/30 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#8A2BE2] hover:to-[#FF69B4] transition-all duration-300 group"
              >
                <Twitter className="w-5 h-5 text-purple-400 group-hover:text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8A2BE2]/20 to-[#FF69B4]/20 border border-purple-500/30 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#8A2BE2] hover:to-[#FF69B4] transition-all duration-300 group"
              >
                <Linkedin className="w-5 h-5 text-purple-400 group-hover:text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-gradient-to-r from-[#8A2BE2]/20 to-[#FF69B4]/20 border border-purple-500/30 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#8A2BE2] hover:to-[#FF69B4] transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 text-purple-400 group-hover:text-white" />
              </a>
            </div>
            
            <p className="text-gray-400 text-center md:text-right">
              © 2025 MergeFund. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;