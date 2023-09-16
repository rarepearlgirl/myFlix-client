import React, { useState, useEffect } from 'react';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginPage } from "../login-view/login-page";
import { SignUp } from '../signup-view/signup-view';
import "./main-view.css";
import { Container } from "react-bootstrap";
import { Navbar } from "react-bootstrap";
import { Button, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "..//profile-view/profile-view";
import { useParams } from "react-router-dom";

export const MainView = () => {

  const userItem = localStorage.getItem("user");
  const userObjectItem = localStorage.getItem("userObject");
  const savedUser = (userItem && userItem !== 'undefined' && userItem !== 'null') ? JSON.parse(userItem) : null;
  // const savedUserObject = userObjectItem ? JSON.parse(userObjectItem) : null;
  const savedUserObject = (userObjectItem && userObjectItem !== 'undefined') ? JSON.parse(userObjectItem) : null;
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  // state changes for selected movies
  // const [selectedMovies, setSelectedMovies] = useState(null);
  const [user, setUser] = useState(savedUser ? savedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [userName, setUserName] = useState(savedUser ? savedUser : null);
  const [userObject, setUserObject] = useState(savedUserObject ? savedUserObject : null);
  const handleSuccessfulSignup = () => {
window.location.href = "/login";
};



  useEffect(() => {
    if (!token) return;
    fetch('https://movie-api-wbl0.onrender.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);  // <-- Directly using the data
      })
      .catch((error) => console.error('Error:', error));
  }, [token]);
  // console.log(user);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLogout={() => {
          setUserName(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
       
        <Routes> console.log(user);
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignUp onSuccessfulSignup={handleSuccessfulSignup} />
                  </Col>
                )}
              </>

            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginPage onLoggedIn={(user) => setUser(user)} />
                    {/* <LoginPage onLoggedIn={setUser} /> */}

                  </Col>
                )}
              </>

            }
          />
          {/* <Route path="/movies/:movieId" element={<MovieRoute />} /> */}
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} user={userObject} token={token} setuser={(user) => {
                      setUserName(user);
                      setUserObject(userObject);
                    }} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie._id} xs={6} sm={6} md={3} lg={3}>
                        <MovieCard movie={movie} user={userObject} token={token} setuser={(updatedUser) => {
                          setUserName(user);
                          setUserObject(userObject);
                          // updateUsername(user)
                        }} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <ProfileView user={userObject} movies={movies} token={token} setuser={(updatedUser) => {
                          setUserName(user);
                          setUserObject(userObject);
                          // updateUsername(user)
                        }} />
              )
            }
          />

        </Routes>
      </Row>
    </BrowserRouter>
  );
};