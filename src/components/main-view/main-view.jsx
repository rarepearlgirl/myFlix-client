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

export const MainView = () => {
  const userItem = localStorage.getItem("user");
  // const userObjectItem = localStorage.getItem("userObject");
  const savedUser = !!userItem && userItem !== "undefined" ? JSON.parse(userItem) : null;
  // const savedUserObject = userObjectItem ? JSON.parse(userObjectItem) : null;
  // const savedUserObject = (userObjectItem && userObjectItem !== 'undefined') ? JSON.parse(userObjectItem) : null;
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  // state changes for selected movies
  // const [selectedMovies, setSelectedMovies] = useState(null);
  const [user, setUser] = useState(savedUser ? savedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  // const [userObject, setUserObject] = useState(savedUserObject ? savedUserObject : null);
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
        setMovies(data);
      })
      .catch((error) => console.error('Error:', error));
  }, [token, user]);

  const onLogout = () => {
    setToken(null);
    localStorage.clear();
    window.location.reload();
  };

  const onSetUserData = (updatedUser) => {
    setUser(updatedUser);
    // setUserObject(userObject);
    // updateUsername(user)
  };

  return (
    <BrowserRouter>
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
                {user ? (
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
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <LoginPage onLoggedIn={({ user, token }) => { setUser(user); setToken(token) }} />
                )}
              </>

            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                      <MovieView movies={movies} user={user} token={token} setuser={onSetUserData} />
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
                ) : (
                    <MoviesList movies={movies} userObject={user} token={token} onSetUserData={onSetUserData}/>
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
                  <ProfileView user={user} movies={movies} token={token} updateUser={onSetUserData} handleLogout={onLogout}/>
              )
            }
          />

        </Routes>
      </Row>
    </BrowserRouter>
  );
};