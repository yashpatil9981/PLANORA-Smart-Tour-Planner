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

  // Unique destinations
  const destinations = useMemo(() => {
    return [
      "All",
      ...Array.from(
        new Set(trips.map((trip) => trip.destination))
      ),
    ];
  }, [trips]);

  // Search + filter
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

      {/* Page */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">

          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                Your Travel Collection
              </p>

              <h1 className="mt-2 text-4xl font-bold text-gray-900">
                Saved Trips
              </h1>

              <p className="mt-3 text-gray-600">
                Manage and revisit your saved travel plans.
              </p>
            </div>

            {/* Trip Count */}
            <div className="rounded-2xl bg-blue-50 px-5 py-4 text-center">
              <p className="text-xs font-medium text-blue-600">
                Total Trips
              </p>

              <p className="mt-1 text-3xl font-bold text-blue-700">
                {trips.length}
              </p>
            </div>

          </div>

          {/* Search + Filters */}
          {trips.length > 0 && (
            <div className="mb-8 rounded-3xl border bg-white p-5 shadow-sm">

              <div className="flex flex-col gap-4 md:flex-row">

                {/* Search */}
                <div className="relative flex-1">

                  <span className="absolute left-4 top-3.5 text-gray-400">
                    🔍
                  </span>

                  <input
                    type="text"
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder="Search destination or interest..."
                    className="w-full rounded-xl border py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                </div>

                {/* Filter */}
                <select
                  value={filter}
                  onChange={(e) =>
                    setFilter(e.target.value)
                  }
                  className="rounded-xl border bg-white px-4 py-3 outline-none focus:border-blue-500"
                >
                  {destinations.map((destination) => (
                    <option
                      key={destination}
                      value={destination}
                    >
                      {destination === "All"
                        ? "All Destinations"
                        : destination}
                    </option>
                  ))}
                </select>

              </div>

              {/* Active filter info */}
              <div className="mt-4 flex items-center justify-between">

                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-semibold text-gray-800">
                    {filteredTrips.length}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-800">
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
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Clear Filters
                  </button>
                )}

              </div>

            </div>
          )}

          {/* No Trips */}
          {trips.length === 0 ? (

            <div className="rounded-3xl border bg-white p-12 text-center shadow-sm">

              <div className="text-6xl">
                🧳
              </div>

              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                No Saved Trips
              </h2>

              <p className="mt-3 text-gray-600">
                You haven't saved any trips yet.
              </p>

              <a
                href="/plan"
                className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                ✨ Plan a Trip
              </a>

            </div>

          ) : filteredTrips.length === 0 ? (

            /* No Search Results */
            <div className="rounded-3xl border bg-white p-12 text-center shadow-sm">

              <div className="text-5xl">
                🔍
              </div>

              <h2 className="mt-5 text-2xl font-bold text-gray-900">
                No matching trips
              </h2>

              <p className="mt-3 text-gray-600">
                Try another destination or interest.
              </p>

              <button
                onClick={() => {
                  setSearch("");
                  setFilter("All");
                }}
                className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Clear Filters
              </button>

            </div>

          ) : (

            /* Trips */
            <div className="grid gap-6 md:grid-cols-2">

              {filteredTrips.map((trip) => (

                <div
                  key={trip.id}
                  className="rounded-3xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >

                  {/* Title */}
                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                        Saved Trip
                      </p>

                      <h2 className="mt-1 text-2xl font-bold capitalize text-gray-900">
                        {trip.destination} Trip
                      </h2>
                    </div>

                    <button
                      onClick={() =>
                        deleteTrip(trip.id)
                      }
                      className="rounded-lg px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Delete
                    </button>

                  </div>

                  {/* Trip Info */}
                  <div className="mt-6 grid grid-cols-3 gap-3">

                    <div className="rounded-xl bg-blue-50 p-4 text-center">
                      <p className="text-xs text-gray-500">
                        Days
                      </p>

                      <p className="mt-1 text-lg font-bold">
                        {trip.days}
                      </p>
                    </div>

                    <div className="rounded-xl bg-purple-50 p-4 text-center">
                      <p className="text-xs text-gray-500">
                        Travelers
                      </p>

                      <p className="mt-1 text-lg font-bold">
                        {trip.travelers}
                      </p>
                    </div>

                    <div className="rounded-xl bg-green-50 p-4 text-center">
                      <p className="text-xs text-gray-500">
                        Budget
                      </p>

                      <p className="mt-1 text-lg font-bold">
                        ₹{trip.budget.toLocaleString("en-IN")}
                      </p>
                    </div>

                  </div>

                  {/* Interests */}
                  {trip.interests &&
                    trip.interests.length > 0 && (
                      <div className="mt-6">

                        <p className="mb-2 text-sm font-semibold text-gray-700">
                          Interests
                        </p>

                        <div className="flex flex-wrap gap-2">

                          {trip.interests.map(
                            (interest) => (
                              <span
                                key={interest}
                                className="rounded-full bg-green-50 px-3 py-1 text-sm text-green-700"
                              >
                                ❤️ {interest}
                              </span>
                            )
                          )}

                        </div>

                      </div>
                    )}

                  {/* Saved Date */}
                  <p className="mt-5 text-xs text-gray-400">
                    Saved on{" "}
                    {new Date(
                      trip.savedAt
                    ).toLocaleDateString("en-IN")}
                  </p>

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
                    className="mt-6 block w-full rounded-xl bg-blue-600 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                  >
                    View Trip
                  </a>

                </div>
              ))}

            </div>
          )}

        </div>
      </section>
    </main>
  );
}