import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileContract, FaGavel, FaExclamationTriangle, FaHandshake, FaUsers, FaShieldAlt } from 'react-icons/fa';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaFileContract className="mx-auto text-6xl mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-xl opacity-90">
            Please read these terms carefully before using SportSphere
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Last Updated */}
        <div className="mb-8 p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <p className="text-sm text-purple-800">
            <strong>Last updated:</strong> August 15, 2025
          </p>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to SportSphere! These Terms of Service ("Terms") govern your use of our platform and services. 
            By accessing or using SportSphere, you agree to be bound by these Terms.
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-12">
          {/* Acceptance of Terms */}
          <section>
            <div className="flex items-center mb-6">
              <FaHandshake className="text-3xl text-blue-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Acceptance of Terms</h2>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-700 mb-4">
                By creating an account or using SportSphere, you confirm that:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>You are at least 13 years old</li>
                <li>You have the legal capacity to enter into these Terms</li>
                <li>You will comply with all applicable laws and regulations</li>
                <li>All information you provide is accurate and current</li>
              </ul>
            </div>
          </section>

          {/* Platform Use */}
          <section>
            <div className="flex items-center mb-6">
              <FaUsers className="text-3xl text-green-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Platform Use</h2>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Permitted Uses</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>Create and manage sports tournaments</li>
                <li>Form and join teams</li>
                <li>Track fitness activities and goals</li>
                <li>Share sports-related content</li>
                <li>Connect with other sports enthusiasts</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Prohibited Activities</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Harassment, bullying, or threatening behavior</li>
                <li>Sharing inappropriate or offensive content</li>
                <li>Attempting to hack or compromise platform security</li>
                <li>Creating fake accounts or impersonating others</li>
                <li>Violating any applicable laws or regulations</li>
              </ul>
            </div>
          </section>

          {/* User Content */}
          <section>
            <div className="flex items-center mb-6">
              <FaShieldAlt className="text-3xl text-purple-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">User Content</h2>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-700 mb-4">
                You retain ownership of content you post, but grant SportSphere a license to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Display your content on the platform</li>
                <li>Moderate content for community guidelines</li>
                <li>Use content for platform improvement and marketing</li>
              </ul>
              <p className="text-gray-700">
                You are responsible for ensuring your content doesn't violate any rights or laws.
              </p>
            </div>
          </section>

          {/* Privacy */}
          <section>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy</h2>
              <p className="text-gray-700">
                Your privacy is important to us. Our collection and use of personal information is governed by our{' '}
                <Link to="/privacy" className="text-purple-600 hover:text-purple-800 font-semibold">
                  Privacy Policy
                </Link>
                , which is incorporated into these Terms by reference.
              </p>
            </div>
          </section>

          {/* Disclaimers */}
          <section>
            <div className="flex items-center mb-6">
              <FaExclamationTriangle className="text-3xl text-orange-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Disclaimers</h2>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <ul className="list-disc list-inside text-gray-700 space-y-3">
                <li>
                  <strong>Platform Availability:</strong> We strive for 99.9% uptime but cannot guarantee uninterrupted service
                </li>
                <li>
                  <strong>User-Generated Content:</strong> We are not responsible for content posted by users
                </li>
                <li>
                  <strong>Third-Party Links:</strong> External links are provided for convenience; we don't endorse linked content
                </li>
                <li>
                  <strong>Fitness Information:</strong> Fitness content is for informational purposes only, not medical advice
                </li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section>
            <div className="flex items-center mb-6">
              <FaGavel className="text-3xl text-red-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Limitation of Liability</h2>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law, SportSphere shall not be liable for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Indirect, incidental, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Damages arising from user interactions or content</li>
                <li>Service interruptions or technical issues</li>
              </ul>
            </div>
          </section>

          {/* Termination */}
          <section>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Termination</h2>
              <p className="text-gray-700 mb-4">
                Either party may terminate your account:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>You may delete your account at any time</li>
                <li>We may suspend or terminate accounts for Terms violations</li>
                <li>We may discontinue the service with reasonable notice</li>
              </ul>
            </div>
          </section>

          {/* Changes to Terms */}
          <section>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700">
                We may update these Terms from time to time. Material changes will be communicated through 
                the platform or via email. Continued use after changes constitutes acceptance of the new Terms.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700">
                These Terms are governed by the laws of the jurisdiction where SportSphere operates. 
                Any disputes will be resolved through binding arbitration.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <div className="bg-purple-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Terms</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about these Terms of Service, please contact us:
              </p>
              <div className="text-gray-700">
                <p>Email: legal@sportsphere.com</p>
                <p>Address: SportSphere Legal Team</p>
                <p className="mt-4">
                  <Link to="/contact" className="text-purple-600 hover:text-purple-800 font-semibold">
                    Contact Support →
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Agreement Notice */}
        <div className="mt-12 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>By using SportSphere, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
