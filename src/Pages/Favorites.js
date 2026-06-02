import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import MovieCard from "../Components/Moviecard";

const Favorites = () => {
  const favoriteMovies = useSelector((state) => state.favorites.items);

  return (
    <div className="bg-black min-vh-100 py-5">
      <Container>
        <h2 className="text-white mb-4">My Favorites</h2>
        {favoriteMovies.length === 0 ? (
          <p className="text-muted">No favorite movies yet.</p>) : 
          (<Row xs={1} sm={2} md={3} lg={5} className="g-4">
            {favoriteMovies.map((movie) => (
              <Col key={movie.id}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Favorites;
