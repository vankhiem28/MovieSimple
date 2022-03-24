import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./components/banner/Banner";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";

function App() {
  return (
    <React.Fragment>
      {/* <BrowserRouter> */}
      <Routes>
        <Route element={<Main></Main>}>
          <Route
            path="/"
            element={
              <>
                <Banner></Banner>
                <HomePage></HomePage>
              </>
            }
          ></Route>
          <Route path="/movies" element={<MoviesPage></MoviesPage>}></Route>
        </Route>
      </Routes>
      {/* </BrowserRouter> */}
    </React.Fragment>
  );
}

export default App;
