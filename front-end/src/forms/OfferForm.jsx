import { useHotel } from '../context/HotelContext.jsx';

export default function OfferForm() {
  const { update, closeModal, toast } = useHotel();

  const onSubmit = (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    update((d) => { d.offers.push({ ...f, code: f.code.toUpperCase(), discount: +f.discount, active: true }); });
    closeModal();
    toast('Offer created.');
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-grid">
        <div className="field full"><label>OFFER NAME</label><input name="label" required placeholder="Seasonal offer" /></div>
        <div className="field"><label>CODE</label><input name="code" required placeholder="STAY10" /></div>
        <div className="field"><label>DISCOUNT (%)</label><input name="discount" type="number" min="1" max="90" defaultValue="10" required /></div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn secondary" onClick={closeModal}>Cancel</button>
        <button className="btn">Save offer</button>
      </div>
    </form>
  );
}
