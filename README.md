# Classical On Demand - Setup Instructions

## Database Setup Required

The application requires a Supabase database with a `videos` table. Follow these steps:

### 1. Configure Supabase Connection
- Click the "Supabase" button in the settings panel (top of preview)
- This will set up your environment variables

### 2. Create the Videos Table
Go to your Supabase Dashboard → SQL Editor and run this SQL:

```sql
-- Create videos table
CREATE TABLE IF NOT EXISTS public.videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  search_term text UNIQUE NOT NULL,
  youtube_id text NOT NULL,
  genre text NOT NULL,
  composer text NOT NULL,
  symphony text NOT NULL,
  year integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_videos_search_term ON public.videos (search_term);
CREATE INDEX IF NOT EXISTS idx_videos_genre ON public.videos (genre);

-- Enable Row Level Security
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public can read videos" ON public.videos
  FOR SELECT TO public USING (true);

-- Allow authenticated users to manage videos (for admin)
CREATE POLICY "Authenticated users can manage videos" ON public.videos
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_videos_updated_at
  BEFORE UPDATE ON public.videos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### 3. Insert Sample Data
After creating the table, insert the video data:

```sql
INSERT INTO public.videos (search_term, youtube_id, genre, composer, symphony, year) VALUES
('Bach Brandenburg Concerto No 3 full', 'pdsyNwUoON0', 'Baroque', 'Johann Sebastian Bach', 'Brandenburg Concerto No. 3', 1721),
('Mozart Symphony No 40 full', 'JTc1mDieQI8', 'Classical', 'Wolfgang Amadeus Mozart', 'Symphony No. 40', 1788),
('Beethoven Symphony No 9 full', 'rOjHhS5MtvA', 'Classical', 'Ludwig van Beethoven', 'Symphony No. 9', 1824),
('Chopin Nocturne Op 9 No 2 full', 'YGRO05WcNDk', 'Romantic', 'Frédéric Chopin', 'Nocturne Op. 9 No. 2', 1832),
('Vivaldi Four Seasons Spring full', 'GRxofEmo3HA', 'Baroque', 'Antonio Vivaldi', 'The Four Seasons - Spring', 1725),
('Tchaikovsky Swan Lake full', 'CShopT9QUzw', 'Romantic', 'Pyotr Ilyich Tchaikovsky', 'Swan Lake', 1876),
('Debussy Clair de Lune full', 'CvFH_6DNRCY', 'Modern', 'Claude Debussy', 'Clair de Lune', 1905),
('Bach Toccata and Fugue full', 'ho9rZjlsyYY', 'Baroque', 'Johann Sebastian Bach', 'Toccata and Fugue in D minor', 1704),
('Mozart Requiem full', 'sPlhKP0nUTs', 'Classical', 'Wolfgang Amadeus Mozart', 'Requiem', 1791),
('Beethoven Moonlight Sonata full', '4Tr0otuiQuU', 'Classical', 'Ludwig van Beethoven', 'Moonlight Sonata', 1801),
('Chopin Ballade No 1 full', 'Ce8p0VcTbuA', 'Romantic', 'Frédéric Chopin', 'Ballade No. 1', 1835),
('Vivaldi Four Seasons Winter full', 'nGdFHFXciAQ', 'Baroque', 'Antonio Vivaldi', 'The Four Seasons - Winter', 1725),
('Tchaikovsky 1812 Overture full', 'VbxgYlcNxE8', 'Romantic', 'Pyotr Ilyich Tchaikovsky', '1812 Overture', 1880),
('Ravel Bolero full', 'r30D3SW4OVw', 'Modern', 'Maurice Ravel', 'Boléro', 1928),
('Bach Well Tempered Clavier full', 'isxporhD8mQ', 'Baroque', 'Johann Sebastian Bach', 'The Well-Tempered Clavier', 1722),
('Mozart Piano Concerto No 21 full', 'df-eLzao63E', 'Classical', 'Wolfgang Amadeus Mozart', 'Piano Concerto No. 21', 1785),
('Beethoven Symphony No 5 full', '_4IRMYuE1hI', 'Classical', 'Ludwig van Beethoven', 'Symphony No. 5', 1808),
('Chopin Etude Op 10 No 4 full', 'nqHbGNVFVUY', 'Romantic', 'Frédéric Chopin', 'Étude Op. 10 No. 4', 1832),
('Vivaldi Gloria full', 'YLJOBdUhaEM', 'Baroque', 'Antonio Vivaldi', 'Gloria', 1715),
('Tchaikovsky Nutcracker Suite full', 'M8J8urC_8Jw', 'Romantic', 'Pyotr Ilyich Tchaikovsky', 'The Nutcracker Suite', 1892),
('Stravinsky Rite of Spring full', 'EkwqPJZe8ms', 'Modern', 'Igor Stravinsky', 'The Rite of Spring', 1913),
('Bach Mass in B Minor full', 'VbF7JZIQfZ8', 'Baroque', 'Johann Sebastian Bach', 'Mass in B minor', 1749),
('Mozart Don Giovanni full', 'ePR2jjd57_0', 'Classical', 'Wolfgang Amadeus Mozart', 'Don Giovanni', 1787),
('Beethoven Emperor Concerto full', 'hDXWK3W477w', 'Classical', 'Ludwig van Beethoven', 'Emperor Concerto', 1811),
('Chopin Piano Concerto No 1 full', 'V_kgya8D42I', 'Romantic', 'Frédéric Chopin', 'Piano Concerto No. 1', 1830),
('Handel Messiah Hallelujah full', 'usfiAsWR4qU', 'Baroque', 'George Frideric Handel', 'Messiah - Hallelujah Chorus', 1741),
('Schubert Unfinished Symphony full', 'yHKl2Rr6s_w', 'Romantic', 'Franz Schubert', 'Unfinished Symphony', 1822),
('Mahler Symphony No 5 full', 'vOvXhyldUko', 'Modern', 'Gustav Mahler', 'Symphony No. 5', 1902),
('Pachelbel Canon in D full', 'NlprozGcs80', 'Baroque', 'Johann Pachelbel', 'Canon in D', 1680),
('Grieg Peer Gynt Suite full', 'kLp_Hh6DKWc', 'Romantic', 'Edvard Grieg', 'Peer Gynt Suite', 1875);
```

### 4. Authentication Setup
For the admin panel, you'll need to:
1. **Create Admin User:**
   - Go to Supabase Dashboard → Authentication → Users
   - Click "Add User"
   - Email: `admin@admin.com`
   - Password: `admin`
   - Click "Add User"

2. **Disable Email Confirmation (for testing):**
   - Go to Authentication → Settings
   - Turn off "Enable email confirmations"

3. **Login Credentials:**
   - Email: `admin@admin.com`
   - Password: `admin`

Once you complete these steps, the application will work properly!