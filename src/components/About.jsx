import React, { useEffect, useState } from "react";

const About = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubProfile = async () => {
      try {
        const res = await fetch("https://api.github.com/users/aditya-dhungel");
        const data = await res.json();
        setUserInfo(data);
      } catch (err) {
        console.log("GitHub API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-xl font-semibold text-gray-700">Loading About Page...</h1>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <h1 className="text-xl font-semibold text-red-600">
          Failed to load GitHub Profile 😢
        </h1>
      </div>
    );
  }

  const {
    name,
    login,
    avatar_url,
    bio,
    location,
    followers,
    following,
    public_repos,
    html_url,
  } = userInfo;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-900">About DashDine</h1>
          <p className="mt-3 text-gray-600 text-lg leading-relaxed">
            DashDine is a modern food ordering and restaurant discovery platform
            designed to deliver a smooth, fast, and visually clean user
            experience. It helps users explore restaurants, view menus, and
            place orders with ease — built with performance, scalability, and a
            premium UI in mind.
          </p>

          {/* Quick Stats */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl bg-gray-100 p-5">
              <p className="text-sm text-gray-500">Fast UI</p>
              <p className="text-xl font-semibold text-gray-900">Optimized UX</p>
            </div>
            <div className="rounded-xl bg-gray-100 p-5">
              <p className="text-sm text-gray-500">Built With</p>
              <p className="text-xl font-semibold text-gray-900">React + Tailwind</p>
            </div>
            <div className="rounded-xl bg-gray-100 p-5">
              <p className="text-sm text-gray-500">Focus</p>
              <p className="text-xl font-semibold text-gray-900">Dashboard UI</p>
            </div>
            <div className="rounded-xl bg-gray-100 p-5">
              <p className="text-sm text-gray-500">Goal</p>
              <p className="text-xl font-semibold text-gray-900">Food made simple</p>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Features */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900">
                What DashDine Offers
              </h2>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Restaurant Discovery",
                    desc: "Browse restaurants with ratings, cuisines, and pricing to find the best match.",
                  },
                  {
                    title: "Menu Browsing",
                    desc: "Explore detailed menus with a smooth UI designed for speed and clarity.",
                  },
                  {
                    title: "Cart & Checkout Flow",
                    desc: "A clean cart system to add/remove items and manage order flow seamlessly.",
                  },
                  {
                    title: "Responsive Design",
                    desc: "Works smoothly across desktop and mobile with a consistent dashboard feel.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="border rounded-xl p-5 hover:shadow-sm transition"
                  >
                    <h3 className="font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 mt-2 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900">Tech Stack</h2>
              <p className="mt-3 text-gray-600">
                DashDine is built using modern web technologies to ensure a fast,
                scalable, and maintainable architecture.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  "React.js",
                  "Tailwind CSS",
                  "React Router",
                  "API Integration",
                  "Component-based UI",
                  "Responsive Layout",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Roadmap */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900">Future Improvements</h2>
              <ul className="mt-4 space-y-3 text-gray-700">
                <li>✅ User Authentication (Login / Signup)</li>
                <li>✅ Real-time Order Tracking</li>
                <li>✅ Admin Dashboard for Restaurant Owners</li>
                <li>✅ Payment Gateway Integration</li>
                <li>✅ Saved Favorites & Order History</li>
              </ul>
            </div>
          </div>

          {/* Right Side (GitHub Profile Card) */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-xl font-bold text-gray-900">Developer Profile</h2>

              <div className="mt-6 flex items-center gap-4">
                <img
                  src={avatar_url}
                  alt="GitHub Avatar"
                  className="w-16 h-16 rounded-full border"
                />
                <div>
                  <p className="text-lg font-semibold text-gray-900">
                    {name || "Unknown User"}
                  </p>
                  <p className="text-sm text-gray-500">@{login}</p>
                </div>
              </div>

              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                {bio || "No bio available on GitHub."}
              </p>

              <div className="mt-6 space-y-3 text-sm text-gray-700">
                <p>
                  📍 Location:{" "}
                  <span className="font-medium">{location || "Not mentioned"}</span>
                </p>
                <p>
                  📦 Public Repos:{" "}
                  <span className="font-medium">{public_repos}</span>
                </p>
              </div>

              <a
                href={html_url}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block w-full text-center bg-gray-900 text-white py-2 rounded-xl font-medium hover:bg-gray-800 transition"
              >
                View GitHub Profile
              </a>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-xl font-bold text-gray-900">Our Mission</h2>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                To build a fast, intuitive, and modern dining platform that feels
                premium — where users can discover great food and order without
                friction.
              </p>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-xl font-bold text-gray-900">Contact</h2>
              <p className="mt-3 text-gray-600 text-sm">
                Want to collaborate or give feedback?
              </p>

              <div className="mt-4 space-y-2 text-sm">
                <p className="text-gray-700">
                  📩 Email: <span className="font-medium">adityadhungel018@gmail.com</span>
                </p>
                <p className="text-gray-700">
                  🔗 LinkedIn:{" "}
                  <span className="font-medium">linkedin.com/in/aditya-dhungel</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} DashDine — Built for learning, scale, and
          real-world product experience.
        </div>
      </div>
    </div>
  );
};

export default About;
