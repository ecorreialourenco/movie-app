import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import VideoCamera from "../../resources/video-camera.svg";
import "./Header.scss";

const Header: React.FC = () => {
  return (
    <header>
      <Row>
        <Col>
          <h5 className="header__title">
            <img
              src={VideoCamera}
              alt="movie-app-icon"
              className="header__title-icon"
            />
            Movie APP
          </h5>
        </Col>
        <Col className="header__buttons">
          <Link to="/" className="header__link">
            Home
          </Link>
          <Link to="/top-movies" className="header__link">
            Top 10
          </Link>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
