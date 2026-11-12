import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Checkout from './pages/Checkout.jsx';
import Confirmation from './pages/Confirmation.jsx';
import AdminLayout from './admin/AdminLayout.jsx';
import Dashboard from './admin/Dashboard.jsx';
import RoomsAdmin from './admin/RoomsAdmin.jsx';
import Reservations from './admin/Reservations.jsx';
import Guests from './admin/Guests.jsx';
import OffersAdmin from './admin/OffersAdmin.jsx';
import Reports from './admin/Reports.jsx';
import Modal from './components/Modal.jsx';
import Toast from './components/Toast.jsx';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Toast />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout/:roomId" element={<Checkout />} />
        <Route path="/confirmation/:bookingId" element={<Confirmation />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="rooms" element={<RoomsAdmin />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="guests" element={<Guests />} />
          <Route path="offers" element={<OffersAdmin />} />
          <Route path="reports" element={<Reports />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Modal />
    </>
  );
}
