# Proposed production backend

The current site is a browser-only prototype. A production implementation can use a React client, a Node.js/Express API, PostgreSQL, and Azure hosting. PostgreSQL is the selected relational database; this is a MERN-style JavaScript application approach, not the strict MongoDB version of MERN.

```text
backend/
├── src/
│   ├── app.js
│   ├── config/             # Azure and environment configuration
│   ├── middleware/         # Authentication, validation, error handling
│   ├── routes/             # Rooms, availability, bookings, guests, offers, reports
│   ├── controllers/
│   ├── services/           # Booking rules, payment and email integrations
│   └── db/                 # PostgreSQL connection and repositories
├── tests/
└── .env.example
```

Suggested API groups: `GET /api/rooms`, `GET /api/availability`, `POST /api/bookings`, `GET/PATCH /api/admin/bookings`, `CRUD /api/admin/rooms`, `CRUD /api/admin/offers`, and `GET /api/admin/reports`. Protect administration endpoints with role-based authentication. Keep payment card data with a PCI-compliant payment provider; do not store raw card details in PostgreSQL.

The accompanying `../database/schema.sql` is a starting model only. Availability, inventory allocation, taxes, cancellation rules, and concurrent booking protection need hotel-specific decisions before production.
