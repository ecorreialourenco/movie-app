import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PaginationProps } from "../../models/pagination.model";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "../grid";
import { Button } from "@mui/material";
import styles from "./Pagination.module.scss";

export const Pagination: React.FC<PaginationProps> = ({
  page,
  onChange,
  totalPages,
}) => (
  <Row className={styles.pagination}>
    <Col>
      <Button
        className={styles.prevButton}
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
        Previous
      </Button>
      <span className={styles.info}>
        {page} of {totalPages}
      </span>
      <Button
        className={styles.nextButton}
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
        <FontAwesomeIcon icon={faChevronRight} />
      </Button>
    </Col>
  </Row>
);
