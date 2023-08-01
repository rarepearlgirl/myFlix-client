import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Persona",
      image:
        "",
      director: "Ingmar Bergman"
    },
    {
      id: 2,
      title: "The Doors",
      image:
        "",
      director: "Oliver Stone"
    },
    {
      id: 3,
      title: "Stealing Beauty",
      image:
        "",
      director: "Bernardo Bertolucci"
    },
    {
      id: 4,
      title: "The Dreamers",
      image:
        "",
      director: "Bernardo Bertolucci"
    },
    {
      id: 5,
      title: "Crimson Peak",
      image:
        "",
      author: "Guillermo del Toro"
    }
  ]);

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  } else {
    return (
      <div>
        {movies.map((movie) => {
          return <MovieCard key={movie.id} > {movie.title} </MovieCard>;
        })}
      </div>
    );
  }
}

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return <MovieView movie={selectedMovie} />;
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      <button onClick={() => {
        alert("Click!")
      }} 
      > 
      Click me!
      </button>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );