"use strict";

const yelp = require("yelp-fusion");

const client = yelp.client(process.env.NEXT_PUBLIC_YELP_API_KEY);

export async function GET(req: Request) {
  const url = new URL(req.url);
  const location = await url.searchParams.get("location");
  const limit = await url.searchParams.get("limit");
  const is_free = await url.searchParams.get("is_free");
  const sort_on = await url.searchParams.get("sort_on");
  const radius = await url.searchParams.get("radius");
  const start_date_str = await url.searchParams.get("start_date");
  const end_date_str = await url.searchParams.get("end_date");

  // Parse dates if they are present
  const start_date = start_date_str ? parseInt(start_date_str) : undefined;
  const end_date = end_date_str ? parseInt(end_date_str) : undefined;

  // Construct search parameters, conditionally including start_date and end_date if present
  const searchParameters: any = {
    location,
    radius,
    sort_on,
    is_free,
    limit,
  };

  if (start_date !== undefined) {
    searchParameters.start_date = start_date;
  }

  if (end_date !== undefined) {
    searchParameters.end_date = end_date;
  }

  try {
    // Make a request to the Yelp API using the yelp-fusion sdk.
    const response = await client.eventSearch(searchParameters);

    console.log(response.jsonBody);

    return new Response(JSON.stringify(response.jsonBody));
  } catch (error: any) {
    // Check if error is an AREA_TOO_LARGE error
    if (error.message.includes("AREA_TOO_LARGE")) {
      return new Response(JSON.stringify({ error: "AREA_TOO_LARGE" }), {
        status: 400,
      });
    }
    return new Response(JSON.stringify(error));
  }
}
