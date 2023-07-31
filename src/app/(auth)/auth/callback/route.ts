import { Database } from "@/types/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next");

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies });
    const { data } = await supabase.auth.exchangeCodeForSession(code);

    //update user username from spotify account
    if (data.user?.app_metadata.provider === "spotify") {
      const usernameFromProvider = data.user.user_metadata.name;
      if (!usernameFromProvider) return;
      await supabase
        .from("users")
        .update({ username: data.user.user_metadata.name || "User" })
        .eq("id", data.user.id);
    }
  }

  if (next) {
    return NextResponse.redirect(requestUrl.origin + next);
  }

  return NextResponse.redirect(requestUrl.origin);
}
