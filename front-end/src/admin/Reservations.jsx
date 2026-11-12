import { useState } from 'react';
import { useHotel } from '../context/HotelContext.jsx';
import BookingTable from '../components/BookingTable.jsx';
import ReservationForm from '../forms/ReservationForm.jsx';

export default function Reservations() {
  const { db, openModal } = useHotel();
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('All statuses');

  const needle = q.toLowerCase();
  const rows = db.bookings.filter(
    (b) => (status === 'All statuses' || b.status === status) && `${b.guest} ${b.id} ${b.email}`.toLowerCase().includes(needle)
  );

  return (
    <>
      <div className="admin-title">
        <div><span className="eyebrow">BOOKING MANAGEMENT</span><h1>Reservations</h1><p>Review, confirm or cancel guest bookings.</p></div>
        <button className="btn" onClick={() => openModal('Add reservation', <ReservationForm />)}>＋ Add reservation</button>
      </div>
      <div className="toolbar">
        <input placeholder="Search guest or booking ID" value={q} onChange={(e) => setQ(e.target.value)} />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {['All statuses', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      <BookingTable rows={rows} actions />
    </>
  );
}
