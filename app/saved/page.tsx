"use client";

import { useEffect, useMemo, useState } from "react";

type Trip = {
  id: number;
  destination: string;
  days: number;
  travelers: number;
  budget: number;
  interests: string[];
  savedAt: string;
  userEmail: string;
};

export default function SavedTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const savedUser = localStorage.getItem("tourmateUser");

    if (!savedUser) {
      window.location.href = "/login";
      return;
    }

    try {
      const user = JSON.parse(savedUser);

      if (!user.email) {
        window.location.href = "/login";
        return;
      }

      const savedTrips = localStorage.getItem("savedTrips");

      if (savedTrips) {
        const allTrips: Trip[] = JSON.parse(savedTrips);

        const userTrips = allTrips.filter(
          (trip) => trip.userEmail === user.email
        );

        setTrips(userTrips);
      }
    } catch {
      window.location.href = "/login";
    }
  }, []);

  const deleteTrip = (id: number) => {
    const savedUser = localStorage.getItem("tourmateUser");

    if (!savedUser) {
      window.location.href = "/login";
      return;
    }

    try {
      const user = JSON.parse(savedUser);

      const allTrips: Trip[] = JSON.parse(
        localStorage.getItem("savedTrips") || "[]"
      );

      const updatedTrips = allTrips.filter(
        (trip) => trip.id !== id
      );

      localStorage.setItem(
        "savedTrips",
        JSON.stringify(updatedTrips)
      );

      setTrips(
        updatedTrips.filter(
          (trip) => trip.userEmail === user.email
        )
      );
    } catch {
      alert("Unable to delete trip. Please login again.");
      window.location.href = "/login";
    }
  };

  const destinations = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(trips.map((trip) => trip.destination))
      ),
    ];
  }, [trips]);

  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const matchesSearch =
        trip.destination
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        trip.interests.some((interest) =>
          interest.toLowerCase().includes(search.toLowerCase())
        );

      const matchesFilter =
        filter === "All" ||
        trip.destination.toLowerCase() ===
          filter.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }, [trips, search, filter]);

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

          <a
            href="/"
            className="rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white/80 backdrop-blur-xl transition duration-300 hover:scale-105 hover:border-cyan-400/40 hover:bg-white/15 hover:text-white"
          >
            ← Back to Home
          </a>

        </div>

      </nav>

      {/* ================= PAGE ================= */}

      <section className="relative px-5 py-12 md:px-8 md:py-16">

        <div className="mx-auto max-w-7xl">

          {/* ================= HEADER ================= */}

          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">

            <div>

              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm font-bold text-cyan-300">
                🧳 Your Travel Collection
              </div>

              <h1 className="text-5xl font-black">

                Saved{" "}

                <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                  Trips
                </span>

              </h1>

              <p className="mt-3 text-lg text-white/50">
                Manage and revisit your saved travel plans.
              </p>

            </div>

            {/* Trip Count */}

            <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/15 to-blue-500/10 px-8 py-5 text-center shadow-xl shadow-cyan-500/10 backdrop-blur-xl">

              <p className="text-xs font-black uppercase tracking-widest text-cyan-300">
                Total Trips
              </p>

              <p className="mt-1 text-4xl font-black text-white">
                {trips.length}
              </p>

            </div>

          </div>

          {/* ================= SEARCH + FILTER ================= */}

          {trips.length > 0 && (

            <div className="mb-10 rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-2xl">

              <div className="flex flex-col gap-4 md:flex-row">

                {/* Search */}

                <div className="relative flex-1">

                  <span className="absolute left-5 top-3.5 text-xl text-cyan-300">
                    🔍
                  </span>

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search destination or interest..."
                    className="w-full rounded-2xl border border-cyan-400/20 bg-cyan-500/5 py-4 pl-13 pr-4 text-white outline-none transition duration-300 placeholder:text-white/30 focus:border-cyan-400/60 focus:bg-cyan-500/10 focus:ring-4 focus:ring-cyan-400/10"
                  />

                </div>

                {/* Filter */}

                <select
                  value={filter}
                  onChange={(e) =>
                    setFilter(e.target.value)
                  }
                  className="rounded-2xl border border-fuchsia-400/20 bg-[#17082f] px-5 py-4 font-semibold text-white outline-none transition focus:border-fuchsia-400/60"
                >

                  {destinations.map((destination) => (

                    <option
                      key={destination}
                      value={destination}
                      className="bg-[#17082f] text-white"
                    >
                      {destination === "All"
                        ? "All Destinations"
                        : destination}
                    </option>

                  ))}

                </select>

              </div>

              {/* Filter Info */}

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">

                <p className="text-sm text-white/40">

                  Showing{" "}

                  <span className="font-black text-cyan-300">
                    {filteredTrips.length}
                  </span>{" "}

                  of{" "}

                  <span className="font-black text-fuchsia-300">
                    {trips.length}
                  </span>{" "}

                  trips

                </p>

                {(search || filter !== "All") && (

                  <button
                    onClick={() => {
                      setSearch("");
                      setFilter("All");
                    }}
                    className="rounded-full border border-pink-400/20 bg-pink-500/10 px-4 py-2 text-sm font-bold text-pink-300 transition hover:bg-pink-500/20"
                  >
                    Clear Filters
                  </button>

                )}

              </div>

            </div>

          )}

          {/* ================= NO TRIPS ================= */}

          {trips.length === 0 ? (

            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-14 text-center shadow-2xl backdrop-blur-2xl">

              <div className="text-7xl">
                🧳
              </div>

              <h2 className="mt-6 text-3xl font-black text-white">
                No Saved Trips
              </h2>

              <p className="mt-3 text-lg text-white/50">
                You haven't saved any trips yet.
              </p>

              <a
                href="/plan"
                className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 px-8 py-4 font-black text-white shadow-2xl shadow-fuchsia-500/30 transition duration-300 hover:scale-105"
              >
                ✨ Plan a Trip →
              </a>

            </div>

          ) : filteredTrips.length === 0 ? (

            /* ================= NO SEARCH RESULTS ================= */

            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-14 text-center shadow-2xl backdrop-blur-2xl">

              <div className="text-6xl">
                🔍
              </div>

              <h2 className="mt-6 text-3xl font-black text-white">
                No Matching Trips
              </h2>

              <p className="mt-3 text-white/50">
                Try another destination or interest.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setFilter("All");
                }}
                className="mt-7 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3.5 font-black text-white shadow-lg shadow-cyan-500/20 transition hover:scale-105"
              >
                Clear Filters
              </button>

            </div>

          ) : (

            /* ================= TRIPS ================= */

            <div className="grid gap-7 md:grid-cols-2">

              {filteredTrips.map((trip, index) => (

                <div
                  key={trip.id}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/10 shadow-2xl backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-fuchsia-500/20"
                >

                  {/* Top Gradient */}

                  <div
                    className={`h-2 ${
                      index % 3 === 0
                        ? "bg-gradient-to-r from-cyan-400 to-blue-600"
                        : index % 3 === 1
                        ? "bg-gradient-to-r from-fuchsia-500 to-purple-600"
                        : "bg-gradient-to-r from-orange-400 to-pink-500"
                    }`}
                  />

                  <div className="p-7">

                    {/* Title */}

                    <div className="flex items-start justify-between gap-4">

                      <div>

                        <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">
                          Saved Trip
                        </p>

                        <h2 className="mt-2 text-3xl font-black capitalize text-white">
                          {trip.destination} Trip
                        </h2>

                      </div>

                      <button
                        onClick={() =>
                          deleteTrip(trip.id)
                        }
                        className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-300 transition duration-300 hover:scale-105 hover:bg-red-500/20"
                      >
                        🗑️ Delete
                      </button>

                    </div>

                    {/* Trip Info */}

                    <div className="mt-7 grid grid-cols-3 gap-3">

                      <div className="rounded-2xl border border-cyan-400/15 bg-cyan-500/10 p-4 text-center">

                        <p className="text-xs font-bold uppercase tracking-wide text-cyan-300/70">
                          Days
                        </p>

                        <p className="mt-2 text-2xl font-black text-white">
                          {trip.days}
                        </p>

                      </div>

                      <div className="rounded-2xl border border-fuchsia-400/15 bg-fuchsia-500/10 p-4 text-center">

                        <p className="text-xs font-bold uppercase tracking-wide text-fuchsia-300/70">
                          Travelers
                        </p>

                        <p className="mt-2 text-2xl font-black text-white">
                          {trip.travelers}
                        </p>

                      </div>

                      <div className="rounded-2xl border border-emerald-400/15 bg-emerald-500/10 p-4 text-center">

                        <p className="text-xs font-bold uppercase tracking-wide text-emerald-300/70">
                          Budget
                        </p>

                        <p className="mt-2 text-lg font-black text-white">
                          ₹{trip.budget.toLocaleString("en-IN")}
                        </p>

                      </div>

                    </div>

                    {/* Interests */}

                    {trip.interests &&
                      trip.interests.length > 0 && (

                        <div className="mt-7">

                          <p className="mb-3 text-sm font-black text-fuchsia-300">
                            ⭐ Interests
                          </p>

                          <div className="flex flex-wrap gap-2">

                            {trip.interests.map(
                              (interest) => (

                                <span
                                  key={interest}
                                  className="rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1.5 text-sm font-bold text-fuchsia-300 transition hover:bg-fuchsia-500/20"
                                >
                                  ❤️ {interest}
                                </span>

                              )
                            )}

                          </div>

                        </div>

                      )}

                    {/* Saved Date */}

                    <div className="mt-6 flex items-center gap-2 text-xs text-white/30">
                      🕒

                      <span>
                        Saved on{" "}
                        {new Date(
                          trip.savedAt
                        ).toLocaleDateString("en-IN")}
                      </span>
                    </div>

                    {/* View Trip */}

                    <a
                      href={`/result?destination=${encodeURIComponent(
                        trip.destination
                      )}&days=${trip.days}&travelers=${
                        trip.travelers
                      }&budget=${
                        trip.budget
                      }&interests=${encodeURIComponent(
                        trip.interests.join(",")
                      )}`}
                      className="group mt-7 block w-full rounded-2xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 py-4 text-center font-black text-white shadow-xl shadow-fuchsia-500/20 transition duration-500 hover:scale-[1.02] hover:shadow-fuchsia-500/40"
                    >
                      <span className="inline-flex items-center gap-2">
                        👀 View Trip

                        <span className="transition duration-300 group-hover:translate-x-2">
                          →
                        </span>
                      </span>
                    </a>

                  </div>

                </div>

              ))}

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