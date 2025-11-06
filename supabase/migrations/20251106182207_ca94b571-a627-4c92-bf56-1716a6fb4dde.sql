-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create HRV stress data table
CREATE TABLE public.hrv_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  heart_rate INTEGER NOT NULL,
  hrv_value DECIMAL(10, 2) NOT NULL,
  stress_level TEXT NOT NULL CHECK (stress_level IN ('low', 'moderate', 'high', 'very_high')),
  rmssd DECIMAL(10, 2),
  sdnn DECIMAL(10, 2),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.hrv_data ENABLE ROW LEVEL SECURITY;

-- HRV data policies
CREATE POLICY "Users can view their own HRV data"
  ON public.hrv_data FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own HRV data"
  ON public.hrv_data FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own HRV data"
  ON public.hrv_data FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own HRV data"
  ON public.hrv_data FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX idx_hrv_data_user_timestamp ON public.hrv_data(user_id, timestamp DESC);

-- Create trigger to auto-update profiles updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample HRV data function (for testing)
CREATE OR REPLACE FUNCTION public.insert_sample_hrv_data(p_user_id UUID)
RETURNS VOID AS $$
DECLARE
  i INTEGER;
  base_timestamp TIMESTAMPTZ := NOW() - INTERVAL '7 days';
BEGIN
  FOR i IN 0..167 LOOP -- 7 days * 24 hours
    INSERT INTO public.hrv_data (
      user_id,
      timestamp,
      heart_rate,
      hrv_value,
      stress_level,
      rmssd,
      sdnn
    ) VALUES (
      p_user_id,
      base_timestamp + (i || ' hours')::INTERVAL,
      60 + FLOOR(RANDOM() * 40)::INTEGER,
      25 + RANDOM() * 75,
      CASE 
        WHEN RANDOM() < 0.5 THEN 'low'
        WHEN RANDOM() < 0.75 THEN 'moderate'
        WHEN RANDOM() < 0.9 THEN 'high'
        ELSE 'very_high'
      END,
      20 + RANDOM() * 60,
      30 + RANDOM() * 70
    );
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;