-- Create bookings table for appointment scheduling
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- The public booking form uses Supabase's anon role. Keep RLS enabled and
-- expose only the columns/actions required by the form and availability calendar.
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE public.bookings FROM anon, authenticated;

GRANT INSERT (name, email, phone, message, booking_date, booking_time, status)
  ON TABLE public.bookings TO anon, authenticated;

GRANT SELECT (booking_date, booking_time, status)
  ON TABLE public.bookings TO anon, authenticated;

DROP POLICY IF EXISTS "Public can create pending bookings" ON public.bookings;
CREATE POLICY "Public can create pending bookings"
  ON public.bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (status = 'pending');

DROP POLICY IF EXISTS "Public can view unavailable booking slots" ON public.bookings;
CREATE POLICY "Public can view unavailable booking slots"
  ON public.bookings
  FOR SELECT
  TO anon, authenticated
  USING (status IN ('pending', 'confirmed'));
