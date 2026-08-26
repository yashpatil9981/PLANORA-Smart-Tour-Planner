"use client";

import { useEffect, useState } from "react";

export default function PlanTrip() {
  const [destination, setDestination] = useState("Goa");
  const [days, setDays] = useState(3);
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState("15000");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [error, setError] = useState("");

  const interests = [
    {
      name: "Beaches",
      icon: "🌊",
      active: "from-cyan-500 to-blue-600",
      soft: "from-cyan-500/20 to-blue-500/20",
    },
    {
      name: "Food",
      icon: "🍴",
      active: "from-orange-500 to-red-500",
      soft: "from-orange-500/20 to-red-500/20",
    },
    {
      name: "Adventure",
      icon: "🏔️",
      active: "from-emerald-500 to-green-600",
      soft: "from-emerald-500/20 to-green-500/20",
    },
    {
      name: "Nightlife",
      icon: "🎵",
      active: "from-fuchsia-500 to-purple-600",
      soft: "from-fuchsia-500/20 to-purple-500/20",
    },
    {
      name: "Nature",
      icon: "🌿",
      active: "from-green-500 to-teal-600",
      soft: "from-green-500/20 to-teal-500/20",
    },
    {
      name: "History",
      icon: "🏛️",
      active: "from-yellow-500 to-orange-600",
      soft: "from-yellow-500/20 to-orange-500/20",
    },
  ];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlDestination = params.get("destination");

    if (urlDestination) {
      setDestination(
        urlDestination.charAt(0).toUpperCase() +
          urlDestination.slice(1)
      );
    }
  }, []);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((current) =>
      current.includes(interest)
        ? current.filter((item) => item !== interest)
        : [...current, interest]
    );
  };

  const generateTrip = () => {
    setError("");

    const cleanDestination = destination.trim();
    const numericBudget = Number(budget);

    if (!cleanDestination) {
      setError("Please enter a destination.");
      return;
    }

    if (days < 1 || days > 30) {
      setError("Trip duration must be between 1 and 30 days.");
      return;
    }

    if (travelers < 1 || travelers > 20) {
      setError("Travelers must be between 1 and 20 people.");
      return;
    }

    if (!budget || numericBudget < 1000) {
      setError("Please enter a budget of at least ₹1,000.");
      return;
    }

    if (!Number.isFinite(numericBudget)) {
      setError("Please enter a valid budget.");
      return;
    }

    const params = new URLSearchParams({
      destination: cleanDestination,
      days: String(days),
      travelers: String(travelers),
      budget: String(numericBudget),
      interests: selectedInterests.join(","),
    });

    window.location.href = `/result?${params.toString()}`;
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-violet-950 via-fuchsia-900 to-indigo-950 text-gray-900">

      {/* ================= BACKGROUND ================= */}

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-pink-500/40 blur-[100px] animate-pulse" />
        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/40 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-150px] left-[20%] h-[500px] w-[500px] rounded-full bg-purple-500/40 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-100px] right-[10%] h-[450px] w-[450px] rounded-full bg-orange-500/30 blur-[100px] animate-pulse" />

        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-fuchsia-600/30 blur-[120px] animate-pulse" />

        <div className="absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-blue-600/30 blur-[120px] animate-pulse" />

        <div className="absolute bottom-[-200px] left-[20%] h-[500px] w-[500px] rounded-full bg-purple-600/30 blur-[120px] animate-pulse" />

        <div className="absolute bottom-[-150px] right-[10%] h-[400px] w-[400px] rounded-full bg-pink-600/25 blur-[120px] animate-pulse" />

        {/* Small floating lights */}
        <div className="absolute left-[15%] top-[25%] h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_25px_8px_rgba(34,211,238,0.5)] animate-pulse" />

        <div className="absolute right-[20%] top-[40%] h-2 w-2 rounded-full bg-pink-300 shadow-[0_0_25px_8px_rgba(244,114,182,0.5)] animate-pulse" />

        <div className="absolute bottom-[25%] left-[45%] h-3 w-3 rounded-full bg-yellow-300 shadow-[0_0_25px_8px_rgba(250,204,21,0.4)] animate-pulse" />

      </div>

      {/* ================= NAVBAR ================= */}

      <nav className="sticky top-0 z-50 border-b border-violet-200/50 bg-gradient-to-r from-cyan-100/90 via-fuchsia-100/90 to-pink-100/90 px-6 py-5 backdrop-blur-2xl">

        <div className="mx-auto flex max-w-6xl items-center justify-between">

          <a
            href="/"
            className="group text-2xl font-black tracking-tight text-gray-900"
          >
            <span className="transition group-hover:scale-110">
              ✈️
            </span>{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Smart Tour by YSP
            </span>
          </a>

          <a
            href="/"
            className="rounded-full border border-violet-300 bg-white/50 px-5 py-2.5 text-sm font-semibold text-gray-800 backdrop-blur-xl transition duration-300 hover:scale-105 hover:border-violet-400 hover:bg-white/80 hover:text-gray-950"
          >
            ← Back to Home
          </a>

        </div>

      </nav>

      {/* ================= HERO ================= */}

      <section className="relative px-5 pb-8 pt-10 md:px-8 md:pt-14">

        <div className="mx-auto max-w-6xl">

          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-cyan-200/90 via-fuchsia-200/90 to-indigo-200/90 p-8 shadow-2xl shadow-violet-300/50 backdrop-blur-2xl md:p-12">

            {/* Glow */}
            <div className="absolute right-[-100px] top-[-100px] h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />

            <div className="relative grid items-center gap-10 md:grid-cols-2">

              <div>

                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">
                  📍 {destination}, India
                </div>

                <h1 className="text-5xl font-black leading-tight text-gray-900 md:text-7xl">

                  Plan Your

                  <span className="block bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    Perfect Trip
                  </span>

                </h1>

                <p className="mt-5 max-w-xl text-lg leading-8 text-gray-700">
                  Build a personalized travel experience based
                  on your destination, budget, duration and
                  interests.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">

                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">
                    🌊 Explore
                  </span>

                  <span className="rounded-full border border-pink-400/30 bg-pink-400/10 px-4 py-2 text-sm font-bold text-pink-300">
                    🎉 Experience
                  </span>

                  <span className="rounded-full border border-green-400/30 bg-green-400/10 px-4 py-2 text-sm font-bold text-green-300">
                    🌿 Discover
                  </span>

                </div>

              </div>

              {/* Illustration */}
              <div className="relative hidden h-72 md:block">

                <div className="absolute right-16 top-0 text-7xl animate-bounce">
                  ✈️
                </div>

                <div className="absolute left-10 bottom-5 text-7xl">
                  🌴
                </div>

                <div className="absolute right-10 bottom-0 text-8xl">
                  🏖️
                </div>

                <div className="absolute left-28 top-16 text-5xl animate-pulse">
                  ☀️
                </div>

                <div className="absolute inset-8 rounded-full bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-pink-500/20 blur-3xl" />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= FORM ================= */}

      <section className="relative px-5 pb-20 md:px-8">

        <div className="mx-auto max-w-5xl">

          <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-violet-200/90 via-fuchsia-200/90 to-blue-200/90 p-6 shadow-2xl shadow-violet-300/50 backdrop-blur-2xl md:p-10">

            {/* Header */}
            <div className="mb-9 flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 text-2xl shadow-lg shadow-blue-500/30">
                🧭
              </div>

              <div>

                <h2 className="text-3xl font-black text-gray-900">
                  Your Trip Details
                </h2>

                <p className="mt-1 text-gray-700">
                  Customize your perfect travel experience.
                </p>

              </div>

            </div>

            {/* Error */}
            {error && (
              <div className="mb-7 rounded-2xl border border-red-400/30 bg-red-500/10 px-5 py-4 font-semibold text-red-300">
                ⚠️ {error}
              </div>
            )}

            {/* Destination */}
            <div className="mb-8">

              <label className="mb-3 block text-sm font-black text-cyan-300">
                🏙️ Destination
              </label>

              <div className="relative">

                <input
                  type="text"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setError("");
                  }}
                  placeholder="e.g. Goa"
                  className="w-full rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 px-5 py-4 text-lg font-bold text-gray-900 outline-none transition duration-300 placeholder:text-gray-500 focus:border-cyan-400/60 focus:bg-cyan-500/15 focus:ring-4 focus:ring-cyan-400/10"
                />

                <span className="absolute right-5 top-4 text-2xl">
                  🗺️
                </span>

              </div>

            </div>

            {/* Days + Travelers */}
            <div className="grid gap-7 md:grid-cols-2">

              {/* Days */}
              <div>

                <label className="mb-3 block text-sm font-black text-pink-300">
                  📅 Number of Days
                </label>

                <div className="flex items-center gap-3">

                  <button
                    type="button"
                    onClick={() =>
                      setDays(Math.max(1, days - 1))
                    }
                    className="h-12 w-12 rounded-2xl border border-pink-400/30 bg-pink-500/10 text-xl font-black text-pink-300 transition duration-300 hover:scale-110 hover:bg-pink-500/20 active:scale-90"
                  >
                    −
                  </button>

                  <div className="flex-1 rounded-2xl border border-pink-400/20 bg-gradient-to-r from-pink-500/10 to-fuchsia-500/10 py-3.5 text-center text-lg font-black text-gray-900">
                    {days} Days
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setDays(Math.min(30, days + 1))
                    }
                    className="h-12 w-12 rounded-2xl border border-pink-400/30 bg-pink-500/10 text-xl font-black text-pink-300 transition duration-300 hover:scale-110 hover:bg-pink-500/20 active:scale-90"
                  >
                    +
                  </button>

                </div>

              </div>

              {/* Travelers */}
              <div>

                <label className="mb-3 block text-sm font-black text-blue-300">
                  👥 Travelers
                </label>

                <div className="flex items-center gap-3">

                  <button
                    type="button"
                    onClick={() =>
                      setTravelers(
                        Math.max(1, travelers - 1)
                      )
                    }
                    className="h-12 w-12 rounded-2xl border border-blue-400/30 bg-blue-500/10 text-xl font-black text-blue-300 transition duration-300 hover:scale-110 hover:bg-blue-500/20 active:scale-90"
                  >
                    −
                  </button>

                  <div className="flex-1 rounded-2xl border border-blue-400/20 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 py-3.5 text-center text-lg font-black text-gray-900">
                    {travelers} People
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setTravelers(
                        Math.min(20, travelers + 1)
                      )
                    }
                    className="h-12 w-12 rounded-2xl border border-blue-400/30 bg-blue-500/10 text-xl font-black text-blue-300 transition duration-300 hover:scale-110 hover:bg-blue-500/20 active:scale-90"
                  >
                    +
                  </button>

                </div>

              </div>

            </div>

            {/* Budget */}
            <div className="mt-8">

              <label className="mb-3 block text-sm font-black text-emerald-300">
                💰 Total Budget
              </label>

              <div className="relative">

                <span className="absolute left-5 top-3.5 text-xl font-black text-emerald-300">
                  ₹
                </span>

                <input
                  type="number"
                  min="1000"
                  value={budget}
                  onChange={(e) => {
                    setBudget(e.target.value);
                    setError("");
                  }}
                  className="w-full rounded-2xl border border-emerald-400/20 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 py-4 pl-11 pr-5 text-lg font-black text-gray-900 outline-none transition duration-300 placeholder:text-gray-500 focus:border-emerald-400/60 focus:ring-4 focus:ring-emerald-400/10"
                  placeholder="15000"
                />

                <span className="absolute right-5 top-3.5 text-xl">
                  💵
                </span>

              </div>

              <p className="mt-2 text-sm text-gray-600">
                Minimum budget: ₹1,000
              </p>

            </div>

            {/* Interests */}
            <div className="mt-9">

              <div className="mb-5">

                <label className="block text-sm font-black text-fuchsia-300">
                  ⭐ What are you interested in?
                </label>

                <p className="mt-1 text-sm text-gray-600">
                  Select everything you enjoy.
                </p>

              </div>

              <div className="grid gap-4 md:grid-cols-3">

                {interests.map((interest) => {

                  const selected =
                    selectedInterests.includes(
                      interest.name
                    );

                  return (
                    <label
                      key={interest.name}
                      className={`group relative flex cursor-pointer items-center justify-between overflow-hidden rounded-2xl border p-4 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                        selected
                          ? `border-white/40 bg-gradient-to-r ${interest.active} shadow-lg`
                          : `border-violet-200/70 bg-white/35 ${interest.soft} hover:border-violet-300`
                      }`}
                    >

                      {selected && (
                        <div className="absolute inset-0 bg-white/10" />
                      )}

                      <div className="relative flex items-center gap-3">

                        <span className="text-3xl transition duration-300 group-hover:scale-125">
                          {interest.icon}
                        </span>

                        <span
                          className={`font-bold ${
                            selected
                              ? "text-white"
                              : "text-gray-800"
                          }`}
                        >
                          {interest.name}
                        </span>

                      </div>

                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() =>
                          toggleInterest(interest.name)
                        }
                        className="relative h-5 w-5 cursor-pointer accent-white"
                      />

                    </label>
                  );
                })}

              </div>

            </div>

            {/* Selected Interests */}
            {selectedInterests.length > 0 && (
              <div className="mt-6 rounded-2xl border border-violet-200/70 bg-gradient-to-r from-purple-100/70 via-fuchsia-100/70 to-blue-100/70 p-4">

                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-600">
                  Selected Interests
                </p>

                <div className="flex flex-wrap gap-2">

                  {selectedInterests.map((interest) => (
                    <span
                      key={interest}
                      className="rounded-full border border-white/10 bg-white/60 px-3 py-1.5 text-sm font-bold text-gray-800"
                    >
                      ✓ {interest}
                    </span>
                  ))}

                </div>

              </div>
            )}

            {/* Generate Button */}
            <button
              type="button"
              onClick={generateTrip}
              className="group relative mt-10 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 bg-[length:200%_auto] py-5 text-lg font-black text-white shadow-2xl shadow-fuchsia-600/30 transition-all duration-700 hover:scale-[1.02] hover:bg-right hover:shadow-fuchsia-500/50 active:scale-[0.98]"
            >

              <span className="absolute inset-0 -translate-x-full bg-white/20 transition duration-700 group-hover:translate-x-full" />

              <span className="relative flex items-center justify-center gap-3">
                ✨ Generate My Trip

                <span className="text-2xl transition duration-300 group-hover:translate-x-2">
                  →
                </span>
              </span>

            </button>

            <p className="mt-5 text-center text-xs font-medium text-gray-600">
              🌍 Your itinerary will be customized according to
              your destination, budget and interests.
            </p>

          </div>

        </div>

      </section>

      {/* Bottom decoration */}
      <div className="pointer-events-none fixed bottom-7 left-7 hidden text-4xl md:block">
        🌴
      </div>

      <div className="pointer-events-none fixed bottom-7 right-7 hidden text-4xl md:block">
        ✨
      </div>

    </main>
  );
}