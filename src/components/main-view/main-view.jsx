import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";

export const MainView = () => {
  const [books, setBooks] = useState([
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
      title: "",
      image:
        "",
      director: ""
    },
    {
      id: 5,
      title: "",
      image:
        "",
      author: "Robin Wieruch"
    }
  ]);

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movieData={book} />
      ))}
    </div>
  );
};
