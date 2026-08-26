"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    const existingUser = localStorage.getItem("tourmateUser");

    if (existingUser) {
      const user = JSON.parse(existingUser);

      if (user.email === email) {
        setError("An account with this email already exists.");
        return;
      }
    }

    const user = {
      name,
      email,
      password,
    };

    localStorage.setItem("tourmateUser", JSON.stringify(user));
    localStorage.setItem("tourmateLoggedIn", "true");

    window.location.href = "/";
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09001f] text-white">

      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-pink-600/30 blur-[120px] animate-pulse" />

        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/30 blur-[120px] animate-pulse" />

        <div className="absolute bottom-[-200px] left-[20%] h-[500px] w-[500px] rounded-full bg-purple-600/30 blur-[120px] animate-pulse" />

        <div className="absolute bottom-[-150px] right-[10%] h-[450px] w-[450px] rounded-full bg-orange-500/20 blur-[120px] animate-pulse" />

        <div className="absolute left-[15%] top-[30%] h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_25px_8px_rgba(34,211,238,0.5)] animate-pulse" />

        <div className="absolute right-[20%] top-[45%] h-3 w-3 rounded-full bg-pink-300 shadow-[0_0_25px_8px_rgba(244,114,182,0.5)] animate-pulse" />

      </div>

      {/* ================= NAVBAR ================= */}

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#09001f]/75 px-6 py-5 backdrop-blur-2xl">

        <div className="mx-auto flex max-w-6xl items-center justify-between">

          <a
            href="/"
            className="flex items-center gap-2"
          >
            <span className="text-2xl">
              ✈️
            </span>

            <div className="flex flex-col leading-none">

              <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                PLANORA
              </span>

              <span className="mt-1 text-[10px] font-semibold tracking-wide text-white/50">
                AI-Powered Smart Travel Planning
              </span>

            </div>
          </a>

          <a
            href="/"
            className="rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white/80 backdrop-blur-xl transition duration-300 hover:scale-105 hover:border-cyan-400/40 hover:bg-white/15 hover:text-white"
          >
            ← Back to Home
          </a>

        </div>

      </nav>

      {/* ================= REGISTER ================= */}

      <section className="relative px-6 py-16 md:py-20">

        <div className="mx-auto max-w-md">

          {/* Heading */}

          <div className="mb-8 text-center">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-fuchsia-500 to-pink-500 text-3xl shadow-2xl shadow-fuchsia-500/30">
              ✨
            </div>

            <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
              Welcome to PLANORA
            </p>

            <h1 className="mt-3 text-4xl font-black">
              Create{" "}
              <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Account
              </span>
            </h1>

            <p className="mt-3 text-white/50">
              Join PLANORA and save your trips.
            </p>

          </div>

          {/* Card */}

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur-2xl md:p-10">

            <form onSubmit={handleRegister}>

              {/* Name */}

              <div className="mb-6">

                <label className="mb-3 block text-sm font-black text-cyan-300">
                  👤 Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full rounded-2xl border border-cyan-400/20 bg-cyan-500/5 px-5 py-4 text-white outline-none transition duration-300 placeholder:text-white/30 focus:border-cyan-400/60 focus:bg-cyan-500/10 focus:ring-4 focus:ring-cyan-400/10"
                />

              </div>

              {/* Email */}

              <div className="mb-6">

                <label className="mb-3 block text-sm font-black text-fuchsia-300">
                  📧 Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/5 px-5 py-4 text-white outline-none transition duration-300 placeholder:text-white/30 focus:border-fuchsia-400/60 focus:bg-fuchsia-500/10 focus:ring-4 focus:ring-fuchsia-400/10"
                />

              </div>

              {/* Password */}

              <div className="mb-6">

                <label className="mb-3 block text-sm font-black text-cyan-300">
                  🔑 Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  required
                  className="w-full rounded-2xl border border-cyan-400/20 bg-cyan-500/5 px-5 py-4 text-white outline-none transition duration-300 placeholder:text-white/30 focus:border-cyan-400/60 focus:bg-cyan-500/10 focus:ring-4 focus:ring-cyan-400/10"
                />

              </div>

              {/* Confirm Password */}

              <div className="mb-6">

                <label className="mb-3 block text-sm font-black text-fuchsia-300">
                  🔐 Confirm Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Re-enter password"
                  required
                  className="w-full rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/5 px-5 py-4 text-white outline-none transition duration-300 placeholder:text-white/30 focus:border-fuchsia-400/60 focus:bg-fuchsia-500/10 focus:ring-4 focus:ring-fuchsia-400/10"
                />

              </div>

              {/* Error */}

              {error && (

                <div className="mb-6 rounded-2xl border border-red-400/30 bg-red-500/10 p-4 text-sm font-semibold text-red-300">
                  ⚠️ {error}
                </div>

              )}

              {/* Register */}

              <button
                type="submit"
                className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 py-4 text-lg font-black text-white shadow-2xl shadow-fuchsia-600/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-fuchsia-500/50 active:scale-[0.98]"
              >

                <span className="absolute inset-0 -translate-x-full bg-white/20 transition duration-700 group-hover:translate-x-full" />

                <span className="relative flex items-center justify-center gap-3">
                  🚀 Create Account

                  <span className="text-xl transition duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </span>

              </button>

            </form>

            {/* Login */}

            <div className="mt-7 border-t border-white/10 pt-6 text-center">

              <p className="text-sm text-white/50">
                Already have an account?
              </p>

              <a
                href="/login"
                className="mt-2 inline-block font-black text-cyan-300 transition hover:text-fuchsia-300 hover:underline"
              >
                Login →
              </a>

            </div>

          </div>

          {/* Bottom text */}

          <p className="mt-8 text-center text-xs text-white/30">
            🌍 AI-Powered Smart Travel Planning
          </p>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-white/10 bg-black/20 px-6 py-8 text-center backdrop-blur-xl">

        <p className="text-lg font-black">
          ✈️{" "}

          <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            PLANORA
          </span>
        </p>

        <p className="mt-2 text-sm text-white/40">
          AI-Powered Smart Travel Planning
        </p>

      </footer>

    </main>
  );
}
