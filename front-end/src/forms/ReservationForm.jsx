import { useHotel } from '../context/HotelContext.jsx';
import { dateOK, money, newId, nights } from '../utils/format.js';

export default function ReservationForm() {
  const { db, update, closeModal, toast } = useHotel();

  const onSubmit = (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    if (!dateOK(f.checkIn, f.checkOut)) { toast('Check-out must be after check-in.'); return; }
    const r = db.rooms.find((x) => x.id === f.roomId);
    const b = {
      id: newId('ZV-'), guest: f.guest, email: f.email, room: r?.name || 'Room', roomId: f.roomId,
      checkIn: f.checkIn, checkOut: f.checkOut, guests: Number(f.guests),
      total: nights(f.checkIn, f.checkOut) * (r?.rate || 0), status: f.status, payment: 'Pending',
      created: new Date().toISOString().slice(0, 10),
    };
    update((d) => { d.bookings.unshift(b); });
    closeModal();
    toast('Reservation added.');
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-grid">
        <div className="field"><label>GUEST NAME</label><input name="guest" required /></div>
        <div className="field"><label>GUEST EMAIL</label><input name="email" type="email" required /></div>
        <div className="field"><label>ROOM</label>
          <select name="roomId">{db.rooms.map((r) => <option key={r.id} value={r.id}>{r.name} · {money(r.rate)}/night</option>)}</select>
        </div>
        <div className="field"><label>GUESTS</label><input name="guests" type="number" min="1" defaultValue="2" required /></div>
        <div className="field"><label>CHECK IN</label><input name="checkIn" type="date" required /></div>
        <div className="field"><label>CHECK OUT</label><input name="checkOut" type="date" required /></div>
        <div className="field full"><label>STATUS</label><select name="status"><option>Confirmed</option><option>Pending</option></select></div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn secondary" onClick={closeModal}>Cancel</button>
        <button className="btn">Save reservation</button>
      </div>
    </form>
  );
}
