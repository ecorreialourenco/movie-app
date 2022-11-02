import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { MovieProps } from "../models/movie.model";
import Image from "../components/image/Image";
import { CredentialsContext } from "../store/context";
import ImageCarousel from "../components/imageCarousel/ImageCarousel";
import { Rating } from "react-simple-star-rating";
import ListItems from "../components/listItems/ListItems";
import "./Details.scss";

const Details: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieProps | null>(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [rating, setRating] = useState<number>(0);
  const [voted, setVoted] = useState<boolean>(false);
  const [voteError, setVoteError] = useState<boolean>(false);
  const { session } = useContext(CredentialsContext);

  const url = process.env.REACT_APP_API_URL;
  const apiKey = process.env.REACT_APP_API_KEY;

  const handleVote = async () => {
    await fetch(
      `${url}/movie/${id}/rating?api_key=${apiKey}&guest_session_id=${session}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          value: rating * 2,
        }),
      }
    )
      .then(async (res) => {
        const item = await res.json();
        if (item.success) {
          setVoted(true);
          setVoteError(false);
        } else {
          setVoteError(true);
        }
      })
      .catch((err) => {
        setVoteError(true);
        console.log("err", err);
      });
  };

  const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    const getDetails = async () => {
      await fetch(`${url}/movie/${id}?api_key=${apiKey}`)
        .then(async (res) => {
          const item = await res.json();
          setMovie(item);

          setRating(0);
          setVoteError(false);
          setVoted(false);
        })
        .catch((err) => {
          console.log("err", err);
        });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="movie-details">
      <Row>
        <Col>
          <h3 className="movie-details__subtitle">Details</h3>
        </Col>
      </Row>
      {!!movie && (
        <>
          <Row>
            <Col sm="12" md="4">
              <Image url={movie.poster_path} alt={movie.title} />
            </Col>
            <Col sm="12" md="8">
              <Row style={{ textAlign: "left" }}>
                <Col md="6">
                  <span className="movie-details__text">
                    <b>Title</b>: {movie.title}
                  </span>
                </Col>
                <Col md="6">
                  <span className="movie-details__text">
                    <b>Release</b>: {movie.release_date}
                  </span>
                </Col>
                <Col xs="12">
                  <span className="movie-details__text">
                    <b>Overview</b>: {movie.overview}
                  </span>
                </Col>
                <Col xs="6">
                  <span className="movie-details__text">
                    <b>Budget</b>: {currency.format(movie.budget)}
                  </span>
                </Col>
                <Col xs="6">
                  <span className="movie-details__text">
                    <b>Revenue</b>: {currency.format(movie.revenue)}
                  </span>
                </Col>
                <Col sm="12" md="6">
                  <ListItems
                    label="Production"
                    list={movie.production_companies}
                  />
                </Col>
                <Col sm="12" md="6">
                  <ListItems label="Genres" list={movie.genres} />
                </Col>
                <Col sm="12" md="6">
                  <span className="movie-details__text">
                    <b>Languages</b>:
                    {movie.spoken_languages.map(
                      (item) =>
                        `${item.iso_639_1.toUpperCase()} - ${
                          item.english_name
                        }; `
                    )}
                  </span>
                </Col>
              </Row>
              <Row className="movie-details__rate">
                {voteError ? (
                  <Col className="movie-details__rate-error">
                    <span>
                      Something wrong during your vote, please try again later
                    </span>
                  </Col>
                ) : voted ? (
                  <Col className="movie-details__rate-message">
                    <span>Thanks for your vote!</span>
                  </Col>
                ) : (
                  <>
                    <Col sm="10">
                      <Rating
                        onClick={setRating}
                        initialValue={0}
                        allowFraction={true}
                      />
                    </Col>
                    <Col sm="2">
                      <Button onClick={handleVote}>Vote</Button>
                    </Col>
                  </>
                )}
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <h4>Similar Movies</h4>
            </Col>
            <ImageCarousel list={similarMovies} />
          </Row>
        </>
      )}
    </div>
  );
};

export default Details;
