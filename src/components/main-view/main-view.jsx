import React, { useState, useEffect } from 'react';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginPage } from "../login-view/login-page";
import { SignUp } from '../signup-view/signup-view';
import "./main-view.css";
import { Button, Row, Col } from "react-bootstrap"

export const MainView = () => {

  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [movies, setMovies] = useState([]);
  // state changes for selected movies
  const [selectedMovies, setSelectedMovies] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

useEffect(() => {
    if (!token) return;
    fetch('https://movie-api-wbl0.onrender.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.json())
    .then((data) => {
        setMovies(data);  // <-- Directly using the data
    })
    .catch((error) => console.error('Error:', error));
}, [token]);

  const onLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
    // fetchMovies(token);
  }

  const onBackClick = () => setSelectedMovies(null);

  if (!user) {
    return <LoginPage onLoggedIn={onLoggedIn} />;
  }

  if (selectedMovies) {
    return <MovieView movies={selectedMovies} onBackClick={onBackClick} />;
  }

  return (
    <div className="application">
      <Row>
        <div className="navbar">
          <div className="application-title">
            <img src="" alt="App Logo" height="" width="" />
            <h1>Movie List</h1>
          </div>
          <h2 onClick={() => {
            setUser(null);
            localStorage.clear();
          }}>
            Logout
          </h2>
        </div>
      </Row>

{movies.length > 0 ? (
  <Row>
    {movies.map((moviesItem, index) => (
      <Col className="mb-5 d-flex" key={moviesItem._id} xs={6} sm={6} md={3} lg={3}>
        <MovieCard
          movies={moviesItem}
          onMovieClick={(newSelectedMovies) => {
            setSelectedMovies(newSelectedMovies);
          }}
        />
      </Col>
    ))}
  </Row>
) : (
  <Row>
    <Col>
      <div>Movie list empty</div>
    </Col>
  </Row>
)}
    </div>
  );