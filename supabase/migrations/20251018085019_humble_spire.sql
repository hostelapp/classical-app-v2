/*
  # Create videos table for YouTube mappings

  1. New Tables
    - `videos`
      - `id` (uuid, primary key)
      - `search_term` (text, unique) - The search term used to identify the video
      - `youtube_id` (text) - The YouTube video ID
      - `genre` (text) - Musical genre (Baroque, Classical, Romantic, etc.)
      - `composer` (text) - Composer name
      - `symphony` (text) - Symphony/piece name
      - `year` (integer) - Year composed
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `videos` table
    - Add policy for public read access (for the main app)
    - Add policy for authenticated users to manage videos (for admin)
*/

CREATE TABLE IF NOT EXISTS videos (
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

ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Allow public read access for the main app
CREATE POLICY "Public can read videos"
  ON videos
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to manage videos (for admin CMS)
CREATE POLICY "Authenticated users can manage videos"
  ON videos
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create an index on search_term for faster lookups
CREATE INDEX IF NOT EXISTS idx_videos_search_term ON videos(search_term);

-- Create an index on genre for filtering
CREATE INDEX IF NOT EXISTS idx_videos_genre ON videos(genre);

-- Insert existing video mappings
INSERT INTO videos (search_term, youtube_id, genre, composer, symphony, year) VALUES
-- Bach
('Bach Brandenburg Concerto No 3 full', 'pdsyNwUoON0', 'Baroque', 'Johann Sebastian Bach', 'Brandenburg Concerto No. 3', 1721),
('Bach Mass in B Minor full', 'QLj_gMBqHX8', 'Baroque', 'Johann Sebastian Bach', 'Mass in B Minor', 1749),
('Bach Well Tempered Clavier Book 1 full', 'LMTK6j4VZvg', 'Baroque', 'Johann Sebastian Bach', 'The Well-Tempered Clavier', 1722),
('Bach Goldberg Variations full', 'Ah392lnFHxM', 'Baroque', 'Johann Sebastian Bach', 'Goldberg Variations', 1741),

-- Vivaldi
('Vivaldi Four Seasons full', 'GRxofEmo3HA', 'Baroque', 'Antonio Vivaldi', 'The Four Seasons', 1725),
('Vivaldi Gloria in D Major full', 'FBwTUuKjebE', 'Baroque', 'Antonio Vivaldi', 'Gloria in D Major', 1715),
('Vivaldi Concerto for Two Violins full', 'BXRjmgVnWBE', 'Baroque', 'Antonio Vivaldi', 'Concerto for Two Violins', 1709),
('Vivaldi L''estro Armonico full', 'vQVeaIHWWck', 'Baroque', 'Antonio Vivaldi', 'L''estro Armonico', 1711),

-- Handel
('Handel Messiah full oratorio', 'FXNvpEhuLdY', 'Baroque', 'George Frideric Handel', 'Messiah', 1741),
('Handel Water Music full', 'NlT8yeEYbMs', 'Baroque', 'George Frideric Handel', 'Water Music', 1717),
('Handel Music for Royal Fireworks full', 'MKBDUaJjH9Y', 'Baroque', 'George Frideric Handel', 'Music for the Royal Fireworks', 1749),
('Handel Zadok the Priest full', 'qGKkE9xPM9o', 'Baroque', 'George Frideric Handel', 'Zadok the Priest', 1727),

-- Mozart
('Mozart Symphony No 40 full', 'JTc1mDieQI8', 'Classical', 'Wolfgang Amadeus Mozart', 'Symphony No. 40', 1788),
('Mozart Symphony No 41 Jupiter full', 'bnK3kh8ZEgA', 'Classical', 'Wolfgang Amadeus Mozart', 'Symphony No. 41 Jupiter', 1788),
('Mozart Requiem full', 'Dp2SJN4UiE4', 'Classical', 'Wolfgang Amadeus Mozart', 'Requiem', 1791),
('Mozart Piano Concerto No 21 full', 'df-eLzao63E', 'Classical', 'Wolfgang Amadeus Mozart', 'Piano Concerto No. 21', 1785),
('Mozart Eine kleine Nachtmusik full', 'hHjsuEssALc', 'Classical', 'Wolfgang Amadeus Mozart', 'Eine kleine Nachtmusik', 1787),

-- Beethoven
('Beethoven Symphony No 3 Eroica full', 'nbGV-MVfgec', 'Classical', 'Ludwig van Beethoven', 'Symphony No. 3 Eroica', 1803),
('Beethoven Symphony No 5 full', 'jv2WJMVPQi8', 'Classical', 'Ludwig van Beethoven', 'Symphony No. 5', 1808),
('Beethoven Symphony No 6 Pastoral full', 'aW-7CqxhnAQ', 'Classical', 'Ludwig van Beethoven', 'Symphony No. 6 Pastoral', 1808),
('Beethoven Symphony No 7 full', '-4788Tmz9Zo', 'Classical', 'Ludwig van Beethoven', 'Symphony No. 7', 1812),
('Beethoven Symphony No 8 full', 'GQ7-hbEWdw8', 'Classical', 'Ludwig van Beethoven', 'Symphony No. 8', 1812),
('Beethoven Symphony No 9 Choral full', 'rOjHhS5MtvA', 'Classical', 'Ludwig van Beethoven', 'Symphony No. 9 Choral', 1824),
('Beethoven Moonlight Sonata full', 'gIxdVzCqRdI', 'Classical', 'Ludwig van Beethoven', 'Piano Sonata No. 14 Moonlight', 1801),

-- Haydn
('Haydn Symphony No 94 Surprise full', 'apcXKjzrar0', 'Classical', 'Franz Joseph Haydn', 'Symphony No. 94 Surprise', 1791),
('Haydn Symphony No 104 London full', 'xDgNlJfLjhY', 'Classical', 'Franz Joseph Haydn', 'Symphony No. 104 London', 1795),
('Haydn The Creation full oratorio', 'MsKtl4OAw8E', 'Classical', 'Franz Joseph Haydn', 'The Creation', 1798),
('Haydn Symphony No 45 Farewell full', 'bYyK922PsUw', 'Classical', 'Franz Joseph Haydn', 'Symphony No. 45 Farewell', 1772),

-- Schubert
('Schubert Symphony No 5 full', 'QkRpiwjgymU', 'Classical', 'Franz Schubert', 'Symphony No. 5', 1816),
('Schubert Symphony No 8 Unfinished full', 'uWnKMzAedK4', 'Classical', 'Franz Schubert', 'Symphony No. 8 Unfinished', 1822),
('Schubert Symphony No 9 The Great full', 'Vi85_BDRFXo', 'Classical', 'Franz Schubert', 'Symphony No. 9 The Great', 1825),

-- Chopin
('Chopin Piano Concerto No 1 full', 'UfCu8oKLIwc', 'Romantic', 'Frédéric Chopin', 'Piano Concerto No. 1', 1830),
('Chopin Ballade No 1 full', 'RR7eKSt8NlM', 'Romantic', 'Frédéric Chopin', 'Ballade No. 1', 1835),
('Chopin Nocturne E flat major Op 9 No 2', 'O6txOvK-mAk', 'Romantic', 'Frédéric Chopin', 'Nocturne in E-flat Major', 1832),
('Chopin Etude Op 10 No 12 Revolutionary', 'dSBYsE7_pOg', 'Romantic', 'Frédéric Chopin', 'Étude Op. 10 No. 12 Revolutionary', 1831),

-- Brahms
('Brahms Symphony No 1 full', 'yNbsWMLa1cs', 'Romantic', 'Johannes Brahms', 'Symphony No. 1', 1876),
('Brahms Symphony No 3 full', '4L0MqnAoEJM', 'Romantic', 'Johannes Brahms', 'Symphony No. 3', 1883),
('Brahms Symphony No 4 full', 'ckuUq7im8H4', 'Romantic', 'Johannes Brahms', 'Symphony No. 4', 1885),
('Brahms Piano Concerto No 2 full', 'JY4XmGKdOEU', 'Romantic', 'Johannes Brahms', 'Piano Concerto No. 2', 1881),
('Brahms Violin Concerto full', 'kTUKsrQ4m3A', 'Romantic', 'Johannes Brahms', 'Violin Concerto', 1878),

-- Tchaikovsky
('Tchaikovsky Symphony No 4 full', 'cnXd4ZqN_c8', 'Romantic', 'Pyotr Ilyich Tchaikovsky', 'Symphony No. 4', 1878),
('Tchaikovsky Symphony No 6 Pathetique full', 'SVnF3x44rvU', 'Romantic', 'Pyotr Ilyich Tchaikovsky', 'Symphony No. 6 Pathétique', 1893),
('Tchaikovsky 1812 Overture full', 'VbxgYlcNxE8', 'Romantic', 'Pyotr Ilyich Tchaikovsky', '1812 Overture', 1880),
('Tchaikovsky Swan Lake full ballet', 'JzMvGVqkUgw', 'Romantic', 'Pyotr Ilyich Tchaikovsky', 'Swan Lake', 1876),
('Tchaikovsky Nutcracker full ballet', 'YR5USHu6D6U', 'Romantic', 'Pyotr Ilyich Tchaikovsky', 'The Nutcracker', 1892),
('Tchaikovsky Piano Concerto No 1 full', 'BWerj8FcprM', 'Romantic', 'Pyotr Ilyich Tchaikovsky', 'Piano Concerto No. 1', 1875),

-- Continue with remaining composers...
('Liszt Hungarian Rhapsody No 2 full', 'LdH1hSWGFGU', 'Romantic', 'Franz Liszt', 'Hungarian Rhapsody No. 2', 1847),
('Liszt Liebestraum No 3 full', 'KpOtuoHL45Y', 'Romantic', 'Franz Liszt', 'Liebestraum No. 3', 1850),
('Liszt Piano Concerto No 1 full', 'hQ5mBMwAe6o', 'Romantic', 'Franz Liszt', 'Piano Concerto No. 1', 1855),
('Liszt Les Preludes full', 'otaGB4SjJYQ', 'Romantic', 'Franz Liszt', 'Les Préludes', 1854),

('Dvorak Symphony No 8 full', 'QXAv-NGppFw', 'Romantic', 'Antonín Dvořák', 'Symphony No. 8', 1889),
('Dvorak Symphony No 9 New World full', '_9RT2nHD6CQ', 'Romantic', 'Antonín Dvořák', 'Symphony No. 9 New World', 1893),

('Berlioz Symphonie Fantastique full', '5HgqPpjIH5c', 'Romantic', 'Hector Berlioz', 'Symphonie Fantastique', 1830),

('Bruckner Symphony No 4 Romantic full', 'gcBg-tXn0fs', 'Romantic', 'Anton Bruckner', 'Symphony No. 4 Romantic', 1874),
('Bruckner Symphony No 7 full', 'x_IbwlSXHpQ', 'Romantic', 'Anton Bruckner', 'Symphony No. 7', 1883),
('Bruckner Symphony No 8 full', 'elVHvTrEM34', 'Romantic', 'Anton Bruckner', 'Symphony No. 8', 1887),

('Mendelssohn Symphony No 2 Lobgesang full', 'lvlZsFVTwAA', 'Romantic', 'Felix Mendelssohn', 'Symphony No. 2 Lobgesang', 1840),
('Mendelssohn Symphony No 3 Scottish full', 'FbH95mO_o3A', 'Romantic', 'Felix Mendelssohn', 'Symphony No. 3 Scottish', 1842),
('Mendelssohn Symphony No 4 Italian full', '_HX_jF1_Tgc', 'Romantic', 'Felix Mendelssohn', 'Symphony No. 4 Italian', 1833),

('Saint-Saens Symphony No 3 Organ full', 'ZWCZq33BrOo', 'Romantic', 'Camille Saint-Saëns', 'Symphony No. 3 Organ', 1886),
('Cesar Franck Symphony D Minor full', '0nF6TobCyV4', 'Romantic', 'César Franck', 'Symphony in D Minor', 1888),
('Rachmaninoff Symphony No 2 full', 'SvuitFzDxDg', 'Romantic', 'Sergei Rachmaninoff', 'Symphony No. 2', 1907),

-- Modern era
('Stravinsky Rite of Spring full ballet', 'rq1q6u3mLSM', 'Modern', 'Igor Stravinsky', 'The Rite of Spring', 1913),
('Stravinsky Firebird full ballet', 'a3FZSRMrjYM', 'Modern', 'Igor Stravinsky', 'The Firebird', 1910),
('Stravinsky Petrushka full ballet', 'dHvSQEFXgmw', 'Modern', 'Igor Stravinsky', 'Petrushka', 1911),
('Stravinsky Symphony of Psalms full', 'LmDBX5hzWDQ', 'Modern', 'Igor Stravinsky', 'Symphony of Psalms', 1930),

('Debussy Clair de Lune full', 'ZWErfrSbD7A', 'Modern', 'Claude Debussy', 'Clair de Lune', 1905),
('Debussy La Mer full', 'CGKnGlVmSKk', 'Modern', 'Claude Debussy', 'La Mer', 1905),
('Debussy Prelude Afternoon Faun full', 'dLKjnXxJRls', 'Modern', 'Claude Debussy', 'Prelude to the Afternoon of a Faun', 1894),
('Debussy Images full', 'RjK3gPdgGNc', 'Modern', 'Claude Debussy', 'Images', 1907),

('Ravel Bolero full', 'dZDiaRZy0Ak', 'Modern', 'Maurice Ravel', 'Boléro', 1928),
('Ravel Daphnis et Chloe full', 'YHrstmOPKBQ', 'Modern', 'Maurice Ravel', 'Daphnis et Chloé', 1912),
('Ravel Piano Concerto G Major full', 'eVNr3lhyE4E', 'Modern', 'Maurice Ravel', 'Piano Concerto in G Major', 1931),
('Ravel Pavane for a Dead Princess full', 'pFLmVwxhReQ', 'Modern', 'Maurice Ravel', 'Pavane for a Dead Princess', 1899),

-- Mahler
('Mahler Symphony No 1 full', '4XbHLFkg_Mw', 'Modern', 'Gustav Mahler', 'Symphony No. 1', 1888),
('Mahler Symphony No 2 Resurrection full', '4MPuoOj5TIw', 'Modern', 'Gustav Mahler', 'Symphony No. 2 Resurrection', 1894),
('Mahler Symphony No 3 full', '9Yr720ftjaA', 'Modern', 'Gustav Mahler', 'Symphony No. 3', 1896),
('Mahler Symphony No 4 full', 'YnfhInZLmUQ', 'Modern', 'Gustav Mahler', 'Symphony No. 4', 1900),
('Mahler Symphony No 5 full', 'KSqC1zKL02o', 'Modern', 'Gustav Mahler', 'Symphony No. 5', 1902),
('Mahler Symphony No 6 full', 'YsEo1PsSmbg', 'Modern', 'Gustav Mahler', 'Symphony No. 6', 1904),
('Mahler Symphony No 7 full', 'avfWiKkVcmg', 'Modern', 'Gustav Mahler', 'Symphony No. 7', 1905),
('Mahler Symphony No 8 full', 'PqnfuF3h-B8', 'Modern', 'Gustav Mahler', 'Symphony No. 8', 1907),
('Mahler Symphony No 9 full', 'jKK9N0BPqdo', 'Modern', 'Gustav Mahler', 'Symphony No. 9', 1909),
('Mahler Symphony No 10 full', 'SJGbP_XKSlM', 'Modern', 'Gustav Mahler', 'Symphony No. 10', 1910),

('Shostakovich Symphony No 5 full', 'cg0M4LzEITQ', 'Modern', 'Dmitri Shostakovich', 'Symphony No. 5', 1937),
('Shostakovich Symphony No 7 Leningrad full', 'GB3zR_X25UU', 'Modern', 'Dmitri Shostakovich', 'Symphony No. 7 Leningrad', 1941),
('Prokofiev Symphony No 1 Classical full', '5W18N6GipdE', 'Modern', 'Sergei Prokofiev', 'Symphony No. 1 Classical', 1917),
('Sibelius Symphony No 3 full', 'wg5-lNMgq6c', 'Modern', 'Jean Sibelius', 'Symphony No. 3', 1907),
('Sibelius Symphony No 7 full', 'XHHfvdAqvn8', 'Modern', 'Jean Sibelius', 'Symphony No. 7', 1924),
('Elgar Symphony No 1 full', 'sCuSuwDXxUA', 'Modern', 'Edward Elgar', 'Symphony No. 1', 1908),
('Richard Strauss Alpine Symphony full', 'eQa9mW8ygAE', 'Modern', 'Richard Strauss', 'An Alpine Symphony', 1915),
('Bizet Symphony No 1 full', 'STvVanu1fQU', 'Modern', 'Georges Bizet', 'Symphony No. 1', 1855),
('Vaughan Williams Symphony No 5 full', 'LsQGFlcqUmA', 'Modern', 'Ralph Vaughan Williams', 'Symphony No. 5', 1943),
('Vaughan Williams Symphony No 9 full', 'g0OnqctJ9A8', 'Modern', 'Ralph Vaughan Williams', 'Symphony No. 9', 1958),
('Gorecki Symphony No 1 full', 'f5OpY2vf1yQ', 'Modern', 'Henryk Górecki', 'Symphony No. 1', 1959),
('Gorecki Symphony No 3 Sorrowful Songs full', 'xJBFYUR84OY', 'Modern', 'Henryk Górecki', 'Symphony No. 3 Sorrowful Songs', 1976),
('Korngold Symphony F-sharp major full', 'JEgrnh0yjaw', 'Modern', 'Erich Wolfgang Korngold', 'Symphony in F-sharp major', 1953),

-- Contemporary
('Copland Appalachian Spring full', 'kgvSL4_RjQg', 'Contemporary', 'Aaron Copland', 'Appalachian Spring', 1944),
('Copland Fanfare for the Common Man full', 'HMqJJoQNYvw', 'Contemporary', 'Aaron Copland', 'Fanfare for the Common Man', 1942),
('Copland Rodeo full ballet', 'JQIoXlUVPKA', 'Contemporary', 'Aaron Copland', 'Rodeo', 1942),
('Copland Symphony No 3 full', 'rW2QlGhiJIg', 'Contemporary', 'Aaron Copland', 'Symphony No. 3', 1946),
('Bernstein West Side Story full', 'bxoC5Oyf_ss', 'Contemporary', 'Leonard Bernstein', 'West Side Story', 1957),
('Bernstein Candide Overture full', '5OLgNdBHNwE', 'Contemporary', 'Leonard Bernstein', 'Candide Overture', 1956),
('Bernstein Symphony No 2 Age of Anxiety full', 'BXBT9PSOA3c', 'Contemporary', 'Leonard Bernstein', 'Symphony No. 2 The Age of Anxiety', 1949),
('Bernstein Chichester Psalms full', 'HMsKBfOBPMs', 'Contemporary', 'Leonard Bernstein', 'Chichester Psalms', 1965),
('Philip Glass Einstein on the Beach full', 'pLFZ8w2hOmE', 'Contemporary', 'Philip Glass', 'Einstein on the Beach', 1976),
('Philip Glass Metamorphosis full', 'il4nDQo_Wm8', 'Contemporary', 'Philip Glass', 'Metamorphosis', 1988),
('Philip Glass Glassworks full', 'bWhGjZJVCsQ', 'Contemporary', 'Philip Glass', 'Glassworks', 1982),
('Philip Glass Violin Concerto full', 'BHoYWdxzMcI', 'Contemporary', 'Philip Glass', 'Violin Concerto', 1987);