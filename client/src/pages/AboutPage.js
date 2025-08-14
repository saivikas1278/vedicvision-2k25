import React from 'react';
import { FaTrophy, FaUsers, FaChartLine, FaMobile, FaShieldAlt, FaGlobe, FaHeart, FaRocket, FaCode, FaLightbulb, FaStar, FaQuoteLeft } from 'react-icons/fa';
import GlareHover from '../components/UI/GlareHover';

const AboutPage = () => {
  const stats = [
    { icon: <FaUsers />, number: '50K+', label: 'Active Users' },
    { icon: <FaTrophy />, number: '10K+', label: 'Tournaments Organized' },
    { icon: <FaChartLine />, number: '1M+', label: 'Matches Tracked' },
    { icon: <FaGlobe />, number: '25+', label: 'Countries' }
  ];

  const features = [
    {
      icon: <FaTrophy className="text-3xl" />,
      title: 'Tournament Management',
      description: 'Create, organize, and manage tournaments with ease. From brackets to live scoring, we handle it all.'
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      title: 'Performance Analytics',
      description: 'Track your progress with detailed analytics and insights to improve your game performance.'
    },
    {
      icon: <FaHeart className="text-3xl" />,
      title: 'Fitness Tracking',
      description: 'Comprehensive fitness tools including workout builders, nutrition tracking, and progress monitoring.'
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: 'Team Collaboration',
      description: 'Connect with teammates, share strategies, and build stronger sporting communities.'
    },
    {
      icon: <FaMobile className="text-3xl" />,
      title: 'Mobile Optimized',
      description: 'Access all features seamlessly across desktop, tablet, and mobile devices.'
    },
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security ensuring your data is safe and always accessible.'
    }
  ];

  const teamMembers = [
    {
      name: 'Alex Johnson',
      role: 'CEO & Founder',
      bio: 'Former professional athlete with 15+ years in sports technology.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Sarah Chen',
      role: 'CTO',
      bio: 'Tech visionary with expertise in scalable sports platforms.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Head of Product',
      bio: 'UX expert passionate about creating intuitive sports experiences.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Emily Foster',
      role: 'Head of Design',
      bio: 'Creative director bringing beautiful designs to sports technology.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face'
    }
  ];

  const testimonials = [
    {
      quote: "SportSphere transformed how we manage our league. The tournament system is incredibly intuitive!",
      author: "Mike Thompson",
      role: "League Commissioner",
      rating: 5
    },
    {
      quote: "The fitness tracking features helped me achieve my personal bests. Highly recommended!",
      author: "Jessica Williams",
      role: "Amateur Athlete",
      rating: 5
    },
    {
      quote: "Perfect platform for organizing our company sports events. Everything we need in one place.",
      author: "David Park",
      role: "HR Manager",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About SportSphere</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Empowering athletes, teams, and sports enthusiasts worldwide with cutting-edge technology 
            that makes sports management effortless and engaging.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-2 bg-white/20 rounded-full">🏆 Award Winning</span>
            <span className="px-4 py-2 bg-white/20 rounded-full">🚀 Fast Growing</span>
            <span className="px-4 py-2 bg-white/20 rounded-full">🌍 Global Platform</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-blue-600 text-3xl mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To democratize sports management by providing accessible, powerful tools that connect 
                athletes, coaches, and organizers in a unified ecosystem.
              </p>
              <div className="flex items-center space-x-4">
                <FaRocket className="text-blue-600 text-2xl" />
                <span className="text-gray-700">Innovation-driven solutions for modern sports</span>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-6">
                To become the world's leading platform where every athlete, from amateur to professional, 
                can achieve their sporting goals through technology.
              </p>
              <div className="flex items-center space-x-4">
                <FaLightbulb className="text-yellow-500 text-2xl" />
                <span className="text-gray-700">Inspiring excellence through data-driven insights</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Makes Us Special</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform combines tournament management, fitness tracking, 
              and community building in one seamless experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <GlareHover
                key={index}
                glareColor="#3B82F6"
                glareOpacity={0.15}
                glareAngle={-45}
                glareSize={200}
                transitionDuration={600}
              >
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow h-full border">
                  <div className="text-blue-600 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </GlareHover>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              Passionate individuals dedicated to revolutionizing sports technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600">
              Real feedback from our amazing community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <FaQuoteLeft className="text-blue-600 text-2xl mr-3" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Built with Modern Technology</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="flex items-center space-x-2">
              <FaCode className="text-2xl" />
              <span>React.js</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCode className="text-2xl" />
              <span>Node.js</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCode className="text-2xl" />
              <span>MongoDB</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCode className="text-2xl" />
              <span>Socket.io</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaCode className="text-2xl" />
              <span>TailwindCSS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join SportSphere?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of athletes and teams who are already transforming their sports experience
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Get Started Free
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
