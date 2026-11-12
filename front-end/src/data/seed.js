export const photos = {
  garden: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=82',
  suite: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=82',
  deluxe: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=82',
};

export const seed = {
  rooms: [
    { id: 'RM-101', name: 'Classic Room', type: 'Classic', capacity: 2, size: '24 m²', rate: 5800, inventory: 8, status: 'Available', image: photos.garden, description: 'A calm, well-appointed room with thoughtful details and space to unwind.', amenities: ['Queen bed', 'Work desk', 'Wi-Fi'] },
    { id: 'RM-201', name: 'Deluxe Room', type: 'Deluxe', capacity: 2, size: '32 m²', rate: 7800, inventory: 6, status: 'Available', image: photos.deluxe, description: 'A little more room to settle in, with a generous seating area and a warm finish.', amenities: ['King bed', 'Lounge chair', 'Wi-Fi'] },
    { id: 'RM-301', name: 'Junior Suite', type: 'Suite', capacity: 3, size: '46 m²', rate: 11200, inventory: 3, status: 'Available', image: photos.suite, description: 'A separate living area makes longer stays feel easy and comfortable.', amenities: ['King bed', 'Living area', 'Wi-Fi'] },
  ],
  bookings: [
    { id: 'ZV-24081', guest: 'Aarav Mehta', email: 'aarav@example.com', room: 'Deluxe Room', roomId: 'RM-201', checkIn: '2026-11-18', checkOut: '2026-11-20', guests: 2, total: 15600, status: 'Confirmed', payment: 'Paid', created: '2026-11-10' },
    { id: 'ZV-24082', guest: 'Mira Shah', email: 'mira@example.com', room: 'Classic Room', roomId: 'RM-101', checkIn: '2026-11-21', checkOut: '2026-11-23', guests: 1, total: 11600, status: 'Pending', payment: 'Pending', created: '2026-11-10' },
    { id: 'ZV-24077', guest: 'Dev Patel', email: 'dev@example.com', room: 'Junior Suite', roomId: 'RM-301', checkIn: '2026-11-12', checkOut: '2026-11-15', guests: 2, total: 33600, status: 'Confirmed', payment: 'Paid', created: '2026-11-09' },
    { id: 'ZV-24065', guest: 'Anya Rao', email: 'anya@example.com', room: 'Classic Room', roomId: 'RM-101', checkIn: '2026-11-05', checkOut: '2026-11-07', guests: 2, total: 11600, status: 'Completed', payment: 'Paid', created: '2026-11-04' },
  ],
  offers: [
    { code: 'WELCOME10', label: 'Welcome offer', discount: 10, active: true },
    { code: 'WEEKEND5', label: 'Weekend stay', discount: 5, active: true },
  ],
  messages: [],
};
