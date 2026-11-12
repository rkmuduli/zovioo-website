export const money = (n) => '₹' + Number(n || 0).toLocaleString('en-IN');

export const fmt = (d) =>
  d ? new Date(d + 'T12:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

export const nights = (a, b) => Math.max(1, Math.ceil((new Date(b) - new Date(a)) / 86400000));

export const dateOK = (a, b) => Boolean(a && b && new Date(b) > new Date(a));

export const isoDate = (offsetDays = 0) => new Date(Date.now() + 86400000 * offsetDays).toISOString().slice(0, 10);

export const newId = (prefix, digits = 6) => prefix + String(Date.now()).slice(-digits);

/** Rooms with free inventory for the given date range and party size. */
export function availableRooms(db, checkIn, checkOut, guests) {
  return db.rooms.filter(
    (r) =>
      r.status === 'Available' &&
      r.capacity >= guests &&
      r.inventory >
        db.bookings.filter((x) => x.roomId === r.id && x.status !== 'Cancelled' && checkIn < x.checkOut && checkOut > x.checkIn).length
  );
}

export function downloadCsv(bookings) {
  const rows = [
    ['Booking ID', 'Guest', 'Email', 'Room', 'Check-in', 'Check-out', 'Guests', 'Total', 'Status'],
    ...bookings.map((b) => [b.id, b.guest, b.email, b.room, b.checkIn, b.checkOut, b.guests, b.total, b.status]),
  ];
  const text = rows.map((r) => r.map((x) => '"' + String(x).replaceAll('"', '""') + '"').join(',')).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv' }));
  a.download = 'zovioo-reservations.csv';
  a.click();
  URL.revokeObjectURL(a.href);
}
