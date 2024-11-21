import { Routes, Route } from "react-router-dom";
import { Details, Home, Search } from "../pages";
import TopRated from "../pages/TopRated";

const Router: React.FC = () => (
  <Routes>
    <Route path="/detail/:id" element={<Details />} />
    <Route path="/top-movies" element={<TopRated />} />
    <Route path="/search" element={<Search />} />
    <Route path="/" element={<Home />} />
  </Routes>
);

export default Router;
