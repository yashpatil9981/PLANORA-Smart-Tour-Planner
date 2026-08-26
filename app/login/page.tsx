"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const savedUser = localStorage.getItem("tourmateUser");

    if (!savedUser) {
      setError("No account found. Please create an account first.");
      return;
    }

    const user = JSON.parse(savedUser);

    if (user.email !== email || user.password !== password) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem("tourmateLoggedIn", "true");
    window.location.href = "/";
  };

  return (
    <main className="min-h-screen bg-gray-50">
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

      <section className="px-6 py-16">
        <div className="mx-auto max-w-md">

          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              Welcome Back
            </h1>

            <p className="mt-3 text-gray-600">
              Login to your TourMate account.
            </p>
          </div>

          <div className="rounded-3xl border bg-white p-8 shadow-sm">

            <form onSubmit={handleLogin}>

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

              <div className="mb-5">
                <label className="mb-2 block text-sm font-semibold">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {error && (
                <div className="mb-5 rounded-xl bg-red-50 p-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Login
              </button>

            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?
              {" "}
              <a
                href="/register"
                className="font-semibold text-blue-600 hover:underline"
              >
                Create Account
              </a>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}