---
id: product-page-seo
title: Product Page SEO Optimization
category: seo
goal: Optimize e-commerce product pages for organic ranking, rich result eligibility, and AI recommendation inclusion.
best_for: E-commerce SEO teams optimizing product detail pages for search visibility and conversion.
inputs:
  - Product page URLs to optimize
  - Product data (name, description, price, images, reviews)
  - Target keywords per product
  - Competitor product pages for benchmarking
constraints:
  - Schema markup must conform to Google Merchant Center requirements
  - Product descriptions must be unique (not manufacturer copy-paste)
  - Optimization must not compromise conversion UX
outputs:
  - Product page SEO audit per URL
  - Optimized title tag, meta description, and H1 recommendations
  - Product schema (JSON-LD) implementation spec
  - Content enhancement recommendations
quality_checks:
  - Every product page has unique title, description, and content
  - Product schema includes all required and recommended properties
  - Recommendations balance SEO with conversion optimization
tags:
  - seo
  - ecommerce
  - conversion
version: 1.0.0
impact: 4
---

## Context

Use this when optimizing product detail pages for organic search and AI shopping recommendations. Product pages compete in both traditional SERPs (via Product schema rich results) and AI commerce surfaces (ChatGPT shopping, Perplexity product recommendations). This skill covers both channels.

## Procedure

1. Audit current product page elements: title tag, meta description, H1, product description, images (alt text), reviews, and structured data.
2. Check Product schema implementation: required properties (name, image, price, availability, brand) and recommended properties (review, aggregateRating, sku, gtin).
3. Analyze competitor product pages for the same or similar products: what content elements do top-ranking pages include?
4. Write optimized metadata: title tag with product name + key attribute + brand, meta description with value proposition and price signal.
5. Enhance product description: unique content covering features, benefits, use cases, and comparison points. Not manufacturer boilerplate.
6. Optimize images: descriptive file names, alt text with product name and key attributes, proper dimensions.
7. Assess AI commerce readiness: is the product feed structured for ChatGPT shopping and other AI recommendation surfaces?

## Output Format

```md
# Product Page SEO: [Product/Category]

## Page Audit
| Element | Current | Issue | Recommendation |
|---------|---------|-------|---------------|
| Title tag | | | |
| Meta description | | | |
| H1 | | | |
| Product description | | Unique/Duplicate | |
| Images | | Alt text missing/present | |
| Reviews | | Count: X | |
| Product schema | | Missing/Partial/Complete | |

## Optimized Metadata
| URL | Current Title | Proposed Title | Current Meta | Proposed Meta |
|-----|-------------|---------------|-------------|--------------|
| | | | | |

## Product Schema Spec
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "{{product_name}}",
  "image": "{{product_image_url}}",
  "brand": {
    "@type": "Brand",
    "name": "{{brand_name}}"
  },
  "offers": {
    "@type": "Offer",
    "price": "{{price}}",
    "priceCurrency": "{{currency}}",
    "availability": "https://schema.org/InStock"
  }
}
```

```md
## Content Enhancement
| Product | Current Word Count | Enhancement | Priority |
|---------|-------------------|-------------|----------|
| | | Add use cases, comparison, FAQ | H/M/L |

## AI Commerce Readiness
| Check | Status | Fix |
|-------|--------|-----|
| Product feed structured | | |
| Key attributes in description | | |
| Review data accessible | | |
```

## QA Rubric (scored)

- Metadata quality (0-5): titles and descriptions are unique, keyword-optimized, and within length limits.
- Schema completeness (0-5): all required and recommended Product properties included.
- Content uniqueness (0-5): descriptions are original with genuine value, not manufacturer copy.
- AI readiness (0-5): product data is structured for AI commerce surfaces.

## Examples (good/bad)

- Good: "Product: 'Organic Cotton T-Shirt'. Current title: 'T-Shirt | Store'. Proposed: 'Organic Cotton T-Shirt - Soft, Sustainable, GOTS Certified | [Brand]'. Added: 150-word unique description covering fabric, fit, care, and sustainability story. Product schema with aggregateRating from 47 reviews."
- Bad: "Add keywords to the product page." (no specific elements, no schema, no content guidance)

## Variants

- Single product variant: deep optimization of one high-priority product page.
- Batch variant: template-based optimization across a product category (50+ pages with shared patterns).
