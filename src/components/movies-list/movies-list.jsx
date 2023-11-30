import React from 'react';
import { useSelector } from 'react-redux';
import { MovieCard } from '../movie-card/movie-card';
import { MoviesFilter } from '../movies-filter/movies-filter';
import { Col, Row } from 'react-bootstrap';
import { setUserProfile } from '../../redux/reducers/users';
import { useDispatch } from 'react-redux';
import "../../index.scss";

export const MoviesList = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user)
  const movies = useSelector((state) => state.movies.list);
  const filter = useSelector((state) => state.movies.filter)
  .trim().toLowerCase();
  console.log(666, movies)
  
  const filteredMovies = movies.filter(
    (movie) =>
      movie.Title?.toLowerCase().includes(filter) ||
      movie.Genre?.Name?.toLowerCase().includes(filter) ||
      movie.Director?.Name?.toLowerCase().includes(filter)
  );

  const setUserData = (savedUser) => {
    dispatch(setUserProfile(savedUser));
  }

  return (
    <>
      <Row>
        <MoviesFilter />
      </Row>
      <Row className="movie-list justify-content-md-center">
        {movies.length === 0 ? (
          <Col>The List is Empty!</Col>
        ) : (
            filteredMovies.map((movie) => (
            <Col className="mb-4" key={movie.Title} md={3}>
                <MovieCard movie={movie} user={user.userProfile} token={user.token} setuser={setUserData} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};