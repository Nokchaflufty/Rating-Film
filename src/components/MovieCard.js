import React from "react";
import { IMAGE_BASE_URL } from "../services/movieAPI";

const MovieCard = ({ movie, onClick, rating }) => {
    // Get primary genre placeholder if real names aren't mapped in this component
    // In a real app, we'd pass the genres map down
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
    
    return (
        <div className="movie-card" onClick={() => onClick(movie)}>
            <div className="poster-wrapper">
                <img 
                    src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Image'} 
                    alt={movie.title} 
                />
            </div>
            <div className="card-content">
                <div className="card-title-row">
                    <h3>{movie.title}</h3>
                    <div className="card-rating">
                        {movie.vote_average?.toFixed(1) || '0.0'}
                    </div>
                </div>
                <div className="card-meta">
                    <span>{year}</span>
                    <span>Movie</span>
                </div>
                {rating && (
                    <div className="card-meta" style={{ color: '#ffb800' }}>
                        Your rating: {rating}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieCard;