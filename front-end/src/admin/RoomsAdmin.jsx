import { useHotel } from '../context/HotelContext.jsx';
import RoomForm from '../forms/RoomForm.jsx';
import { money } from '../utils/format.js';

export default function RoomsAdmin() {
  const { db, update, openModal, toast } = useHotel();

  const setInventory = (id, value) => {
    update((d) => {
      const r = d.rooms.find((x) => x.id === id);
      if (r) r.inventory = Number(value);
    });
    toast('Inventory updated.');
  };

  return (
    <>
      <div className="admin-title">
        <div><span className="eyebrow">INVENTORY & PRICING</span><h1>Rooms & rates</h1><p>Manage room types, nightly rates and inventory.</p></div>
        <button className="btn" onClick={() => openModal('Add room', <RoomForm />)}>＋ Add room</button>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>ROOM TYPE</th><th>ROOM ID</th><th>CAPACITY</th><th>NIGHTLY RATE</th><th>INVENTORY</th><th>STATUS</th><th>EDIT</th></tr></thead>
          <tbody>
            {db.rooms.map((r) => (
              <tr key={r.id}>
                <td><strong>{r.name}</strong><br /><span className="notice">{r.size}</span></td>
                <td>{r.id}</td>
                <td>{r.capacity} guests</td>
                <td>{money(r.rate)}</td>
                <td>
                  <input
                    aria-label={`${r.name} inventory`} type="number" min="0" value={r.inventory}
                    onChange={(e) => setInventory(r.id, e.target.value)}
                    style={{ width: 70, padding: 6, border: '1px solid var(--line)' }}
                  />
                </td>
                <td><span className={`status ${r.status.toLowerCase()}`}>{r.status}</span></td>
                <td><button className="plain-btn inline-link" onClick={() => openModal('Edit room', <RoomForm id={r.id} />)}>Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="notice">Rate and inventory changes are saved in this browser’s local demo data.</p>
    </>
  );
}
