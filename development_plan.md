# MangoRockets Tools — Development Plan

## Project Overview

**Domain**: mangorockets.com  
**Hosting**: GitHub Pages (static site)  
**Primary Goal**: Build a Korean-language online utility tools site to pass Google AdSense review  
**Post-Approval Plan**: Redirect domain to a blog after AdSense approval  
**Tech Stack**: Pure HTML / CSS / JavaScript (no frameworks, no server-side)

---

## Context & Strategy

This site is a **test project for Google AdSense approval**. The strategy is:

1. Build a clean, useful multi-tool utility site
2. Connect custom domain (mangorockets.com) to GitHub Pages
3. Apply for Google AdSense
4. After approval, migrate the domain to a blog

The site must look professional, provide genuine user value, and meet all AdSense content policies. All tools must work entirely client-side (no backend/API calls) since GitHub Pages only supports static hosting.

---

## Site Structure

```
mangorockets.com/
├── index.html                  # Homepage — tool directory with descriptions
├── tools/
│   ├── text-analyzer.html      # Tool 1: Text Analyzer
│   ├── dday-calculator.html    # Tool 2: D-Day Calculator
│   ├── qr-generator.html       # Tool 3: QR Code Generator
│   ├── color-converter.html    # Tool 4: Color Code Converter
│   └── password-generator.html # Tool 5: Password Generator
├── about.html                  # About page
├── privacy.html                # Privacy Policy page
├── terms.html                  # Terms of Service page
├── assets/
│   ├── css/
│   │   └── style.css           # Global stylesheet
│   ├── js/
│   │   └── (per-tool JS files)
│   └── images/
│       └── (logo, og-image, favicon)
├── sitemap.xml                 # For SEO / Google indexing
├── robots.txt                  # Search engine crawl rules
└── CNAME                       # GitHub Pages custom domain config
```

---

## Design Requirements

- **Language**: Korean (all UI text, descriptions, and legal pages in Korean)
- **Responsive**: Mobile-first, works on all screen sizes
- **Clean & Professional**: Minimalist design, consistent color scheme, proper spacing
- **Navigation**: Persistent header with site logo/name + nav links to all tools
- **Footer**: Links to About, Privacy Policy, Terms of Service
- **No template look**: Must not look like a generic free template; needs to feel like a maintained product

---

## Tool Specifications

### Tool 1: Text Analyzer (텍스트 분석기)

The most feature-rich tool on the site. A single textarea input with real-time analysis.

**Features (all update in real-time as user types):**
- Character count (with spaces)
- Character count (without spaces)
- Byte count (UTF-8)
- Byte count (EUC-KR)
- Word count
- Sentence count
- Line count
- Paragraph count

**Utility buttons:**
- Remove all spaces → copy result
- Remove leading/trailing spaces → copy result
- Copy analysis result as text

**Content section below the tool:**
- "How to use" guide (300+ characters in Korean)
- Explanation of when character/byte counts matter (blog posts, SMS limits, DB fields, etc.)

---

### Tool 2: D-Day Calculator (디데이 계산기)

**Features:**
- Date picker for target date
- Shows D-day count from today
- Shows breakdown: X years, X months, X days
- Shows total weeks, total hours
- Option to calculate from a past date ("How many days since...")
- Quick preset buttons: 100 days later, 1 year later, graduation (Feb), etc.

**Content section:**
- Explanation of D-day counting conventions in Korea
- Common use cases (exams, military discharge, anniversaries, etc.)

---

### Tool 3: QR Code Generator (QR코드 생성기)

**Features:**
- Text/URL input field
- Real-time QR code preview
- Adjustable size (small / medium / large)
- Adjustable error correction level (L / M / Q / H)
- Download as PNG button
- Color customization (foreground / background color pickers)

**Library**: Use a client-side JS QR code library (e.g., qrcode.js or similar — Claude Code will determine the best option)

**Content section:**
- What QR codes are and how they work
- Common use cases (business cards, Wi-Fi sharing, event tickets, etc.)

---

### Tool 4: Color Code Converter (색상 코드 변환기)

**Features:**
- Input any format: HEX, RGB, or HSL
- Real-time conversion to all other formats
- Large color preview swatch
- Click-to-copy for each format
- Visual color picker (canvas-based or input type="color")
- Recent colors history (session only, stored in JS memory)

**Content section:**
- Explanation of HEX, RGB, HSL color models
- When to use which format (web development, design tools, print, etc.)

---

### Tool 5: Password Generator (비밀번호 생성기)

**Features:**
- Adjustable length slider (8–64 characters)
- Toggle options: uppercase, lowercase, numbers, special characters
- Exclude ambiguous characters option (0/O, 1/l/I)
- One-click generate button
- Password strength indicator (weak / medium / strong / very strong) with visual bar
- One-click copy button
- Batch generate option (generate 5 passwords at once)

**Content section:**
- Why strong passwords matter
- Tips for password security
- Explanation of password entropy

---

## Required Pages (for AdSense compliance)

### About Page (소개)

- Site name and purpose: "다양한 온라인 무료 도구를 제공합니다"
- Brief description of each tool
- Contact information (email address)

### Privacy Policy (개인정보처리방침)

- Statement that the site does not collect personal data
- Note about Google AdSense cookies and third-party advertising (required by AdSense policy)
- Google Analytics disclosure (if added)
- Cookie consent notice

### Terms of Service (이용약관)

- Tool usage is provided as-is with no warranty
- User responsibility for generated content (QR codes, passwords, etc.)
- Intellectual property notice

---

## SEO Requirements

- Unique `<title>` and `<meta description>` for every page
- Open Graph tags (og:title, og:description, og:image) for social sharing
- Proper heading hierarchy (single H1 per page, logical H2/H3 structure)
- `sitemap.xml` listing all pages
- `robots.txt` allowing all crawlers
- Semantic HTML5 elements (header, main, nav, footer, section, article)
- Alt text on all images
- Canonical URLs

---

## AdSense Preparation Checklist

- [ ] All 5 tools fully functional and tested
- [ ] All 3 legal/info pages (About, Privacy, Terms) complete
- [ ] Custom domain (mangorockets.com) connected and HTTPS working
- [ ] Sitemap submitted to Google Search Console
- [ ] Site indexed by Google (at least homepage + tool pages)
- [ ] Each tool page has 300+ characters of descriptive Korean content
- [ ] Mobile responsive design verified
- [ ] Page load speed acceptable (< 3 seconds)
- [ ] No broken links
- [ ] No placeholder or lorem ipsum text anywhere
- [ ] Cookie consent banner implemented (for AdSense compliance)

---

## Out of Scope

- No server-side code or API proxying
- No user authentication or accounts
- No database or persistent storage
- No frameworks (React, Vue, Next.js, etc.)
- No blog section at this stage
- No multilingual support (Korean only)