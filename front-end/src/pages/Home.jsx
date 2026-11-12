import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import RoomCard from '../components/RoomCard.jsx';
import ContactForm from '../forms/ContactForm.jsx';
import { useHotel } from '../context/HotelContext.jsx';
import { availableRooms, dateOK, fmt } from '../utils/format.js';

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
const DEFAULT_INTRO = 'Choose the space that suits your stay. Room details and sample nightly rates are shown below.';

export default function Home() {
  const { db, query, setQuery, toast, openModal } = useHotel();
  const [search, setSearch] = useState(null); // { rooms, text } after an availability search
  const location = useLocation();

  // Scroll to #section links coming from the header/footer.
  useEffect(() => {
    const id = location.hash.slice(1);
    if (!id) return;
    scrollTo(id);
    if (id === 'search-form') document.getElementById('check-in')?.focus({ preventScroll: true });
  }, [location.key, location.hash]);

  const onSearch = (e) => {
    e.preventDefault();
    const f = e.target;
    const q = { in: f.checkIn.value, out: f.checkOut.value, guests: Number(f.guests.value) };
    setQuery(q);
    if (!dateOK(q.in, q.out)) { toast('Choose a check-out date after check-in.'); return; }
    const rooms = availableRooms(db, q.in, q.out, q.guests);
    setSearch({
      rooms,
      text: rooms.length
        ? `Available ${fmt(q.in)} – ${fmt(q.out)} for ${q.guests} guest${q.guests > 1 ? 's' : ''}.`
        : 'No rooms match those dates. Try another date range.',
    });
    scrollTo('room-section');
  };

  const copyCode = (code) => {
    const fallback = () => toast(`Use code ${code} at checkout.`);
    if (!navigator.clipboard) return fallback();
    navigator.clipboard.writeText(code).then(() => toast(`Offer code ${code} copied.`)).catch(fallback);
  };

  const rooms = search ? search.rooms : db.rooms;

  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="hero-inner">
            <span className="eyebrow">STAY A LITTLE CLOSER TO WHAT MATTERS</span>
            <h1>A good stay<br />starts here.</h1>
            <p>Find your room, choose your dates and make your next stay feel effortless.</p>
            <button className="btn light" onClick={() => scrollTo('room-section')}>Explore rooms &nbsp; →</button>
          </div>
        </section>

        <form id="search-form" className="searchbar" onSubmit={onSearch}>
          <div className="field"><label htmlFor="check-in">CHECK IN</label><input id="check-in" name="checkIn" type="date" required defaultValue={query.in} /></div>
          <div className="field"><label htmlFor="check-out">CHECK OUT</label><input id="check-out" name="checkOut" type="date" required defaultValue={query.out} /></div>
          <div className="field"><label htmlFor="guests">GUESTS</label>
            <select id="guests" name="guests" defaultValue={String(query.guests || 2)}>
              <option value="1">1 guest</option><option value="2">2 guests</option><option value="3">3 guests</option><option value="4">4 guests</option>
            </select>
          </div>
          <button className="btn" type="submit">Check availability</button>
        </form>

        <section className="section" id="room-section">
          <div className="section-head">
            <div><span className="eyebrow">REST WELL</span><h2>Rooms to make your own</h2></div>
            <p>{search ? search.text : DEFAULT_INTRO}</p>
          </div>
          <div className="room-grid">
            {rooms.length
              ? rooms.map((r) => <RoomCard key={r.id} room={r} />)
              : <div className="empty">No matching rooms are available for those dates.</div>}
          </div>
        </section>

        <section className="amenity-strip">
          {[['⌂', 'Comfortable rooms', 'Room details at a glance'], ['◷', 'Simple booking', 'Choose dates in a few steps'], ['✓', 'Secure checkout', 'Protected payment flow'], ['♡', 'Helpful support', 'Contact the hotel team']].map(([icon, title, sub]) => (
            <div className="amenity" key={title}><span className="icon">{icon}</span><div><strong>{title}</strong><span>{sub}</span></div></div>
          ))}
        </section>

        <section className="section split">
          <div>
            <span className="eyebrow">A MORE CONSIDERED STAY</span>
            <h2>Space to slow down<br />and settle in</h2>
            <p>From browsing room details to receiving your booking confirmation, ZOVIOO keeps the essentials clear. Find the information you need and book at your own pace.</p>
            <button className="btn secondary" onClick={() => scrollTo('room-section')}>Discover your room</button>
          </div>
          <div className="split-photo" role="img" aria-label="Relaxed hotel living space" />
        </section>

        <section className="section" id="offers">
          <div className="section-head">
            <div><span className="eyebrow">A LITTLE EXTRA</span><h2>Offers for your next stay</h2></div>
            <p>Use an available offer during checkout. Final eligibility depends on hotel terms.</p>
          </div>
          <div className="room-grid">
            {db.offers.filter((o) => o.active).map((o) => (
              <div className="room-card" key={o.code}>
                <div className="room-body">
                  <span className="eyebrow">{o.discount}% SAVING</span>
                  <h3>{o.label}</h3>
                  <p>Enter code <strong>{o.code}</strong> when you book to apply this sample offer.</p>
                  <button className="btn secondary small" onClick={() => copyCode(o.code)}>Use offer code</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-band" id="contact">
          <div><span className="eyebrow">WE’RE HERE TO HELP</span><h2>Questions before you book?</h2><p>Reach the ZOVIOO team for help with your stay.</p></div>
          <button className="btn light" onClick={() => openModal('Contact ZOVIOO', <ContactForm />)}>Contact the hotel</button>
        </section>

        <section className="section" id="location">
          <div className="section-head">
            <div><span className="eyebrow">FIND US</span><h2>Location & directions</h2></div>
            <p>Hotel address and map can be added here once the property location is confirmed.</p>
          </div>
          <div className="panel">
            <strong>Hotel location</strong>
            <p className="notice">Property address not yet provided. Update this section with the verified address and map link before launch.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
