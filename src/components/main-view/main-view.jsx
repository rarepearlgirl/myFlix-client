// import PropTypes from 'prop-types';
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
   const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  useEffect(() => {
    if (!token) return;
    fetch('https://movie-api-wbl0.onrender.com/movies',{
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
              name: movie.Director.name,
              bio: movie.Director.Bio
            },
            Description: movie.Description,
            Genre: {
            name: movie.Genre.Name,
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
  }

  const onBackClick = () => setSelectedMovie(null);

if (!user) {
    return <LoginPage onLoggedIn={onLoggedIn}/>;
  }
  
  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={onBackClick} />;
  }

  if (movie.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
        <Row> 
      <div className="application">
      <Row>
        <div className="navbar">
        <div className="application-title">
          <img src="" height="" width="" />
          <h1>Movie List</h1>
        </div>

        <h2 onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }
        }>Logout</h2>
      </div>
      
      </Row> 
    <Row>
    <div>
      {movie.map((movie, i) => (
        <Col className="mb-5 d-flex" key={movie.id} xs={3} sm={6} md={6}>
        <MovieCard key={i}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
        </Col>
      ))}
    </div>
    </Row>
    </div>
    
  </Row>
  );
};