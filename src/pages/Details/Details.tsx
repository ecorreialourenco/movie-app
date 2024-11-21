import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../../utils/getMovieDetails";
import { Col, Image, ImageCarousel, ListItems, Row } from "../../components";
import { MovieProps } from "../../models";
import { RateMovie } from "./RateMovie";
import styles from "./Details.module.scss";
import { Box } from "@mui/material";

export const Details: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieProps | null>(null);
  const [similarMovies, setSimilarMovies] = useState([]);

  const url = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_API_KEY;

  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const getDetails = async () => {
      const item = await getMovieDetails(id);
      setMovie(item);
    };

    const getSimilarMovies = async () => {
      await fetch(`${url}/movie/${id}/similar?api_key=${apiKey}`)
        .then(async (res) => {
          const item = await res.json();
          setSimilarMovies(item.results);
        })
        .catch((err) => {
          console.log("err", err);
        });
    };

    getDetails();
    getSimilarMovies();
  }, [id, apiKey, url]);

  return (
    <div className={styles.container}>
      <Row>
        <Col>
          <h3 className={styles.title}>Details</h3>
        </Col>
      </Row>
      {!!movie && (
        <Row>
          <Col>
            <Row>
              <Col xs={12} sm={4} md={3}>
                <Image url={movie.poster_path} alt={movie.title} />
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <RateMovie />
                </Box>
              </Col>
              <Col xs={12} sm={8} md={9} className={styles.details}>
                <Row className={styles.alignLeft}>
                  <Col md={6}>
                    <div className={styles.text}>
                      <b>Title</b>: {movie.title}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className={styles.text}>
                      <b>Release</b>: {movie.release_date}
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className={styles.text}>
                      <b>Overview</b>: {movie.overview}
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className={styles.text}>
                      <b>Budget</b>: {currency.format(movie.budget)}
                    </div>
                  </Col>
                  <Col xs={6}>
                    <div className={styles.text}>
                      <b>Revenue</b>: {currency.format(movie.revenue)}
                    </div>
                  </Col>
                  <Col xs={12} md={6}>
                    <ListItems
                      label="Production"
                      list={movie.production_companies}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <ListItems label="Genres" list={movie.genres} />
                  </Col>
                  <Col xs={12} md={6}>
                    <ListItems
                      label="Languages"
                      list={movie.spoken_languages.map((item) => {
                        return {
                          name: `${item.iso_639_1.toUpperCase()} - ${
                            item.english_name
                          }; `,
                        };
                      })}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <h4>Similar Movies</h4>
              </Col>
              <ImageCarousel list={similarMovies} />
            </Row>
          </Col>
        </Row>
      )}
    </div>
  );
};
