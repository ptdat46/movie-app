import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios"
import Home from './pages/home'
import api from './api/posts'
import Movie from './pages/movie'
import MovieDetail from "./pages/movieDetail";
import Watch from "./pages/watch";
import Search from "./pages/search";
import Admin from "./pages/admin";
import Genres from "./pages/genres";
import 'react-toastify/dist/ReactToastify.css';
import Account from "./pages/account";

function App() {

  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/watch/:id/:name" element={<Watch />} />
          <Route path="/search" element={<Search />} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/genres" element={<Genres/>}/>
          <Route path="/account" element={<Account/>}/>
        </Routes>
    </div>
  );
}

export default App;
