# Sarthak Shriram – Portfolio

Personal portfolio built with plain HTML, CSS and JavaScript. No build step, no dependencies, so it works on any static host.

## Structure
```
index.html          page content
css/style.css       styles (light + dark theme)
js/main.js          theme toggle, nav highlight, back-to-top, auto months counter
assets/             favicon.svg, about.jpg
404.html            custom not-found page
robots.txt          search engine rules
```

## Run locally
Open `index.html` in a browser, or run `python -m http.server 8000` and visit http://localhost:8000.

## Hosting
Upload the folder contents as they are. The publish directory is the project root, and there is no build command.

- **Netlify:** drag and drop the folder at app.netlify.com/drop.
- **Vercel:** import the project, set Framework Preset to "Other", leave build command and output directory empty.
- **Cloudflare Pages:** connect the project or use direct upload, with no build command and the root as the output directory.
- **cPanel / shared hosting / FTP:** upload everything into `public_html`. For the custom 404 page on Apache, add this line to `.htaccess`:
  `ErrorDocument 404 /404.html`
- **Any other static host (Surge, Render, Firebase Hosting, S3, etc.):** point it at this folder.

Host the site at the root of a domain or subdomain. `404.html` uses root-relative paths (`/assets/...`, `/`), so it will not load its icon or home link correctly from a subfolder.

## Before you publish
- In `index.html`, replace `YOUR-GITHUB-USERNAME` in the GitHub link and `91XXXXXXXXXX` in the WhatsApp link, or delete those icons.
- Make sure `assets/about.jpg` and `assets/favicon.svg` are included in the upload.
