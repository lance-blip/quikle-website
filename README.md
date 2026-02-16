# Quikle Website v6 - 6-Pillar Build

This is the complete rebuild of the Quikle website, expanding from a 2-pillar structure to a comprehensive 6-pillar service ecosystem. Built using Vanilla HTML/CSS/JS for maximum performance and SEO.

## Directory Structure

```
/home/openclaw/.openclaw/workspace/projects/quikle-website-v6/
├── index.html                    (Main 6-pillar monolithic page)
├── blog/
│   ├── index.html                (Blog listing page)
│   └── post-template.html        (Single article template)
├── css/
│   └── styles.css                (Glassmorphic design system)
├── js/
│   └── main.js                   (Interactions, animations, smooth scroll)
├── quikle-logo.png               (Company logo)
├── robots.txt                    (SEO directives)
├── sitemap.xml                   (SEO map)
└── .htaccess                     (Server configuration)
```

## Key Features

1.  **6-Pillar Architecture:** Dedicated sections for Voice AI, Agentic Support, Workflow Automation, Personal Assistants, Consulting, and Websites.
2.  **StoryBrand Framework:** Follows the SB7 framework (Hero, Problem/Villain, Guide, Plan, Call to Action, Success/Failure).
3.  **Glassmorphic Design:** Modern UI with blurred backgrounds, soft shadows, and teal accents (`--glass-bg`, `--glass-blur`).
4.  **SEO Optimized:** Semantic HTML5, JSON-LD structured data, Open Graph tags, and fast load times.
5.  **Conversion Focused:** Strategic CTAs throughout, directing to ScoreApp assessment.
6.  **Interactive Elements:** Scroll reveal animations (`.reveal`), stats counter, sticky header, and mobile navigation.

## Deployment Instructions

1.  **Upload:** Upload all files to the web server root (public_html).
2.  **Images:** Replace the placeholder images with the final generated assets.
    - Ensure images are optimized (JPEG <150KB).
    - Use the filenames specified in `index.html` (e.g., `hero-dashboard.jpg`, `pillar-voice-ai.jpg`).
3.  **Integrations:**
    - **Contact Form:** Verify the n8n webhook URL in `index.html` (line ~550).
    - **Nova Chatbot:** Replace the placeholder `div.nova-widget` with the actual chatbot embed code provided by n8n/Flowise.
    - **Analytics:** Add Google Analytics / GTM tracking code to `<head>`.

## Development Notes

-   **CSS:** The design system uses CSS variables for easy theming. See `css/styles.css` `:root`.
-   **JavaScript:** Vanilla JS with no external dependencies (except Font Awesome for icons).
-   **Blog:** To add new posts, copy `blog/post-template.html` and update content. Add entry to `blog/index.html`.

## Credits

-   **Architect:** Nova (Brain/Opus 4.6)
-   **Build:** Antigravity (Gemini 3 Pro High)
-   **Design:** Glassmorphic Light Theme
