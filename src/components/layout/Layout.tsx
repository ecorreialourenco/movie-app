import Header from "./Header";
import { LayoutProps } from "../../models/generic.model";
import "./Layout.scss";

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div>
      <Header />
      <div className="layout-container">{props.children}</div>
    </div>
  );
};

export default Layout;
