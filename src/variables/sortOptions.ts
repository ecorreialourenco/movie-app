import { Options } from "../models/options.model";

export const sortOptions: Options[] = [
  { value: "", label: "None" },
  { value: "popularity.asc", label: "Popularity Asc" },
  { value: "popularity.desc", label: "Popularity Desc" },
  { value: "release_date.asc", label: "Release Date Asc" },
  { value: "release_date.desc", label: "Release Date Desc" },
  { value: "original_title.asc", label: "Title Asc" },
  { value: "original_title.desc", label: "Title Desc" },
];
