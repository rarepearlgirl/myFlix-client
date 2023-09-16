import PropTypes from 'prop-types';
// import "./movie-view.css"
import { useState, useEffect } from 'react';
import { Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../index.scss";
import './movie-view.css';
import "..//movie-card/movie-card";
// import {MovieCard} from "..//movie-card/movie-card";

export const MovieView = ({ movies, user, token, setuser }) => {
    console.log('Rendering movie:', movies);
    const {movieId} = useParams();
    console.log("All movies:", movies);
    console.log("movieId from URL:", movieId);
    const movieToDisplay = movies.find((movie) => movie.Title === movieId);
    if (!movieToDisplay) {
  return <div>Movie not found!</div>;
}


    const [isFavoriteMovies, setIsFavoriteMovies] = useState(false);
       
    useEffect(() => {
    
      if(user && user.favoriteMovies && user.favoriteMovies.includes(movieTitle) ){
        setIsFavoriteMovies(true);
        console.log("Favorite movie:", favoriteMovie);
      }
    }, []);

    const addToFavoriteMovies = () => {
        fetch("https://movie-api-wbl0.onrender.com/users/" + user.Name + "/favoriteMovies/" + movie.Title, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
         }).then((response) => {
            if(response.ok){
                return response.json();
            }})
            .then((res) => {
                console.log('Server Response:', res);
                  setIsFavoriteMovies(true);
                  setuser(res);
                  localStorage.setItem("userObject", JSON.stringify(res));
                  alert("Movie is added to favorite movies");
            });
    }
    const removeFromFavoriteMovies = () => {
        fetch("https://movie-api-wbl0.onrender.com/users/" + user.Name + "/favoriteMovies/" + movie.Title, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
         }).then((response) => {
            console.log('Server Response:', response);
            if(response.ok){
                return response.json();
            }})
            .then((res) => {
                  setIsFavoriteMovies(false);
                  setuser(res);
                  localStorage.setItem("userObject", JSON.stringify(res));
                  alert("Movie is removed from favorite movies");
            });
    };


    return (
      <Card className="moviePoster">
        <div><Card.Img src={movieToDisplay.ImagePath}/></div>
        <Card.Body>
            
            <Card.Title><strong>Title: {movieToDisplay.Title}<br/></strong></Card.Title>
            <Card.Text><h5>{movieToDisplay.Director.Name}</h5></Card.Text>
                   <Card.Text>{movieToDisplay.Description}</Card.Text>
             <Card.Text><h6>{movieToDisplay.Genre.Name}</h6></Card.Text>
            <Card.Footer className="text-center ">
            { !isFavoriteMovies ? (
                  <Button variant="primary" onClick={addToFavoriteMovies}>Add to Favorite Movies</Button>
                ) : (
                  <Button variant="primary" onClick={removeFromFavoriteMovies}>Remove from Favorite Movies</Button>
                )}
                <Link to={"/"}>
            <Button variant="primary" type='link'>Back</Button>
            </Link>
            </Card.Footer>
            
        </Card.Body>
    </Card>
    );
    
};

MovieView.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        ImagePath: PropTypes.string
    })).isRequired
};