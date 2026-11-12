import { useState } from 'react';
import { Link } from 'react-router-dom';

const section = (id) => ({ pathname: '/', hash: `#${id}` });

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="topline">A THOUGHTFUL STAY, MADE SIMPLE &nbsp; · &nbsp; WELCOME TO ZOVIOO</div>
      <header className="header">
        <Link className="brand" to="/">ZOVIOO<small>HOTEL</small></Link>
        <nav className={`nav${open ? ' open' : ''}`} onClick={() => setOpen(false)}>
          <Link to="/">Home</Link>
          <Link to={section('room-section')}>Rooms</Link>
          <Link to={section('offers')}>Offers</Link>
          <Link to={section('location')}>Location</Link>
          <Link to={section('contact')}>Contact</Link>
        </nav>
        <div className="header-right">
          <Link className="admin-link" to="/admin">Hotel admin</Link>
          <Link className="btn small" to={section('search-form')}>Book a stay</Link>
          <button className="mobile-menu" onClick={() => setOpen((o) => !o)} aria-label="Open menu">☰</button>
        </div>
      </header>
    </>
  );
}
