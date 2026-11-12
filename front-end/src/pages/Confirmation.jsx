import { Link, Navigate, useParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { useHotel } from '../context/HotelContext.jsx';
import { fmt, money } from '../utils/format.js';

export default function Confirmation() {
  const { bookingId } = useParams();
  const { db } = useHotel();
  const b = db.bookings.find((x) => x.id === bookingId);
  if (!b) return <Navigate to="/" replace />;

  return (
    <>
      <Header />
      <section className="section" style={{ maxWidth: 780 }}>
        <div className="confirmation">
          <div className="check">✓</div>
          <span className="eyebrow">BOOKING RECEIVED</span>
          <h2>Thank you, {String(b.guest).split(' ')[0]}.</h2>
          <p>Your reservation details are ready.</p>
        </div>
        <div className="panel">
          <h3>Reservation {b.id}</h3>
          <div className="summary-line"><span>Room</span><strong>{b.room}</strong></div>
          <div className="summary-line"><span>Dates</span><strong>{fmt(b.checkIn)} – {fmt(b.checkOut)}</strong></div>
          <div className="summary-line"><span>Guests</span><strong>{b.guests}</strong></div>
          <div className="summary-line"><span>Payment</span><strong>Demo payment · {b.payment}</strong></div>
          <div className="summary-line"><span>Estimated total</span><strong>{money(b.total)}</strong></div>
          <p className="notice">This is a functional mockup. No live reservation or payment was created. In production, a confirmation email and payment gateway would be connected.</p>
          <div className="form-actions"><Link className="btn" to="/">Return to ZOVIOO</Link></div>
        </div>
      </section>
      <Footer mini />
    </>
  );
}
