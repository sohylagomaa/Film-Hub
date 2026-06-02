import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Spinner,
  Form,
  Pagination,
} from "react-bootstrap";
import axiosInstance from "../axiosConfig";
import MovieCard from "../Components/Moviecard";
import { LanguageContext } from "../context/LanguageContext";

const MoviesList = () => {
  const { lang } = useContext(LanguageContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMovies();
  }, [page, searchQuery, lang]);

  const fetchMovies = () => {
    setLoading(true);
    const url = searchQuery
      ? `/search/movie?query=${searchQuery}&page=${page}&language=${lang}`
      : `/movie/popular?page=${page}&language=${lang}`;

    axiosInstance
      .get(url)
      .then((res) => {
        setMovies(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className="bg-black min-vh-100 py-5">
      <Container>
        <Form.Control
          type="text"
          placeholder="Search for a movie..."
          className="mb-5 bg-dark text-white border-secondary py-2 shadow-none"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1);
          }}
        />

        <h2 className={`text-white fw-bold mb-4 border-${lang === 'en' ? 'start' : 'end'} border-warning border-4 ps-${lang === 'en' ? '3' : '0'} pe-${lang === 'en' ? '0' : '3'}`}>
           {lang === 'en' ? 'Popular Movies' : 'الأفلام الرائجة '}
        </h2>

        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner animation="border" variant="warning" />
          </div>
        ) : (
          <>
            <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
              {movies.map((movie) => (
                <Col key={movie.id}>
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-center mt-5">
              <Pagination>
                <Pagination.Prev
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                />
                <Pagination.Item active>{page}</Pagination.Item>
                <Pagination.Next onClick={() => handlePageChange(page + 1)} />
              </Pagination>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default MoviesList;
