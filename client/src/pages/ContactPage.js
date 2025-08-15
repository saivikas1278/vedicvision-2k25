import React, { useState } from 'react';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock, 
  FaTwitter, 
  FaFacebook, 
  FaLinkedin, 
  FaInstagram,
  FaHeadset,
  FaQuestionCircle,
  FaBug,
  FaLightbulb,
  FaUserTie,
  FaHandshake,
  FaPaperPlane,
  FaCheckCircle,
  FaSpinner
} from 'react-icons/fa';
import GlareHover from '../components/UI/GlareHover';
import contactService from '../services/contactService';
import { showToast } from '../utils/toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
    priority: 'medium'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const contactMethods = [
    {
      icon: <FaEnvelope className="text-3xl" />,
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      contact: 'leelamadhav.nulakani@gmail.com',
      action: 'mailto:leelamadhav.nulakani@gmail.com',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <FaPhone className="text-3xl" />,
      title: 'Phone Support',
      description: 'Speak directly with our team',
      contact: '+1 (555) 123-4567',
      action: 'tel:+15551234567',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <FaHeadset className="text-3xl" />,
      title: 'Live Chat',
      description: 'Real-time support chat',
      contact: 'Available 9 AM - 6 PM EST',
      action: '#',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl" />,
      title: 'Visit Us',
      description: 'Come to our headquarters',
      contact: '123 Sports Ave, Tech City, TC 12345',
      action: '#',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const supportCategories = [
    { icon: <FaQuestionCircle />, label: 'General Questions', value: 'general' },
    { icon: <FaHeadset />, label: 'Technical Support', value: 'technical' },
    { icon: <FaBug />, label: 'Bug Report', value: 'bug' },
    { icon: <FaLightbulb />, label: 'Feature Request', value: 'feature' },
    { icon: <FaUserTie />, label: 'Sales Inquiry', value: 'sales' },
    { icon: <FaHandshake />, label: 'Partnership', value: 'partnership' }
  ];

  const officeLocations = [
    {
      city: 'New York',
      address: '123 Sports Ave, New York, NY 10001',
      phone: '+1 (555) 123-4567',
      hours: 'Mon-Fri: 9 AM - 6 PM EST'
    },
    {
      city: 'Los Angeles',
      address: '456 Athletic Blvd, Los Angeles, CA 90210',
      phone: '+1 (555) 987-6543',
      hours: 'Mon-Fri: 9 AM - 6 PM PST'
    },
    {
      city: 'London',
      address: '789 Sport Lane, London, UK SW1A 1AA',
      phone: '+44 20 7946 0958',
      hours: 'Mon-Fri: 9 AM - 5 PM GMT'
    }
  ];

  const faqItems = [
    {
      question: 'How do I create a tournament?',
      answer: 'Navigate to the Tournaments section and click "Create Tournament". Follow the step-by-step wizard to set up your tournament structure, rules, and participants.'
    },
    {
      question: 'Can I track multiple sports?',
      answer: 'Yes! SportSphere supports 25+ sports including cricket, football, basketball, tennis, and more. You can manage multiple sports within a single account.'
    },
    {
      question: 'Is there a mobile app?',
      answer: 'Our platform is fully responsive and works perfectly on mobile browsers. A dedicated mobile app is coming soon!'
    },
    {
      question: 'How does the fitness tracking work?',
      answer: 'Our fitness module includes workout builders, progress tracking, nutrition monitoring, and detailed analytics to help you achieve your fitness goals.'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError(null);

    // Basic client-side validation
    if (!formData.name || formData.name.trim().length < 2) {
      setSubmitError('Name must be at least 2 characters long');
      setIsLoading(false);
      showToast('Name must be at least 2 characters long', 'error');
      return;
    }

    if (!formData.email || !formData.email.includes('@')) {
      setSubmitError('Please provide a valid email address');
      setIsLoading(false);
      showToast('Please provide a valid email address', 'error');
      return;
    }

    if (!formData.subject || formData.subject.trim().length < 5) {
      setSubmitError('Subject must be at least 5 characters long');
      setIsLoading(false);
      showToast('Subject must be at least 5 characters long', 'error');
      return;
    }

    if (!formData.message || formData.message.trim().length < 10) {
      setSubmitError('Message must be at least 10 characters long');
      setIsLoading(false);
      showToast('Message must be at least 10 characters long', 'error');
      return;
    }

    try {
      console.log('Submitting contact form with data:', formData);
      const response = await contactService.sendContactForm(formData);
      console.log('Contact form response:', response);
      
      if (response && response.success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          category: 'general',
          message: '',
          priority: 'medium'
        });
        showToast('Message sent successfully! We will get back to you soon.', 'success');
      } else {
        console.error('Response indicates failure:', response);
        throw new Error(response?.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      
      // Handle validation errors specifically
      if (error.errors && Array.isArray(error.errors)) {
        const validationErrors = error.errors.map(err => err.msg).join(', ');
        setSubmitError(validationErrors);
        showToast(`Validation error: ${validationErrors}`, 'error');
      } else {
        const errorMessage = error.message || 'Failed to send message. Please try again.';
        setSubmitError(errorMessage);
        showToast(errorMessage, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            We're here to help! Reach out to us for support, partnerships, or just to say hello.
            Our team is ready to assist you with any questions about SportSphere.
          </p>
          <div className="flex justify-center space-x-6">
            <button className="text-white hover:text-blue-200 transition-colors" aria-label="Follow us on Twitter">
              <FaTwitter size={24} />
            </button>
            <button className="text-white hover:text-blue-200 transition-colors" aria-label="Follow us on Facebook">
              <FaFacebook size={24} />
            </button>
            <button className="text-white hover:text-blue-200 transition-colors" aria-label="Connect with us on LinkedIn">
              <FaLinkedin size={24} />
            </button>
            <button className="text-white hover:text-blue-200 transition-colors" aria-label="Follow us on Instagram">
              <FaInstagram size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Can We Help?</h2>
            <p className="text-lg text-gray-600">
              Choose your preferred way to get in touch with our team
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <GlareHover
                key={index}
                glareColor="#ffffff"
                glareOpacity={0.4}
                glareAngle={-45}
                glareSize={300}
                transitionDuration={800}
                playOnce={false}
                className="h-full"
              >
                <a 
                  href={method.action}
                  className={`block bg-gradient-to-r ${method.color} text-white p-6 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-full`}
                >
                  <div className="text-center">
                    <div className="mb-4 flex justify-center opacity-90">
                      {method.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                    <p className="text-sm opacity-90 mb-3">{method.description}</p>
                    <p className="text-sm font-medium">{method.contact}</p>
                  </div>
                </a>
              </GlareHover>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-4">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                  <p className="text-sm text-gray-500 mb-6">
                    You should receive a confirmation email at your provided email address shortly.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-700 text-sm">{submitError}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name * (2-100 characters)</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        minLength={2}
                        maxLength={100}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Your full name (at least 2 characters)"
                      />
                      <p className="text-xs text-gray-500 mt-1">{formData.name.length}/100 characters</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject * (5-200 characters)</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      minLength={5}
                      maxLength={200}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Brief description of your inquiry (at least 5 characters)"
                    />
                    <p className="text-xs text-gray-500 mt-1">{formData.subject.length}/200 characters</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      >
                        {supportCategories.map(category => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message * (10-2000 characters)</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      minLength={10}
                      maxLength={2000}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Please provide as much detail as possible (at least 10 characters)..."
                    ></textarea>
                    <p className="text-xs text-gray-500 mt-1">{formData.message.length}/2000 characters</p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Support Categories & FAQ */}
            <div className="space-y-8">
              {/* Support Categories */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Support Categories</h3>
                <div className="grid grid-cols-1 gap-3">
                  {supportCategories.map((category, index) => (
                    <div key={index} className="flex items-center p-3 border border-gray-100 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                      <div className="text-blue-600 mr-3">
                        {category.icon}
                      </div>
                      <span className="text-gray-700">{category.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick FAQ */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Answers</h3>
                <div className="space-y-4">
                  {faqItems.map((faq, index) => (
                    <details key={index} className="border border-gray-100 rounded-lg">
                      <summary className="p-4 cursor-pointer hover:bg-gray-50 font-medium text-gray-700">
                        {faq.question}
                      </summary>
                      <div className="p-4 pt-0 text-gray-600 text-sm">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Offices</h2>
            <p className="text-lg text-gray-600">
              Visit us at any of our global locations
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{office.city}</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="text-blue-600 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-600">{office.address}</span>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="text-green-600 mr-3" />
                    <span className="text-gray-600">{office.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <FaClock className="text-orange-600 mr-3" />
                    <span className="text-gray-600">{office.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Response Time Guarantee */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Response Commitment</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            We're committed to providing exceptional support to our users
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">&lt; 1 Hour</div>
              <div className="text-blue-200">Urgent Issues</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">&lt; 24 Hours</div>
              <div className="text-blue-200">General Support</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-200">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
