import { useEffect, useState } from "react";
import MovieRateChart from "../components/movieRateChart/MovieRateChart";
import { Data } from "../models/generic.model";
import "./TopRated.scss";

const TopRated: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [voteData, setVoteData] = useState<Data[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      const url = process.env.REACT_APP_API_URL;
      const apiKey = process.env.REACT_APP_API_KEY;

      await fetch(`${url}/movie/top_rated?api_key=${apiKey}&page=1`)
        .then(async (res) => {
          const list = await res.json();
          const customList: Data[] = [];
          const customVoteList: Data[] = [];

          for (let i = 0; i < 10; i++) {
            customList.push({
              label: list.results[i].title,
              value: list.results[i].vote_average,
            });
            customVoteList.push({
              label: list.results[i].title,
              value: list.results[i].vote_count,
            });
          }
          setData(customList);
          setVoteData(customVoteList);
        })
        .catch((err) => {
          console.log("err", err);
        });
    };

    getMovies();
  }, []);

  return (
    <div className="top-rated-container">
      {!!data.length && <MovieRateChart title="Movie Rank" data={data} />}
      {!!voteData.length && (
        <MovieRateChart title="Most voted movies" data={voteData} />
      )}
    </div>
  );
};

export default TopRated;
