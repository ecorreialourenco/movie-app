import { ImageProps } from "../../models/image.model";
import "./Image.scss";

const Image: React.FC<ImageProps> = (props) => {
  const { url, alt, className } = props;

  return (
    <img
      src={
        url
          ? `https://image.tmdb.org/t/p/original/${url}`
          : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/660px-No-Image-Placeholder.svg.png?20200912122019"
      }
      alt={alt}
      className={`image ${className}`}
    />
  );
};

export default Image;
