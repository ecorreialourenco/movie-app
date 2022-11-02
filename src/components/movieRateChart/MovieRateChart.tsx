import { Col, Row } from "react-bootstrap";
import { MovieRateChartProps } from "../../models/movie-chart.model";
import { BarChart } from "../chart/BarChart";
import "./MovieRateChart.scss";

const MovieRateChart: React.FC<MovieRateChartProps> = (props) => {
  return (
    <Row className="movie-rate-chart__container">
      <Col xs="12">
        <h3>{props.title}</h3>
      </Col>
      <Col xs="12">
        <BarChart data={props.data} />
      </Col>
    </Row>
  );
};

export default MovieRateChart;
