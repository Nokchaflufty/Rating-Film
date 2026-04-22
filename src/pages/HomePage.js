import React, { useState, useEffect, useCallback } from 'react';
import { movieAPI } from '../services/movieAPI';
import { getRating } from '../utils/storage';
import MovieCard from '../components/MovieCard';

const HomePage = ({ onMovieClick }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGenre, setFilterGenre] = useState('');

  // Local state for the search input field
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const data = await movieAPI.getGenres();
      setGenres(data.genres || []);
    } catch (err) {
      console.error('Error fetching genres:', err);
    }
  };

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    try {
      let data;
      if (searchQuery) {
        data = await movieAPI.searchMovies(searchQuery, currentPage);
      } else if (filterGenre) {
        data = await movieAPI.getMoviesByGenre(filterGenre, currentPage);
      } else {
        data = await movieAPI.getPopularMovies(currentPage);
      }
      setMovies(data.results || []);
      setTotalPages(Math.min(data.total_pages, 500));
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
    setLoading(false);
  }, [currentPage, searchQuery, filterGenre]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setSearchQuery(searchInput);
    setFilterGenre('');
    setCurrentPage(1);
  };

  const handleFilterGenre = (genreId) => {
    setFilterGenre(genreId);
    setSearchQuery('');
    setSearchInput('');
    setCurrentPage(1);
  };

  // Helper for pagination display
  const renderPagination = () => {
    const pages = [];
    const maxVisible = 3;
    
    // Always show first page
    pages.push(
      <div 
        key={1} 
        className={`page-num ${currentPage === 1 ? 'active' : ''}`}
        onClick={() => setCurrentPage(1)}
      >
        1
      </div>
    );

    if (currentPage > 2) {
      if (currentPage > 3) pages.push(<div key="dots1" className="page-num">...</div>);
      if (currentPage < totalPages) {
         // Show page before current if not already shown
         if (currentPage !== 2) {
            pages.push(
              <div key={currentPage} className="page-num active">
                {currentPage}
              </div>
            );
         }
      }
    } else if (currentPage === 2) {
      pages.push(
        <div key={2} className="page-num active">2</div>
      );
    }

    if (totalPages > 1 && totalPages !== currentPage && totalPages !== 1) {
        if (totalPages > 3 && currentPage < totalPages - 1) {
            pages.push(<div key="dots2" className="page-num">...</div>);
        }
        pages.push(
          <div 
            key={totalPages} 
            className={`page-num ${currentPage === totalPages ? 'active' : ''}`}
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages > 500 ? 500 : totalPages}
          </div>
        );
    }

    return pages;
  };

  const popularCheck = [
    { id: '', name: 'Semua' },
    { id: 28, name: 'Action' },
    { id: 18, name: 'Drama' },
    { id: 878, name: 'Sci-Fi' },
    { id: 27, name: 'Horror' }
  ];

  return (
    <div className="home-page-container">
      <section className="hero-section">
        <h1 className="hero-title">Kursi Baris Depan Anda.</h1>
        
        <div className="search-container">
          <form className="search-bar-wrapper" onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder="Cari film, aktor, atau sutradara..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="search-btn">🔍</button>
          </form>

          <div className="filter-tags">
            {popularCheck.map(cat => (
              <button 
                key={cat.id}
                className={`tag ${filterGenre === cat.id && !searchQuery ? 'active' : ''}`}
                onClick={() => handleFilterGenre(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="home-page">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <div className="movies-grid">
              {movies.map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onClick={onMovieClick}
                  rating={getRating(movie.id)}
                />
              ))}
            </div>
            
            <div className="pagination">
              <button 
                className="pagination-btn"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                ‹
              </button>
              
              <div className="page-numbers">
                {/* Simplified page range for the mockup feel */}
                <div className={`page-num ${currentPage === 1 ? 'active' : ''}`} onClick={() => setCurrentPage(1)}>1</div>
                <div className={`page-num ${currentPage === 2 ? 'active' : ''}`} onClick={() => setCurrentPage(2)}>2</div>
                <div className={`page-num ${currentPage === 3 ? 'active' : ''}`} onClick={() => setCurrentPage(3)}>3</div>
                <div className="page-num">...</div>
                <div className={`page-num ${currentPage === 12 ? 'active' : ''}`} onClick={() => setCurrentPage(12)}>12</div>
              </div>

              <button 
                className="pagination-btn"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                ›
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;