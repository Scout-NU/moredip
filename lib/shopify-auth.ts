// Imported only by server-side route handlers. Never expose credentials to clients.
let cachedToken: { value: string; expiresAt: number } | undefined;
let pendingToken: Promise<string> | undefined;

export async function getShopifyAccessToken(domain: string): Promise<string> {
  const clientId = process.env.SHOPIFY_CLIENT_ID?.trim();
  const clientSecret = process.env.SHOPIFY_CLIENT_SECRET?.trim();
  if (!clientId || !clientSecret) {
    const legacyToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN?.trim();
    if (legacyToken && legacyToken !== "your-shopify-admin-access-token") return legacyToken;
    throw new Error("Shopify credentials are missing");
  }
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60_000) return cachedToken.value;
  if (pendingToken) return pendingToken;

  pendingToken = (async () => {
    const response = await fetch(`https://${domain}/admin/oauth/access_token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error("Shopify authentication failed");
    const result = await response.json();
    if (typeof result.access_token !== "string" || !result.access_token ||
        typeof result.expires_in !== "number" || result.expires_in <= 0) {
      throw new Error("Invalid Shopify token response");
    }
    cachedToken = { value: result.access_token, expiresAt: Date.now() + result.expires_in * 1000 };
    return cachedToken.value;
  })();
  try {
    return await pendingToken;
  } finally {
    pendingToken = undefined;
  }
}
