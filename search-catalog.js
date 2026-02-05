import "dotenv/config";

const bearerToken = process.env.BEARER_TOKEN;
let catalogId = process.env.CATALOG_ID;

fetch("https://discover.shopifyapps.com/global/mcp", {
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
      name: "search_global_products",
      arguments: {
        saved_catalog: catalogId,
        query: "I need a crewneck sweater",
        context: "buyer looking for sustainable fashion",
        include_secondhand: true,
        min_price: 50,
        max_price: 200,
        ships_to: "US",
        limit: 3,
      },
    },
  }),
})
  .then((res) => res.json())
  .then((data) => {
    // Parse the text field to get the actual offers object
    if (data.result && data.result.content && data.result.content[0]) {
      const offersData = JSON.parse(data.result.content[0].text);
    }

    // Extract first offer ID and call get_global_product_details
    if (data.result && data.result.content && data.result.content[0]) {
      const textContent = JSON.parse(data.result.content[0].text);
      if (textContent.offers && textContent.offers.length > 0) {
        const fullId = textContent.offers[0].id;
        // Extract UPID from gid://shopify/p/{UPID}
        const upid = fullId.split("/p/")[1];

        // Call get_global_product_details with the extracted ID
        return fetch("https://discover.shopifyapps.com/global/mcp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bearerToken}`,
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "tools/call",
            id: 2,
            params: {
              name: "get_global_product_details",
              arguments: {
                upid: upid,
                product_options: [
                  {
                    key: "Size",
                    values: ["Large (L)"],
                  },
                ],
              },
            },
          }),
        });
      }
    }
  })
  .then((res) => (res ? res.json() : null))
  .then((data) => {
    if (data && data.result?.content?.[0]?.text) {
      // Parse the stringified text field
      data.result.content[0].text = JSON.parse(data.result.content[0].text);
    }
    if (data) {
      console.log(JSON.stringify(data, null, 2));
    }
  })
  .catch((err) => console.error("Request failed:", err));
