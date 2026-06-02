import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Badge, Spinner } from 'react-bootstrap';
import { StarFill, Calendar3, Clock, Globe } from 'react-bootstrap-icons';
import axiosInstance from '../axiosConfig';
import { LanguageContext } from '../context/LanguageContext';

const MovieDetails = () => {
  const { id } = useParams(); 
  const { lang } = useContext(LanguageContext);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const imageBaseUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    axiosInstance.get(`/movie/${id}?language=${lang}`)
      .then((res) => {
        setMovie(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, lang]);

  if (loading) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center bg-black">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  if (!movie) return <div className="text-white text-center mt-5">Movie not found.</div>;

  return (
    <div className="bg-black text-white min-vh-100 py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="mb-4 mb-md-0 text-center">
            <img 
              src={`${imageBaseUrl}${movie.poster_path}`} 
              alt={movie.title} 
              className="img-fluid rounded shadow-lg"
              style={{ border: '2px solid #333' }}
            />
          </Col>

          <Col md={8}>
            <h1 className="fw-bold mb-3">{movie.title} <span className="text-muted fw-light">({movie.release_date.split('-')[0]})</span></h1>
            
            <div className="mb-4">
              <Badge bg="warning" text="dark" className="me-2 fs-6">
                <StarFill className="me-1" /> {movie.vote_average.toFixed(1)}
              </Badge>
              <span className="text-muted"><Calendar3 className="me-1" /> {movie.release_date}</span>
              <span className="text-muted ms-3"><Clock className="me-1" /> {movie.runtime} min</span>
              </div>

            <h5 className="text-orange">Overview</h5>
            <p className="lead">{movie.overview}</p>

            <div className="mt-4">
              <h5 className="text-orange">{lang === 'en' ? 'Genres' : 'التصنيفات'}</h5>
              {movie.genres.map(genre => (
                <Badge key={genre.id} pill bg="dark" className="border border-secondary me-2 p-2 px-3">
                  {genre.name}
                </Badge>
              ))}
            </div>

            <div className="mt-4">
              <h5 className="text-orange">{lang === 'en' ? 'Production Countries' : 'دول الانتاج'}</h5>
              <p><Globe className="me-2" /> {movie.production_countries.map(c => c.name).join(', ')}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MovieDetails;