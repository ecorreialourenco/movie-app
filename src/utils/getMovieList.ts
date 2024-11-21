import { Genres, MovieParams, Options, SearchMovieParams } from "../models";
import { QueryRequest } from "../models/request.module";

const url = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const getMovies = async ({
  page,
  showAdultContent,
  sortBy,
  selectedGenre,
}: MovieParams): Promise<QueryRequest> => {
  return await fetch(
    `${url}/discover/movie?api_key=${apiKey}&page=${page}
  &include_adult=${showAdultContent}
  ${!!sortBy ? `&sort_by=${sortBy}` : ""}
  ${!!selectedGenre ? `&with_genres=${selectedGenre}` : ""}
  `
  )
    .then(async (res) => await res.json())
    .catch((err) => {
      console.log("err", err);
      return [];
    });
};

export const searchMovie = async ({
  page,
  query,
  showAdultContent,
}: SearchMovieParams): Promise<QueryRequest> => {
  return await fetch(
    `${url}/search/movie?api_key=${apiKey}&page=${page}&query=${query}
  &include_adult=${showAdultContent}`
  )
    .then(async (res) => await res.json())
    .catch((err) => {
      console.log("err", err);
      return [];
    });
};

export const getMovieGenresList = async (): Promise<Options[]> => {
  return await fetch(`${url}/genre/movie/list?api_key=${apiKey}`)
    .then(async (res) => {
      const { genres } = await res.json();
      let genresOptions: Options[] = [
        {
          value: "",
          label: "None",
        },
      ];
      genres.forEach((item: Genres) => {
        genresOptions.push({
          value: item.id.toString(),
          label: item.name,
        });
      });

      return genresOptions;
    })
    .catch((err) => {
      console.log("err", err);
      return [];
    });
};
