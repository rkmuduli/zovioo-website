import { useNavigate } from 'react-router-dom';
import { useHotel } from '../context/HotelContext.jsx';
import { money } from '../utils/format.js';

export default function RoomDetail({ id }) {
  const { db, closeModal } = useHotel();
  const navigate = useNavigate();
  const r = db.rooms.find((x) => x.id === id);
  if (!r) return null;
  return (
    <>
      <div className="room-img" style={{ height: 230, backgroundImage: `url('${r.image}')`, marginBottom: 20 }} />
      <div className="room-meta">
        <span>♧ {r.capacity} guests</span>
        <span>↔ {r.size}</span>
        <span>{money(r.rate)} / night</span>
      </div>
      <p style={{ lineHeight: 1.7, color: 'var(--muted)' }}>{r.description}</p>
      <p><strong>Room features</strong><br />{(r.amenities || []).join(' · ')}</p>
      <div className="form-actions">
        <button className="btn secondary" onClick={closeModal}>Keep browsing</button>
        <button className="btn" onClick={() => { closeModal(); navigate(`/checkout/${r.id}`); }}>Choose this room</button>
      </div>
    </>
  );
}
