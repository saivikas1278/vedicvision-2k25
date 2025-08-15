import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaDatabase, FaCookie, FaEye, FaUserShield, FaLock } from 'react-icons/fa';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaShieldAlt className="mx-auto text-6xl mb-6 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-xl opacity-90">
            Your privacy matters to us. Learn how we protect and handle your data.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Last Updated */}
        <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Last updated:</strong> August 15, 2025
          </p>
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p className="text-lg text-gray-700 leading-relaxed">
            At SportSphere, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
          </p>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-12">
          {/* Information We Collect */}
          <section>
            <div className="flex items-center mb-6">
              <FaDatabase className="text-3xl text-blue-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                <li>Name, email address, and profile information</li>
                <li>Sports preferences and fitness goals</li>
                <li>Team and tournament participation data</li>
                <li>Workout and activity tracking information</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Usage Information</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>How you interact with our platform</li>
                <li>Device information and IP address</li>
                <li>Browser type and operating system</li>
                <li>Pages visited and time spent on the platform</li>
              </ul>
            </div>
          </section>

          {/* How We Use Information */}
          <section>
            <div className="flex items-center mb-6">
              <FaEye className="text-3xl text-green-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <ul className="list-disc list-inside text-gray-700 space-y-3">
                <li>Provide and maintain our services</li>
                <li>Personalize your experience and recommendations</li>
                <li>Process tournament registrations and team formations</li>
                <li>Send important notifications about your activities</li>
                <li>Improve our platform and develop new features</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>
            </div>
          </section>

          {/* Data Security */}
          <section>
            <div className="flex items-center mb-6">
              <FaLock className="text-3xl text-purple-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Secure hosting infrastructure</li>
              </ul>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <div className="flex items-center mb-6">
              <FaCookie className="text-3xl text-orange-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Cookies and Tracking</h2>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to enhance your experience:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Essential cookies for platform functionality</li>
                <li>Analytics cookies to understand usage patterns</li>
                <li>Preference cookies to remember your settings</li>
              </ul>
              <p className="text-gray-700 mt-4">
                You can control cookie preferences through your browser settings.
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <div className="flex items-center mb-6">
              <FaUserShield className="text-3xl text-indigo-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <p className="text-gray-700 mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and data</li>
                <li>Export your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to data processing</li>
              </ul>
            </div>
          </section>

          {/* Third-Party Services */}
          <section>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                We may use third-party services for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Analytics and performance monitoring</li>
                <li>Cloud storage and hosting</li>
                <li>Payment processing</li>
                <li>Email delivery services</li>
              </ul>
              <p className="text-gray-700 mt-4">
                These services have their own privacy policies and we encourage you to review them.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section>
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="text-gray-700">
                <p>Email: privacy@sportsphere.com</p>
                <p>Address: SportSphere Privacy Team</p>
                <p className="mt-4">
                  <Link to="/contact" className="text-blue-600 hover:text-blue-800 font-semibold">
                    Contact Support →
                  </Link>
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Changes to Policy */}
        <div className="mt-12 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Changes to this Policy:</strong> We may update this Privacy Policy from time to time. 
            We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
