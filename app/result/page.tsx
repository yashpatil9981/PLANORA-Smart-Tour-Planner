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
  userEmail: string;
};

type DayPlan = {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  extra: string[];
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

    const destinationParam = params.get("destination") || "Goa";
    const daysParam = Number(params.get("days")) || 3;
    const travelersParam = Number(params.get("travelers")) || 2;
    const budgetParam = Number(params.get("budget")) || 15000;

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

      const response = await fetch("/api/generate-trip", {
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
      });

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

    const savedUser = localStorage.getItem("tourmateUser");

    if (!savedUser) {
      alert("Please login before saving a trip.");
      window.location.href = "/login";
      return;
    }

    let user: { email?: string };

    try {
      user = JSON.parse(savedUser);
    } catch {
      alert("Login information is invalid. Please login again.");
      window.location.href = "/login";
      return;
    }

    if (!user.email) {
      alert("User email not found. Please login again.");
      window.location.href = "/login";
      return;
    }

    const existingTrips: SavedTrip[] = JSON.parse(
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
      JSON.stringify([...existingTrips, newTrip])
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

  const dayPlans = parseItinerary(itinerary, days);

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="border-b bg-white px-6 py-5">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a
            href="/"
            className="text-2xl font-bold text-blue-600"
          >
            TourMate
          </a>

          <div className="flex gap-5 text-sm font-medium">
            <a
              href="/plan"
              className="text-gray-600 hover:text-blue-600"
            >
              Plan Trip
            </a>

            <a
              href="/saved"
              className="text-gray-600 hover:text-blue-600"
            >
              Saved Trips
            </a>
          </div>
        </div>
      </nav>

      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">

          {/* Header */}
          <div className="mb-8">
            <a
              href="/plan"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              ← Plan Another Trip
            </a>

            <div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                  Your Travel Plan
                </p>

                <h1 className="mt-2 text-4xl font-bold capitalize text-gray-900 md:text-5xl">
                  {destination} Trip
                </h1>

                <p className="mt-3 text-gray-600">
                  A personalized {days}-day plan for{" "}
                  {travelers} traveler
                  {travelers !== 1 ? "s" : ""}.
                </p>
              </div>

              {!loading && !error && (
                <div className="rounded-2xl bg-green-50 px-5 py-3 text-sm font-semibold text-green-700">
                  ✓ Trip Ready
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <SummaryCard
              icon="📅"
              label="Duration"
              value={`${days} Days`}
            />
            <SummaryCard
              icon="👥"
              label="Travelers"
              value={String(travelers)}
            />
            <SummaryCard
              icon="💰"
              label="Budget"
              value={`₹${budget.toLocaleString("en-IN")}`}
            />
            <SummaryCard
              icon="❤️"
              label="Interests"
              value={String(interests.length)}
            />
          </div>

          {/* Interests */}
          {interests.length > 0 && (
            <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold">
                Your Interests
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                  >
                    ❤️ {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="mt-8 rounded-3xl border bg-white p-14 text-center shadow-sm">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

              <h2 className="mt-6 text-2xl font-bold">
                Creating Your Trip...
              </h2>

              <p className="mt-2 text-gray-600">
                Preparing your personalized itinerary.
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="mt-8 rounded-3xl border border-red-200 bg-red-50 p-7">
              <h2 className="text-2xl font-bold text-red-700">
                Unable to generate trip
              </h2>

              <p className="mt-3 text-red-600">
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
                className="mt-6 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Main Content */}
          {!loading && !error && itinerary && (
            <>
              {/* Itinerary */}
              <div className="mt-8 rounded-3xl border bg-white p-7 shadow-sm md:p-9">
                <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                  <div>
                    <h2 className="text-3xl font-bold">
                      🗺️ Your Itinerary
                    </h2>

                    <p className="mt-1 text-gray-500">
                      Day-by-day travel plan
                    </p>
                  </div>

                  <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                    {days} Days
                  </span>
                </div>

                <div className="mt-8 space-y-5">
                  {dayPlans.map((day) => (
                    <DayCard key={day.day} day={day} />
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="mt-8 rounded-3xl border bg-white p-7 shadow-sm md:p-9">
                <h2 className="text-3xl font-bold">
                  💰 Budget Breakdown
                </h2>

                <p className="mt-2 text-gray-600">
                  Estimated allocation of your ₹
                  {budget.toLocaleString("en-IN")} budget.
                </p>

                <div className="mt-8 space-y-6">
                  <BudgetRow
                    icon="🚗"
                    title="Travel"
                    amount={travelCost}
                    percentage={25}
                  />

                  <BudgetRow
                    icon="🏨"
                    title="Stay"
                    amount={stayCost}
                    percentage={30}
                  />

                  <BudgetRow
                    icon="🍴"
                    title="Food"
                    amount={foodCost}
                    percentage={15}
                  />

                  <BudgetRow
                    icon="🎯"
                    title="Activities"
                    amount={activityCost}
                    percentage={20}
                  />

                  <BudgetRow
                    icon="💵"
                    title="Miscellaneous"
                    amount={miscCost}
                    percentage={10}
                  />
                </div>

                <div className="mt-8 flex items-center justify-between border-t pt-6">
                  <span className="text-lg font-bold">
                    Total Estimated Budget
                  </span>

                  <span className="text-3xl font-bold text-blue-600">
                    ₹{budget.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8 rounded-3xl border bg-white p-7 shadow-sm md:p-9">
                <h2 className="text-3xl font-bold">
                  📍 Explore {destination}
                </h2>

                <p className="mt-2 text-gray-600">
                  Open the destination directly in Google Maps.
                </p>

                <div className="mt-6 rounded-2xl bg-blue-50 p-10 text-center">
                  <div className="text-6xl">🗺️</div>

                  <h3 className="mt-4 text-2xl font-bold capitalize">
                    {destination}
                  </h3>

                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white hover:bg-blue-700"
                  >
                    Open Google Maps
                  </a>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8">
                <button
                  onClick={saveTrip}
                  disabled={saved}
                  className={`w-full rounded-xl py-4 font-semibold text-white transition ${
                    saved
                      ? "cursor-not-allowed bg-gray-500"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {saved
                    ? "✅ Trip Saved"
                    : "💾 Save This Trip"}
                </button>

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <a
                    href="/saved"
                    className="rounded-xl border bg-white py-4 text-center font-semibold text-gray-800 hover:bg-gray-50"
                  >
                    📁 View Saved Trips
                  </a>

                  <a
                    href="/plan"
                    className="rounded-xl bg-blue-600 py-4 text-center font-semibold text-white hover:bg-blue-700"
                  >
                    ✨ Plan Another Trip
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

function parseItinerary(
  text: string,
  totalDays: number
): DayPlan[] {
  const fallback = Array.from({ length: totalDays }, (_, index) => ({
    day: index + 1,
    title: `Day ${index + 1}`,
    morning: "",
    afternoon: "",
    evening: "",
    extra: [],
  }));

  if (!text.trim()) return fallback;

  const sections = text
    .split(/(?=DAY\s+\d+)/i)
    .map((section) => section.trim())
    .filter((section) => /^DAY\s+\d+/i.test(section));

  const parsed = sections.map((section, index) => {
    const lines = section
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const dayMatch = lines[0]?.match(/DAY\s+(\d+)/i);
    const dayNumber = dayMatch
      ? Number(dayMatch[1])
      : index + 1;

    const content = lines.slice(1);

    const morning = extractSection(
      content,
      /^(Morning|🌅 Morning)\s*:/i
    );

    const afternoon = extractSection(
      content,
      /^(Afternoon|☀️ Afternoon)\s*:/i
    );

    const evening = extractSection(
      content,
      /^(Evening|🌙 Evening)\s*:/i
    );

    const used = new Set([
      morning.index,
      afternoon.index,
      evening.index,
    ]);

    const extra = content.filter(
      (_, lineIndex) => !used.has(lineIndex)
    );

    return {
      day: dayNumber,
      title: `Day ${dayNumber}`,
      morning: morning.value,
      afternoon: afternoon.value,
      evening: evening.value,
      extra,
    };
  });

  if (parsed.length === 0) {
    return fallback.map((day) => ({
      ...day,
      extra: [text],
    }));
  }

  return parsed;
}

function extractSection(
  lines: string[],
  pattern: RegExp
): { value: string; index: number } {
  const index = lines.findIndex((line) => pattern.test(line));

  if (index === -1) {
    return {
      value: "",
      index: -1,
    };
  }

  const firstLine = lines[index]
    .replace(pattern, "")
    .trim();

  const nextHeading = lines.findIndex(
    (line, lineIndex) =>
      lineIndex > index &&
      /^(Morning|Afternoon|Evening|🌅 Morning|☀️ Afternoon|🌙 Evening)\s*:/i.test(
        line
      )
  );

  const end =
    nextHeading === -1 ? lines.length : nextHeading;

  const rest = lines.slice(index + 1, end);

  return {
    value: [firstLine, ...rest].filter(Boolean).join(" "),
    index,
  };
}

function DayCard({ day }: { day: DayPlan }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-gray-50">
      <div className="flex items-center gap-3 border-b bg-white px-6 py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
          {day.day}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
            Travel Day
          </p>

          <h3 className="text-xl font-bold text-gray-900">
            {day.title}
          </h3>
        </div>
      </div>

      <div className="grid gap-4 p-6 md:grid-cols-3">

        <TimeCard
          icon="🌅"
          title="Morning"
          text={day.morning || "Plan your morning activities."}
        />

        <TimeCard
          icon="☀️"
          title="Afternoon"
          text={
            day.afternoon ||
            "Explore attractions and enjoy local experiences."
          }
        />

        <TimeCard
          icon="🌙"
          title="Evening"
          text={
            day.evening ||
            "Relax, have dinner and enjoy the evening."
          }
        />

      </div>

      {day.extra.length > 0 && (
        <div className="border-t px-6 pb-6">
          <p className="mb-2 mt-5 text-sm font-semibold text-gray-700">
            Additional Details
          </p>

          <div className="space-y-2 text-sm leading-6 text-gray-600">
            {day.extra.map((line, index) => (
              <p key={index}>
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TimeCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="flex items-center gap-2">
        <span className="text-xl">{icon}</span>

        <h4 className="font-bold text-gray-900">
          {title}
        </h4>
      </div>

      <p className="mt-3 text-sm leading-6 text-gray-600">
        {text}
      </p>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <p className="text-sm text-gray-500">
        {icon} {label}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}

function BudgetRow({
  icon,
  title,
  amount,
  percentage,
}: {
  icon: string;
  title: string;
  amount: number;
  percentage: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>

          <span className="font-medium">
            {title}
          </span>
        </div>

        <span className="font-bold">
          ₹{amount.toLocaleString("en-IN")}
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-blue-600"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <p className="mt-1 text-right text-xs text-gray-500">
        {percentage}% of budget
      </p>
    </div>
  );
}
