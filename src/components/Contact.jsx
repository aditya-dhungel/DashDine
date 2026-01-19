import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-3 text-gray-600 text-lg leading-relaxed">
            Have questions, feedback, or want to collaborate with DashDine?
            Reach out anytime — we’d love to hear from you.
          </p>
        </div>

        {/* Main Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900">Send a Message</h2>
            <p className="mt-2 text-gray-600">
              Fill out the form and we’ll get back to you soon.
            </p>

            <form className="mt-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Write your message..."
                  className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>

              <div className="mt-5 space-y-3 text-sm text-gray-700">
                <p>
                  📩 Email: <span className="font-medium">adityadhungel018@gmail.com</span>
                </p>
                <p>
                  🌍 Location: <span className="font-medium">India</span>
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-xl font-bold text-gray-900">Support Hours</h2>
              <p className="mt-3 text-gray-600 text-sm">
                We usually respond within 24 hours.
              </p>

              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <p>🕒 Mon - Fri: 9:00 AM - 6:00 PM</p>
                <p>🕒 Sat: 10:00 AM - 2:00 PM</p>
                <p>❌ Sunday: Closed</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-xl font-bold text-gray-900">Quick Note</h2>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                DashDine is a learning-focused project built with modern UI/UX
                practices. Your feedback helps improve the product experience.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} DashDine — Let’s build something great together.
        </div>
      </div>
    </div>
  );
};

export default Contact;

