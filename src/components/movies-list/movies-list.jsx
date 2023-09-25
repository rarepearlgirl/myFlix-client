import React from 'react';
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "../movie-card/movie-card.css";
import "../../index.scss";

export const MoviesList = ({ movies, user, token, onSetUserData }) => {
  if (!movies || movies.length < 1) {
    return <div><h3>The list is empty!</h3></div>
  }
  return (
  <>
    {movies.map((movie) => (
      <Col className="mb-4" key={movie._id} xs={6} sm={6} md={3} lg={3}>
        <MovieCard movie={movie} user={user} token={token} setuser={onSetUserData} />
      </Col>
    ))}
  </>
  );
};