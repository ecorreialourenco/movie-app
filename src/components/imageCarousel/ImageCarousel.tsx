import Image from "../image/Image";
import { v4 as uuidv4 } from "uuid";
import { MovieProps } from "../../models/movie.model";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import { responsive } from "../../variables/responsive";
import { ImageCarouselProps } from "../../models/generic.model";

import "./ImageCarousel.scss";
import "react-multi-carousel/lib/styles.css";

const ImageCarousel: React.FC<ImageCarouselProps> = (props) => {
  const { list } = props;

  return (
    <Carousel responsive={responsive}>
      {list.map((item: MovieProps) => (
        <Link to={`/detail/${item.id}`} key={uuidv4()}>
          <Image
            url={item.poster_path}
            alt={item.title}
            className="carousel-image"
          />
        </Link>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
