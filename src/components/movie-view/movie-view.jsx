import PropTypes from 'prop-types';
// import { useEffect, useState } from "react";

export const MovieView = ({ movie, onBackClick}) => {
  return (
    <div>
      <div>
        <img src={movie.Image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};


MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Image: PropTypes.string, // Not marking as required if it's possible for a movie to not have an image
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
