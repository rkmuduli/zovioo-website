import { useEffect, useRef } from 'react';
import { useHotel } from '../context/HotelContext.jsx';

export default function Modal() {
  const { modal, closeModal } = useHotel();
  const ref = useRef(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (modal && !d.open) d.showModal();
    if (!modal && d.open) d.close();
  }, [modal]);

  return (
    <dialog ref={ref} className="modal" onClose={closeModal}>
      {modal && (
        <>
          <div className="modal-head">
            <h2>{modal.title}</h2>
            <button className="modal-close" onClick={closeModal} aria-label="Close">×</button>
          </div>
          <div className="modal-content">{modal.body}</div>
        </>
      )}
    </dialog>
  );
}
