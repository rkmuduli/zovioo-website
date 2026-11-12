# ZOVIOO front-end (React)

React + Vite version of the ZOVIOO hotel website mockup (guest site + hotel admin demo).

## Run

Requires Node.js 18+ (includes npm).

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

## Structure

```text
front-end/
├── index.html               # Vite entry (fonts, #root)
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx             # Router + HotelProvider + global CSS
    ├── App.jsx              # Routes
    ├── styles/styles.css    # Original stylesheet (unchanged)
    ├── data/seed.js         # Demo rooms, bookings, offers
    ├── utils/format.js      # money/date helpers, availability, CSV export
    ├── context/HotelContext.jsx  # App state, localStorage, toast, modal
    ├── components/          # Header, Footer, RoomCard, RoomDetail, BookingTable, Modal, Toast, StatusBadge
    ├── forms/               # RoomForm, ReservationForm, OfferForm, ContactForm
    ├── pages/               # Home, Checkout, Confirmation
    └── admin/               # AdminLayout + Dashboard, Rooms, Reservations, Guests, Offers, Reports
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Guest home (rooms, search, offers, contact, location) |
| `/checkout/:roomId` | Booking form |
| `/confirmation/:bookingId` | Booking confirmation |
| `/admin` … `/admin/reports` | Hotel admin demo |

Demo data is stored in the browser's `localStorage` under `zovioo_mock_v1` (same key as the original mockup). No real bookings, payments or emails are made.
