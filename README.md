# Happy Mother's Day

A personalized tribute — one page, three voices.

## Open locally

**Option A — just double-click**
Open `index.html` directly in any browser (Chrome, Safari, Firefox).
Works for reading the text; photos may not load over `file://` in some browsers.

**Option B — local server (recommended for photos)**

```bash
# Python (built into macOS / Linux)
cd mothers-day-site
python3 -m http.server 8080
# → open http://localhost:8080

# Node.js
npx serve .
# → follow the URL it prints
```

---

## Personalise the text

Open `index.html` in any text editor. Search for each bracketed placeholder and replace:

| Placeholder | Replace with |
|---|---|
| `[YOUR NAME]` | Your first name |
| `[BROTHER'S NAME]` | Your brother's first name |
| `[DAD'S NAME]` | Your dad's first name |
| `[Mom's first name]` | Mom's first name (appears in the Dad section) |
| `May 2025` | Today's date if you want to update it |

Each `<p>` block inside `.letter__body` has bracketed hints like `[describe a trip]` — replace those whole sentences with your real words.

---

## Add your photos

Drop images into the `images/` folder using these exact filenames:

| File | Section |
|---|---|
| `photo-01.jpg` | [YOUR NAME] — photo 1 |
| `photo-02.jpg` | [YOUR NAME] — photo 2 |
| `photo-03.jpg` | [YOUR NAME] — photo 3 |
| `photo-04.jpg` | [BROTHER'S NAME] — photo 1 |
| `photo-05.jpg` | [BROTHER'S NAME] — photo 2 |
| `photo-06.jpg` | [BROTHER'S NAME] — photo 3 |
| `photo-07.jpg` | [DAD'S NAME] — photo 1 |
| `photo-08.jpg` | [DAD'S NAME] — photo 2 |
| `photo-09.jpg` | [DAD'S NAME] — photo 3 |

JPG, PNG, and WebP all work — rename to match. To also update the caption under each photo, edit the `<figcaption>` tag directly below the `<figure>` in `index.html`.

---

## Share online

Upload the entire `mothers-day-site/` folder (no build step needed):

- **Netlify Drop** — drag the folder to [app.netlify.com/drop](https://app.netlify.com/drop), get a live URL instantly.
- **GitHub Pages** — push to a public repo, enable Pages from the repo settings.
- **Cloudflare Pages / Vercel** — connect to a Git repo or drag-and-drop deploy.

---

## File tree

```
mothers-day-site/
├── index.html        ← all content lives here
├── styles.css        ← all styles
├── main.js           ← scroll-reveal (tiny, no dependencies)
├── images/
│   ├── README.txt    ← photo naming guide
│   ├── photo-01.jpg  ← add your photos here
│   └── ...
└── README.md         ← this file
```
