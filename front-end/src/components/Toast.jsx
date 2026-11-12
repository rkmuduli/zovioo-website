import { useHotel } from '../context/HotelContext.jsx';

export default function Toast() {
  const { toastMsg } = useHotel();
  return (
    <div className={`toast${toastMsg.show ? ' show' : ''}`} role="status" aria-live="polite">
      {toastMsg.text}
    </div>
  );
}
