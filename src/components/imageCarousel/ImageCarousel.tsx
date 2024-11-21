import { v4 as uuidv4 } from "uuid";
import { MovieProps } from "../../models/movie.model";
import { Link } from "react-router-dom";
import { ImageCarouselProps } from "../../models/generic.model";
import { Image } from "../Image/Image";
import { responsive } from "../../variables/responsive";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./ImageCarousel.module.scss";

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ list }) => {
  return (
    <Carousel
      responsive={responsive}
      containerClass={styles.carousel}
      showDots={true}
      infinite={true}
    >
      {list.map((item: MovieProps) => (
        <Link to={`/detail/${item.id}`} key={uuidv4()}>
          <Image url={item.poster_path} alt={item.title} />
        </Link>
      ))}
    </Carousel>
  );
};
