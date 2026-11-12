import { useHotel } from '../context/HotelContext.jsx';

export default function ContactForm() {
  const { update, closeModal, toast } = useHotel();

  const onSubmit = (e) => {
    e.preventDefault();
    const msg = Object.fromEntries(new FormData(e.target));
    update((d) => { d.messages.push(msg); });
    closeModal();
    toast('Enquiry saved in this demo.');
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-grid">
        <div className="field"><label>YOUR NAME</label><input name="name" required /></div>
        <div className="field"><label>EMAIL</label><input name="email" type="email" required /></div>
        <div className="field full"><label>HOW CAN WE HELP?</label><textarea name="message" rows="4" required /></div>
      </div>
      <div className="form-actions">
        <button type="button" className="btn secondary" onClick={closeModal}>Cancel</button>
        <button className="btn">Send enquiry</button>
      </div>
      <p className="notice">Demo only: this enquiry is stored in this browser and is not emailed.</p>
    </form>
  );
}
