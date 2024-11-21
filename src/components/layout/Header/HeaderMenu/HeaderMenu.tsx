import { FC } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import styles from "./HeaderMenu.module.scss";

interface HeaderMenuProps {
  className?: string;
}

export const HeaderMenu: FC<HeaderMenuProps> = ({ className }) => (
  <>
    <Link to="/" className={cn(styles.link, className)}>
      Home
    </Link>
    <Link to="/search" className={cn(styles.link, className)}>
      Search
    </Link>
    <Link to="/top-movies" className={cn(styles.link, className)}>
      Top 10
    </Link>
  </>
);
