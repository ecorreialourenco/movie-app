import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getMovies } from "../../utils/getMovieList";
import { Filters, MovieList } from "../../components";
import { MovieParams, MovieProps, QueryRequest } from "../../models";
import styles from "./Home.module.scss";

export const Home: React.FC = () => {
  const [list, setList] = useState<MovieProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPage] = useState<number>(0);
  const { showAdultContent, sortBy, selectedGenre } = useSelector(
    (state: RootState) => state.movie
  );

  const getMovieList = useCallback(async (params: MovieParams) => {
    const newList: QueryRequest = await getMovies(params);
    setList(newList.results);
    setPage(newList.page);
    setTotalPage(newList.total_pages);
  }, []);

  useEffect(() => {
    getMovieList({
      page: 1,
      showAdultContent,
      sortBy: sortBy ? sortBy.value : "",
      selectedGenre: selectedGenre ? selectedGenre.value : "",
    });
  }, [page, showAdultContent, sortBy, selectedGenre, getMovieList]);

  return (
    <>
      <Filters />
      <div className={styles.container}>
        <MovieList
          list={list}
          page={page}
          totalPages={totalPages}
          onPageChange={(val) =>
            getMovieList({
              page: val,
              showAdultContent,
              sortBy: sortBy ? sortBy.value : "",
              selectedGenre: selectedGenre ? selectedGenre.value : "",
            })
          }
        />
      </div>
    </>
  );
};
