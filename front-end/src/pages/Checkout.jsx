import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { useHotel } from '../context/HotelContext.jsx';
import { availableRooms, dateOK, fmt, isoDate, money, newId, nights } from '../utils/format.js';

export default function Checkout() {
  const { roomId } = useParams();
  const { db, update, query, toast } = useHotel();
  const navigate = useNavigate();
  const r = db.rooms.find((x) => x.id === roomId);
  const [inn, setInn] = useState(query.in || isoDate(7));
  const [out, setOut] = useState(query.out || isoDate(9));

  if (!r) {
    return (
      <>
        <Header />
        <section className="section"><div className="panel"><h3>Room not found</h3><p className="notice">Please select a room first.</p><Link className="btn" to="/">Back to rooms</Link></div></section>
        <Footer mini />
      </>
    );
  }

  const n = nights(inn, out);

  const onSubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const guests = Number(f.get('guests'));
    if (!dateOK(inn, out)) { toast('Check-out must be after check-in.'); return; }
    if (!availableRooms(db, inn, out, guests).some((x) => x.id === r.id)) {
      toast('Selected room type is no longer available for these dates.');
      return;
    }
    const offer = db.offers.find((o) => o.active && o.code === f.get('offer'));
    const total = Math.round(n * r.rate * (offer ? 1 - offer.discount / 100 : 1));
    const payment = f.get('payment');
    const b = {
      id: newId('ZV-'), guest: f.get('name'), email: f.get('email'), room: r.name, roomId: r.id,
      checkIn: inn, checkOut: out, guests, total, status: 'Confirmed',
      payment: payment === 'Pay at hotel' ? 'Pay at hotel' : 'Demo paid · ' + payment,
      created: new Date().toISOString().slice(0, 10),
    };
    update((d) => { d.bookings.unshift(b); });
    navigate(`/confirmation/${b.id}`);
  };

  return (
    <>
      <Header />
      <section className="section">
        <span className="eyebrow">YOUR STAY</span>
        <h2>Complete your booking</h2>
        <div className="progress"><div className="done">1 · Room & dates</div><div className="done">2 · Guest details</div><div>3 · Confirmation</div></div>
        <div className="booking-layout">
          <form className="panel" onSubmit={onSubmit}>
            <h3>Guest details</h3>
            <div className="form-grid">
              <div className="field"><label>FULL NAME</label><input name="name" required placeholder="Name on reservation" /></div>
              <div className="field"><label>EMAIL ADDRESS</label><input type="email" name="email" required placeholder="you@example.com" /></div>
              <div className="field"><label>PHONE (OPTIONAL)</label><input name="phone" type="tel" placeholder="Phone number" /></div>
              <div className="field"><label>GUESTS</label>
                <select name="guests" defaultValue={String(Math.min(query.guests || 2, 3))}><option>1</option><option>2</option><option>3</option></select>
              </div>
              <div className="field"><label>CHECK IN</label><input type="date" name="in" value={inn} onChange={(e) => setInn(e.target.value)} required /></div>
              <div className="field"><label>CHECK OUT</label><input type="date" name="out" value={out} onChange={(e) => setOut(e.target.value)} required /></div>
              <div className="field full"><label>OFFER CODE</label>
                <select name="offer">
                  <option value="">No offer</option>
                  {db.offers.filter((o) => o.active).map((o) => <option key={o.code} value={o.code}>{o.code} · {o.discount}% off</option>)}
                </select>
              </div>
              <div className="field full"><label>SPECIAL REQUEST (OPTIONAL)</label><textarea name="request" rows="2" placeholder="Share a note with the hotel" /></div>
              <div className="field full"><label>PAYMENT METHOD</label>
                <select name="payment">
                  <option value="Card demo">Secure card payment · demo</option>
                  <option value="UPI demo">UPI · demo</option>
                  <option value="Pay at hotel">Pay at hotel</option>
                </select>
              </div>
              <div className="full notice">Payment is simulated in this mockup. No card or payment details are collected.</div>
            </div>
            <div className="form-actions">
              <Link className="btn secondary" to="/">Back to rooms</Link>
              <button className="btn" type="submit">Confirm booking</button>
            </div>
          </form>
          <aside className="panel">
            <h3>Booking summary</h3>
            <strong>{r.name}</strong>
            <div className="summary-line"><span>Check in</span><span>{fmt(inn)}</span></div>
            <div className="summary-line"><span>Check out</span><span>{fmt(out)}</span></div>
            <div className="summary-line"><span>Length of stay</span><span>{n} nights</span></div>
            <div className="summary-line"><span>Room subtotal</span><span>{money(n * r.rate)}</span></div>
            <div className="summary-line"><span>Taxes</span><span>Shown at hotel</span></div>
            <div className="summary-line"><strong>Estimated total</strong><strong>{money(n * r.rate)}</strong></div>
            <p className="notice">Rates are sample values. Taxes, availability rules and cancellation terms should be confirmed before launch.</p>
          </aside>
        </div>
      </section>
      <Footer mini />
    </>
  );
}
