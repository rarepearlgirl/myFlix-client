import React, { useState, useEffect } from 'react';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginPage } from "../login-view/login-page";
import { SignUp } from '../signup-view/signup-view';
import "./main-view.css"

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
    fetch ('https://movie-api-wbl0.onrender.com/movies', {
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
              name: movie.Director.Name,
              bio: movie.Director.Bio
            },
            Description: movie.Description,
            Genre: {
            name: movie.Genre.Name,
            Description: movie.Genre.Description
            },
            imagePath: movie.imagePath,
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
        <div className="application">
      <div className="navbar">
        <div className="application-title">
          <img src="https://www.veryicon.com/icons/miscellaneous/background-basic-version-icon-library/63-content-list.html" height="45" width="45" />
          <h1>MovieList</h1>
        </div>

        <h2 onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }
        }>Logout</h2>
      </div>
    <div>
      {movie.map((movie, i) => (
        <MovieCard key={i}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
    </div>
  );
};