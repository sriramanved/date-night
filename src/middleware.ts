import { withTokenValidation } from "./middlewares/withTokenValidation";
import { withRateLimiter } from "./middlewares/withRateLimiter";
import { NextResponse } from "next/server";

function defaultMiddleware() {
  return NextResponse.next();
}

export default withRateLimiter(withTokenValidation(defaultMiddleware));

export const config = {
  matcher: ['/r/:path*/submit', '/r/create', '/api/message/:path*'],
};
