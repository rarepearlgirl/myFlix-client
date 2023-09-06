import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Row, Col } from "react-bootstrap";
import "../../index.scss";
// import { useEffect, useState } from "react";

export const MovieView = ({ movies, onBackClick }) => {
  console.log('Rendering movie:', movies);
  return (
    <div>
      <div>
        <img src={movies.ImagePath} alt="Movie Poster" />
      </div>
      <div>
        <span><strong>Title: </strong></span>
        <span>{movies.Title}</span>
      </div>
      <div>
        <span><strong>Director: </strong></span>
        <span>{movies.Director.Name}</span>
      </div>
           <div>
        <span><strong>Director's Bio: </strong></span>
        <span>{movies.Director.Bio}</span>
      </div>
      <div>
        <span><strong>Genre: </strong>  </span>
        <span>{movies.Genre.Name}</span>
      </div>
      <div>
        <span><strong>Genre Description: </strong> </span>
        <span>{movies.Genre.Description}</span>
      </div>
      <button onClick={onBackClick} className="back-button"
      style={{ cursor: "pointer" }}>Back</button>
    </div>
  );
};


MovieView.propTypes = {
  movies: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string, // Not marking as required if it's possible for a movie to not have an image
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};