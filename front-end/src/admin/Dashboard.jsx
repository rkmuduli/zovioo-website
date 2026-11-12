import { Link } from 'react-router-dom';
import { useHotel } from '../context/HotelContext.jsx';
import BookingTable from '../components/BookingTable.jsx';
import RoomForm from '../forms/RoomForm.jsx';
import { fmt } from '../utils/format.js';

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}

export default function Dashboard() {
  const { db, openModal } = useHotel();
  const today = new Date().toISOString().slice(0, 10);
  const weekday = new Date().toLocaleDateString('en-IN', { weekday: 'long' }).toUpperCase();
  const active = db.bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Pending');
  const arrivals = db.bookings.filter((b) => b.checkIn === today && b.status === 'Confirmed').length;
  const occupied = db.rooms.filter((r) => r.status === 'Occupied').length;
  const recent = db.bookings.slice().sort((a, b) => b.created.localeCompare(a.created)).slice(0, 4);

  return (
    <>
      <div className="admin-title">
        <div>
          <span className="eyebrow">{weekday}, {fmt(today).toUpperCase()}</span>
          <h1>{greeting()}</h1>
          <p>Here’s the latest activity for your hotel.</p>
        </div>
        <Link className="btn" to="/admin/reservations">View reservations</Link>
      </div>
      <div className="stat-grid">
        <div className="stat-card"><span>Active reservations</span><strong>{active.length}</strong></div>
        <div className="stat-card"><span>Arrivals today</span><strong>{arrivals}</strong></div>
        <div className="stat-card"><span>Rooms listed</span><strong>{db.rooms.length}</strong></div>
        <div className="stat-card"><span>Rooms occupied</span><strong>{occupied}</strong></div>
      </div>
      <div className="panel-grid">
        <section className="panel"><h3>Recent reservations</h3><BookingTable rows={recent} actions={false} /></section>
        <section className="panel">
          <h3>Room availability</h3>
          {db.rooms.map((r) => (
            <div className="summary-line" key={r.id}>
              <span>{r.name}</span>
              <span className={`status ${r.status.toLowerCase()}`}>{r.status} · {r.inventory} rooms</span>
            </div>
          ))}
        </section>
      </div>
      <section className="panel">
        <h3>Quick actions</h3>
        <div className="toolbar">
          <button className="btn small" onClick={() => openModal('Add room', <RoomForm />)}>Add room</button>
          <Link className="btn secondary small" to="/admin/reservations">Review reservations</Link>
          <Link className="btn secondary small" to="/admin/reports">View reports</Link>
        </div>
      </section>
    </>
  );
}
