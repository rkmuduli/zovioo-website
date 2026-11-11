# Feature map

| Area | Prototype behavior | Production connection |
| --- | --- | --- |
| Room discovery | Sample room catalog, details and guest capacity | Room and media API |
| Availability | Date overlap check against local demo bookings | Transactional inventory service |
| Booking | Guest details, date validation, offer application and confirmation | Booking API, email confirmation and audit history |
| Payment | Demo card/UPI choices or pay-at-hotel selection; no payment details collected | Payment provider checkout and signed webhooks |
| Administration | Dashboard, room/rate/inventory edits, reservation search/filter/actions, guest list, offers, report, CSV export | Authenticated role-based API |
| Contact and location | Contact submission stored locally; location placeholder | Email/ticket integration and verified address/map |
| Hosting | Static preview | Azure application hosting, managed PostgreSQL, secrets and monitoring |

Sample room names, prices, offers, capacity, and reservations are illustrative. Replace them with approved hotel data before launch.
