export interface CatalogWork {
  id: string;
  title: string;
  year: number | null;
  youtubeId: string | null;
  searchTerm?: string | null;
}

export interface CatalogComposer {
  id: string;
  name: string;
  birthYear: number | null;
  deathYear: number | null;
  works: CatalogWork[];
}

export interface CatalogGenre {
  id: string;
  name: string;
  period: string | null;
  composers: CatalogComposer[];
}

export interface CatalogDocument {
  schemaVersion: number;
  generatedAt: string;
  genres: CatalogGenre[];
}

export interface CatalogSummary {
  totalGenres: number;
  totalComposers: number;
  totalWorks: number;
}

export interface CatalogLoadResult {
  catalog: CatalogDocument;
  summary: CatalogSummary;
  source: 'remote' | 'static';
}
