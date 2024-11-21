import { FC, useEffect, useState } from "react";
import { Col, Row } from "../../../components";
import { Button, Rating } from "@mui/material";
import styles from "./RateMovie.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useParams } from "react-router-dom";

export const RateMovie: FC = () => {
  const { id } = useParams();
  const [rating, setRating] = useState<number>(0);
  const [voted, setVoted] = useState<boolean>(false);
  const [voteError, setVoteError] = useState<boolean>(false);
  const { session } = useSelector((state: RootState) => state.credentials);

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

  useEffect(() => {
    setRating(0);
    setVoteError(false);
    setVoted(false);
  }, [id]);

  return (
    <Row className={styles.rate}>
      {voteError ? (
        <Col className={styles.errorMessage}>
          <span>Something wrong during your vote, please try again later</span>
        </Col>
      ) : voted ? (
        <Col>
          <span>Thanks for your vote!</span>
        </Col>
      ) : (
        <>
          <Col sm={8}>
            <Rating
              name="half-rating"
              defaultValue={0}
              precision={0.5}
              onChange={(event, newValue) => setRating(newValue)}
            />
          </Col>
          <Col sm={4}>
            <Button onClick={handleVote}>Vote</Button>
          </Col>
        </>
      )}
    </Row>
  );
};
