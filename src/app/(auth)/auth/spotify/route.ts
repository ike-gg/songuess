import { routes } from "@/constants";
import getAccessTokenSpotify from "@/lib/spotify/getAccessTokenSpotify";
import { encrypt } from "@/utils/crypto";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(requestUrl.origin + routes.sets.create.blank);
  }

  try {
    const data = await getAccessTokenSpotify(code);
    const { refresh_token } = data;

    const encryptedRefreshToken = encrypt(refresh_token);

    const response = NextResponse.redirect(
      requestUrl.origin + routes.sets.spotify
    );

    response.cookies.set("spotify", encryptedRefreshToken);
    return response;
  } catch (error) {
    return NextResponse.redirect(requestUrl.origin + routes.sets.create.blank);
  }
}
