import { useHotel } from '../context/HotelContext.jsx';
import { photos } from '../data/seed.js';
import { newId } from '../utils/format.js';

const blank = { name: '', type: 'Classic', capacity: 2, size: '', rate: '', inventory: 1, status: 'Available', description: '' };

export default function RoomForm({ id }) {
  const { db, update, closeModal, toast } = useHotel();
  const r = (id && db.rooms.find((x) => x.id === id)) || blank;

  const onSubmit = (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    const nums = { capacity: +f.capacity, rate: +f.rate, inventory: +f.inventory };
    const createdId = newId('RM-', 4);
    update((d) => {
      const existing = id && d.rooms.find((x) => x.id === id);
      if (existing) Object.assign(existing, f, nums);
      else d.rooms.push({ ...f, ...nums, id: createdId, image: photos.garden, amenities: ['Wi-Fi'] });
    });
    closeModal();
    toast('Room details saved.');
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-grid">
        <div className="field"><label>ROOM NAME</label><input name="name" required defaultValue={r.name} /></div>
        <div className="field"><label>ROOM TYPE</label>
          <select name="type" defaultValue={r.type}>{['Classic', 'Deluxe', 'Suite'].map((x) => <option key={x}>{x}</option>)}</select>
        </div>
        <div className="field"><label>CAPACITY</label><input name="capacity" type="number" min="1" defaultValue={r.capacity} required /></div>
        <div className="field"><label>SIZE</label><input name="size" defaultValue={r.size} placeholder="e.g. 28 m²" /></div>
        <div className="field"><label>NIGHTLY RATE (₹)</label><input name="rate" type="number" min="0" defaultValue={r.rate} required /></div>
        <div className="field"><label>INVENTORY</label><input name="inventory" type="number" min="0" defaultValue={r.inventory} required /></div>
        <div className="field full"><label>DESCRIPTION</label><textarea name="description" rows="3" defaultValue={r.description} /></div>
        <div className="field full"><label>STATUS</label>
          <select name="status" defaultValue={r.status}>{['Available', 'Occupied', 'Maintenance'].map((x) => <option key={x}>{x}</option>)}</select>
        </div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn secondary" onClick={closeModal}>Cancel</button>
        <button className="btn" type="submit">Save room</button>
      </div>
    </form>
  );
}
