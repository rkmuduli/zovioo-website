import { useHotel } from '../context/HotelContext.jsx';
import { fmt, money } from '../utils/format.js';
import StatusBadge from './StatusBadge.jsx';

export default function BookingTable({ rows, actions = true }) {
  const { update, toast } = useHotel();

  if (!rows.length) return <div className="empty">No reservations yet</div>;

  const act = (id) => {
    update((d) => {
      const b = d.bookings.find((x) => x.id === id);
      if (!b) return;
      if (b.status === 'Pending') { b.status = 'Confirmed'; b.payment = 'Paid'; }
      else if (b.status === 'Cancelled') b.status = 'Confirmed';
      else b.status = 'Cancelled';
    });
    toast(`Reservation ${id} updated.`);
  };

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>BOOKING</th><th>GUEST</th><th>ROOM</th><th>DATES</th><th>TOTAL</th><th>STATUS</th>
            {actions && <th>ACTION</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((b) => (
            <tr key={b.id}>
              <td><strong>{b.id}</strong></td>
              <td>{b.guest}<br /><span className="notice">{b.email}</span></td>
              <td>{b.room}</td>
              <td>{fmt(b.checkIn)} – {fmt(b.checkOut)}</td>
              <td>{money(b.total)}</td>
              <td><StatusBadge status={b.status} /></td>
              {actions && (
                <td>
                  <button className="plain-btn inline-link" onClick={() => act(b.id)}>
                    {b.status === 'Pending' ? 'Confirm' : b.status === 'Cancelled' ? 'Restore' : 'Cancel'}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
