import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';
import { MiddlewareFactory } from "./types";

export const withTokenValidation: MiddlewareFactory = (next) => async (req: NextRequest, fetchEvent: NextFetchEvent) => {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/r')) return next(req, fetchEvent);
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl));
  }
  
  return next(req, fetchEvent);
};
