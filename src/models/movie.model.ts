import { Genres } from "./gengers.model";

export interface MovieProps {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  production_companies: Company[];
  genres: Genres[];
  budget: number;
  revenue: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
  }[];
}

export interface MovieParams {
  page: number;
  showAdultContent?: boolean;
  sortBy?: string | null;
  selectedGenre?: string | null;
}

export interface Company {
  id: number;
  name: string;
}
