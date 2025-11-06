-- Fix search path for insert_sample_hrv_data function
DROP FUNCTION IF EXISTS public.insert_sample_hrv_data(UUID);

CREATE OR REPLACE FUNCTION public.insert_sample_hrv_data(p_user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  i INTEGER;
  base_timestamp TIMESTAMPTZ := NOW() - INTERVAL '7 days';
BEGIN
  FOR i IN 0..167 LOOP
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
$$;

-- Fix search path for update_updated_at_column function
DROP FUNCTION IF EXISTS public.update_updated_at_column() CASCADE;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Recreate the trigger
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();