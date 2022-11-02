import { useEffect, useState } from "react";
import { Dropdown, Row, Col, ToggleButton } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { sortOptions } from "../../variables/sortOptions";
import { Options } from "../../models/options.model";
import { Genres } from "../../models/gengers.model";
import { FiltersProps } from "../../models/generic.model";
import "./Filters.scss";

const Filters: React.FC<FiltersProps> = (props) => {
  const [showAdultContent, setShowAdultContent] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string | null>("");
  const [genresList, setGenresList] = useState<Options[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>("");

  useEffect(() => {
    const getGenres = async () => {
      const url = process.env.REACT_APP_API_URL;
      const apiKey = process.env.REACT_APP_API_KEY;

      await fetch(`${url}/genre/movie/list?api_key=${apiKey}`)
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

          setGenresList(genresOptions);
        })
        .catch((err) => {
          console.log("err", err);
        });
    };

    getGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    props.onChange(showAdultContent, sortBy, selectedGenre);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAdultContent, sortBy, selectedGenre]);

  return (
    <Row className="filters-container">
      <Col>
        <Row>
          <Col>Show Adult content</Col>
          <Col>
            <ToggleButton
              className="mb-2 filters__checkbox"
              id="toggle-check"
              type="checkbox"
              checked={showAdultContent}
              value="1"
              onChange={(e) => setShowAdultContent(e.currentTarget.checked)}
            >
              {showAdultContent ? "Yes" : "No"}
            </ToggleButton>
          </Col>
        </Row>
      </Col>
      <Col md="3">
        <Row>
          <Col>Sort by:</Col>
          <Col>
            <Dropdown onSelect={(e) => setSortBy(e)} className="filters__btn">
              <Dropdown.Toggle>{sortBy}</Dropdown.Toggle>

              <Dropdown.Menu>
                {sortOptions.map((item: Options) => (
                  <Dropdown.Item key={uuidv4()} eventKey={item.value}>
                    {item.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Col>
      <Col md="4">
        <Row>
          <Col>Sort by Genre:</Col>
          <Col>
            <Dropdown
              onSelect={(e) => setSelectedGenre(e)}
              className="filters__btn"
            >
              <Dropdown.Toggle>
                {!!selectedGenre && genresList.length
                  ? genresList.find(
                      (item: Options) => item.value === selectedGenre
                    )?.label
                  : ""}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {genresList.map((item: Options) => (
                  <Dropdown.Item key={uuidv4()} eventKey={item.value}>
                    {item.label}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Filters;
