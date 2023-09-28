import PropTypes from 'prop-types';
import { Button, Card, Row, Col } from "react-bootstrap";
import './movie-card.css';
import "../../index.scss";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import "../navigation-bar/navigation-bar";

export const MovieCard = ({ movie, user, token, setuser }) => {
    const isMovieAdded = user.FavoriteMovies.find((item) => item === movie.Title)
    const [isFavoriteMovies, setIsFavoriteMovies] = useState(!!isMovieAdded);

    useEffect(() => {
        if (user && user.favoriteMovies && user.favoriteMovies.includes(movieTitle)) {
            setIsFavoriteMovies(true);
        }
    }, [user, movie]);

    const addToFavoriteMovies = () => {
        if (isMovieAdded) {
            alert("Movie already in the list");
            return
        };
        fetch("https://movie-api-wbl0.onrender.com/users/" + user.Name + "/favoriteMovies/" + movie.Title, {
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
                const updatedUser = { ...user, FavoriteMovies: [...user.FavoriteMovies, movie.Title] }      
                setuser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
                alert("Movie is added to favorite movies");
            }).catch((error) => console.error(error));
    }

    const removeFromFavoriteMovies = () => {
        fetch("https://movie-api-wbl0.onrender.com/users/" + user.Name + "/favoriteMovies/" + movie.Title, {
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
                const filteredMovies = user.FavoriteMovies.filter((item) => item !== movie.Title)
                const updatedUser = { ...user, FavoriteMovies: filteredMovies }
                setuser(updatedUser)
                localStorage.setItem("user", JSON.stringify(updatedUser));
                alert("Movie is removed from favorite movies");
            });
    };
    if (!movie) {
        return <div>Movie not found</div>;
    }

    return (
        <Card className="movieCard">
                <Card.Img src={movie.ImagePath} />
            <Card.Body>

                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text><h5>{movie.Director.Name}</h5></Card.Text>
                {/* <Card.Text>{movie.Description}</Card.Text> */}
                <Card.Text><h6>{movie.Genre.Name}</h6></Card.Text>



            </Card.Body>
            <Card.Footer className="text-center mb-3">
                {!isFavoriteMovies ? (
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