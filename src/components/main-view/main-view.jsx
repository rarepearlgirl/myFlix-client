import React, { useState, useEffect } from 'react';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginPage } from "../login-view/login-page";
import "./main-view.css"

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  // state changes for selected movies
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('https://movie-api-uahq.onrender.com/movies')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data);
      })
      .catch((error) => console.error('Error:', error)); // Catch and log any errors

  }, []);

  if (!user) {
    return <LoginPage onLoggedIn={(user) => setUser(user)}/>;
  }

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
  }

  if (movies.length === 0) {
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
          setUserName(null);
          setToken(null);
          localStorage.clear();
        }
        }>Logout</h2>
      </div>
    <div>
      {movies.map((movie, i) => (
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
}