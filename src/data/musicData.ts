export interface Symphony {
  name: string;
  year: number;
  searchTerm: string;
}

export interface Composer {
  name: string;
  birthYear: number;
  deathYear: number;
  symphonies: Symphony[];
}

export interface Genre {
  name: string;
  period: string;
  composers: Composer[];
}

export const musicData: Genre[] = [
  {
    name: "Baroque",
    period: "1600-1750",
    composers: [
      {
        name: "Johann Sebastian Bach",
        birthYear: 1685,
        deathYear: 1750,
        symphonies: [
          { name: "Brandenburg Concerto No. 3", year: 1721, searchTerm: "Bach Brandenburg Concerto No 3 full" },
          { name: "Mass in B Minor", year: 1749, searchTerm: "Bach Mass in B Minor full" },
          { name: "The Well-Tempered Clavier", year: 1722, searchTerm: "Bach Well Tempered Clavier Book 1 full" },
          { name: "Goldberg Variations", year: 1741, searchTerm: "Bach Goldberg Variations full" }
        ]
      },
      {
        name: "Antonio Vivaldi",
        birthYear: 1678,
        deathYear: 1741,
        symphonies: [
          { name: "The Four Seasons", year: 1725, searchTerm: "Vivaldi Four Seasons full" },
          { name: "Gloria in D Major", year: 1715, searchTerm: "Vivaldi Gloria in D Major full" },
          { name: "Concerto for Two Violins", year: 1709, searchTerm: "Vivaldi Concerto for Two Violins full" },
          { name: "L'estro Armonico", year: 1711, searchTerm: "Vivaldi L'estro Armonico full" }
        ]
      },
      {
        name: "George Frideric Handel",
        birthYear: 1685,
        deathYear: 1759,
        symphonies: [
          { name: "Messiah", year: 1741, searchTerm: "Handel Messiah full oratorio" },
          { name: "Water Music", year: 1717, searchTerm: "Handel Water Music full" },
          { name: "Music for the Royal Fireworks", year: 1749, searchTerm: "Handel Music for Royal Fireworks full" },
          { name: "Zadok the Priest", year: 1727, searchTerm: "Handel Zadok the Priest full" }
        ]
      }
    ]
  },
  {
    name: "Classical",
    period: "1750-1820",
    composers: [
      {
        name: "Wolfgang Amadeus Mozart",
        birthYear: 1756,
        deathYear: 1791,
        symphonies: [
          { name: "Symphony No. 40", year: 1788, searchTerm: "Mozart Symphony No 40 full" },
          { name: "Symphony No. 41 Jupiter", year: 1788, searchTerm: "Mozart Symphony No 41 Jupiter full" },
          { name: "Requiem", year: 1791, searchTerm: "Mozart Requiem full" },
          { name: "Piano Concerto No. 21", year: 1785, searchTerm: "Mozart Piano Concerto No 21 full" },
          { name: "Eine kleine Nachtmusik", year: 1787, searchTerm: "Mozart Eine kleine Nachtmusik full" }
        ]
      },
      {
        name: "Ludwig van Beethoven",
        birthYear: 1770,
        deathYear: 1827,
        symphonies: [
          { name: "Symphony No. 3 Eroica", year: 1803, searchTerm: "Beethoven Symphony No 3 Eroica full" },
          { name: "Symphony No. 5", year: 1808, searchTerm: "Beethoven Symphony No 5 full" },
          { name: "Symphony No. 6 Pastoral", year: 1808, searchTerm: "Beethoven Symphony No 6 Pastoral full" },
          { name: "Symphony No. 7", year: 1812, searchTerm: "Beethoven Symphony No 7 full" },
          { name: "Symphony No. 8", year: 1812, searchTerm: "Beethoven Symphony No 8 full" },
          { name: "Symphony No. 9 Choral", year: 1824, searchTerm: "Beethoven Symphony No 9 Choral full" },
          { name: "Piano Sonata No. 14 Moonlight", year: 1801, searchTerm: "Beethoven Moonlight Sonata full" }
        ]
      },
      {
        name: "Franz Joseph Haydn",
        birthYear: 1732,
        deathYear: 1809,
        symphonies: [
          { name: "Symphony No. 94 Surprise", year: 1791, searchTerm: "Haydn Symphony No 94 Surprise full" },
          { name: "Symphony No. 104 London", year: 1795, searchTerm: "Haydn Symphony No 104 London full" },
          { name: "The Creation", year: 1798, searchTerm: "Haydn The Creation full oratorio" },
          { name: "Symphony No. 45 Farewell", year: 1772, searchTerm: "Haydn Symphony No 45 Farewell full" }
        ]
      },
      {
        name: "Franz Schubert",
        birthYear: 1797,
        deathYear: 1828,
        symphonies: [
          { name: "Symphony No. 5", year: 1816, searchTerm: "Schubert Symphony No 5 full" },
          { name: "Symphony No. 8 Unfinished", year: 1822, searchTerm: "Schubert Symphony No 8 Unfinished full" },
          { name: "Symphony No. 9 The Great", year: 1825, searchTerm: "Schubert Symphony No 9 The Great full" }
        ]
      }
    ]
  },
  {
    name: "Romantic",
    period: "1820-1900",
    composers: [
      {
        name: "Frédéric Chopin",
        birthYear: 1810,
        deathYear: 1849,
        symphonies: [
          { name: "Piano Concerto No. 1", year: 1830, searchTerm: "Chopin Piano Concerto No 1 full" },
          { name: "Ballade No. 1", year: 1835, searchTerm: "Chopin Ballade No 1 full" },
          { name: "Nocturne in E-flat Major", year: 1832, searchTerm: "Chopin Nocturne E flat major Op 9 No 2" },
          { name: "Étude Op. 10 No. 12 Revolutionary", year: 1831, searchTerm: "Chopin Etude Op 10 No 12 Revolutionary" }
        ]
      },
      {
        name: "Johannes Brahms",
        birthYear: 1833,
        deathYear: 1897,
        symphonies: [
          { name: "Symphony No. 1", year: 1876, searchTerm: "Brahms Symphony No 1 full" },
          { name: "Symphony No. 3", year: 1883, searchTerm: "Brahms Symphony No 3 full" },
          { name: "Symphony No. 4", year: 1885, searchTerm: "Brahms Symphony No 4 full" },
          { name: "Piano Concerto No. 2", year: 1881, searchTerm: "Brahms Piano Concerto No 2 full" },
          { name: "Violin Concerto", year: 1878, searchTerm: "Brahms Violin Concerto full" }
        ]
      },
      {
        name: "Pyotr Ilyich Tchaikovsky",
        birthYear: 1840,
        deathYear: 1893,
        symphonies: [
          { name: "Symphony No. 4", year: 1878, searchTerm: "Tchaikovsky Symphony No 4 full" },
          { name: "Symphony No. 6 Pathétique", year: 1893, searchTerm: "Tchaikovsky Symphony No 6 Pathetique full" },
          { name: "1812 Overture", year: 1880, searchTerm: "Tchaikovsky 1812 Overture full" },
          { name: "Swan Lake", year: 1876, searchTerm: "Tchaikovsky Swan Lake full ballet" },
          { name: "The Nutcracker", year: 1892, searchTerm: "Tchaikovsky Nutcracker full ballet" },
          { name: "Piano Concerto No. 1", year: 1875, searchTerm: "Tchaikovsky Piano Concerto No 1 full" }
        ]
      },
      {
        name: "Franz Liszt",
        birthYear: 1811,
        deathYear: 1886,
        symphonies: [
          { name: "Hungarian Rhapsody No. 2", year: 1847, searchTerm: "Liszt Hungarian Rhapsody No 2 full" },
          { name: "Liebestraum No. 3", year: 1850, searchTerm: "Liszt Liebestraum No 3 full" },
          { name: "Piano Concerto No. 1", year: 1855, searchTerm: "Liszt Piano Concerto No 1 full" },
          { name: "Les Préludes", year: 1854, searchTerm: "Liszt Les Preludes full" }
        ]
      },
      {
        name: "Antonín Dvořák",
        birthYear: 1841,
        deathYear: 1904,
        symphonies: [
          { name: "Symphony No. 8", year: 1889, searchTerm: "Dvorak Symphony No 8 full" },
          { name: "Symphony No. 9 New World", year: 1893, searchTerm: "Dvorak Symphony No 9 New World full" }
        ]
      },
      {
        name: "Hector Berlioz",
        birthYear: 1803,
        deathYear: 1869,
        symphonies: [
          { name: "Symphonie Fantastique", year: 1830, searchTerm: "Berlioz Symphonie Fantastique full" }
        ]
      },
      {
        name: "Anton Bruckner",
        birthYear: 1824,
        deathYear: 1896,
        symphonies: [
          { name: "Symphony No. 4 Romantic", year: 1874, searchTerm: "Bruckner Symphony No 4 Romantic full" },
          { name: "Symphony No. 7", year: 1883, searchTerm: "Bruckner Symphony No 7 full" },
          { name: "Symphony No. 8", year: 1887, searchTerm: "Bruckner Symphony No 8 full" }
        ]
      },
      {
        name: "Felix Mendelssohn",
        birthYear: 1809,
        deathYear: 1847,
        symphonies: [
          { name: "Symphony No. 2 Lobgesang", year: 1840, searchTerm: "Mendelssohn Symphony No 2 Lobgesang full" },
          { name: "Symphony No. 3 Scottish", year: 1842, searchTerm: "Mendelssohn Symphony No 3 Scottish full" },
          { name: "Symphony No. 4 Italian", year: 1833, searchTerm: "Mendelssohn Symphony No 4 Italian full" }
        ]
      },
      {
        name: "Camille Saint-Saëns",
        birthYear: 1835,
        deathYear: 1921,
        symphonies: [
          { name: "Symphony No. 3 Organ", year: 1886, searchTerm: "Saint-Saens Symphony No 3 Organ full" }
        ]
      },
      {
        name: "César Franck",
        birthYear: 1822,
        deathYear: 1890,
        symphonies: [
          { name: "Symphony in D Minor", year: 1888, searchTerm: "Cesar Franck Symphony D Minor full" }
        ]
      },
      {
        name: "Sergei Rachmaninoff",
        birthYear: 1873,
        deathYear: 1943,
        symphonies: [
          { name: "Symphony No. 2", year: 1907, searchTerm: "Rachmaninoff Symphony No 2 full" }
        ]
      }
    ]
  },
  {
    name: "Modern",
    period: "1900-1950",
    composers: [
      {
        name: "Igor Stravinsky",
        birthYear: 1882,
        deathYear: 1971,
        symphonies: [
          { name: "The Rite of Spring", year: 1913, searchTerm: "Stravinsky Rite of Spring full ballet" },
          { name: "The Firebird", year: 1910, searchTerm: "Stravinsky Firebird full ballet" },
          { name: "Petrushka", year: 1911, searchTerm: "Stravinsky Petrushka full ballet" },
          { name: "Symphony of Psalms", year: 1930, searchTerm: "Stravinsky Symphony of Psalms full" }
        ]
      },
      {
        name: "Claude Debussy",
        birthYear: 1862,
        deathYear: 1918,
        symphonies: [
          { name: "Clair de Lune", year: 1905, searchTerm: "Debussy Clair de Lune full" },
          { name: "La Mer", year: 1905, searchTerm: "Debussy La Mer full" },
          { name: "Prelude to the Afternoon of a Faun", year: 1894, searchTerm: "Debussy Prelude Afternoon Faun full" },
          { name: "Images", year: 1907, searchTerm: "Debussy Images full" }
        ]
      },
      {
        name: "Maurice Ravel",
        birthYear: 1875,
        deathYear: 1937,
        symphonies: [
          { name: "Boléro", year: 1928, searchTerm: "Ravel Bolero full" },
          { name: "Daphnis et Chloé", year: 1912, searchTerm: "Ravel Daphnis et Chloe full" },
          { name: "Piano Concerto in G Major", year: 1931, searchTerm: "Ravel Piano Concerto G Major full" },
          { name: "Pavane for a Dead Princess", year: 1899, searchTerm: "Ravel Pavane for a Dead Princess full" }
        ]
      },
      {
        name: "Gustav Mahler",
        birthYear: 1860,
        deathYear: 1911,
        symphonies: [
          { name: "Symphony No. 1", year: 1888, searchTerm: "Mahler Symphony No 1 full" },
          { name: "Symphony No. 2 Resurrection", year: 1894, searchTerm: "Mahler Symphony No 2 Resurrection full" },
          { name: "Symphony No. 3", year: 1896, searchTerm: "Mahler Symphony No 3 full" },
          { name: "Symphony No. 4", year: 1900, searchTerm: "Mahler Symphony No 4 full" },
          { name: "Symphony No. 5", year: 1902, searchTerm: "Mahler Symphony No 5 full" },
          { name: "Symphony No. 6", year: 1904, searchTerm: "Mahler Symphony No 6 full" },
          { name: "Symphony No. 7", year: 1905, searchTerm: "Mahler Symphony No 7 full" },
          { name: "Symphony No. 8", year: 1907, searchTerm: "Mahler Symphony No 8 full" },
          { name: "Symphony No. 9", year: 1909, searchTerm: "Mahler Symphony No 9 full" },
          { name: "Symphony No. 10", year: 1910, searchTerm: "Mahler Symphony No 10 full" }
        ]
      },
      {
        name: "Dmitri Shostakovich",
        birthYear: 1906,
        deathYear: 1975,
        symphonies: [
          { name: "Symphony No. 5", year: 1937, searchTerm: "Shostakovich Symphony No 5 full" },
          { name: "Symphony No. 7 Leningrad", year: 1941, searchTerm: "Shostakovich Symphony No 7 Leningrad full" }
        ]
      },
      {
        name: "Sergei Prokofiev",
        birthYear: 1891,
        deathYear: 1953,
        symphonies: [
          { name: "Symphony No. 1 Classical", year: 1917, searchTerm: "Prokofiev Symphony No 1 Classical full" }
        ]
      },
      {
        name: "Jean Sibelius",
        birthYear: 1865,
        deathYear: 1957,
        symphonies: [
          { name: "Symphony No. 3", year: 1907, searchTerm: "Sibelius Symphony No 3 full" },
          { name: "Symphony No. 7", year: 1924, searchTerm: "Sibelius Symphony No 7 full" }
        ]
      },
      {
        name: "Edward Elgar",
        birthYear: 1857,
        deathYear: 1934,
        symphonies: [
          { name: "Symphony No. 1", year: 1908, searchTerm: "Elgar Symphony No 1 full" }
        ]
      },
      {
        name: "Richard Strauss",
        birthYear: 1864,
        deathYear: 1949,
        symphonies: [
          { name: "An Alpine Symphony", year: 1915, searchTerm: "Richard Strauss Alpine Symphony full" }
        ]
      },
      {
        name: "Georges Bizet",
        birthYear: 1838,
        deathYear: 1875,
        symphonies: [
          { name: "Symphony No. 1", year: 1855, searchTerm: "Bizet Symphony No 1 full" }
        ]
      },
      {
        name: "Ralph Vaughan Williams",
        birthYear: 1872,
        deathYear: 1958,
        symphonies: [
          { name: "Symphony No. 5", year: 1943, searchTerm: "Vaughan Williams Symphony No 5 full" },
          { name: "Symphony No. 9", year: 1958, searchTerm: "Vaughan Williams Symphony No 9 full" }
        ]
      },
      {
        name: "Henryk Górecki",
        birthYear: 1933,
        deathYear: 2010,
        symphonies: [
          { name: "Symphony No. 1", year: 1959, searchTerm: "Gorecki Symphony No 1 full" },
          { name: "Symphony No. 3 Sorrowful Songs", year: 1976, searchTerm: "Gorecki Symphony No 3 Sorrowful Songs full" }
        ]
      },
      {
        name: "Erich Wolfgang Korngold",
        birthYear: 1897,
        deathYear: 1957,
        symphonies: [
          { name: "Symphony in F-sharp major", year: 1953, searchTerm: "Korngold Symphony F-sharp major full" }
        ]
      }
    ]
  },
  {
    name: "Contemporary",
    period: "1950-Present",
    composers: [
      {
        name: "Aaron Copland",
        birthYear: 1900,
        deathYear: 1990,
        symphonies: [
          { name: "Appalachian Spring", year: 1944, searchTerm: "Copland Appalachian Spring full" },
          { name: "Fanfare for the Common Man", year: 1942, searchTerm: "Copland Fanfare for the Common Man full" },
          { name: "Rodeo", year: 1942, searchTerm: "Copland Rodeo full ballet" },
          { name: "Symphony No. 3", year: 1946, searchTerm: "Copland Symphony No 3 full" }
        ]
      },
      {
        name: "Leonard Bernstein",
        birthYear: 1918,
        deathYear: 1990,
        symphonies: [
          { name: "West Side Story", year: 1957, searchTerm: "Bernstein West Side Story full" },
          { name: "Candide Overture", year: 1956, searchTerm: "Bernstein Candide Overture full" },
          { name: "Symphony No. 2 The Age of Anxiety", year: 1949, searchTerm: "Bernstein Symphony No 2 Age of Anxiety full" },
          { name: "Chichester Psalms", year: 1965, searchTerm: "Bernstein Chichester Psalms full" }
        ]
      },
      {
        name: "Philip Glass",
        birthYear: 1937,
        deathYear: 2024,
        symphonies: [
          { name: "Einstein on the Beach", year: 1976, searchTerm: "Philip Glass Einstein on the Beach full" },
          { name: "Metamorphosis", year: 1988, searchTerm: "Philip Glass Metamorphosis full" },
          { name: "Glassworks", year: 1982, searchTerm: "Philip Glass Glassworks full" },
          { name: "Violin Concerto", year: 1987, searchTerm: "Philip Glass Violin Concerto full" }
        ]
      }
    ]
  }
];