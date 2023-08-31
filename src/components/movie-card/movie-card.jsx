import PropTypes from 'prop-types';
import { Button, Card, Row, Col } from "react-bootstrap";
import "../../index.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="top">
      <Card.Img variant='top' src={movie.ImagePath} />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Card.Text>{movie.Description}</Card.Text>
        <Card.Text>{movie.Genre.Name}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Read more
        </Button>
      </Card.Body>
    </Card>  
  );
};

//PropTypes conditions to return MovieCard statement in main-view.jsx
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};