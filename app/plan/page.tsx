"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PlanTrip() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
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
      soft: "from-cyan-500/10 to-blue-500/10",
    },
    {
      name: "Food",
      icon: "🍴",
      active: "from-orange-500 to-red-500",
      soft: "from-orange-500/10 to-red-500/10",
    },
    {
      name: "Adventure",
      icon: "🏔️",
      active: "from-emerald-500 to-green-600",
      soft: "from-emerald-500/10 to-green-500/10",
    },
    {
      name: "Nightlife",
      icon: "🎵",
      active: "from-fuchsia-500 to-purple-600",
      soft: "from-fuchsia-500/10 to-purple-500/10",
    },
    {
      name: "Nature",
      icon: "🌿",
      active: "from-green-500 to-teal-600",
      soft: "from-green-500/10 to-teal-500/10",
    },
    {
      name: "History",
      icon: "🏛️",
      active: "from-yellow-500 to-orange-600",
      soft: "from-yellow-500/10 to-orange-500/10",
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
    setIsGenerating(false);

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

    setIsGenerating(true);
    router.push(`/result?${params.toString()}`);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09001f] text-white">

      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-pink-600/30 blur-[120px] animate-pulse motion-safe:animate-[pulse_4s_ease-in-out_infinite]" />

        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/30 blur-[120px] animate-pulse" />

        <div className="absolute bottom-[-200px] left-[20%] h-[500px] w-[500px] rounded-full bg-purple-600/30 blur-[120px] motion-safe:animate-[pulse_6s_ease-in-out_infinite]" />

        <div className="absolute bottom-[-150px] right-[10%] h-[450px] w-[450px] rounded-full bg-orange-500/20 blur-[120px] motion-safe:animate-[pulse_5s_ease-in-out_infinite]" />

        <div className="absolute left-[15%] top-[25%] h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_25px_8px_rgba(34,211,238,0.5)] motion-safe:animate-[pulse_2s_ease-in-out_infinite]" />

        <div className="absolute right-[20%] top-[40%] h-3 w-3 rounded-full bg-pink-300 shadow-[0_0_25px_8px_rgba(244,114,182,0.5)] motion-safe:animate-[pulse_2.5s_ease-in-out_infinite]" />

        <div className="absolute bottom-[25%] left-[45%] h-3 w-3 rounded-full bg-yellow-300 shadow-[0_0_25px_8px_rgba(250,204,21,0.4)] motion-safe:animate-[pulse_3s_ease-in-out_infinite]" />

      </div>

      {/* ================= NAVBAR ================= */}

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#09001f]/75 px-6 py-5 backdrop-blur-2xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between">

          <a
            href="/"
            className="group flex items-center gap-2"
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

      {/* ================= HERO ================= */}

      <section className="relative px-5 pb-8 pt-10 md:px-8 md:pt-14">

        <div className="mx-auto max-w-7xl">

          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-violet-900/70 via-fuchsia-900/50 to-blue-900/70 p-8 shadow-2xl shadow-purple-950/50 backdrop-blur-2xl md:p-14">

            <div className="absolute right-[-100px] top-[-100px] h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

            <div className="absolute bottom-[-120px] left-[-80px] h-80 w-80 rounded-full bg-pink-500/20 blur-3xl" />

            <div className="relative grid items-center gap-12 md:grid-cols-2">

              {/* Hero Text */}

              <div>

                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm font-bold text-cyan-300">
                  📍 {destination}, India
                </div>

                <h1 className="text-5xl font-black leading-tight md:text-7xl">

                  Plan Your

                  <span className="block bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    Perfect Trip
                  </span>

                </h1>

                <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
                  Build a personalized travel experience based
                  on your destination, budget, duration and
                  interests.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">

                  <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">
                    🌊 Explore
                  </span>

                  <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-4 py-2 text-sm font-bold text-fuchsia-300">
                    🎉 Experience
                  </span>

                  <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
                    🌿 Discover
                  </span>

                </div>

              </div>

              {/* Illustration */}

              <div className="relative hidden h-80 md:block">

                <div className="absolute right-16 top-0 text-7xl motion-safe:animate-[float_4s_ease-in-out_infinite]">
                  ✈️
                </div>

                <div className="absolute left-10 bottom-5 text-8xl">
                  🌴
                </div>

                <div className="absolute right-8 bottom-0 text-8xl">
                  🏖️
                </div>

                <div className="absolute left-28 top-20 text-5xl motion-safe:animate-[pulse_3s_ease-in-out_infinite]">
                  ☀️
                </div>

                <div className="absolute inset-10 rounded-full bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-pink-500/20 blur-3xl" />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= FORM ================= */}

      <section className="relative px-5 pb-20 md:px-8">

        <div className="mx-auto max-w-5xl">

          <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/10 p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl motion-safe:animate-[fadeUp_0.9s_ease-out] md:p-10">

            {/* Header */}

            <div className="mb-9 flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 text-2xl shadow-lg shadow-blue-500/30">
                🧭
              </div>

              <div>

                <h2 className="text-3xl font-black text-white">
                  Your Trip Details
                </h2>

                <p className="mt-1 text-white/50">
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
                  className="w-full rounded-2xl border border-cyan-400/20 bg-white/5 px-5 py-4 text-lg font-bold text-white outline-none transition duration-300 placeholder:text-white/30 focus:border-cyan-400/60 focus:bg-cyan-400/10 focus:ring-4 focus:ring-cyan-400/10"
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

                  <div className="flex-1 rounded-2xl border border-pink-400/20 bg-pink-500/10 py-3.5 text-center text-lg font-black text-white">
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

                  <div className="flex-1 rounded-2xl border border-blue-400/20 bg-blue-500/10 py-3.5 text-center text-lg font-black text-white">
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
                  className="w-full rounded-2xl border border-emerald-400/20 bg-emerald-500/10 py-4 pl-11 pr-5 text-lg font-black text-white outline-none transition duration-300 placeholder:text-white/30 focus:border-emerald-400/60 focus:bg-emerald-500/15 focus:ring-4 focus:ring-emerald-400/10"
                  placeholder="15000"
                />

                <span className="absolute right-5 top-3.5 text-xl">
                  💵
                </span>

              </div>

              <p className="mt-2 text-sm text-white/40">
                Minimum budget: ₹1,000
              </p>

            </div>

            {/* Interests */}

            <div className="mt-9">

              <div className="mb-5">

                <label className="block text-sm font-black text-fuchsia-300">
                  ⭐ What are you interested in?
                </label>

                <p className="mt-1 text-sm text-white/40">
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
                      className={`group relative flex cursor-pointer items-center justify-between overflow-hidden rounded-2xl border p-4 transition duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl ${
                        selected
                          ? `border-white/30 bg-gradient-to-r ${interest.active} shadow-lg`
                          : `border-white/10 bg-gradient-to-r ${interest.soft} hover:border-white/20`
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
                              : "text-white/80"
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
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">

                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-white/40">
                  Selected Interests
                </p>

                <div className="flex flex-wrap gap-2">

                  {selectedInterests.map((interest) => (

                    <span
                      key={interest}
                      className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-sm font-bold text-cyan-300"
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
              disabled={isGenerating}
              className="group relative mt-10 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 bg-[length:200%_auto] py-5 text-lg font-black text-white shadow-2xl shadow-fuchsia-600/30 transition-all duration-700 hover:scale-[1.02] hover:-translate-y-1 hover:bg-right hover:shadow-fuchsia-500/50 active:scale-[0.98] disabled:cursor-wait disabled:opacity-80 motion-safe:animate-[glow_3s_ease-in-out_infinite]"
            >

              <span className="absolute inset-0 -translate-x-full bg-white/20 transition duration-700 group-hover:translate-x-full" />

              <span className="relative flex items-center justify-center gap-3">
                {isGenerating ? "✨ Creating Your Trip..." : "✨ Generate My Trip"}

                <span className="text-2xl transition duration-300 group-hover:translate-x-2">
                  →
                </span>
              </span>

            </button>

            <p className="mt-5 text-center text-xs font-medium text-white/40">
              🌍 Your itinerary will be customized according to
              your destination, budget and interests.
            </p>

          </div>

        </div>

      </section>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(18px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-4deg); }
          50% { transform: translateY(-18px) rotate(4deg); }
        }
        @keyframes glow {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.15); }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: .01ms !important;
            transition-duration: .01ms !important;
          }
        }
      `}</style>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-white/10 bg-black/20 px-6 py-10 text-center backdrop-blur-xl">

        <p className="text-xl font-black">
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