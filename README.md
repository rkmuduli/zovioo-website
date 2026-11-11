# ZOVIOO website mockup

Responsive hotel website and management dashboard prototype for **zovioo.in**.

## Run the mockup

The prototype is static HTML, CSS and JavaScript. It stores demo changes in this browser using `localStorage`.

1. Open a terminal in this folder.
2. Run `python -m http.server 8080` (or use another local static file server).
3. Visit `http://localhost:8080`.

The mockup can also be previewed from `index.html`, although using a local server is recommended.

## Project structure

```text
zovioo-hotel-website/
├── index.html                 # Guest site entry point
├── assets/
│   ├── css/styles.css         # Responsive guest and admin styles
│   └── js/app.js              # Guest flows, admin views, demo storage
├── backend/
│   └── README.md              # Proposed API service structure
├── database/
│   └── schema.sql             # Starting PostgreSQL schema
└── docs/
    └── FEATURES.md            # Mockup functions and production scope
```

## Included interactions

- Browse room types and inspect room details.
- Search availability by dates and guest count.
- Complete a sample booking and see a confirmation.
- Apply an offer code at checkout.
- Submit a sample contact enquiry.
- Open the hotel admin dashboard.
- Manage room details, rates, inventory and status.
- Search and filter reservations, then confirm or cancel them.
- Review guest records and manage offer codes.
- View summary reports and export reservation data as CSV.

## Demo boundaries

This is a front-end mockup, not a live hotel system. Rates, room inventory, bookings and guest records are sample data, saved locally in the current browser. Availability is checked against that demo data. Payment choices are simulated; no payment details are requested or transmitted. Contact forms are not emailed. The hotel location has not been supplied, so the page leaves it as a placeholder. The sample photos and fonts load from Unsplash and Google Fonts when online.

Before launch, connect the interface to authenticated server APIs, verified hotel content, a real availability and rate source, a payment provider, transactional email, and deployment/domain settings for Azure and zovioo.in. See `backend/README.md` and `docs/FEATURES.md`.
