-- Starting PostgreSQL schema for a future ZOVIOO implementation.
-- Review room inventory and rate rules with hotel operations before production.

CREATE TABLE room_types (
  id BIGSERIAL PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  area_sqm NUMERIC(7,2),
  base_rate NUMERIC(12,2) NOT NULL CHECK (base_rate >= 0),
  inventory INTEGER NOT NULL DEFAULT 0 CHECK (inventory >= 0),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','inactive','maintenance')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE guests (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (email)
);

CREATE TABLE offers (
  id BIGSERIAL PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  discount_percent NUMERIC(5,2) NOT NULL CHECK (discount_percent > 0 AND discount_percent <= 100),
  starts_at DATE,
  ends_at DATE,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE bookings (
  id BIGSERIAL PRIMARY KEY,
  booking_code TEXT NOT NULL UNIQUE,
  guest_id BIGINT NOT NULL REFERENCES guests(id),
  room_type_id BIGINT NOT NULL REFERENCES room_types(id),
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guest_count INTEGER NOT NULL CHECK (guest_count > 0),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','completed','cancelled')),
  payment_status TEXT NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid','authorized','paid','refunded','failed')),
  offer_id BIGINT REFERENCES offers(id),
  subtotal NUMERIC(12,2) NOT NULL CHECK (subtotal >= 0),
  tax_amount NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
  total NUMERIC(12,2) NOT NULL CHECK (total >= 0),
  special_request TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (check_out > check_in)
);

CREATE INDEX bookings_dates_idx ON bookings (check_in, check_out);
CREATE INDEX bookings_guest_idx ON bookings (guest_id, created_at DESC);
CREATE INDEX bookings_room_status_idx ON bookings (room_type_id, status);

CREATE TABLE admin_users (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('manager','staff')),
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
