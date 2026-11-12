import { useHotel } from '../context/HotelContext.jsx';
import OfferForm from '../forms/OfferForm.jsx';

export default function OffersAdmin() {
  const { db, update, openModal, toast } = useHotel();

  const toggle = (i) => {
    update((d) => { d.offers[i].active = !d.offers[i].active; });
    toast('Offer status updated.');
  };

  return (
    <>
      <div className="admin-title">
        <div><span className="eyebrow">PROMOTIONS</span><h1>Offers</h1><p>Create and manage booking codes.</p></div>
        <button className="btn" onClick={() => openModal('Create offer', <OfferForm />)}>＋ Add offer</button>
      </div>
      <div className="table-wrap">
        <table className="data-table">
          <thead><tr><th>OFFER</th><th>CODE</th><th>DISCOUNT</th><th>STATUS</th><th>ACTION</th></tr></thead>
          <tbody>
            {db.offers.map((o, i) => (
              <tr key={`${o.code}-${i}`}>
                <td><strong>{o.label}</strong></td>
                <td>{o.code}</td>
                <td>{o.discount}%</td>
                <td><span className={`status ${o.active ? '' : 'cancelled'}`.trim()}>{o.active ? 'Active' : 'Inactive'}</span></td>
                <td><button className="plain-btn inline-link" onClick={() => toggle(i)}>{o.active ? 'Deactivate' : 'Activate'}</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
