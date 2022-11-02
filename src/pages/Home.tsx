import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import Image from "../components/image/Image";
import Filters from "../components/filters/Filters";
import { MovieParams } from "../models/movie.model";
import Pagination from "../components/pagination/Pagination";
import "./Home.scss";

const Home: React.FC = () => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const [showAdultContent, setShowAdultContent] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string | null>("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>("");

  const getMovies = async (params: MovieParams) => {
    const url = process.env.REACT_APP_API_URL;
    const apiKey = process.env.REACT_APP_API_KEY;
    const { page, showAdultContent, sortBy, selectedGenre } = params;

    await fetch(
      `${url}/discover/movie?api_key=${apiKey}&page=${page}
      &include_adult=${showAdultContent}
      ${!!sortBy ? `&sort_by=${sortBy}` : ""}
      ${!!selectedGenre ? `&with_genres=${selectedGenre}` : ""}
      `
    )
      .then(async (res) => {
        const list = await res.json();
        setList(list.results);
        setPage(list.page);
        setTotalPage(list.total_pages);

        !!showAdultContent && setShowAdultContent(showAdultContent);
        !!sortBy && setSortBy(sortBy);
        !!selectedGenre && setSelectedGenre(selectedGenre);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getMovies({ page: 1, showAdultContent, sortBy, selectedGenre });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home-container">
      <Filters
        onChange={(showAdultContent, sortBy, selectedGenre) =>
          getMovies({ page: 1, showAdultContent, sortBy, selectedGenre })
        }
      />

      <Row>
        {list.map((item: any) => {
          return (
            <Col
              key={uuidv4()}
              sm={6}
              md={4}
              lg={3}
              className="poster-item"
              style={{ paddingBottom: 10 }}
            >
              <Link to={`/detail/${item.id}`}>
                <Image url={item.poster_path} alt={item.title} />
                <div>{item.title}</div>
              </Link>
            </Col>
          );
        })}
      </Row>
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(val) =>
          getMovies({
            page: val,
            showAdultContent,
            sortBy,
            selectedGenre,
          })
        }
      />
    </div>
  );
};

export default Home;
