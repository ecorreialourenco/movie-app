import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, ButtonGroup, TextField } from "@mui/material";
import { Col, MovieList, Row } from "../../components";
import { RootState } from "../../store/store";
import { searchMovie } from "../../utils/getMovieList";
import { MovieProps, QueryRequest, SearchMovieParams } from "../../models";
import styles from "./Search.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export const Search: React.FC = () => {
  const [list, setList] = useState<MovieProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [totalPages, setTotalPage] = useState<number>(0);
  const { showAdultContent } = useSelector((state: RootState) => state.movie);

  const searchMovieList = async (params: SearchMovieParams) => {
    const newList: QueryRequest = await searchMovie({
      ...params,
      query: search,
    });
    setList(newList.results);
    setPage(newList.page);
    setTotalPage(newList.total_pages);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchMovieList({
      page: 1,
      showAdultContent,
    });
  };

  return (
    <div className={styles.container}>
      <Row className={styles.searchContainer}>
        <Col xs={12}>
          <form onSubmit={handleSubmit}>
            <ButtonGroup variant="contained" className={styles.buttonGroup}>
              <TextField
                fullWidth
                label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                variant="outlined"
                onClick={() =>
                  searchMovieList({
                    page: 1,
                    showAdultContent,
                  })
                }
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
            </ButtonGroup>
          </form>
        </Col>
      </Row>
      <MovieList
        list={list}
        page={page}
        totalPages={totalPages}
        onPageChange={(val) =>
          searchMovieList({
            page: val,
            showAdultContent,
          })
        }
      />
    </div>
  );
};
