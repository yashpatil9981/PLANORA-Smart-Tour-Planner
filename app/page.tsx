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
    },
    {
      name: "Manali",
      location: "Himachal Pradesh, India",
      rating: "4.7",
      description:
        "Mountains, adventure and breathtaking landscapes.",
      image: "/images/manali.jpg",
    },
    {
      name: "Kerala",
      location: "India",
      rating: "4.8",
      description:
        "Backwaters, nature and peaceful holiday experiences.",
      image: "/images/kerala.jpg",
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
    <main className="min-h-screen bg-white text-gray-900">

      {/* Navbar */}
      <nav className="flex items-center justify-between border-b bg-white px-8 py-5">

        <a
          href="/"
          className="text-2xl font-bold text-blue-600"
        >
          TourMate
        </a>

        <div className="flex items-center gap-6 text-sm font-medium">

          <a
            href="#destinations"
            className="transition hover:text-blue-600"
          >
            Explore
          </a>

          <a
            href="/plan"
            className="transition hover:text-blue-600"
          >
            Plan Trip
          </a>

          <a
            href="/saved"
            className="transition hover:text-blue-600"
          >
            Saved Trips
          </a>

          {user ? (
            <>
              <span className="font-semibold text-gray-800">
                👤 {user.name}
              </span>

              <button
                onClick={logout}
                className="text-red-600 transition hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="text-blue-600 transition hover:text-blue-700"
            >
              Login
            </a>
          )}

        </div>
      </nav>

      {/* Hero */}
      <section className="bg-blue-50 px-6 py-24 text-center">

        <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-600">
          Smart Travel Planner
        </p>

        <h2 className="mb-6 text-5xl font-bold">
          Plan Your Perfect Trip
        </h2>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600">
          Discover amazing destinations and create a personalized
          travel itinerary based on your budget, duration and interests.
        </p>

        <a
          href="/plan"
          className="inline-block rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition hover:bg-blue-700"
        >
          ✨ Plan My Trip
        </a>

      </section>

      {/* Destinations */}
      <section
        id="destinations"
        className="px-6 py-16 md:px-12"
      >

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>
              <h3 className="text-3xl font-bold">
                Popular Destinations
              </h3>

              <p className="mt-2 text-gray-600">
                Find your next adventure.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80">

              <span className="absolute left-4 top-3.5 text-gray-400">
                🔍
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search destination..."
                className="w-full rounded-xl border bg-white py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

            </div>

          </div>

          {/* Cards */}
          {filteredDestinations.length > 0 ? (

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">

              {filteredDestinations.map((destination) => (

                <div
                  key={destination.name}
                  className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >

                  {/* Image */}
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="h-56 w-full object-cover"
                  />

                  {/* Content */}
                  <div className="p-6">

                    <div className="mb-2 flex items-center justify-between">

                      <h4 className="text-2xl font-bold">
                        {destination.name}
                      </h4>

                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold">
                        ⭐ {destination.rating}
                      </span>

                    </div>

                    <p className="mb-3 text-sm text-gray-500">
                      📍 {destination.location}
                    </p>

                    <p className="mb-5 text-gray-600">
                      {destination.description}
                    </p>

                    <a
                      href={`/plan?destination=${encodeURIComponent(
                        destination.name
                      )}`}
                      className="block w-full rounded-xl bg-gray-900 py-3 text-center font-semibold text-white transition hover:bg-gray-800"
                    >
                      Explore
                    </a>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            /* No Results */
            <div className="mt-8 rounded-3xl border bg-gray-50 p-12 text-center">

              <div className="text-5xl">
                🔍
              </div>

              <h3 className="mt-5 text-2xl font-bold">
                No destinations found
              </h3>

              <p className="mt-2 text-gray-600">
                Try searching for Goa, Manali or Kerala.
              </p>

              <button
                onClick={() => setSearch("")}
                className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Clear Search
              </button>

            </div>

          )}

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t bg-gray-50 px-6 py-8 text-center">

        <p className="font-semibold text-gray-800">
          TourMate
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Plan smarter. Travel better.
        </p>

      </footer>

    </main>
  );
}