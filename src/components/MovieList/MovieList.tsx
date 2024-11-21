import { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { MovieProps } from "../../models/movie.model";
import { Col, Image, Pagination, Row } from "../../components";
import styles from "./MovieList.module.scss";

interface MovieListProps {
  list: MovieProps[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const MovieList: FC<MovieListProps> = ({
  list,
  page,
  totalPages,
  onPageChange,
}) => (
  <>
    <Row>
      {list.map((item: MovieProps) => {
        return (
          <Col
            key={uuidv4()}
            xs={6}
            sm={3}
            md={2}
            className={styles.posterItem}
          >
            <Link to={`/detail/${item.id}`}>
              <Image url={item.poster_path} alt={item.title} />
            </Link>
          </Col>
        );
      })}
    </Row>
    {totalPages > 1 && (
      <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
    )}
  </>
);
