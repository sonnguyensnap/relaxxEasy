import "dotenv/config";
import { randomUUID } from "crypto";

const bearerToken = process.env.BEARER_TOKEN;
// From previous tutorial.
const shopDomain = "relaxxeasy.myshopify.com";
const variantId =
  "gid://shopify/ProductVariant/42088883683512?shop=56824955064";

fetch(`https://${shopDomain}/api/ucp/mcp`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${bearerToken}`,
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    method: "tools/call",
    id: 1,
    params: {
      name: "create_checkout",
      arguments: {
        _meta: {
          ucp: {
            profile: "https://agent.example/profiles/shopping-agent.json",
          },
        },
        idempotency_key: randomUUID(),
        currency: "USD",
        line_items: [
          {
            quantity: 1,
            item: {
              id: variantId,
            },
          },
        ],
        buyer: {
          email: "buyer@example.com",
        },
      },
    },
  }),
})
  //   .then((res) => res.json())
  .then((data) => {
    console.log(data);
    if (data.result?.content?.[0]?.text) {
      const checkout = data.result.content[0].text;
      console.log("Checkout ID:", checkout.id);
      console.log("Status:", checkout.status);

      if (checkout.messages?.length > 0) {
        console.log("Messages:", checkout.messages);
      }

      if (checkout.continue_url) {
        console.log("Continue URL:", checkout.continue_url);
      }
    }
  })
  .catch((err) => console.error("Request failed:", err));
