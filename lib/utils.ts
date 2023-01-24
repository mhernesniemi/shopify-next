export async function storefront(query: any, variables = {}) {
  const response = await fetch(
    "https://printtikioski.myshopify.com/api/2023-01/graphql.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": String(
          process.env.NEXT_PUBLIC_API_URL
        ),
      },
      body: JSON.stringify({ query, variables }),
    }
  );
  return response.json();
}

export function formatPrice(number: number) {
  return Intl.NumberFormat("fi-FI", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(number);
}
