import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaQuestionCircle, 
  FaSearch, 
  FaTrophy, 
  FaUsers, 
  FaDumbbell, 
  FaVideo,
  FaEnvelope,
  FaPhone,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
  FaBookOpen
} from 'react-icons/fa';

const HelpPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [expandedFAQs, setExpandedFAQs] = useState({});

  const helpCategories = [
    {
      icon: FaTrophy,
      title: 'Tournaments',
      description: 'Learn how to create, join, and manage tournaments',
      articles: [
        {
          title: 'How to create a tournament',
          content: 'To create a tournament, go to the Tournaments page and click "Create Tournament". Fill in the tournament details including name, sport, format, dates, and registration requirements. You can set team size limits, entry fees, and prize information. Once created, teams can register for your tournament.',
          tags: ['create', 'tournament', 'setup']
        },
        {
          title: 'Joining a tournament',
          content: 'Browse available tournaments on the Tournaments page. Click on a tournament to view details including format, rules, and requirements. If you meet the criteria, click "Register" to join. You may need to form a team first if it\'s a team tournament.',
          tags: ['join', 'register', 'tournament']
        },
        {
          title: 'Tournament formats and rules',
          content: 'SportSphere supports various tournament formats including single elimination, double elimination, round robin, and Swiss system. Each format has specific rules for advancement and scoring. Tournament organizers can customize rules for their specific sport and competition level.',
          tags: ['formats', 'rules', 'elimination', 'round robin']
        },
        {
          title: 'Managing tournament brackets',
          content: 'Tournament organizers can manage brackets through the tournament dashboard. Update match results, handle disputes, and manage participant communications. The system automatically updates standings and advances teams based on the selected format.',
          tags: ['brackets', 'manage', 'results', 'standings']
        }
      ]
    },
    {
      icon: FaUsers,
      title: 'Teams',
      description: 'Everything about team creation and management',
      articles: [
        {
          title: 'Creating your team',
          content: 'Create a team by going to the Teams page and clicking "Create Team". Choose a team name, sport, and description. Upload a team logo if desired. Set team visibility (public/private) and member requirements. Once created, you can invite players to join.',
          tags: ['create', 'team', 'setup', 'members']
        },
        {
          title: 'Inviting team members',
          content: 'Team captains can invite members through the team management page. Send invitations by email or username. Set member roles and permissions. Track invitation status and manage pending requests. Members can also request to join public teams.',
          tags: ['invite', 'members', 'join', 'permissions']
        },
        {
          title: 'Team roles and permissions',
          content: 'Teams have different roles: Captain (full control), Co-Captain (most permissions), and Member (basic access). Captains can assign roles, manage roster, and register for tournaments. Co-Captains can help with day-to-day management. Members can view team info and participate in activities.',
          tags: ['roles', 'permissions', 'captain', 'member']
        },
        {
          title: 'Team statistics',
          content: 'View comprehensive team statistics including win/loss records, recent matches, player performance, and tournament history. Track progress over time with charts and analytics. Compare your team\'s performance against other teams in your league or sport.',
          tags: ['statistics', 'performance', 'analytics', 'records']
        }
      ]
    },
    {
      icon: FaDumbbell,
      title: 'Fitness',
      description: 'Fitness tracking and workout management',
      articles: [
        {
          title: 'Setting up fitness goals',
          content: 'Set personalized fitness goals in the Fitness section. Choose from weight loss, muscle gain, endurance, or custom goals. Set target dates and milestones. The system will suggest workout plans and track your progress toward achieving these goals.',
          tags: ['goals', 'fitness', 'setup', 'targets']
        },
        {
          title: 'Tracking workouts',
          content: 'Log your workouts using the workout tracker. Choose from pre-built exercises or create custom ones. Track sets, reps, weight, and duration. Add notes and photos. The system automatically calculates calories burned and progress metrics.',
          tags: ['workouts', 'tracking', 'exercises', 'logging']
        },
        {
          title: 'Nutrition logging',
          content: 'Track your nutrition intake with the food diary. Search from a database of foods or scan barcodes. Log meals, snacks, and hydration. View nutritional breakdowns including calories, macros, and micronutrients. Set nutrition goals aligned with your fitness objectives.',
          tags: ['nutrition', 'food', 'calories', 'diet']
        },
        {
          title: 'Progress monitoring',
          content: 'Monitor your fitness progress with detailed analytics. View charts showing strength gains, weight changes, and performance improvements. Take progress photos and body measurements. Generate reports to share with trainers or teammates.',
          tags: ['progress', 'analytics', 'monitoring', 'reports']
        }
      ]
    },
    {
      icon: FaVideo,
      title: 'Posts & Media',
      description: 'Sharing content and managing posts',
      articles: [
        {
          title: 'Creating posts',
          content: 'Share your sports journey by creating posts. Add text, photos, and videos. Tag teammates and teams. Use hashtags to increase visibility. Choose audience (public, team members, or private). Schedule posts for optimal engagement times.',
          tags: ['posts', 'sharing', 'content', 'social']
        },
        {
          title: 'Uploading videos and photos',
          content: 'Upload high-quality photos and videos to showcase your activities. Supported formats include JPG, PNG for photos and MP4, MOV for videos. Add captions, tags, and location information. Create albums to organize your content.',
          tags: ['upload', 'photos', 'videos', 'media']
        },
        {
          title: 'Privacy settings',
          content: 'Control who can see your content with privacy settings. Set default visibility for posts (public, friends, team only). Manage who can comment and share your content. Block unwanted users and report inappropriate content.',
          tags: ['privacy', 'security', 'visibility', 'settings']
        },
        {
          title: 'Content guidelines',
          content: 'Follow community guidelines when posting content. Keep posts sports-related and family-friendly. Respect others and avoid offensive language. Don\'t share copyrighted material without permission. Report violations to maintain a positive community.',
          tags: ['guidelines', 'community', 'rules', 'moderation']
        }
      ]
    }
  ];

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'Go to the login page and click "Forgot Password". Enter your email address and follow the instructions sent to your email. Make sure to check your spam folder if you don\'t receive the email within a few minutes.',
      tags: ['password', 'reset', 'login', 'email']
    },
    {
      question: 'Can I participate in multiple tournaments?',
      answer: 'Yes! You can join multiple tournaments as long as the schedules don\'t conflict. Check the tournament dates before registering. Some tournaments may have restrictions based on skill level or team requirements.',
      tags: ['tournaments', 'multiple', 'participate', 'schedule']
    },
    {
      question: 'How do I upgrade my account?',
      answer: 'Currently, all features are free to use. We may introduce premium features in the future with advanced analytics, priority support, and additional storage for media content.',
      tags: ['upgrade', 'premium', 'features', 'pricing']
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we take data security seriously. All data is encrypted in transit and at rest. We follow industry best practices for data protection. Check our Privacy Policy for detailed information about how we handle your data.',
      tags: ['security', 'data', 'privacy', 'encryption']
    },
    {
      question: 'How do I delete my account?',
      answer: 'To delete your account, go to Settings > Account > Delete Account. This action is permanent and will remove all your data including posts, team memberships, and tournament history. Consider downloading your data first.',
      tags: ['delete', 'account', 'remove', 'permanent']
    },
    {
      question: 'Can I change my username?',
      answer: 'Yes, you can change your username once every 30 days. Go to Settings > Profile > Edit Username. Choose a unique username that follows our naming guidelines. Your old username may become available for others to use.',
      tags: ['username', 'change', 'profile', 'settings']
    },
    {
      question: 'How do I report inappropriate content?',
      answer: 'Click the three dots menu on any post and select "Report". Choose the reason for reporting and provide additional details if needed. Our moderation team reviews all reports within 24 hours.',
      tags: ['report', 'inappropriate', 'content', 'moderation']
    },
    {
      question: 'Why can\'t I join a tournament?',
      answer: 'There could be several reasons: the tournament may be full, registration may be closed, you might not meet the requirements (skill level, age, team size), or there could be a scheduling conflict with another tournament you\'re already in.',
      tags: ['tournament', 'join', 'registration', 'requirements']
    }
  ];

  // Search functionality
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return null;

    const results = [];
    const searchLower = searchTerm.toLowerCase();

    // Search through articles
    helpCategories.forEach(category => {
      category.articles.forEach(article => {
        const matchesTitle = article.title.toLowerCase().includes(searchLower);
        const matchesContent = article.content.toLowerCase().includes(searchLower);
        const matchesTags = article.tags.some(tag => tag.toLowerCase().includes(searchLower));
        
        if (matchesTitle || matchesContent || matchesTags) {
          results.push({
            type: 'article',
            category: category.title,
            categoryIcon: category.icon,
            ...article
          });
        }
      });
    });

    // Search through FAQs
    faqs.forEach(faq => {
      const matchesQuestion = faq.question.toLowerCase().includes(searchLower);
      const matchesAnswer = faq.answer.toLowerCase().includes(searchLower);
      const matchesTags = faq.tags.some(tag => tag.toLowerCase().includes(searchLower));
      
      if (matchesQuestion || matchesAnswer || matchesTags) {
        results.push({
          type: 'faq',
          ...faq
        });
      }
    });

    return results;
  }, [searchTerm, helpCategories, faqs]);

  const toggleFAQ = (index) => {
    setExpandedFAQs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const openArticle = (category, article) => {
    setSelectedCategory(category);
    setSelectedArticle(article);
  };

  const closeArticle = () => {
    setSelectedCategory(null);
    setSelectedArticle(null);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  // If viewing an article, show article view
  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Article Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={closeArticle}
                  className="mr-4 p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <FaTimes className="text-lg" />
                </button>
                <div className="flex items-center">
                  <selectedCategory.icon className="text-2xl text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">{selectedCategory.title}</p>
                    <h1 className="text-2xl font-bold text-gray-900">{selectedArticle.title}</h1>
                  </div>
                </div>
              </div>
              <FaBookOpen className="text-2xl text-gray-300" />
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="prose max-w-none">
              <p className="text-gray-700 text-lg leading-relaxed">
                {selectedArticle.content}
              </p>
            </div>
            
            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-900 mb-3">Tags:</p>
              <div className="flex flex-wrap gap-2">
                {selectedArticle.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={closeArticle}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaChevronRight className="mr-2 transform rotate-180" />
                Back to Help Center
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaQuestionCircle className="mx-auto text-6xl mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How can we help you?
          </h1>
          <p className="text-xl opacity-90 mb-8">
            Find answers to your questions and get the most out of SportSphere
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Results */}
        {searchResults && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results ({searchResults.length})
              </h2>
              <button
                onClick={clearSearch}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear Search
              </button>
            </div>
            
            {searchResults.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-lg">
                <FaSearch className="mx-auto text-4xl text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600">Try different keywords or browse categories below</p>
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map((result, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    {result.type === 'article' ? (
                      <div>
                        <div className="flex items-center mb-2">
                          <result.categoryIcon className="text-lg text-blue-600 mr-2" />
                          <span className="text-sm text-gray-500">{result.category}</span>
                        </div>
                        <button
                          onClick={() => openArticle(
                            helpCategories.find(cat => cat.title === result.category),
                            result
                          )}
                          className="text-left w-full"
                        >
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600">
                            {result.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2">
                            {result.content.substring(0, 200)}...
                          </p>
                        </button>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {result.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center mb-2">
                          <FaQuestionCircle className="text-lg text-green-600 mr-2" />
                          <span className="text-sm text-gray-500">FAQ</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {result.question}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {result.answer.substring(0, 150)}...
                        </p>
                        <div className="flex flex-wrap gap-1 mt-3">
                          {result.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Help Categories */}
        {!searchResults && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Browse by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {helpCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
                >
                  <category.icon className="text-3xl text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>
                  <ul className="space-y-2">
                    {category.articles.map((article, articleIndex) => (
                      <li key={articleIndex}>
                        <button
                          onClick={() => openArticle(category, article)}
                          className="text-blue-600 hover:text-blue-800 text-sm flex items-center justify-between group w-full text-left"
                        >
                          {article.title}
                          <FaChevronRight className="text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {!searchResults && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    {expandedFAQs[index] ? (
                      <FaChevronUp className="text-blue-600 flex-shrink-0" />
                    ) : (
                      <FaChevronDown className="text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFAQs[index] && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {faq.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Support */}
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Still need help?
          </h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaEnvelope className="mr-2" />
              Contact Support
            </Link>
            <a
              href="mailto:leelamadhav.nulakani@gmail.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              <FaPhone className="mr-2" />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
