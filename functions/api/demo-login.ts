interface Env {
  DEMO_ACCESS_EMAIL: string;
  DEMO_ACCESS_PASSWORD: string;
  BACKEND_LOGIN_URL: string;
}

interface DemoLoginBody {
  email?: string;
  password?: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = (await request.json()) as DemoLoginBody;
    const email = (body.email ?? "").trim();
    const password = body.password ?? "";

    if (!env.DEMO_ACCESS_EMAIL || !env.DEMO_ACCESS_PASSWORD || !env.BACKEND_LOGIN_URL) {
      return new Response(
        JSON.stringify({
          detail:
            "Missing Cloudflare secrets. Configure DEMO_ACCESS_EMAIL, DEMO_ACCESS_PASSWORD and BACKEND_LOGIN_URL.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
        }
      );
    }

    if (email !== env.DEMO_ACCESS_EMAIL || password !== env.DEMO_ACCESS_PASSWORD) {
      return new Response(
        JSON.stringify({ detail: "Invalid demo credentials." }),
        {
          status: 401,
          headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
        }
      );
    }

    const backendBase = env.BACKEND_LOGIN_URL.replace(/\/$/, "");
    const backendResponse = await fetch(`${backendBase}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const payload = await backendResponse.json().catch(() => ({}));

    return new Response(JSON.stringify(payload), {
      status: backendResponse.status,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        detail: error instanceof Error ? error.message : "Unexpected demo login error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
      }
    );
  }
};
