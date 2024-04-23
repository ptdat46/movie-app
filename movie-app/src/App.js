import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios"
import Home from './pages/home'
import api from './api/posts'
import Movie from './pages/movie'
import MovieDetail from "./pages/movieDetail";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/movie" element={<Movie/>}/>
          <Route path="/movie/:id" element={<MovieDetail/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
