import { LayoutProps } from "../../models/generic.model";
import { Header } from "./Header";
import styles from "./Layout.module.scss";

export const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Header />
    <div className={styles.container}>{children}</div>
  </>
);
