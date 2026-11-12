import { useHotel } from '../context/HotelContext.jsx';
import { downloadCsv, money } from '../utils/format.js';

const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];

export default function Reports() {
  const { db } = useHotel();
  const revenue = db.bookings
    .filter((b) => (b.payment === 'Paid' || String(b.payment).startsWith('Demo paid')) && b.status !== 'Cancelled')
    .reduce((sum, b) => sum + b.total, 0);
  const occ = db.rooms.length ? Math.round((db.rooms.filter((r) => r.status === 'Occupied').length / db.rooms.length) * 100) : 0;
  const vals = [12, 18, 15, 24, 30, Math.max(9, db.bookings.length * 5)];

  return (
    <>
      <div className="admin-title">
        <div><span className="eyebrow">HOTEL PERFORMANCE</span><h1>Reports</h1><p>A simple snapshot of bookings and revenue.</p></div>
        <button className="btn secondary" onClick={() => downloadCsv(db.bookings)}>Export CSV</button>
      </div>
      <div className="stat-grid">
        <div className="stat-card"><span>Recorded revenue</span><strong>{money(revenue)}</strong></div>
        <div className="stat-card"><span>Total reservations</span><strong>{db.bookings.length}</strong></div>
        <div className="stat-card"><span>Listed room types</span><strong>{db.rooms.length}</strong></div>
        <div className="stat-card"><span>Rooms marked occupied</span><strong>{occ}%</strong></div>
      </div>
      <section className="panel">
        <h3>Reservation activity · illustrative</h3>
        <div className="chart">
          {vals.map((v, i) => (
            <div className="bar-col" key={months[i]}>
              <span className="bar-num">{v}</span>
              <div className="bar" style={{ height: v * 4 }} />
              <span className="bar-label">{months[i]}</span>
            </div>
          ))}
        </div>
        <p className="notice">Monthly bars are illustrative mock data. Revenue above is calculated from demo reservations marked paid.</p>
      </section>
    </>
  );
}
