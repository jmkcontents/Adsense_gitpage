# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**MangoRockets Tools** (mangorockets.com) is a Korean-language online utility tools site designed for Google AdSense approval. After AdSense approval, the domain will be redirected to a blog.

**Critical Constraints:**
- **Static site only**: GitHub Pages hosting, no server-side code or backend
- **No frameworks**: Pure HTML/CSS/JavaScript only (no React, Vue, build tools, etc.)
- **Korean language**: All UI text, content, and legal pages must be in Korean
- **Client-side only**: All tool functionality must run entirely in the browser

## Tech Stack

- Pure HTML5 (semantic elements: header, main, nav, footer, section, article)
- CSS3 (mobile-first responsive design)
- Vanilla JavaScript (no frameworks, no npm)
- Client-side libraries are allowed (e.g., qrcode.js for QR generation)

## Development Commands

This is a static site with no build process. Development workflow:

1. **Local development**: Open HTML files directly in browser or use a simple HTTP server:
   ```bash
   python3 -m http.server 8000
   # or
   npx serve .
   ```

2. **Testing**: Manual testing in browser (no automated test framework)

3. **Deployment**: Push to GitHub Pages (automatically served from repository)

## Site Architecture

See [development_plan.md](development_plan.md) for the complete specification.

### File Structure
```
mangorockets.com/
├── index.html                  # Homepage — tool directory
├── tools/
│   ├── text-analyzer.html      # 텍스트 분석기
│   ├── dday-calculator.html    # 디데이 계산기
│   ├── qr-generator.html       # QR코드 생성기
│   ├── color-converter.html    # 색상 코드 변환기
│   └── password-generator.html # 비밀번호 생성기
├── about.html                  # 소개 페이지
├── privacy.html                # 개인정보처리방침
├── terms.html                  # 이용약관
├── assets/
│   ├── css/style.css
│   ├── js/(per-tool JS files)
│   └── images/
├── sitemap.xml
├── robots.txt
└── CNAME
```

### The 5 Tools

1. **Text Analyzer** (텍스트 분석기): Real-time analysis of character/byte/word counts with Korean support (UTF-8 and EUC-KR byte counting)

2. **D-Day Calculator** (디데이 계산기): Date calculations with Korean D-day conventions, preset buttons for common events

3. **QR Code Generator** (QR코드 생성기): Client-side QR generation with size/color/error-correction options, PNG download

4. **Color Converter** (색상 코드 변환기): HEX/RGB/HSL conversion with visual picker and click-to-copy

5. **Password Generator** (비밀번호 생성기): Configurable password generation with strength indicator and batch generation

## Important Development Considerations

### AdSense Compliance Requirements
- Each tool page needs 300+ characters of descriptive Korean content
- Legal pages required: About (소개), Privacy Policy (개인정보처리방침), Terms of Service (이용약관)
- Privacy Policy must mention Google AdSense cookies and third-party advertising
- Cookie consent banner required

### SEO Requirements
- Unique `<title>` and `<meta description>` per page
- Open Graph tags for social sharing
- Single H1 per page, logical heading hierarchy
- Alt text on all images
- Canonical URLs
- Semantic HTML5 elements

### Korean Language Notes
- All UI text, tool descriptions, and content must be in Korean
- Character counting tools must support both UTF-8 and EUC-KR encoding (important for Korean text)
- D-day counting follows Korean conventions

### Testing Checklist
When implementing or modifying tools:
- Test on mobile (responsive design, touch interactions)
- Verify all copy-to-clipboard functionality works
- Ensure real-time updates work smoothly
- Test with Korean text input (especially for text analyzer)
- Check that all buttons and interactive elements are accessible

## File Naming and Code Style

- Use kebab-case for HTML files: `text-analyzer.html`, `password-generator.html`
- Keep JavaScript modular: one main JS file per tool in `assets/js/`
- Use consistent Korean terminology across all pages
- Maintain consistent header/footer across all pages

## What Not to Do

- Do not add any server-side code or API calls
- Do not use npm packages that require bundling
- Do not add frameworks or build processes
- Do not include placeholder text or lorem ipsum
- Do not create English versions of pages (Korean only at this stage)
- Do not add blog functionality yet (post-AdSense approval only)
