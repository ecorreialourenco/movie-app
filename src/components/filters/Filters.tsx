import { useEffect, useState } from "react";
import { sortOptions } from "../../variables/sortOptions";
import { Options } from "../../models/options.model";
import { getMovieGenresList } from "../../utils/getMovieList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  setAdultContent,
  setGenresList,
  setSelectedGenre,
  setSortBy,
} from "../../store/slices/movieStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from "@fortawesome/free-solid-svg-icons";
import cn from "classnames";
import styles from "./Filters.module.scss";
import {
  Autocomplete,
  FormControlLabel,
  Switch,
  TextField,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Backdrop } from "../Backdrop";
import { Col, Row } from "../grid";

export const Filters: React.FC = () => {
  const [showFilters, setSHowFilters] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { showAdultContent, sortBy, genresList, selectedGenre } = useSelector(
    (state: RootState) => state.movie
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const getGenres = async () => {
      const genresOptions = await getMovieGenresList();
      dispatch(setGenresList(genresOptions));
    };

    !genresList.length && getGenres();
  }, [genresList, dispatch]);

  return (
    <>
      <div className={styles.filterDiv}>
        <Row
          className={cn(styles.filters, {
            [styles.hidden]: !showFilters,
            [styles.mobile]: isMobile,
          })}
        >
          <Col xs={12} sm={6} md={5}>
            <FormControlLabel
              value={showAdultContent}
              control={
                <Switch
                  color="primary"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch(setAdultContent(e.currentTarget.checked))
                  }
                />
              }
              label="Show Adult content"
              labelPlacement="start"
            />
          </Col>
          <Col xs={6} sm={3} md={3} className={styles.autocomplete}>
            <Autocomplete
              disablePortal
              size="small"
              value={sortBy}
              options={sortOptions}
              onChange={(event: any, newValue: Options) => {
                dispatch(setSortBy(newValue));
              }}
              renderInput={(params) => (
                <TextField {...params} label="Sort by:" />
              )}
            />
          </Col>
          <Col xs={6} sm={3} md={4} className={cn(styles.autocomplete, styles.marginRight)}>
            <Autocomplete
              disablePortal
              size="small"
              value={selectedGenre}
              options={genresList}
              onChange={(event: any, newValue: Options) => {
                dispatch(setSelectedGenre(newValue));
              }}
              renderInput={(params) => (
                <TextField {...params} label="Sort by Genre:" />
              )}
            />
          </Col>
        </Row>
        <div
          className={styles.toggleButton}
          onClick={() => setSHowFilters(!showFilters)}
        >
          <FontAwesomeIcon
            icon={showFilters ? faAngleDoubleUp : faAngleDoubleDown}
          />
          {showFilters ? "Hide Filters" : "Show Filters"}
          <FontAwesomeIcon
            icon={showFilters ? faAngleDoubleUp : faAngleDoubleDown}
          />
        </div>
      </div>
      {showFilters && <Backdrop />}
    </>
  );
};
