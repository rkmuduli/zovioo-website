import { useHotel } from '../context/HotelContext.jsx';
import { fmt } from '../utils/format.js';

export default function Guests() {
  const { db } = useHotel();
  const map = new Map();
  db.bookings.forEach((b) => {
    const g = map.get(b.email) || { name: b.guest, email: b.email, count: 0, last: b.checkIn };
    g.count++;
    if (b.checkIn > g.last) g.last = b.checkIn;
    map.set(b.email, g);
  });
  const rows = [...map.values()];

  return (
    <>
      <div className="admin-title">
        <div><span className="eyebrow">GUEST RELATIONSHIPS</span><h1>Guest records</h1><p>Contact and stay history from reservations.</p></div>
        <span className="badge">{rows.length} GUESTS</span>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>GUEST</th><th>EMAIL</th><th>RESERVATIONS</th><th>MOST RECENT ARRIVAL</th><th>RECORD</th></tr></thead>
          <tbody>
            {rows.map((g) => (
              <tr key={g.email}>
                <td><strong>{g.name}</strong></td><td>{g.email}</td><td>{g.count}</td><td>{fmt(g.last)}</td>
                <td><span className="status">Active</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="notice">Guest information is demo data and stays in this browser only.</p>
    </>
  );
}
