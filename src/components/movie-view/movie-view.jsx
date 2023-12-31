import PropTypes from 'prop-types';
import "./movie-view.css"
import { useState, useEffect } from 'react';
import { Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../index.scss";
import './movie-view.css';
import "..//movie-card/movie-card";
// import {MovieCard} from "..//movie-card/movie-card";
import { useSelector } from 'react-redux';
import { setUserProfile } from '../../redux/reducers/users';
import { useDispatch } from 'react-redux';

export const MovieView = () => {
    const dispatch = useDispatch();

    const movies = useSelector((state) => state.movies.list);
    const user = useSelector((state) => state.user.userProfile);
    const token = useSelector((state) => state.user.token)

    const { movieId } = useParams();
    const movieToDisplay = movies.find((movie) => movie.Title === movieId);
    const isMovieAdded = user.FavoriteMovies.find((item) => item === movieToDisplay.Title)

    const [isFavoriteMovies, setIsFavoriteMovies] = useState(!!isMovieAdded);

    if (!movieToDisplay) {
  return <div>Movie not found!</div>;
}

    const setUserData = (savedUser) => {
        dispatch(setUserProfile(savedUser));
    }
       
    useEffect(() => {
      if(user && user.favoriteMovies && user.favoriteMovies.includes(movieTitle) ){
        setIsFavoriteMovies(true);
        console.log("Favorite movie:", favoriteMovies);
      }
    }, []);

    const addToFavoriteMovies = () => {
        if (isMovieAdded) {
            alert("Movie already in the list");
            return
        };
        fetch("https://movie-api-wbl0.onrender.com/users/" + user.Name + "/favoriteMovies/" + movieToDisplay.Title, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.error(`Adding favorite movies error. Response status: ${response.status}`, response)
                throw new Error(response.status)
            }
        })
            .then((res) => {
                setIsFavoriteMovies(true);
                const updatedUser = { ...user, FavoriteMovies: [...user.FavoriteMovies, movieToDisplay.Title] }
                setUserData(updatedUser)
                localStorage.setItem("user", JSON.stringify(updatedUser));
                alert("Movie is added to favorite movies");
            }).catch((error) => console.error(error));
    }

    const removeFromFavoriteMovies = () => {
        fetch("https://movie-api-wbl0.onrender.com/users/" + user.Name + "/favoriteMovies/" + movieToDisplay.Title, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
            .then((res) => {
                setIsFavoriteMovies(false);
                const filteredMovies = user.FavoriteMovies.filter((item) => item !== movieToDisplay.Title)
                const updatedUser = { ...user, FavoriteMovies: filteredMovies }
                setUserData(updatedUser)
                localStorage.setItem("user", JSON.stringify(updatedUser));
                alert("Movie is removed from favorite movies");
            });
    };


    return (
      <Card className="moviePoster">
        <div><Card.Img src={movieToDisplay.ImagePath}/></div>
        <Card.Body>
            
            <Card.Title><strong>{movieToDisplay.Title}<br/></strong></Card.Title>
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
            <Button variant="dark" type='link'>Back</Button>
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