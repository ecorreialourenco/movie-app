import { MovieProps } from "./movie.model";

export interface LayoutProps {
  children: React.ReactNode;
}

export interface ListItemsProps {
  label: string;
  list: any[];
}

export interface FiltersProps {
  onChange: (
    showAdultContent: boolean,
    sortBy: string | null,
    selectedGenre: string | null
  ) => void;
}

export interface ImageCarouselProps {
  list: MovieProps[];
}

export interface Data {
  label: string;
  value: number;
}
