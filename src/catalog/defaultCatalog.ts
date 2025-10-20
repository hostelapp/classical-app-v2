import type { CatalogDocument } from './types';

export const defaultCatalog: CatalogDocument = {
  "schemaVersion": 1,
  "generatedAt": "2024-01-01T00:00:00.000Z",
  "genres": [
    {
      "id": "baroque-1600-1750",
      "name": "Baroque",
      "period": "1600-1750",
      "composers": [
        {
          "id": "johann-sebastian-bach",
          "name": "Johann Sebastian Bach",
          "birthYear": 1685,
          "deathYear": 1750,
          "works": [
            {
              "id": "johann-sebastian-bach-brandenburg-concerto-no-3",
              "title": "Brandenburg Concerto No. 3",
              "year": 1721,
              "youtubeId": "pdsyNwUoON0",
              "searchTerm": "Bach Brandenburg Concerto No 3 full"
            },
            {
              "id": "johann-sebastian-bach-mass-in-b-minor",
              "title": "Mass in B Minor",
              "year": 1749,
              "youtubeId": "VbF7JZIQfZ8",
              "searchTerm": "Bach Mass in B Minor full"
            },
            {
              "id": "johann-sebastian-bach-the-well-tempered-clavier",
              "title": "The Well-Tempered Clavier",
              "year": 1722,
              "youtubeId": null,
              "searchTerm": "Bach Well Tempered Clavier Book 1 full"
            },
            {
              "id": "johann-sebastian-bach-goldberg-variations",
              "title": "Goldberg Variations",
              "year": 1741,
              "youtubeId": null,
              "searchTerm": "Bach Goldberg Variations full"
            }
          ]
        },
        {
          "id": "antonio-vivaldi",
          "name": "Antonio Vivaldi",
          "birthYear": 1678,
          "deathYear": 1741,
          "works": [
            {
              "id": "antonio-vivaldi-the-four-seasons",
              "title": "The Four Seasons",
              "year": 1725,
              "youtubeId": null,
              "searchTerm": "Vivaldi Four Seasons full"
            },
            {
              "id": "antonio-vivaldi-gloria-in-d-major",
              "title": "Gloria in D Major",
              "year": 1715,
              "youtubeId": null,
              "searchTerm": "Vivaldi Gloria in D Major full"
            },
            {
              "id": "antonio-vivaldi-concerto-for-two-violins",
              "title": "Concerto for Two Violins",
              "year": 1709,
              "youtubeId": null,
              "searchTerm": "Vivaldi Concerto for Two Violins full"
            },
            {
              "id": "antonio-vivaldi-l-estro-armonico",
              "title": "L'estro Armonico",
              "year": 1711,
              "youtubeId": null,
              "searchTerm": "Vivaldi L'estro Armonico full"
            }
          ]
        },
        {
          "id": "george-frideric-handel",
          "name": "George Frideric Handel",
          "birthYear": 1685,
          "deathYear": 1759,
          "works": [
            {
              "id": "george-frideric-handel-messiah",
              "title": "Messiah",
              "year": 1741,
              "youtubeId": null,
              "searchTerm": "Handel Messiah full oratorio"
            },
            {
              "id": "george-frideric-handel-water-music",
              "title": "Water Music",
              "year": 1717,
              "youtubeId": null,
              "searchTerm": "Handel Water Music full"
            },
            {
              "id": "george-frideric-handel-music-for-the-royal-fireworks",
              "title": "Music for the Royal Fireworks",
              "year": 1749,
              "youtubeId": null,
              "searchTerm": "Handel Music for Royal Fireworks full"
            },
            {
              "id": "george-frideric-handel-zadok-the-priest",
              "title": "Zadok the Priest",
              "year": 1727,
              "youtubeId": null,
              "searchTerm": "Handel Zadok the Priest full"
            }
          ]
        }
      ]
    },
    {
      "id": "classical-1750-1820",
      "name": "Classical",
      "period": "1750-1820",
      "composers": [
        {
          "id": "wolfgang-amadeus-mozart",
          "name": "Wolfgang Amadeus Mozart",
          "birthYear": 1756,
          "deathYear": 1791,
          "works": [
            {
              "id": "wolfgang-amadeus-mozart-symphony-no-40",
              "title": "Symphony No. 40",
              "year": 1788,
              "youtubeId": "Jtc1mDieQI8",
              "searchTerm": "Mozart Symphony No 40 full"
            },
            {
              "id": "wolfgang-amadeus-mozart-symphony-no-41-jupiter",
              "title": "Symphony No. 41 Jupiter",
              "year": 1788,
              "youtubeId": null,
              "searchTerm": "Mozart Symphony No 41 Jupiter full"
            },
            {
              "id": "wolfgang-amadeus-mozart-requiem",
              "title": "Requiem",
              "year": 1791,
              "youtubeId": "sPlhKP0nUTs",
              "searchTerm": "Mozart Requiem full"
            },
            {
              "id": "wolfgang-amadeus-mozart-piano-concerto-no-21",
              "title": "Piano Concerto No. 21",
              "year": 1785,
              "youtubeId": "df-eLzao63E",
              "searchTerm": "Mozart Piano Concerto No 21 full"
            },
            {
              "id": "wolfgang-amadeus-mozart-eine-kleine-nachtmusik",
              "title": "Eine kleine Nachtmusik",
              "year": 1787,
              "youtubeId": null,
              "searchTerm": "Mozart Eine kleine Nachtmusik full"
            }
          ]
        },
        {
          "id": "ludwig-van-beethoven",
          "name": "Ludwig van Beethoven",
          "birthYear": 1770,
          "deathYear": 1827,
          "works": [
            {
              "id": "ludwig-van-beethoven-symphony-no-3-eroica",
              "title": "Symphony No. 3 Eroica",
              "year": 1803,
              "youtubeId": null,
              "searchTerm": "Beethoven Symphony No 3 Eroica full"
            },
            {
              "id": "ludwig-van-beethoven-symphony-no-5",
              "title": "Symphony No. 5",
              "year": 1808,
              "youtubeId": "_4IRMYuE1hI",
              "searchTerm": "Beethoven Symphony No 5 full"
            },
            {
              "id": "ludwig-van-beethoven-symphony-no-6-pastoral",
              "title": "Symphony No. 6 Pastoral",
              "year": 1808,
              "youtubeId": null,
              "searchTerm": "Beethoven Symphony No 6 Pastoral full"
            },
            {
              "id": "ludwig-van-beethoven-symphony-no-7",
              "title": "Symphony No. 7",
              "year": 1812,
              "youtubeId": null,
              "searchTerm": "Beethoven Symphony No 7 full"
            },
            {
              "id": "ludwig-van-beethoven-symphony-no-8",
              "title": "Symphony No. 8",
              "year": 1812,
              "youtubeId": null,
              "searchTerm": "Beethoven Symphony No 8 full"
            },
            {
              "id": "ludwig-van-beethoven-symphony-no-9-choral",
              "title": "Symphony No. 9 Choral",
              "year": 1824,
              "youtubeId": null,
              "searchTerm": "Beethoven Symphony No 9 Choral full"
            },
            {
              "id": "ludwig-van-beethoven-piano-sonata-no-14-moonlight",
              "title": "Piano Sonata No. 14 Moonlight",
              "year": 1801,
              "youtubeId": "4Tr0otuiQuU",
              "searchTerm": "Beethoven Moonlight Sonata full"
            }
          ]
        },
        {
          "id": "franz-joseph-haydn",
          "name": "Franz Joseph Haydn",
          "birthYear": 1732,
          "deathYear": 1809,
          "works": [
            {
              "id": "franz-joseph-haydn-symphony-no-94-surprise",
              "title": "Symphony No. 94 Surprise",
              "year": 1791,
              "youtubeId": null,
              "searchTerm": "Haydn Symphony No 94 Surprise full"
            },
            {
              "id": "franz-joseph-haydn-symphony-no-104-london",
              "title": "Symphony No. 104 London",
              "year": 1795,
              "youtubeId": null,
              "searchTerm": "Haydn Symphony No 104 London full"
            },
            {
              "id": "franz-joseph-haydn-the-creation",
              "title": "The Creation",
              "year": 1798,
              "youtubeId": null,
              "searchTerm": "Haydn The Creation full oratorio"
            },
            {
              "id": "franz-joseph-haydn-symphony-no-45-farewell",
              "title": "Symphony No. 45 Farewell",
              "year": 1772,
              "youtubeId": null,
              "searchTerm": "Haydn Symphony No 45 Farewell full"
            }
          ]
        },
        {
          "id": "franz-schubert",
          "name": "Franz Schubert",
          "birthYear": 1797,
          "deathYear": 1828,
          "works": [
            {
              "id": "franz-schubert-symphony-no-5",
              "title": "Symphony No. 5",
              "year": 1816,
              "youtubeId": null,
              "searchTerm": "Schubert Symphony No 5 full"
            },
            {
              "id": "franz-schubert-symphony-no-8-unfinished",
              "title": "Symphony No. 8 Unfinished",
              "year": 1822,
              "youtubeId": null,
              "searchTerm": "Schubert Symphony No 8 Unfinished full"
            },
            {
              "id": "franz-schubert-symphony-no-9-the-great",
              "title": "Symphony No. 9 The Great",
              "year": 1825,
              "youtubeId": null,
              "searchTerm": "Schubert Symphony No 9 The Great full"
            }
          ]
        }
      ]
    },
    {
      "id": "romantic-1820-1900",
      "name": "Romantic",
      "period": "1820-1900",
      "composers": [
        {
          "id": "fr-d-ric-chopin",
          "name": "Frédéric Chopin",
          "birthYear": 1810,
          "deathYear": 1849,
          "works": [
            {
              "id": "fr-d-ric-chopin-piano-concerto-no-1",
              "title": "Piano Concerto No. 1",
              "year": 1830,
              "youtubeId": "V_kgya8D42I",
              "searchTerm": "Chopin Piano Concerto No 1 full"
            },
            {
              "id": "fr-d-ric-chopin-ballade-no-1",
              "title": "Ballade No. 1",
              "year": 1835,
              "youtubeId": "Ce8p0VcTbuA",
              "searchTerm": "Chopin Ballade No 1 full"
            },
            {
              "id": "fr-d-ric-chopin-nocturne-in-e-flat-major",
              "title": "Nocturne in E-flat Major",
              "year": 1832,
              "youtubeId": null,
              "searchTerm": "Chopin Nocturne E flat major Op 9 No 2"
            },
            {
              "id": "fr-d-ric-chopin-tude-op-10-no-12-revolutionary",
              "title": "Étude Op. 10 No. 12 Revolutionary",
              "year": 1831,
              "youtubeId": null,
              "searchTerm": "Chopin Etude Op 10 No 12 Revolutionary"
            }
          ]
        },
        {
          "id": "johannes-brahms",
          "name": "Johannes Brahms",
          "birthYear": 1833,
          "deathYear": 1897,
          "works": [
            {
              "id": "johannes-brahms-symphony-no-1",
              "title": "Symphony No. 1",
              "year": 1876,
              "youtubeId": null,
              "searchTerm": "Brahms Symphony No 1 full"
            },
            {
              "id": "johannes-brahms-symphony-no-3",
              "title": "Symphony No. 3",
              "year": 1883,
              "youtubeId": null,
              "searchTerm": "Brahms Symphony No 3 full"
            },
            {
              "id": "johannes-brahms-symphony-no-4",
              "title": "Symphony No. 4",
              "year": 1885,
              "youtubeId": null,
              "searchTerm": "Brahms Symphony No 4 full"
            },
            {
              "id": "johannes-brahms-piano-concerto-no-2",
              "title": "Piano Concerto No. 2",
              "year": 1881,
              "youtubeId": null,
              "searchTerm": "Brahms Piano Concerto No 2 full"
            },
            {
              "id": "johannes-brahms-violin-concerto",
              "title": "Violin Concerto",
              "year": 1878,
              "youtubeId": null,
              "searchTerm": "Brahms Violin Concerto full"
            }
          ]
        },
        {
          "id": "pyotr-ilyich-tchaikovsky",
          "name": "Pyotr Ilyich Tchaikovsky",
          "birthYear": 1840,
          "deathYear": 1893,
          "works": [
            {
              "id": "pyotr-ilyich-tchaikovsky-symphony-no-4",
              "title": "Symphony No. 4",
              "year": 1878,
              "youtubeId": null,
              "searchTerm": "Tchaikovsky Symphony No 4 full"
            },
            {
              "id": "pyotr-ilyich-tchaikovsky-symphony-no-6-path-tique",
              "title": "Symphony No. 6 Pathétique",
              "year": 1893,
              "youtubeId": null,
              "searchTerm": "Tchaikovsky Symphony No 6 Pathetique full"
            },
            {
              "id": "pyotr-ilyich-tchaikovsky-1812-overture",
              "title": "1812 Overture",
              "year": 1880,
              "youtubeId": "VbxgYlcNxE8",
              "searchTerm": "Tchaikovsky 1812 Overture full"
            },
            {
              "id": "pyotr-ilyich-tchaikovsky-swan-lake",
              "title": "Swan Lake",
              "year": 1876,
              "youtubeId": null,
              "searchTerm": "Tchaikovsky Swan Lake full ballet"
            },
            {
              "id": "pyotr-ilyich-tchaikovsky-the-nutcracker",
              "title": "The Nutcracker",
              "year": 1892,
              "youtubeId": null,
              "searchTerm": "Tchaikovsky Nutcracker full ballet"
            },
            {
              "id": "pyotr-ilyich-tchaikovsky-piano-concerto-no-1",
              "title": "Piano Concerto No. 1",
              "year": 1875,
              "youtubeId": null,
              "searchTerm": "Tchaikovsky Piano Concerto No 1 full"
            }
          ]
        },
        {
          "id": "franz-liszt",
          "name": "Franz Liszt",
          "birthYear": 1811,
          "deathYear": 1886,
          "works": [
            {
              "id": "franz-liszt-hungarian-rhapsody-no-2",
              "title": "Hungarian Rhapsody No. 2",
              "year": 1847,
              "youtubeId": null,
              "searchTerm": "Liszt Hungarian Rhapsody No 2 full"
            },
            {
              "id": "franz-liszt-liebestraum-no-3",
              "title": "Liebestraum No. 3",
              "year": 1850,
              "youtubeId": null,
              "searchTerm": "Liszt Liebestraum No 3 full"
            },
            {
              "id": "franz-liszt-piano-concerto-no-1",
              "title": "Piano Concerto No. 1",
              "year": 1855,
              "youtubeId": null,
              "searchTerm": "Liszt Piano Concerto No 1 full"
            },
            {
              "id": "franz-liszt-les-pr-ludes",
              "title": "Les Préludes",
              "year": 1854,
              "youtubeId": null,
              "searchTerm": "Liszt Les Preludes full"
            }
          ]
        },
        {
          "id": "anton-n-dvo-k",
          "name": "Antonín Dvořák",
          "birthYear": 1841,
          "deathYear": 1904,
          "works": [
            {
              "id": "anton-n-dvo-k-symphony-no-8",
              "title": "Symphony No. 8",
              "year": 1889,
              "youtubeId": null,
              "searchTerm": "Dvorak Symphony No 8 full"
            },
            {
              "id": "anton-n-dvo-k-symphony-no-9-new-world",
              "title": "Symphony No. 9 New World",
              "year": 1893,
              "youtubeId": null,
              "searchTerm": "Dvorak Symphony No 9 New World full"
            }
          ]
        },
        {
          "id": "hector-berlioz",
          "name": "Hector Berlioz",
          "birthYear": 1803,
          "deathYear": 1869,
          "works": [
            {
              "id": "hector-berlioz-symphonie-fantastique",
              "title": "Symphonie Fantastique",
              "year": 1830,
              "youtubeId": null,
              "searchTerm": "Berlioz Symphonie Fantastique full"
            }
          ]
        },
        {
          "id": "anton-bruckner",
          "name": "Anton Bruckner",
          "birthYear": 1824,
          "deathYear": 1896,
          "works": [
            {
              "id": "anton-bruckner-symphony-no-4-romantic",
              "title": "Symphony No. 4 Romantic",
              "year": 1874,
              "youtubeId": null,
              "searchTerm": "Bruckner Symphony No 4 Romantic full"
            },
            {
              "id": "anton-bruckner-symphony-no-7",
              "title": "Symphony No. 7",
              "year": 1883,
              "youtubeId": null,
              "searchTerm": "Bruckner Symphony No 7 full"
            },
            {
              "id": "anton-bruckner-symphony-no-8",
              "title": "Symphony No. 8",
              "year": 1887,
              "youtubeId": null,
              "searchTerm": "Bruckner Symphony No 8 full"
            }
          ]
        },
        {
          "id": "felix-mendelssohn",
          "name": "Felix Mendelssohn",
          "birthYear": 1809,
          "deathYear": 1847,
          "works": [
            {
              "id": "felix-mendelssohn-symphony-no-2-lobgesang",
              "title": "Symphony No. 2 Lobgesang",
              "year": 1840,
              "youtubeId": null,
              "searchTerm": "Mendelssohn Symphony No 2 Lobgesang full"
            },
            {
              "id": "felix-mendelssohn-symphony-no-3-scottish",
              "title": "Symphony No. 3 Scottish",
              "year": 1842,
              "youtubeId": null,
              "searchTerm": "Mendelssohn Symphony No 3 Scottish full"
            },
            {
              "id": "felix-mendelssohn-symphony-no-4-italian",
              "title": "Symphony No. 4 Italian",
              "year": 1833,
              "youtubeId": null,
              "searchTerm": "Mendelssohn Symphony No 4 Italian full"
            }
          ]
        },
        {
          "id": "camille-saint-sa-ns",
          "name": "Camille Saint-Saëns",
          "birthYear": 1835,
          "deathYear": 1921,
          "works": [
            {
              "id": "camille-saint-sa-ns-symphony-no-3-organ",
              "title": "Symphony No. 3 Organ",
              "year": 1886,
              "youtubeId": null,
              "searchTerm": "Saint-Saens Symphony No 3 Organ full"
            }
          ]
        },
        {
          "id": "c-sar-franck",
          "name": "César Franck",
          "birthYear": 1822,
          "deathYear": 1890,
          "works": [
            {
              "id": "c-sar-franck-symphony-in-d-minor",
              "title": "Symphony in D Minor",
              "year": 1888,
              "youtubeId": null,
              "searchTerm": "Cesar Franck Symphony D Minor full"
            }
          ]
        },
        {
          "id": "sergei-rachmaninoff",
          "name": "Sergei Rachmaninoff",
          "birthYear": 1873,
          "deathYear": 1943,
          "works": [
            {
              "id": "sergei-rachmaninoff-symphony-no-2",
              "title": "Symphony No. 2",
              "year": 1907,
              "youtubeId": null,
              "searchTerm": "Rachmaninoff Symphony No 2 full"
            }
          ]
        }
      ]
    },
    {
      "id": "modern-1900-1950",
      "name": "Modern",
      "period": "1900-1950",
      "composers": [
        {
          "id": "igor-stravinsky",
          "name": "Igor Stravinsky",
          "birthYear": 1882,
          "deathYear": 1971,
          "works": [
            {
              "id": "igor-stravinsky-the-rite-of-spring",
              "title": "The Rite of Spring",
              "year": 1913,
              "youtubeId": null,
              "searchTerm": "Stravinsky Rite of Spring full ballet"
            },
            {
              "id": "igor-stravinsky-the-firebird",
              "title": "The Firebird",
              "year": 1910,
              "youtubeId": null,
              "searchTerm": "Stravinsky Firebird full ballet"
            },
            {
              "id": "igor-stravinsky-petrushka",
              "title": "Petrushka",
              "year": 1911,
              "youtubeId": null,
              "searchTerm": "Stravinsky Petrushka full ballet"
            },
            {
              "id": "igor-stravinsky-symphony-of-psalms",
              "title": "Symphony of Psalms",
              "year": 1930,
              "youtubeId": null,
              "searchTerm": "Stravinsky Symphony of Psalms full"
            }
          ]
        },
        {
          "id": "claude-debussy",
          "name": "Claude Debussy",
          "birthYear": 1862,
          "deathYear": 1918,
          "works": [
            {
              "id": "claude-debussy-clair-de-lune",
              "title": "Clair de Lune",
              "year": 1905,
              "youtubeId": "CvFH_6DNRCY",
              "searchTerm": "Debussy Clair de Lune full"
            },
            {
              "id": "claude-debussy-la-mer",
              "title": "La Mer",
              "year": 1905,
              "youtubeId": null,
              "searchTerm": "Debussy La Mer full"
            },
            {
              "id": "claude-debussy-prelude-to-the-afternoon-of-a-faun",
              "title": "Prelude to the Afternoon of a Faun",
              "year": 1894,
              "youtubeId": null,
              "searchTerm": "Debussy Prelude Afternoon Faun full"
            },
            {
              "id": "claude-debussy-images",
              "title": "Images",
              "year": 1907,
              "youtubeId": null,
              "searchTerm": "Debussy Images full"
            }
          ]
        },
        {
          "id": "maurice-ravel",
          "name": "Maurice Ravel",
          "birthYear": 1875,
          "deathYear": 1937,
          "works": [
            {
              "id": "maurice-ravel-bol-ro",
              "title": "Boléro",
              "year": 1928,
              "youtubeId": "r30D3SW4OVw",
              "searchTerm": "Ravel Bolero full"
            },
            {
              "id": "maurice-ravel-daphnis-et-chlo",
              "title": "Daphnis et Chloé",
              "year": 1912,
              "youtubeId": null,
              "searchTerm": "Ravel Daphnis et Chloe full"
            },
            {
              "id": "maurice-ravel-piano-concerto-in-g-major",
              "title": "Piano Concerto in G Major",
              "year": 1931,
              "youtubeId": null,
              "searchTerm": "Ravel Piano Concerto G Major full"
            },
            {
              "id": "maurice-ravel-pavane-for-a-dead-princess",
              "title": "Pavane for a Dead Princess",
              "year": 1899,
              "youtubeId": null,
              "searchTerm": "Ravel Pavane for a Dead Princess full"
            }
          ]
        },
        {
          "id": "gustav-mahler",
          "name": "Gustav Mahler",
          "birthYear": 1860,
          "deathYear": 1911,
          "works": [
            {
              "id": "gustav-mahler-symphony-no-1",
              "title": "Symphony No. 1",
              "year": 1888,
              "youtubeId": null,
              "searchTerm": "Mahler Symphony No 1 full"
            },
            {
              "id": "gustav-mahler-symphony-no-2-resurrection",
              "title": "Symphony No. 2 Resurrection",
              "year": 1894,
              "youtubeId": null,
              "searchTerm": "Mahler Symphony No 2 Resurrection full"
            },
            {
              "id": "gustav-mahler-symphony-no-3",
              "title": "Symphony No. 3",
              "year": 1896,
              "youtubeId": null,
              "searchTerm": "Mahler Symphony No 3 full"
            },
            {
              "id": "gustav-mahler-symphony-no-4",
              "title": "Symphony No. 4",
              "year": 1900,
              "youtubeId": null,
              "searchTerm": "Mahler Symphony No 4 full"
            },
            {
              "id": "gustav-mahler-symphony-no-5",
              "title": "Symphony No. 5",
              "year": 1902,
              "youtubeId": "vOvXhyldUko",
              "searchTerm": "Mahler Symphony No 5 full"
            },
            {
              "id": "gustav-mahler-symphony-no-6",
              "title": "Symphony No. 6",
              "year": 1904,
              "youtubeId": null,
              "searchTerm": "Mahler Symphony No 6 full"
            },
            {
              "id": "gustav-mahler-symphony-no-7",
              "title": "Symphony No. 7",
              "year": 1905,
              "youtubeId": null,
              "searchTerm": "Mahler Symphony No 7 full"
            },
            {
              "id": "gustav-mahler-symphony-no-8",
              "title": "Symphony No. 8",
              "year": 1907,
              "youtubeId": null,
              "searchTerm": "Mahler Symphony No 8 full"
            },
            {
              "id": "gustav-mahler-symphony-no-9",
              "title": "Symphony No. 9",
              "year": 1909,
              "youtubeId": null,
              "searchTerm": "Mahler Symphony No 9 full"
            },
            {
              "id": "gustav-mahler-symphony-no-10",
              "title": "Symphony No. 10",
              "year": 1910,
              "youtubeId": null,
              "searchTerm": "Mahler Symphony No 10 full"
            }
          ]
        },
        {
          "id": "dmitri-shostakovich",
          "name": "Dmitri Shostakovich",
          "birthYear": 1906,
          "deathYear": 1975,
          "works": [
            {
              "id": "dmitri-shostakovich-symphony-no-5",
              "title": "Symphony No. 5",
              "year": 1937,
              "youtubeId": null,
              "searchTerm": "Shostakovich Symphony No 5 full"
            },
            {
              "id": "dmitri-shostakovich-symphony-no-7-leningrad",
              "title": "Symphony No. 7 Leningrad",
              "year": 1941,
              "youtubeId": null,
              "searchTerm": "Shostakovich Symphony No 7 Leningrad full"
            }
          ]
        },
        {
          "id": "sergei-prokofiev",
          "name": "Sergei Prokofiev",
          "birthYear": 1891,
          "deathYear": 1953,
          "works": [
            {
              "id": "sergei-prokofiev-symphony-no-1-classical",
              "title": "Symphony No. 1 Classical",
              "year": 1917,
              "youtubeId": null,
              "searchTerm": "Prokofiev Symphony No 1 Classical full"
            }
          ]
        },
        {
          "id": "jean-sibelius",
          "name": "Jean Sibelius",
          "birthYear": 1865,
          "deathYear": 1957,
          "works": [
            {
              "id": "jean-sibelius-symphony-no-3",
              "title": "Symphony No. 3",
              "year": 1907,
              "youtubeId": null,
              "searchTerm": "Sibelius Symphony No 3 full"
            },
            {
              "id": "jean-sibelius-symphony-no-7",
              "title": "Symphony No. 7",
              "year": 1924,
              "youtubeId": null,
              "searchTerm": "Sibelius Symphony No 7 full"
            }
          ]
        },
        {
          "id": "edward-elgar",
          "name": "Edward Elgar",
          "birthYear": 1857,
          "deathYear": 1934,
          "works": [
            {
              "id": "edward-elgar-symphony-no-1",
              "title": "Symphony No. 1",
              "year": 1908,
              "youtubeId": null,
              "searchTerm": "Elgar Symphony No 1 full"
            }
          ]
        },
        {
          "id": "richard-strauss",
          "name": "Richard Strauss",
          "birthYear": 1864,
          "deathYear": 1949,
          "works": [
            {
              "id": "richard-strauss-an-alpine-symphony",
              "title": "An Alpine Symphony",
              "year": 1915,
              "youtubeId": null,
              "searchTerm": "Richard Strauss Alpine Symphony full"
            }
          ]
        },
        {
          "id": "georges-bizet",
          "name": "Georges Bizet",
          "birthYear": 1838,
          "deathYear": 1875,
          "works": [
            {
              "id": "georges-bizet-symphony-no-1",
              "title": "Symphony No. 1",
              "year": 1855,
              "youtubeId": null,
              "searchTerm": "Bizet Symphony No 1 full"
            }
          ]
        },
        {
          "id": "ralph-vaughan-williams",
          "name": "Ralph Vaughan Williams",
          "birthYear": 1872,
          "deathYear": 1958,
          "works": [
            {
              "id": "ralph-vaughan-williams-symphony-no-5",
              "title": "Symphony No. 5",
              "year": 1943,
              "youtubeId": null,
              "searchTerm": "Vaughan Williams Symphony No 5 full"
            },
            {
              "id": "ralph-vaughan-williams-symphony-no-9",
              "title": "Symphony No. 9",
              "year": 1958,
              "youtubeId": null,
              "searchTerm": "Vaughan Williams Symphony No 9 full"
            }
          ]
        },
        {
          "id": "henryk-g-recki",
          "name": "Henryk Górecki",
          "birthYear": 1933,
          "deathYear": 2010,
          "works": [
            {
              "id": "henryk-g-recki-symphony-no-1",
              "title": "Symphony No. 1",
              "year": 1959,
              "youtubeId": null,
              "searchTerm": "Gorecki Symphony No 1 full"
            },
            {
              "id": "henryk-g-recki-symphony-no-3-sorrowful-songs",
              "title": "Symphony No. 3 Sorrowful Songs",
              "year": 1976,
              "youtubeId": null,
              "searchTerm": "Gorecki Symphony No 3 Sorrowful Songs full"
            }
          ]
        },
        {
          "id": "erich-wolfgang-korngold",
          "name": "Erich Wolfgang Korngold",
          "birthYear": 1897,
          "deathYear": 1957,
          "works": [
            {
              "id": "erich-wolfgang-korngold-symphony-in-f-sharp-major",
              "title": "Symphony in F-sharp major",
              "year": 1953,
              "youtubeId": null,
              "searchTerm": "Korngold Symphony F-sharp major full"
            }
          ]
        }
      ]
    },
    {
      "id": "contemporary-1950-present",
      "name": "Contemporary",
      "period": "1950-Present",
      "composers": [
        {
          "id": "aaron-copland",
          "name": "Aaron Copland",
          "birthYear": 1900,
          "deathYear": 1990,
          "works": [
            {
              "id": "aaron-copland-appalachian-spring",
              "title": "Appalachian Spring",
              "year": 1944,
              "youtubeId": null,
              "searchTerm": "Copland Appalachian Spring full"
            },
            {
              "id": "aaron-copland-fanfare-for-the-common-man",
              "title": "Fanfare for the Common Man",
              "year": 1942,
              "youtubeId": null,
              "searchTerm": "Copland Fanfare for the Common Man full"
            },
            {
              "id": "aaron-copland-rodeo",
              "title": "Rodeo",
              "year": 1942,
              "youtubeId": null,
              "searchTerm": "Copland Rodeo full ballet"
            },
            {
              "id": "aaron-copland-symphony-no-3",
              "title": "Symphony No. 3",
              "year": 1946,
              "youtubeId": null,
              "searchTerm": "Copland Symphony No 3 full"
            }
          ]
        },
        {
          "id": "leonard-bernstein",
          "name": "Leonard Bernstein",
          "birthYear": 1918,
          "deathYear": 1990,
          "works": [
            {
              "id": "leonard-bernstein-west-side-story",
              "title": "West Side Story",
              "year": 1957,
              "youtubeId": null,
              "searchTerm": "Bernstein West Side Story full"
            },
            {
              "id": "leonard-bernstein-candide-overture",
              "title": "Candide Overture",
              "year": 1956,
              "youtubeId": null,
              "searchTerm": "Bernstein Candide Overture full"
            },
            {
              "id": "leonard-bernstein-symphony-no-2-the-age-of-anxiety",
              "title": "Symphony No. 2 The Age of Anxiety",
              "year": 1949,
              "youtubeId": null,
              "searchTerm": "Bernstein Symphony No 2 Age of Anxiety full"
            },
            {
              "id": "leonard-bernstein-chichester-psalms",
              "title": "Chichester Psalms",
              "year": 1965,
              "youtubeId": null,
              "searchTerm": "Bernstein Chichester Psalms full"
            }
          ]
        },
        {
          "id": "philip-glass",
          "name": "Philip Glass",
          "birthYear": 1937,
          "deathYear": 2024,
          "works": [
            {
              "id": "philip-glass-einstein-on-the-beach",
              "title": "Einstein on the Beach",
              "year": 1976,
              "youtubeId": null,
              "searchTerm": "Philip Glass Einstein on the Beach full"
            },
            {
              "id": "philip-glass-metamorphosis",
              "title": "Metamorphosis",
              "year": 1988,
              "youtubeId": null,
              "searchTerm": "Philip Glass Metamorphosis full"
            },
            {
              "id": "philip-glass-glassworks",
              "title": "Glassworks",
              "year": 1982,
              "youtubeId": null,
              "searchTerm": "Philip Glass Glassworks full"
            },
            {
              "id": "philip-glass-violin-concerto",
              "title": "Violin Concerto",
              "year": 1987,
              "youtubeId": null,
              "searchTerm": "Philip Glass Violin Concerto full"
            }
          ]
        }
      ]
    }
  ]
} as const;
