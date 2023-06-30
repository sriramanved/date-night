import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { rateLimiter } from '@/lib/rate-limiter';
import { MiddlewareFactory } from "./types";

export const withRateLimiter: MiddlewareFactory = (next) => async (req: NextRequest, fetchEvent: NextFetchEvent) => {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/api/message')) return next(req, fetchEvent);
  
  const ip = req.ip ?? '127.0.0.1';

  try {
    const { success } = await rateLimiter.limit(ip);

    if (!success) return new NextResponse('You are writing messages too fast.');
    
  } catch (error) {
    return new NextResponse(
      'Sorry, something went wrong processing your message. Please try again later.'
    );
  }
};
