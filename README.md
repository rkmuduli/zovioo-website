# ZOVIOO website mockup

Responsive hotel website and management dashboard prototype for **zovioo.in**.

## Run the front-end

The front-end is a React + Vite app in `front-end/`. It stores demo changes in the browser using `localStorage`. Requires Node.js 18+.

```bash
cd front-end
npm install
npm run dev        # http://localhost:5173
```

See `front-end/README.md` for the component structure and routes.

## Project structure

```text
zovioo-website/
├── front-end/                 # React + Vite app (guest site + admin demo)
│   ├── index.html
│   ├── package.json
│   └── src/                   # pages, admin, components, forms, context, styles
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
