import { MovieProps } from "./movie.model";

export interface LayoutProps {
  children: React.ReactNode;
}

export interface ListItemsProps {
  label: string;
  list: any[];
}

export interface FiltersParamsProps {
  showAdultContent: boolean;
  sortBy: string | null;
  selectedGenre: string | null;
}

export interface ImageCarouselProps {
  list: MovieProps[];
}

export interface Data {
  label: string;
  value: number;
}
