import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { movieAPI, IMAGE_BASE_URL } from '../services/movieAPI';
import { getRating, saveRating } from '../utils/storage';
import RatingModal from '../components/RatingModal';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [userRating, setUserRating] = useState(null);

  const fetchMovieDetails = useCallback(async () => {
    setLoading(true);
    try {
      const [movieData, creditsData] = await Promise.all([
        movieAPI.getMovieDetails(id),
        movieAPI.getMovieCredits(id)
      ]);
      setMovie(movieData);
      setCredits(creditsData);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    fetchMovieDetails();
    const rating = getRating(parseInt(id));
    setUserRating(rating);
  }, [id, fetchMovieDetails]);

  const handleSaveRating = (movieId, rating) => {
    saveRating(movieId, rating);
    setUserRating(rating);
    setShowRatingModal(false);
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!movie) return <div className="error">Movie not found</div>;

  const director = credits?.crew?.find(person => person.job === 'Director')?.name || 'Unknown';
  const cast = credits?.cast?.slice(0, 3) || [];

  return (
    <div className="movie-detail">
      {/* Hero Backdrop Section */}
      <div 
        className="detail-hero" 
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(10, 11, 13, 0.4), rgba(10, 11, 13, 1)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          height: '60vh',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '0 5% 4rem'
        }}
      >
        <div>
           <button className="back-button" onClick={() => navigate('/')} style={{ marginBottom: '2rem' }}>
            ← Back to Movies
          </button>
          <h1 className="hero-title" style={{ margin: 0 }}>{movie.title}</h1>
          <p className="tagline">{movie.tagline}</p>
        </div>
      </div>

      <div className="detail-container">
        {/* Main Content */}
        <section className="main-detail-content">
          <div className="synopsis-section">
            <h2>Sinopsis</h2>
            <p className="synopsis-text">{movie.overview}</p>
          </div>

          <div className="info-cards-grid">
            <div className="info-card">
              <div className="info-card-header">
                <span className="info-card-icon">🎬</span>
                <h3>Sutradara & Visi</h3>
              </div>
              <p>
                {director} menyajikan mahakarya dalam bercerita secara visual, 
                memadukan efek praktis dengan sinematografi virtual yang inovatif.
              </p>
            </div>

            <div className="info-card">
              <div className="info-card-header">
                <span className="info-card-icon">🎭</span>
                <h3>Sinergi Genre</h3>
              </div>
              <div className="genres">
                {movie.genres?.map(genre => (
                  <span key={genre.id} className="genre-tag">{genre.name}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="detail-sidebar">
          <div className="stats-card">
            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-value">{Math.round(movie.vote_average * 10)}%</span>
                <span className="stat-label">Score</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{movie.vote_average?.toFixed(1)}</span>
                <span className="stat-label">Rating</span>
              </div>
            </div>

            <span className="sidebar-action-text">Sudah menonton film ini?</span>
            <button className="btn-outline-red" onClick={() => setShowRatingModal(true)}>
              ★ Beri Rating Film
            </button>
            {userRating && (
              <p style={{ marginTop: '1rem', textAlign: 'center', color: '#ffb800' }}>
                Rating Anda: {userRating}/10
              </p>
            )}
          </div>

          <div className="info-card specs-card">
            <h4>Spesifikasi Teknis</h4>
            <div className="spec-item">
              <span className="stat-label">Kualitas</span>
              <p className="spec-value">4K Ultra HD • HDR10+</p>
            </div>
            <div className="spec-item">
              <span className="stat-label">Audio</span>
              <p className="spec-value">Dolby Atmos</p>
            </div>
            <div className="spec-item">
              <span className="stat-label">Studio</span>
              <p className="spec-value">{movie.production_companies?.[0]?.name || 'N/A'}</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Cast Section */}
      <section className="cast-section">
        <div className="section-header">
          <h3>Pemeran Utama</h3>
          <Link to="#" className="view-all">Lihat Semua</Link>
        </div>
        <div className="cast-grid">
          {cast.map(person => (
            <div key={person.id} className="cast-card">
              <div className="cast-img-wrapper">
                <img 
                  src={person.profile_path ? `${IMAGE_BASE_URL}${person.profile_path}` : 'https://via.placeholder.com/150x150?text=No+Photo'} 
                  alt={person.name} 
                />
              </div>
              <h5>{person.name}</h5>
              <p className="cast-role">sebagai {person.character}</p>
            </div>
          ))}
        </div>
      </section>

      {showRatingModal && (
        <RatingModal
          movie={movie}
          onClose={() => setShowRatingModal(false)}
          onSave={handleSaveRating}
          currentRating={userRating}
        />
      )}
    </div>
  );
};

export default MovieDetail;