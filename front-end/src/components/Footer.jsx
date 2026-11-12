import { Link } from 'react-router-dom';

export default function Footer({ mini = false }) {
  const year = new Date().getFullYear();
  if (mini) {
    return (
      <footer className="footer">
        <Link className="brand" to="/">ZOVIOO</Link>
        <span>© {year} ZOVIOO · zovioo.in</span>
      </footer>
    );
  }
  return (
    <footer className="footer">
      <Link className="brand" to="/">ZOVIOO<small>HOTEL</small></Link>
      <span>© {year} ZOVIOO · zovioo.in</span>
      <div className="footer-links">
        <Link to={{ pathname: '/', hash: '#contact' }}>Contact</Link>
        <Link to={{ pathname: '/', hash: '#location' }}>Location</Link>
        <Link to="/admin">Hotel admin</Link>
      </div>
    </footer>
  );
}
