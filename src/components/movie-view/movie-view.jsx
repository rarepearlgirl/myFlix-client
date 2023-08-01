import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Card } from "react-bootstrap";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies, user, setUser, token }) => {
    const { movieId } = useParams();
    const [ isFavorite, setIsFavorite ] = useState(false);

    useEffect(() => {
       const isFavorited = user.FavoriteMovies.includes(movieId)
       setIsFavorite(isFavorited)
    }, []);
  }