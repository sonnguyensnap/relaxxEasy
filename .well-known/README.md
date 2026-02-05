# UCP Well-Known Configuration

This directory contains Universal Commerce Protocol (UCP) configuration files that enable AI agents and other systems to discover and interact with your Shopify store.

## Files

### ucp.json
Main UCP configuration file that describes:
- Merchant information
- Available services (catalog, checkout, search)
- API endpoints
- Supported capabilities
- Structured data formats

**Access URL:** `https://your-store.myshopify.com/.well-known/ucp.json`

### agent-card.json
A2A (Agent-to-Agent) protocol card that describes:
- Agent capabilities
- Supported protocols
- Service endpoints
- Schema types
- Contact and policy information

**Access URL:** `https://your-store.myshopify.com/.well-known/agent-card.json`

## How It Works

### 1. Service Discovery
AI agents and commerce systems can discover your store's capabilities by fetching:
```
GET https://your-store.myshopify.com/.well-known/ucp.json
```

### 2. Agent Integration
A2A-compatible agents can read your agent card:
```
GET https://your-store.myshopify.com/.well-known/agent-card.json
```

### 3. API Interaction
Once discovered, systems can interact with your store using the documented endpoints:
- Product catalog: `/collections/all/products.json`
- Individual products: `/products/{handle}.json`
- Shopping cart: `/cart.json`
- Search: `/search?q={query}&type=product`

## Shopify Integration

**Note:** Shopify doesn't natively serve files from `.well-known` directory. You have two options:

### Option 1: Use Shopify Pages (Recommended)
Create custom pages that render JSON:
1. Create a page template `page.ucp.json`
2. Add Liquid code to output the JSON
3. Create pages at `/pages/well-known-ucp` and `/pages/well-known-agent-card`

### Option 2: Use Shopify App
Create a custom Shopify app that:
1. Adds a route handler for `/.well-known/ucp.json`
2. Returns the UCP configuration dynamically
3. Populates Liquid variables with actual store data

## Customization

The JSON files use Liquid template variables that need to be replaced:
- `{{ shop.url }}` → Your actual store URL
- `{{ shop.email }}` → Your store email
- `{{ shop.name }}` → Your store name
- `{{ shop.permanent_domain }}` → Your permanent Shopify domain

## Benefits

1. **AI Shopping Assistants** - AI agents can understand and interact with your products
2. **Commerce Interoperability** - Standard protocol for commerce systems
3. **Future-Proof** - Based on open standards (Schema.org, UCP)
4. **Automatic Discovery** - Systems can find and connect without manual configuration

## Standards & Specifications

- **UCP Specification:** https://ucp.dev/specs/shopping
- **A2A Protocol:** https://a2a.dev
- **Schema.org:** https://schema.org
- **Well-Known URIs:** RFC 8615

## Testing

Test your configuration:
```bash
# Check if files are accessible
curl https://your-store.myshopify.com/.well-known/ucp.json
curl https://your-store.myshopify.com/.well-known/agent-card.json

# Validate JSON
cat ucp.json | jq .
cat agent-card.json | jq .
```

## Next Steps

1. Replace all Liquid variables with actual store data
2. Set up routing to serve these files (via app or pages)
3. Test accessibility of the endpoints
4. Update endpoints if your store structure differs
5. Add any custom capabilities specific to your store

