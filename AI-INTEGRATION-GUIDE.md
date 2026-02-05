# Hướng dẫn tích hợp AI Agents (Google Gemini & ChatGPT)

Shopify store của bạn đã được setup để Google Gemini, ChatGPT và các AI agents khác có thể đọc và hiển thị thông tin sản phẩm.

## 🎯 Mục tiêu đạt được

AI agents như Google Gemini và ChatGPT có thể:
- Đọc thông tin sản phẩm từ store của bạn
- Hiển thị giá, mô tả, hình ảnh sản phẩm
- Giới thiệu sản phẩm cho người dùng
- Tìm kiếm và so sánh sản phẩm
- Trả lời câu hỏi về catalog sản phẩm

## 📁 Files đã tạo

### 1. Structured Data Snippets
- **`snippets/product-structured-data.liquid`** - Schema.org Product markup cho mỗi sản phẩm
- **`snippets/collection-structured-data.liquid`** - Schema.org ItemList cho collections
- **`snippets/organization-structured-data.liquid`** - Schema.org Organization cho store

### 2. UCP Configuration
- **`.well-known/ucp.json`** - UCP configuration với AI agent support
- **`.well-known/agent-card.json`** - A2A protocol card
- **`.well-known/README.md`** - Documentation

### 3. Templates Modified
- **`templates/product.liquid`** - Đã thêm product structured data
- **`templates/collection.liquid`** - Đã thêm collection structured data
- **`layout/theme.liquid`** - Đã thêm organization schema và UCP meta tags

## 🔍 Cách hoạt động

### Structured Data (JSON-LD)
Mỗi trang sản phẩm và collection giờ chứa structured data ở format JSON-LD:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Tên sản phẩm",
  "description": "Mô tả sản phẩm",
  "image": "URL hình ảnh",
  "brand": {
    "@type": "Brand",
    "name": "Thương hiệu"
  },
  "offers": {
    "@type": "Offer",
    "price": "99.00",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  }
}
</script>
```

### AI Agents đọc data như thế nào:
1. AI agent truy cập URL sản phẩm của bạn
2. Parse HTML và tìm `<script type="application/ld+json">` tags
3. Extract JSON data từ script tags
4. Parse và hiểu thông tin sản phẩm theo Schema.org vocabulary
5. Có thể trả lời câu hỏi hoặc hiển thị thông tin cho người dùng

## ✅ Test & Verify

### 1. Test với Google Rich Results Test
```
https://search.google.com/test/rich-results
```
- Nhập URL sản phẩm của bạn
- Kiểm tra xem Google có detect được Product schema không

### 2. Test với Schema Markup Validator
```
https://validator.schema.org/
```
- Nhập URL hoặc paste HTML
- Verify JSON-LD syntax đúng

### 3. View Page Source
- Mở bất kỳ product page nào
- Right-click → View Page Source
- Search cho `application/ld+json`
- Bạn sẽ thấy structured data JSON

### 4. Test với ChatGPT/Gemini (Khi deploy lên production)
Sau khi deploy lên Shopify production store:

**Với ChatGPT:**
```
"Hãy truy cập [URL-PRODUCT-PAGE] và cho tôi biết thông tin về sản phẩm này"
```

**Với Google Gemini:**
```
"Xem trang web [URL-PRODUCT-PAGE] và mô tả sản phẩm cho tôi"
```

## 🚀 Deploy lên Shopify

### Bước 1: Push code lên store
```bash
# Add files
git add .

# Commit
git commit -m "Add AI-readable structured data with UCP support"

# Push to Shopify (nếu dùng Shopify CLI)
shopify theme push
```

### Bước 2: Verify .well-known files
Shopify không tự động serve files từ `.well-known/`. Bạn có 2 options:

#### Option A: Create custom Shopify Pages
1. Tạo page template `page.ucp.liquid`
2. Add Liquid code để render JSON từ `.well-known/ucp.json`
3. Tạo page tại `/pages/well-known-ucp`

#### Option B: Use Shopify App
Tạo custom app với route handlers cho:
- `/.well-known/ucp.json`
- `/.well-known/agent-card.json`

### Bước 3: Test trên production
- Mở product page trên live store
- View source và verify structured data có xuất hiện
- Test với Google Rich Results Test

## 📊 Data được cung cấp cho AI

### Product Information:
- ✅ Tên sản phẩm (name)
- ✅ Mô tả (description)
- ✅ Giá (price + currency)
- ✅ Hình ảnh (image URLs)
- ✅ Thương hiệu (brand)
- ✅ Tình trạng kho (availability)
- ✅ SKU, GTIN/barcode
- ✅ Category và tags
- ✅ Variants và options
- ✅ URL sản phẩm

### Collection Information:
- ✅ Tên collection
- ✅ Mô tả collection
- ✅ Danh sách sản phẩm (up to 50)
- ✅ Số lượng sản phẩm
- ✅ Breadcrumb navigation

### Store Information:
- ✅ Tên store
- ✅ URL
- ✅ Email
- ✅ Search functionality
- ✅ Country/address

## 🤖 Ví dụ sử dụng với AI

### Kịch bản 1: User hỏi ChatGPT
```
User: "Tìm cho tôi áo thun trên website relaxxeasy.com"

ChatGPT sẽ:
1. Truy cập collection pages hoặc product pages
2. Đọc structured data
3. Extract thông tin sản phẩm
4. Hiển thị danh sách áo thun với giá và link
```

### Kịch bản 2: User hỏi Google Gemini
```
User: "So sánh giá sản phẩm X và Y từ relaxxeasy.com"

Gemini sẽ:
1. Truy cập cả 2 product pages
2. Parse structured data
3. So sánh giá, features
4. Đưa ra recommendation
```

## 🔧 Customization

### Thêm custom product fields
Edit `snippets/product-structured-data.liquid`:
```liquid
"additionalProperty": [
  {
    "@type": "PropertyValue",
    "name": "Custom Field",
    "value": {{ product.metafields.custom.field | json }}
  }
]
```

### Thêm product reviews/ratings
Nếu có review app, thêm vào product schema:
```liquid
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "{{ product.metafields.reviews.rating }}",
  "reviewCount": "{{ product.metafields.reviews.count }}"
}
```

### Thêm social media links
Edit `snippets/organization-structured-data.liquid`:
```liquid
"sameAs": [
  "https://facebook.com/your-page",
  "https://instagram.com/your-account",
  "https://twitter.com/your-handle"
]
```

## 📈 Benefits

1. **SEO tốt hơn** - Google hiểu rõ sản phẩm → rich snippets in search
2. **AI Discovery** - ChatGPT, Gemini có thể tìm và recommend sản phẩm
3. **Voice Shopping** - Google Assistant, Alexa có thể đọc info
4. **Future-proof** - Chuẩn Schema.org được support bởi tất cả major platforms
5. **Commerce APIs** - Dễ dàng integrate với commerce platforms khác

## ⚠️ Lưu ý quan trọng

1. **Testing local**: Structured data chỉ có thể test đầy đủ khi deploy lên production với public URL
2. **Shopify Liquid variables**: Tất cả `{{ shop.* }}` variables chỉ work trên Shopify environment
3. **.well-known files**: Cần custom setup để serve these files trên Shopify
4. **AI access**: AI agents cần có thể access public URLs (không work với password-protected stores)

## 🆘 Troubleshooting

### Structured data không xuất hiện
- Check page source, search cho "application/ld+json"
- Verify Liquid syntax đúng
- Check Shopify theme preview mode

### Google không detect Product schema
- Test với Google Rich Results Test
- Đảm bảo required fields có đầy đủ (name, image, price)
- Check JSON-LD syntax với validator.schema.org

### AI không đọc được data
- Verify store không bị password protect
- Check URL accessible publicly
- Test view source từ incognito browser

## 📚 Resources

- **Schema.org Product**: https://schema.org/Product
- **Schema.org ItemList**: https://schema.org/ItemList
- **UCP Specification**: https://ucp.dev/specs/shopping
- **Google Structured Data**: https://developers.google.com/search/docs/appearance/structured-data
- **OpenAI GPT**: https://platform.openai.com/docs
- **Google Gemini**: https://ai.google.dev/

## 🎉 Next Steps

1. ✅ Test structured data với validators
2. ✅ Deploy lên Shopify production store
3. ✅ Setup .well-known endpoints (via pages or app)
4. ✅ Test với ChatGPT/Gemini sau khi deploy
5. ✅ Monitor SEO improvements in Google Search Console
6. ✅ Add product reviews nếu có
7. ✅ Customize thêm fields nếu cần

---

**Chúc mừng! 🎊** Store của bạn giờ đã AI-ready và có thể được discovered bởi Google Gemini, ChatGPT và các AI agents khác!
