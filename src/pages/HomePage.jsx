import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <section className="px-6 py-20 md:py-32 text-center bg-gradient-to-b from-slate-900 to-slate-800">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Welcome to <span className="text-emerald-400">PrepPulse</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-300 mb-8">
          Your all-in-one academic dashboard. Organize study resources, track goals, collaborate with peers, and stay consistent — all in one place.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-6 rounded-full text-lg transition duration-300"
        >
          Get Started
        </Link>
      </section>
      <section className="px-6 py-16 bg-slate-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What You Can Do</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "📚 Organize Resources",
                desc: "Store notes, links, and videos by category with smart filtering and search.",
              },
              {
                title: "📅 Track Your Goals",
                desc: "Visualize your study progress and stay on top of weekly targets.",
              },
              {
                title: "🏆 Stay Motivated",
                desc: "Earn streaks and XP for completing study tasks every day.",
              },
              {
                title: "🤝 Join Study Groups",
                desc: "Create or join private groups to share resources with your friends.",
              },
              {
                title: "🔒 Secure and Simple",
                desc: "Sign up with email or Google. All your data is safe and synced.",
              },
              {
                title: "✨ Clean & Fast UI",
                desc: "Enjoy a distraction-free interface with smooth interactions.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-slate-700 rounded-xl p-6 hover:shadow-lg hover:shadow-emerald-600/10 transition"
              >
                <h3 className="text-xl font-semibold text-emerald-400 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="px-6 py-20 bg-slate-900 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to make studying simpler?
        </h2>
        <p className="text-gray-400 mb-8">
          Join PrepPulse today and level up your learning experience.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-white text-emerald-700 hover:bg-emerald-600 hover:text-white font-semibold py-3 px-6 rounded-full transition duration-300"
        >
          Create an Account
        </Link>
      </section>
      <footer className="bg-slate-800 text-emerald-400 py-6">
      <div className="max-w-5xl mx-auto text-center">
        <p>&copy; 2023 PrepPulse. All rights reserved.</p>
      </div>
    </footer>
    </div>
    
  );
};

export default HomePage;
