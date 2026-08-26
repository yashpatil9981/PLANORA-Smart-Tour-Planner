"use client";

import { useEffect, useState } from "react";

type User = {
  name: string;
  email: string;
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("tourmateUser");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem("tourmateUser");
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("tourmateUser");
    localStorage.removeItem("tourmateLoggedIn");
    setUser(null);
    window.location.href = "/";
  };

  const destinations = [
    {
      name: "Goa",
      location: "India",
      rating: "4.8",
      description:
        "Beautiful beaches, nightlife and unforgettable experiences.",
      image: "/images/goa.jpg",
      color: "from-cyan-500/20 to-blue-600/20",
      badge: "from-cyan-500 to-blue-600",
    },
    {
      name: "Manali",
      location: "Himachal Pradesh, India",
      rating: "4.7",
      description:
        "Mountains, adventure and breathtaking landscapes.",
      image: "/images/manali.jpg",
      color: "from-emerald-500/20 to-teal-600/20",
      badge: "from-emerald-500 to-green-600",
    },
    {
      name: "Kerala",
      location: "India",
      rating: "4.8",
      description:
        "Backwaters, nature and peaceful holiday experiences.",
      image: "/images/kerala.jpg",
      color: "from-fuchsia-500/20 to-purple-600/20",
      badge: "from-fuchsia-500 to-purple-600",
    },
  ];

  const filteredDestinations = destinations.filter(
    (destination) =>
      destination.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      destination.location
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09001f] text-white">

      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-pink-600/30 blur-[120px] animate-pulse" />

        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/30 blur-[120px] animate-pulse" />

        <div className="absolute bottom-[-200px] left-[20%] h-[500px] w-[500px] rounded-full bg-purple-600/30 blur-[120px] animate-pulse" />

        <div className="absolute bottom-[-150px] right-[10%] h-[450px] w-[450px] rounded-full bg-orange-500/25 blur-[120px] animate-pulse" />

        <div className="absolute left-[15%] top-[30%] h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_25px_8px_rgba(34,211,238,0.5)] animate-pulse" />

        <div className="absolute right-[20%] top-[45%] h-3 w-3 rounded-full bg-pink-300 shadow-[0_0_25px_8px_rgba(244,114,182,0.5)] animate-pulse" />

      </div>

      {/* ================= NAVBAR ================= */}

      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#09001f]/75 px-6 py-5 backdrop-blur-2xl">

        <div className="mx-auto flex max-w-7xl items-center justify-between">

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

          <div className="flex items-center gap-3 text-sm font-semibold md:gap-6">

            <a
              href="#destinations"
              className="text-white/70 transition hover:text-cyan-300"
            >
              Explore
            </a>

            <a
              href="/plan"
              className="text-white/70 transition hover:text-fuchsia-300"
            >
              Plan Trip
            </a>

            <a
              href="/saved"
              className="text-white/70 transition hover:text-pink-300"
            >
              Saved Trips
            </a>

            {user ? (
              <>
                <span className="hidden rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-cyan-300 md:block">
                  👤 {user.name}
                </span>

                <button
                  onClick={logout}
                  className="rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-red-300 transition hover:bg-red-500/20"
                >
                  Logout
                </button>
              </>
            ) : (
              <a
                href="/login"
                className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-cyan-300 transition hover:bg-cyan-400/20"
              >
                Login
              </a>
            )}

          </div>

        </div>

      </nav>

      {/* ================= HERO ================= */}

      <section className="relative px-5 py-16 md:px-8 md:py-24">

        <div className="mx-auto max-w-7xl">

          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-violet-900/70 via-fuchsia-900/50 to-blue-900/70 p-8 shadow-2xl shadow-purple-950/50 backdrop-blur-2xl md:p-16">

            <div className="absolute right-[-100px] top-[-100px] h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

            <div className="absolute bottom-[-120px] left-[-80px] h-80 w-80 rounded-full bg-pink-500/20 blur-3xl" />

            <div className="relative grid items-center gap-12 md:grid-cols-2">

              {/* Hero Text */}

              <div>

                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm font-bold text-cyan-300">
                  🌍 Smart Travel Planner
                </div>

                <h1 className="text-5xl font-black leading-tight md:text-7xl">

                  Plan Your

                  <span className="block bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    Perfect Trip
                  </span>

                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65 md:mx-0">
                  Discover amazing destinations and create a
                  personalized travel itinerary based on your
                  budget, duration and interests.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">

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

                <a
                  href="/plan"
                  className="group relative mt-9 inline-flex overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 px-8 py-4 text-lg font-black text-white shadow-2xl shadow-fuchsia-500/30 transition-all duration-500 hover:scale-105"
                >

                  <span className="relative z-10 flex items-center gap-3">

                    ✨ Plan My Trip

                    <span className="transition group-hover:translate-x-2">
                      →
                    </span>

                  </span>

                </a>

              </div>

              {/* Illustration */}

              <div className="relative hidden h-80 md:block">

                <div className="absolute right-16 top-0 text-7xl animate-bounce">
                  ✈️
                </div>

                <div className="absolute bottom-3 left-10 text-8xl">
                  🌴
                </div>

                <div className="absolute bottom-0 right-8 text-8xl">
                  🏖️
                </div>

                <div className="absolute left-28 top-20 text-5xl animate-pulse">
                  ☀️
                </div>

                <div className="absolute inset-10 rounded-full bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/20 to-pink-500/20 blur-3xl" />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= DESTINATIONS ================= */}

      <section
        id="destinations"
        className="relative px-5 pb-20 md:px-8"
      >

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
                Explore India
              </p>

              <h2 className="mt-2 text-4xl font-black text-white md:text-5xl">
                Popular Destinations
              </h2>

              <p className="mt-3 text-white/50">
                Find your next adventure.
              </p>

            </div>

            {/* Search */}

            <div className="relative w-full md:w-80">

              <span className="absolute left-4 top-3.5 text-cyan-300">
                🔍
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search destination..."
                className="w-full rounded-2xl border border-white/10 bg-white/10 py-3 pl-11 pr-4 text-white outline-none backdrop-blur-xl transition placeholder:text-white/30 focus:border-cyan-400/50 focus:bg-white/15"
              />

            </div>

          </div>

          {/* Cards */}

          {filteredDestinations.length > 0 ? (

            <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">

              {filteredDestinations.map((destination) => (

                <div
                  key={destination.name}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 shadow-2xl backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:border-white/20 hover:shadow-fuchsia-500/20"
                >

                  {/* Image */}

                  <div className="relative overflow-hidden">

                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="h-60 w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    <div className="absolute bottom-4 left-5">

                      <h3 className="text-3xl font-black text-white">
                        {destination.name}
                      </h3>

                      <p className="mt-1 text-sm text-white/70">
                        📍 {destination.location}
                      </p>

                    </div>

                    <span
                      className={`absolute right-4 top-4 rounded-full bg-gradient-to-r ${destination.badge} px-3 py-1.5 text-sm font-black text-white shadow-lg`}
                    >
                      ⭐ {destination.rating}
                    </span>

                  </div>

                  {/* Content */}

                  <div
                    className={`bg-gradient-to-br ${destination.color} p-6`}
                  >

                    <p className="mb-6 min-h-[56px] text-white/65">
                      {destination.description}
                    </p>

                    <a
                      href={`/plan?destination=${encodeURIComponent(
                        destination.name
                      )}`}
                      className="block w-full rounded-xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 py-3 text-center font-black text-white shadow-lg transition duration-300 hover:scale-[1.02]"
                    >
                      Explore {destination.name} →
                    </a>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            /* No Results */

            <div className="mt-10 rounded-[2rem] border border-white/10 bg-white/5 p-12 text-center backdrop-blur-xl">

              <div className="text-6xl">
                🔍
              </div>

              <h3 className="mt-5 text-2xl font-black text-white">
                No destinations found
              </h3>

              <p className="mt-2 text-white/50">
                Try searching for Goa, Manali or Kerala.
              </p>

              <button
                onClick={() => setSearch("")}
                className="mt-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-bold text-white transition hover:scale-105"
              >
                Clear Search
              </button>

            </div>

          )}

        </div>

      </section>

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