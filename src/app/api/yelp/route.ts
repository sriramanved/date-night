"use strict";

const yelp = require("yelp-fusion");

const client = yelp.client(process.env.NEXT_PUBLIC_YELP_API_KEY);

export async function GET(req: Request) {
    const url = new URL(req.url)
    const term = await url.searchParams.get('term');
    const location = await url.searchParams.get('location');
    const sort_by = await url.searchParams.get('sort_by');
    const limit = await url.searchParams.get('limit');
    const price = await url.searchParams.get('price');

  try {
    // Make a request to the Yelp API using the yelp-fusion sdk.
    const response = await client.search({
      term,
      location,
      price,
      sort_by,
      limit,
    });

    return new Response(JSON.stringify(response.jsonBody));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}
