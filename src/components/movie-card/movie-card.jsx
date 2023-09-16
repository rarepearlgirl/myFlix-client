import PropTypes from 'prop-types';
import { Button, Card, Row, Col } from "react-bootstrap";
// import './movie-card.css';
import "../../index.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import "../navigation-bar/navigation-bar";

export const MovieCard = ({ movie, user, token, setuser }) => {
    const [isFavoriteMovies, setIsFavoriteMovies] = useState(false);
    const {movieId} = useParams();
           
useEffect(() => {
    if (user && user.favoriteMovies && user.favoriteMovies.includes(movieTitle)) {
        setIsFavoriteMovies(true);
    }
}, [user, movie]);


    const addToFavoriteMovies = () => {
        fetch("https://movie-api-wbl0.onrender.com/users/" + user +"/" + movieId, {
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
                  setIsFavoriteMovies(true);
                  setuser(res);
                  localStorage.setItem("userObject", JSON.stringify(res));
                  alert("Movie is added to favorite movies");
            });
    }
    const removeFromFavoriteMovies = () => {
        fetch("https://movie-api-wbl0.onrender.com/users/" + user +"/" + movieId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
         }).then((response) => {
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
    if (!movie) {
    return <div>Movie not found</div>;
}

    return (
        <Card className="movieCard">
            <div> <Card.Img src={movie.ImagePath} /></div> 
            <Card.Body>
               
                <Card.Title>{movie.Title}</Card.Title>
               <Card.Text><h5>{movie.Director.Name}</h5></Card.Text>
                {/* <Card.Text>{movie.Description}</Card.Text> */}
        <Card.Text><h6>{movie.Genre.Name}</h6></Card.Text>

                

            </Card.Body>
            <Card.Footer className="text-center mb-3">
                { !isFavoriteMovies ? (
                  <Button variant="primary" onClick={addToFavoriteMovies}>Add to Favorite Movies</Button>
                ) : (
                  <Button variant="primary" onClick={removeFromFavoriteMovies}>Remove from Favorite Movies</Button>
                )}
                <Link to={"/movies/" + movie.Title}>
                    <Button variant="dark">Read More</Button>
                </Link>
            </Card.Footer>
        </Card>);
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Director: PropTypes.shape({
        Name: PropTypes.string
        }),
        Genre: PropTypes.shape({
            Name: PropTypes.string
        }),
    }).isRequired

};

MovieCard.defaultProps = {
    user: { Name: '' }
};