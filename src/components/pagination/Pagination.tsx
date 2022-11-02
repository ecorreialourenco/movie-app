import { Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PaginationProps } from "../../models/pagination.model";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./Pagination.scss";

const Pagination: React.FC<PaginationProps> = (props) => {
  const { page, onChange, totalPages } = props;

  return (
    <Row className="pagination">
      <Col>
        <button
          className="pagination__btn pagination__previous"
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          Previous
        </button>
        <span className="pagination__info">
          {page} of {totalPages}
        </span>
        <button
          className="pagination__btn pagination__next"
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </Col>
    </Row>
  );
};

export default Pagination;
