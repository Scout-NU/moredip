const success = () => Response.json({ message: "You're on the list! Watch your inbox for deals and releases." });

type Customer = { id: string; email: string | null; emailMarketingConsent: { marketingState: string } | null };
type MutationResult = { customer: { id: string } | null; userErrors: { message: string }[] };

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return Response.json({ message: "Please subscribe from our website." }, { status: 403 });
  }
  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > 4096) return Response.json({ message: "Request is too large." }, { status: 413 });
    body = JSON.parse(text);
  } catch {
    return Response.json({ message: "Please send a valid email address." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || !("email" in body) || typeof body.email !== "string") {
    return Response.json({ message: "Please enter a valid email address." }, { status: 400 });
  }
  const email = body.email.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ message: "Please enter a valid email address." }, { status: 400 });
  }
  if ("website" in body && body.website) return success();

  const token = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
  if (!token || !domain || !/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/.test(domain)) {
    return Response.json({ message: "Subscriptions are temporarily unavailable. Please try again later." }, { status: 503 });
  }
  try {
    const signal = AbortSignal.timeout(10000);
    async function graphql<T>(query: string, variables: Record<string, unknown>): Promise<T> {
      const response = await fetch(`https://${domain}/admin/api/2026-04/graphql.json`, {
        method: "POST",
        headers: { "X-Shopify-Access-Token": token!, "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables }),
        cache: "no-store",
        signal,
      });
      if (!response.ok) throw new Error("Shopify request failed");
      const result = await response.json();
      if (result.errors?.length || !result.data) throw new Error("Shopify GraphQL failed");
      return result.data;
    }

    async function findCustomer() {
      const data = await graphql<{ customers: { nodes: Customer[] } }>(`
        query WaitlistCustomer($query: String!) {
          customers(first: 10, query: $query) {
            nodes { id email emailMarketingConsent { marketingState } }
          }
        }`, { query: `email:${JSON.stringify(email)}` });
      return data.customers.nodes.find(customer => customer.email?.toLowerCase() === email);
    }

    let customer = await findCustomer();
    if (!customer) {
      const data = await graphql<{ customerCreate: MutationResult }>(`
        mutation WaitlistCreate($input: CustomerInput!) {
          customerCreate(input: $input) { customer { id } userErrors { message } }
        }`, { input: {
          email,
          tags: ["waitlist"],
          emailMarketingConsent: { marketingState: "SUBSCRIBED", marketingOptInLevel: "SINGLE_OPT_IN" },
        } });
      if (!data.customerCreate.userErrors.length && data.customerCreate.customer) return success();
      customer = await findCustomer();
      if (!customer) throw new Error("Shopify customer creation failed");
    }
    if (customer.emailMarketingConsent?.marketingState === "SUBSCRIBED") return success();

    const data = await graphql<{ customerEmailMarketingConsentUpdate: MutationResult }>(`
      mutation WaitlistConsent($input: CustomerEmailMarketingConsentUpdateInput!) {
        customerEmailMarketingConsentUpdate(input: $input) {
          customer { id } userErrors { message }
        }
      }`, { input: {
        customerId: customer.id,
        emailMarketingConsent: {
          marketingState: "SUBSCRIBED",
          marketingOptInLevel: "SINGLE_OPT_IN",
          consentUpdatedAt: new Date().toISOString(),
        },
      } });
    const updated = data.customerEmailMarketingConsentUpdate;
    if (updated.userErrors.length || !updated.customer) throw new Error("Shopify consent update failed");
    return success();
  } catch {
    return Response.json({ message: "The subscription service is unavailable. Please try again later." }, { status: 503 });
  }
}
