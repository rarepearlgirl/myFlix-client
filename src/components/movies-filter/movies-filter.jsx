import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../redux/reducers/movies';
import { Dropdown, Button, Form } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';

export const MoviesFilter = () => {
  const filter = useSelector((state) => state.movies.filter);
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const directors = useSelector((state) => state.directors);
  const [value, setValue] = useState();
  console.log(2222, genres)
  return (
    <>
      <Row className="justify-content-md-center gap-3 filter-bar" md={4}>
        <Col md={10}>
          <Form.Control
            className="filter-textbox"
            type="text"
            placeholder="Search..."
            value={filter}
            onChange={(e) => dispatch(setFilter(e.target.value))}
          />
        </Col>
      </Row>
      <Row className="justify-content-md-center gap-3 filter-bar">
        <Col sm={12} md={2}>
          <Dropdown>
            <Dropdown.Toggle className="filter--selectors" variant="info">
              Genres
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                value=""
                key="clear"
                onClick={() => {
                  dispatch(setFilter(''));
                }}
              >
                Show All Genres
              </Dropdown.Item>
              {genres.map((genre, index) => (
                <Dropdown.Item
                  value={genre}
                  key={index}
                  onClick={() => {
                    console.log(33333, genre)
                    dispatch(setFilter(genre));
                  }}
                >
                  {genre}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col sm={12} md={2}>
          <Dropdown>
            <Dropdown.Toggle className="filter--selectors" variant="info">
              Directors
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                value=""
                key="clear"
                onClick={() => {
                  dispatch(setFilter(''));
                }}
              >
                Show All Directors
              </Dropdown.Item>
              {directors.map((director, index) => (
                <Dropdown.Item
                  value={director}
                  key={index}
                  onClick={() => {
                    dispatch(setFilter(director));
                  }}
                >
                  {director}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={2}>
          <Button
            variant="secondary"
            className="filter--selectors"
            type="button"
            value="Clear"
            onClick={() => dispatch(setFilter(''))}
          >
            Clear
          </Button>
        </Col>
      </Row>
    </>
  );
};