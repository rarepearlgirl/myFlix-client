import React, { useState, useEffect } from 'react';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginPage } from "../login-view/login-page";
import { SignUp } from '../signup-view/signup-view';
import "./main-view.css";
import { Button, Row, Col } from "react-bootstrap";

export const MainView = () => {

  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [movie, setMovie] = useState([]);
  // state changes for selected movies
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const chunkArray = (array, chunkSize) => {
    let results = [];
    while (array.length) {
      results.push(array.splice(0, chunkSize));
    }
    return results;
  };

  const movieRows = chunkArray([...movie], Math.ceil(movie.length / 2));

  useEffect(() => {
    if (!token) return;
    fetch('https://movie-api-wbl0.onrender.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })

      .then((response) => response.json())
      .then((data) => {
        console.log("movies from api:", data);
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio
            },
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description
            },
            imagePath: movie.ImagePath,
          };
        });


        setMovie(moviesFromApi);
      })
      .catch((error) => console.error('Error:', error)); // Catch and log any errors

  }, [token]);

  const onLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
    // fetchMovies(token);
  }

  const onBackClick = () => setSelectedMovie(null);

  if (!user) {
    return <LoginPage onLoggedIn={onLoggedIn} />;
  }

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={onBackClick} />;
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

      {movie.length > 0 ? (
        movieRows.map((movieChunk, rowIndex) => (
          <Row key={rowIndex}>
            {movieChunk.map((movieItem, index) => (
              <Col className="mb-5 d-flex" key={movieItem._id} xs={12} sm={6} md={3} lg={3}>
                <MovieCard
                  movie={movieItem}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              </Col>
            ))}
          </Row>
        ))
      ) : (
        <Row>
          <Col>
            <div>Movie list empty</div>
          </Col>
        </Row>
      )}
    </div>
  );