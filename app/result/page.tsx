"use client";

import { useEffect, useState } from "react";

type SavedTrip = {
  id: number;
  destination: string;
  days: number;
  travelers: number;
  budget: number;
  interests: string[];
  itinerary: string;
  savedAt: string;
  userEmail?: string;
};

export default function ResultPage() {
  const [destination, setDestination] = useState("Goa");
  const [days, setDays] = useState(3);
  const [travelers, setTravelers] = useState(2);
  const [budget, setBudget] = useState(15000);
  const [interests, setInterests] = useState<string[]>([]);

  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const destinationParam =
      params.get("destination") || "Goa";

    const daysParam =
      Number(params.get("days")) || 3;

    const travelersParam =
      Number(params.get("travelers")) || 2;

    const budgetParam =
      Number(params.get("budget")) || 15000;

    const interestsParam = params.get("interests")
      ? params
          .get("interests")!
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

    setDestination(destinationParam);
    setDays(daysParam);
    setTravelers(travelersParam);
    setBudget(budgetParam);
    setInterests(interestsParam);

    generateTrip(
      destinationParam,
      daysParam,
      travelersParam,
      budgetParam,
      interestsParam
    );
  }, []);

  const generateTrip = async (
    tripDestination: string,
    tripDays: number,
    tripTravelers: number,
    tripBudget: number,
    tripInterests: string[]
  ) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/generate-trip",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            destination: tripDestination,
            days: tripDays,
            travelers: tripTravelers,
            budget: tripBudget,
            interests: tripInterests,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.error || "Failed to generate trip."
        );
      }

      setItinerary(data.itinerary);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to generate trip."
      );
    } finally {
      setLoading(false);
    }
  };

  const saveTrip = () => {
    if (!itinerary) return;

    const savedUser =
      localStorage.getItem("tourmateUser");

    if (!savedUser) {
      alert("Please login before saving a trip.");
      window.location.href = "/login";
      return;
    }

    let user: { email?: string };

    try {
      user = JSON.parse(savedUser);
    } catch {
      alert(
        "Login information is invalid. Please login again."
      );
      window.location.href = "/login";
      return;
    }

    if (!user.email) {
      alert("User email not found. Please login again.");
      window.location.href = "/login";
      return;
    }

    const existingTrips: SavedTrip[] =
      JSON.parse(
        localStorage.getItem("savedTrips") || "[]"
      );

    const alreadySaved = existingTrips.some(
      (trip) =>
        trip.userEmail === user.email &&
        trip.destination.toLowerCase() ===
          destination.toLowerCase() &&
        trip.days === days &&
        trip.travelers === travelers &&
        trip.budget === budget &&
        JSON.stringify(trip.interests) ===
          JSON.stringify(interests)
    );

    if (alreadySaved) {
      alert("This trip is already saved!");
      setSaved(true);
      return;
    }

    const newTrip: SavedTrip = {
      id: Date.now(),
      destination,
      days,
      travelers,
      budget,
      interests,
      itinerary,
      savedAt: new Date().toISOString(),
      userEmail: user.email,
    };

    localStorage.setItem(
      "savedTrips",
      JSON.stringify([
        ...existingTrips,
        newTrip,
      ])
    );

    setSaved(true);

    alert("Trip saved successfully!");
  };

  const travelCost = Math.round(budget * 0.25);
  const stayCost = Math.round(budget * 0.30);
  const foodCost = Math.round(budget * 0.15);
  const activityCost = Math.round(budget * 0.20);

  const miscCost =
    budget -
    travelCost -
    stayCost -
    foodCost -
    activityCost;

  const mapUrl =
    `https://www.google.com/maps/search/` +
    encodeURIComponent(destination);

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
            className="group flex items-center gap-2 transition duration-300 hover:scale-105"
          >
            <span className="text-2xl transition duration-500 group-hover:-rotate-12 group-hover:scale-110">
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

          <div className="flex gap-3">

            <a
              href="/plan"
              className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-5 py-2.5 text-sm font-bold text-cyan-300 transition hover:bg-cyan-400/20"
            >
              🧭 Plan Trip
            </a>

            <a
              href="/saved"
              className="rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-5 py-2.5 text-sm font-bold text-fuchsia-300 transition hover:bg-fuchsia-400/20"
            >
              🧳 Saved Trips
            </a>

          </div>

        </div>

      </nav>

      {/* ================= PAGE ================= */}

      <section className="relative px-5 py-12 md:px-8">

        <div className="mx-auto max-w-7xl">

          {/* ================= HEADER ================= */}

          <div className="mb-8 animate-[fadeInUp_0.7s_ease-out_both]">

            <a
              href="/plan"
              className="text-sm font-bold text-cyan-300 transition hover:text-fuchsia-300"
            >
              ← Plan Another Trip
            </a>

            <div className="mt-6 flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>

                <p className="text-sm font-black uppercase tracking-[0.25em] text-cyan-300">
                  ✨ Your Travel Plan
                </p>

                <h1 className="mt-3 text-5xl font-black capitalize md:text-6xl">

                  {destination}{" "}

                  <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    Trip
                  </span>

                </h1>

                <p className="mt-4 text-lg text-white/50">
                  A personalized {days}-day plan for{" "}
                  {travelers} traveler
                  {travelers !== 1 ? "s" : ""}.
                </p>

              </div>

              {!loading && !error && (

                <div className="animate-pulse rounded-full border border-emerald-400/20 bg-emerald-500/10 px-5 py-3 text-sm font-black text-emerald-300 shadow-lg shadow-emerald-500/10">
                  ✓ Trip Ready
                </div>

              )}

            </div>

          </div>

          {/* ================= SUMMARY ================= */}

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 animate-[fadeInUp_0.7s_ease-out_0.15s_both]">

            <SummaryCard
              icon="📅"
              title="Duration"
              value={`${days} Days`}
              color="cyan"
            />

            <SummaryCard
              icon="👥"
              title="Travelers"
              value={String(travelers)}
              color="fuchsia"
            />

            <SummaryCard
              icon="💰"
              title="Budget"
              value={`₹${budget.toLocaleString("en-IN")}`}
              color="emerald"
            />

            <SummaryCard
              icon="❤️"
              title="Interests"
              value={String(interests.length)}
              color="orange"
            />

          </div>

          {/* ================= INTERESTS ================= */}

          {interests.length > 0 && (

            <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-2xl animate-[fadeInUp_0.7s_ease-out_0.25s_both]">

              <h2 className="text-xl font-black">
                ⭐ Your Interests
              </h2>

              <div className="mt-4 flex flex-wrap gap-3">

                {interests.map((interest) => (

                  <span
                    key={interest}
                    className="rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-2 text-sm font-bold text-fuchsia-300"
                  >
                    ❤️ {interest}
                  </span>

                ))}

              </div>

            </div>

          )}

          {/* ================= LOADING ================= */}

          {loading && (

            <div className="mt-8 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-violet-900/50 via-fuchsia-900/30 to-blue-900/50 p-16 text-center shadow-2xl backdrop-blur-2xl animate-[fadeInUp_0.6s_ease-out_both]">

              <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-cyan-400 border-r-fuchsia-500" />

              <h2 className="mt-7 text-3xl font-black">
                Creating Your Trip...
              </h2>

              <p className="mt-3 text-white/50">
                Preparing your personalized itinerary ✈️
              </p>

            </div>

          )}

          {/* ================= ERROR ================= */}

          {!loading && error && (

            <div className="mt-8 rounded-[2rem] border border-red-400/20 bg-red-500/10 p-8 backdrop-blur-xl animate-[fadeInUp_0.6s_ease-out_both]">

              <h2 className="text-2xl font-black text-red-300">
                ⚠️ Unable to generate trip
              </h2>

              <p className="mt-3 text-red-200/70">
                {error}
              </p>

              <button
                onClick={() =>
                  generateTrip(
                    destination,
                    days,
                    travelers,
                    budget,
                    interests
                  )
                }
                className="mt-6 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 px-7 py-3 font-black text-white transition hover:scale-105"
              >
                Try Again →
              </button>

            </div>

          )}

          {/* ================= CONTENT ================= */}

          {!loading && !error && itinerary && (

            <>

              {/* ITINERARY */}

              <div className="mt-8 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-white/10 p-7 shadow-2xl backdrop-blur-2xl md:p-9 animate-[fadeInUp_0.8s_ease-out_0.2s_both]">

                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

                  <div>

                    <h2 className="text-3xl font-black">
                      🗺️ Your Itinerary
                    </h2>

                    <p className="mt-1 text-white/40">
                      Day-by-day travel plan
                    </p>

                  </div>

                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-black text-cyan-300">
                    {days} Days
                  </span>

                </div>

                <div className="mt-8 space-y-5">

                  {itinerary
                    .split(/(?=DAY \d+)/i)
                    .filter((section) => section.trim())
                    .map((section, index) => {

                      const lines =
                        section.trim().split("\n");

                      const title =
                        lines[0] ||
                        `Day ${index + 1}`;

                      const content =
                        lines.slice(1).join("\n");

                      return (

                        <div
                          key={index}
                          className="group rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-fuchsia-500/5 to-purple-500/10 p-6 opacity-0 animate-[fadeInUp_0.6s_ease-out_both] transition duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:shadow-xl hover:shadow-purple-500/10"
                        >

                          <div className="flex items-center gap-4">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-fuchsia-500 to-pink-500 text-lg font-black shadow-lg shadow-fuchsia-500/20">
                              {index + 1}
                            </div>

                            <h3 className="text-xl font-black">
                              {title.replace(
                                /DAY /i,
                                "Day "
                              )}
                            </h3>

                          </div>

                          <div className="mt-5 whitespace-pre-wrap leading-8 text-white/65">
                            {content}
                          </div>

                        </div>

                      );
                    })}

                </div>

              </div>

              {/* ================= BUDGET ================= */}

              <div className="mt-8 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-emerald-500/10 via-white/5 to-cyan-500/10 p-7 shadow-2xl backdrop-blur-2xl md:p-9 animate-[fadeInUp_0.8s_ease-out_0.35s_both]">

                <h2 className="text-3xl font-black">
                  💰 Budget Breakdown
                </h2>

                <p className="mt-2 text-white/50">
                  Estimated allocation of your ₹
                  {budget.toLocaleString("en-IN")} budget.
                </p>

                <div className="mt-8 space-y-7">

                  <BudgetRow
                    icon="🚗"
                    title="Travel"
                    amount={travelCost}
                    percentage={25}
                    gradient="from-cyan-400 to-blue-600"
                  />

                  <BudgetRow
                    icon="🏨"
                    title="Stay"
                    amount={stayCost}
                    percentage={30}
                    gradient="from-fuchsia-400 to-purple-600"
                  />

                  <BudgetRow
                    icon="🍴"
                    title="Food"
                    amount={foodCost}
                    percentage={15}
                    gradient="from-orange-400 to-red-500"
                  />

                  <BudgetRow
                    icon="🎯"
                    title="Activities"
                    amount={activityCost}
                    percentage={20}
                    gradient="from-emerald-400 to-green-600"
                  />

                  <BudgetRow
                    icon="💵"
                    title="Miscellaneous"
                    amount={miscCost}
                    percentage={10}
                    gradient="from-yellow-400 to-orange-500"
                  />

                </div>

                <div className="mt-8 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5">

                  <span className="font-black">
                    Total Estimated Budget
                  </span>

                  <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-pink-400 bg-clip-text text-3xl font-black text-transparent">
                    ₹{budget.toLocaleString("en-IN")}
                  </span>

                </div>

              </div>

              {/* ================= MAP ================= */}

              <div className="mt-8 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-blue-500/10 via-white/5 to-cyan-500/10 p-7 shadow-2xl backdrop-blur-2xl md:p-9 animate-[fadeInUp_0.8s_ease-out_0.5s_both]">

                <h2 className="text-3xl font-black">
                  📍 Explore {destination}
                </h2>

                <p className="mt-2 text-white/50">
                  Open the destination directly in Google Maps.
                </p>

                <div className="mt-6 overflow-hidden rounded-3xl border border-cyan-400/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-12 text-center">

                  <div className="text-7xl">
                    🗺️
                  </div>

                  <h3 className="mt-5 text-3xl font-black capitalize">
                    {destination}
                  </h3>

                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-black text-white shadow-xl shadow-cyan-500/20 transition hover:scale-105"
                  >
                    📍 Open Google Maps →
                  </a>

                </div>

              </div>

              {/* ================= ACTIONS ================= */}

              <div className="mt-8">

                <button
                  onClick={saveTrip}
                  disabled={saved}
                  className={`w-full rounded-2xl py-5 text-lg font-black text-white shadow-2xl transition ${
                    saved
                      ? "cursor-not-allowed bg-emerald-600/50"
                      : "bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-600 shadow-cyan-500/20 hover:scale-[1.02] hover:shadow-cyan-500/40"
                  }`}
                >
                  {saved
                    ? "✅ Trip Saved Successfully"
                    : "💾 Save This Trip"}
                </button>

                <div className="mt-4 grid gap-4 md:grid-cols-2">

                  <a
                    href="/saved"
                    className="rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 py-4 text-center font-black text-fuchsia-300 transition hover:scale-[1.02] hover:bg-fuchsia-500/20"
                  >
                    📁 View Saved Trips →
                  </a>

                  <a
                    href="/plan"
                    className="rounded-2xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 py-4 text-center font-black text-white shadow-xl shadow-fuchsia-500/20 transition hover:scale-[1.02]"
                  >
                    ✨ Plan Another Trip →
                  </a>

                </div>

              </div>

            </>

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


      {/* ================= ANIMATION STYLES ================= */}

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

    </main>
  );
}

/* ================= SUMMARY CARD ================= */

function SummaryCard({
  icon,
  title,
  value,
  color,
}: {
  icon: string;
  title: string;
  value: string;
  color: "cyan" | "fuchsia" | "emerald" | "orange";
}) {
  const styles = {
    cyan:
      "border-cyan-400/20 bg-cyan-500/10 text-cyan-300",
    fuchsia:
      "border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-300",
    emerald:
      "border-emerald-400/20 bg-emerald-500/10 text-emerald-300",
    orange:
      "border-orange-400/20 bg-orange-500/10 text-orange-300",
  };

  return (
    <div
      className={`rounded-3xl border p-5 shadow-xl backdrop-blur-xl ${styles[color]}`}
    >
      <p className="text-sm font-bold opacity-70">
        {icon} {title}
      </p>

      <p className="mt-2 text-2xl font-black text-white">
        {value}
      </p>
    </div>
  );
}

/* ================= BUDGET ROW ================= */

function BudgetRow({
  icon,
  title,
  amount,
  percentage,
  gradient,
}: {
  icon: string;
  title: string;
  amount: number;
  percentage: number;
  gradient: string;
}) {
  return (
    <div>

      <div className="mb-2 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <span className="text-2xl">
            {icon}
          </span>

          <span className="font-bold text-white/80">
            {title}
          </span>

        </div>

        <span className="font-black text-white">
          ₹{amount.toLocaleString("en-IN")}
        </span>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-white/10">

        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient} shadow-lg`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <p className="mt-1 text-right text-xs text-white/30">
        {percentage}% of budget
      </p>

    </div>
  );
}