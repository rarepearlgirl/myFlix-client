import React, { useState, useEffect } from 'react';
import { MoviesList } from "../movies-list/movies-list";
import { MovieView } from "../movie-view/movie-view";
import { LoginPage } from "../login-view/login-page";
import { SignUp } from '../signup-view/signup-view';
import "./main-view.css";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "..//profile-view/profile-view";
import { useSelector, useDispatch } from 'react-redux';
import { setMovies } from '../../redux/reducers/movies';
import { setDirectors } from '../../redux/reducers/directors';
import { setUserProfile } from '../../redux/reducers/users';
import { setUserToken } from '../../redux/reducers/users';
import { setGenres } from '../../redux/reducers/genres';

export const MainView = () => {
  const userItem = localStorage.getItem("user");;
  const savedUser = !!userItem && userItem !== "undefined" ? JSON.parse(userItem) : null;

  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user)

  const [currentUser, setUser] = useState(savedUser)

  const handleSuccessfulSignup = () => {
    window.location.href = "/login";
  };
  console.log(111111, user)
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    dispatch(setUserProfile(savedUser));
    dispatch(setUserToken(storedToken));
    setUser(savedUser)
  }, [])

  useEffect(() => {
    if (!user.token) return;
    fetch('https://movie-api-wbl0.onrender.com/movies', {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        console.log('Fetched data:', data);
        const directors = data.map((movie) => movie.Director.Name);
        const directorsUnique = Array.from(new Set(directors));
        dispatch(setDirectors(directorsUnique));
        const moviesData = data.map((movie) => {
          return {
            Title: movie.Title,
            Description: movie.Description,
            ImagePath: movie.ImagePath,
            Actors: movie.Actors,
            Director: movie.Director,
            Genre: movie.Genre,
          };
        });
        dispatch(setMovies(moviesData));

        const genres = data.map((movie) => movie.Genre.Name);

        const genresUnique = Array.from(new Set(genres));
        dispatch(setGenres(genresUnique));
      })
      .catch((error) => console.error('Error:', error));
  }, [user.token, user.profile]);

  const onLogout = () => {
    localStorage.clear();
    dispatch(setUserProfile(null));
    dispatch(setUserToken(null));
    window.location.reload();
  };

  const onSetUserData = (updatedUser) => {
    dispatch(setUserProfile(updatedUser));
  };

  const onLoggedIn = ({ user, token }) => {
    setUser(user)
    dispatch(setUserProfile(user));
    dispatch(setUserToken(token));
  }
  console.log(1111111, currentUser)

  return (
    <BrowserRouter basename="/">
      <NavigationBar
        user={user}
        onLogout={onLogout}
      />
      <Row className="justify-content-md-center">

        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {currentUser ? (
                  <Navigate to="/" />
                ) : (
                  <SignUp onSuccessfulSignup={handleSuccessfulSignup} />
                )}
              </>

            }
          />
          <Route
            path="/login"
            element={
              <>
                {currentUser ? (
                  <Navigate to="/" />
                ) : (
                  <LoginPage onLoggedIn={onLoggedIn} />
                )}
              </>

            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!currentUser ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <MovieView />
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!currentUser ? (
                  <Navigate to="/login" replace />
                ) : (
                  <MoviesList movies={movies} user={user} token={user.token} onSetUserData={onSetUserData} />
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              !currentUser ? (
                <Navigate to="/login" replace />
              ) : (
                  <ProfileView user={currentUser} movies={movies} token={user.token} updateUser={onSetUserData} handleLogout={onLogout} />
              )
            }
          />

        </Routes>
      </Row>
    </BrowserRouter>
  );
};