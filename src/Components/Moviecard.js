import React, { useEffect, useState, useContext } from "react";
import { Card, Badge } from 'react-bootstrap';
import { StarFill, Heart, HeartFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/slices/favorateSlice'; 
import { LanguageContext } from "../context/LanguageContext";


const MovieCard = ({ movie }) => {
  const { lang } = useContext(LanguageContext);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const isFavorite = favorites.some(item => item.id === movie.id);
  useEffect(() => {
    console.log(lang);
  }, [lang]);
  return (
    <Card className="h-100 bg-dark text-white border-0 shadow movie-card">
      <div className="position-relative">
        <Card.Img src={`${imageBaseUrl}${movie.poster_path}`} />
        <div 
          style={{ cursor: 'pointer', position: 'absolute', top: '10px', right: '10px' }}
          onClick={() => dispatch(toggleFavorite(movie))}
        >
          {isFavorite ? 
            <HeartFill size={25} color="red" /> : 
            <Heart size={25} color="white" />
          }
        </div>
      </div>
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Card.Title className="fs-6 fw-bold">{movie.title}</Card.Title>
          <Badge bg="warning" text="dark">
            <StarFill className="me-1" /> {movie.vote_average.toFixed(1)}
          </Badge>
        </div>

        <Link 
          to={`/movie/${movie.id}`} 
          className="btn btn-outline-warning btn-sm w-100 fw-bold mt-auto"
        >
          {lang === 'en' ? 'View Details' : 'تفاصيل الفيلم'}
        </Link>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;