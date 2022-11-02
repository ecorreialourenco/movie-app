import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Details from "../pages/Details";
import TopRated from "../pages/TopRated";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/detail/:id" element={<Details />} />
      <Route path="/top-movies" element={<TopRated />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default Router;
