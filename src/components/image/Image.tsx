import { ImageProps } from "../../models/image.model";
import cn from "classnames";
import styles from "./Image.module.scss";

export const Image: React.FC<ImageProps> = ({ url, alt, className }) => {
  return (
    <img
      src={
        url
          ? `https://image.tmdb.org/t/p/w300/${url}`
          : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/660px-No-Image-Placeholder.svg.png?20200912122019"
      }
      alt={alt}
      className={cn(styles.image, className)}
    />
  );
};
