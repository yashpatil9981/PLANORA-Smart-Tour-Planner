import { NextResponse } from "next/server";

type TripRequest = {
  destination?: string;
  days?: number;
  travelers?: number;
  budget?: number;
  interests?: string[];
};

function getActivities(
  destination: string,
  interests: string[]
) {
  const place = destination.toLowerCase();

  if (place.includes("goa")) {
    return {
      morning:
        "Visit Baga Beach and enjoy a relaxed morning by the sea.",
      afternoon:
        "Explore Calangute Beach and nearby local markets.",
      evening:
        "Enjoy sunset at Candolim Beach and explore the nightlife.",
      extra: [
        "Visit Fort Aguada",
        "Explore Panjim",
        "Try local Goan food",
        "Visit Basilica of Bom Jesus",
        "Enjoy a beachside evening",
      ],
    };
  }

  if (place.includes("manali")) {
    return {
      morning:
        "Visit Hadimba Temple and explore Old Manali.",
      afternoon:
        "Explore Mall Road and enjoy local food.",
      evening:
        "Relax by the Beas River and enjoy the mountain views.",
      extra: [
        "Visit Solang Valley",
        "Explore Vashisht Hot Springs",
        "Visit Manu Temple",
        "Enjoy local Himachali food",
        "Explore Old Manali cafes",
      ],
    };
  }

  if (place.includes("kerala")) {
    return {
      morning:
        "Explore the local attractions and enjoy a peaceful morning.",
      afternoon:
        "Visit a popular sightseeing location and try local Kerala food.",
      evening:
        "Enjoy a relaxing evening near the backwaters.",
      extra: [
        "Explore Alleppey backwaters",
        "Visit Munnar",
        "Try Kerala cuisine",
        "Visit local markets",
        "Enjoy a sunset cruise",
      ],
    };
  }

  if (interests.includes("Beaches")) {
    return {
      morning:
        `Explore a popular beach or waterfront area in ${destination}.`,
      afternoon:
        `Visit nearby attractions and enjoy local food in ${destination}.`,
      evening:
        `Enjoy the sunset and explore the local area of ${destination}.`,
      extra: [
        "Explore local attractions",
        "Try local food",
        "Visit a popular market",
        "Enjoy a scenic sunset",
        "Explore nearby landmarks",
      ],
    };
  }

  return {
    morning:
      `Explore the popular attractions of ${destination}.`,
    afternoon:
      `Visit local sightseeing spots and try local food.`,
    evening:
      `Relax and explore the local area of ${destination}.`,
    extra: [
      "Visit popular landmarks",
      "Explore local markets",
      "Try local cuisine",
      "Visit nearby attractions",
      "Enjoy a scenic evening",
    ],
  };
}

export async function POST(request: Request) {
  try {
    // Read request body
    const body = (await request.json()) as TripRequest;

    // Validate destination
    const destination =
      typeof body.destination === "string" &&
      body.destination.trim()
        ? body.destination.trim()
        : "Goa";

    // Validate numbers
    const days = Math.min(
      30,
      Math.max(1, Number(body.days) || 3)
    );

    const travelers = Math.min(
      20,
      Math.max(1, Number(body.travelers) || 2)
    );

    const budget = Math.max(
      1000,
      Number(body.budget) || 15000
    );

    // Validate interests
    const interests = Array.isArray(body.interests)
      ? body.interests.filter(
          (item): item is string =>
            typeof item === "string"
        )
      : [];

    // Get destination activities
    const activities = getActivities(
      destination,
      interests
    );

    // =========================
    // BUDGET CALCULATION
    // =========================

    const travel = Math.round(budget * 0.25);
    const stay = Math.round(budget * 0.30);
    const food = Math.round(budget * 0.15);
    const activityCost = Math.round(budget * 0.20);

    const miscellaneous =
      budget -
      travel -
      stay -
      food -
      activityCost;

    // =========================
    // ITINERARY
    // =========================

    let itinerary = `
${destination} Trip

TRIP DETAILS
Destination: ${destination}
Duration: ${days} Days
Travelers: ${travelers} People
Budget: ₹${budget.toLocaleString("en-IN")}
Interests: ${
      interests.length > 0
        ? interests.join(", ")
        : "General sightseeing"
    }

DAY 1

Morning:
${activities.morning}

Afternoon:
${activities.afternoon}

Evening:
${activities.evening}
`;

    // Remaining days
    for (let day = 2; day <= days; day++) {
      const extraIndex =
        (day - 2) % activities.extra.length;

      itinerary += `

DAY ${day}

Morning:
${activities.extra[extraIndex]}

Afternoon:
Explore more attractions and experiences around ${destination}.

Evening:
Enjoy local food, shopping or a relaxing evening in ${destination}.
`;
    }

    // =========================
    // BUDGET
    // =========================

    itinerary += `

BUDGET BREAKDOWN

Travel:
₹${travel.toLocaleString("en-IN")}

Stay:
₹${stay.toLocaleString("en-IN")}

Food:
₹${food.toLocaleString("en-IN")}

Activities:
₹${activityCost.toLocaleString("en-IN")}

Miscellaneous:
₹${miscellaneous.toLocaleString("en-IN")}

Total:
₹${budget.toLocaleString("en-IN")}


TRAVEL TIPS

• Keep some extra money for unexpected expenses.
• Check local transport and attraction timings before visiting.
• Carry essential documents and keep valuables safe.
• Try local food and respect local rules.
• Keep your phone and important documents secure.
`;

    // =========================
    // SUCCESS RESPONSE
    // =========================

    return NextResponse.json(
      {
        success: true,
        itinerary,
        destination,
        days,
        travelers,
        budget,
        interests,
        source: "local-free",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "Trip generation error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unable to generate trip.",
      },
      {
        status: 500,
      }
    );
  }
}