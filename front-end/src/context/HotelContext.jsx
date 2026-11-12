import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { seed } from '../data/seed.js';

const KEY = 'zovioo_mock_v1';
const HotelContext = createContext(null);

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || structuredClone(seed);
  } catch {
    return structuredClone(seed);
  }
}

export function HotelProvider({ children }) {
  const [db, setDb] = useState(load);
  const [query, setQuery] = useState({ in: '', out: '', guests: 2 });
  const [modal, setModal] = useState(null); // { title, body }
  const [toastMsg, setToastMsg] = useState({ text: '', show: false });
  const toastTimer = useRef();

  // Persist demo data in this browser, like the original mockup.
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(db)); } catch { /* storage unavailable */ }
  }, [db]);

  /** Mutate a copy of the data: update(d => { d.rooms.push(...) }) */
  const update = useCallback((fn) => {
    setDb((prev) => {
      const next = structuredClone(prev);
      fn(next);
      return next;
    });
  }, []);

  const toast = useCallback((text) => {
    clearTimeout(toastTimer.current);
    setToastMsg({ text, show: true });
    toastTimer.current = setTimeout(() => setToastMsg((t) => ({ ...t, show: false })), 2800);
  }, []);

  const openModal = useCallback((title, body) => setModal({ title, body }), []);
  const closeModal = useCallback(() => setModal(null), []);

  const value = useMemo(
    () => ({ db, update, query, setQuery, modal, openModal, closeModal, toast, toastMsg }),
    [db, update, query, modal, openModal, closeModal, toast, toastMsg]
  );

  return <HotelContext.Provider value={value}>{children}</HotelContext.Provider>;
}

export function useHotel() {
  const ctx = useContext(HotelContext);
  if (!ctx) throw new Error('useHotel must be used inside <HotelProvider>');
  return ctx;
}
