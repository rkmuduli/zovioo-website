import { useHotel } from '../context/HotelContext.jsx';
import { money } from '../utils/format.js';
import RoomDetail from './RoomDetail.jsx';

export default function RoomCard({ room: r }) {
  const { openModal } = useHotel();
  return (
    <article className="room-card">
      <div className="room-img" style={{ backgroundImage: `url('${r.image}')` }}>
        <span className="room-tag">{r.type}</span>
      </div>
      <div className="room-body">
        <h3>{r.name}</h3>
        <div className="room-meta">
          <span>♧ {r.capacity} guests</span>
          <span>↔ {r.size}</span>
        </div>
        <p>{r.description}</p>
        <div className="room-bottom">
          <div className="price">{money(r.rate)} <small>/ night</small></div>
          <button className="btn small" onClick={() => openModal(r.name, <RoomDetail id={r.id} />)}>View room</button>
        </div>
      </div>
    </article>
  );
}
