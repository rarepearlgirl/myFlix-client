import PropTypes from 'prop-types';
import { Button, Card, Row, Col } from "react-bootstrap";
import "../../index.scss";
import './movie-card.css';

export const MovieCard = ({ movies, onMovieClick }) => {
  return (
    <Card className="top">
      <Card.Img variant='movie-card' src={movies.ImagePath} />
      <Card.Body>
        <Card.Title>{movies.Title}</Card.Title>
        <Card.Text><h5>{movies.Director.Name}</h5></Card.Text>
        <Card.Text>{movies.Description}</Card.Text>
        <Card.Text><h6>{movies.Genre.Name}</h6></Card.Text>
        <Button onClick={() => onMovieClick(movies)} variant="link">
          Read more
        </Button>
      </Card.Body>
    </Card>  
  );
};

//PropTypes conditions to return MovieCard statement in main-view.jsx
MovieCard.propTypes = {
  movies: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};