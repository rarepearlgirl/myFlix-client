import React from 'react';
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const MoviesList = ({ movies, userObject, token, onSetUserData }) => {
  if (!movies || movies.length < 1) {
    return <div><h3>The list is empty!</h3></div>
  }
  return (
  <>
    {movies.map((movie) => (
      <Col className="mb-4" key={movie._id} xs={6} sm={6} md={3} lg={3}>
        <MovieCard movie={movie} user={userObject} token={token} setuser={onSetUserData} />
      </Col>
    ))}
  </>
  );
};