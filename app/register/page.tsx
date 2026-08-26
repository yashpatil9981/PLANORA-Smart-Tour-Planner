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
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="border-b bg-white px-8 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a
            href="/"
            className="text-2xl font-bold text-blue-600"
          >
            TourMate
          </a>

          <a
            href="/"
            className="text-sm font-medium text-gray-600 hover:text-blue-600"
          >
            ← Back to Home
          </a>
        </div>
      </nav>

      {/* Register */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-md">

          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              Create Account
            </h1>

            <p className="mt-3 text-gray-600">
              Join TourMate and save your trips.
            </p>
          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm">

            <form onSubmit={handleRegister}>

              {/* Name */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold">
                  Full Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Password */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  required
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold">
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Re-enter password"
                  required
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="mb-5 rounded-xl bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Register */}
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Create Account
              </button>

            </form>

            {/* Login */}
            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?
              {" "}
              <a
                href="/login"
                className="font-semibold text-blue-600 hover:underline"
              >
                Login
              </a>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}