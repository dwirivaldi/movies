import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderComponent from "../Components/Header";
import HomeContainer from "../Container/Home";
import DetailsContainer from "../Container/Details";
import MoviesContainer from "../Container/Movies";
import TvSeriesContainer from "../Container/TvSeries";
import SearchContainer from "../Container/Search";
import Login from "../Container/Login";
const RouteComponent = () => {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path="/" element={<HomeContainer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movies" element={<MoviesContainer />} />
          <Route path="/series" element={<TvSeriesContainer />} />
          <Route path="/search" element={<SearchContainer />} />
          <Route
            path="/details/:movieid/:mediatype"
            element={<DetailsContainer />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouteComponent;
