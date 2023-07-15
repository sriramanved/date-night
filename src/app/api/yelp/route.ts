"use strict";

const yelp = require("yelp-fusion");

const client = yelp.client(process.env.NEXT_PUBLIC_YELP_API_KEY);

export async function GET(req: Request) {
    const url = new URL(req.url)
    const term = await url.searchParams.get('term');
    const location = await url.searchParams.get('location');
    const sort_by = await url.searchParams.get('sort_by');
    const limit = await url.searchParams.get('limit');
    const radius = await url.searchParams.get('radius');
    const price = await url.searchParams.get('price');
    const open_now = await url.searchParams.get('open_now'); 
    const attributes = await url.searchParams.get('attributes'); 

  try {
    // Make a request to the Yelp API using the yelp-fusion sdk.
    const response = await client.search({
      term,
      location,
      price,
      radius,
      sort_by,
      limit,
      open_now,
      attributes,
    });

    return new Response(JSON.stringify(response.jsonBody));
  } catch (error: any) {
    // Check if error is an AREA_TOO_LARGE error
    if (error.message.includes('AREA_TOO_LARGE')) {
      return new Response(JSON.stringify({ error: 'AREA_TOO_LARGE' }), {status: 400});
    }
    return new Response(JSON.stringify(error));
  }
}
