import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MovieDetail from './pages/MovieDetail';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePageWrapper />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

function Header() {
  const location = useLocation();
  
  return (
    <header className="main-header">
      <Link to="/" className="logo">The Movie</Link>
      
      <div className="nav-actions">
        <span className="nav-icon">🔔</span>
        <span className="nav-icon" style={{ fontSize: '1.5rem' }}>👤</span>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo">The Cinematic Stage</span>
          <p className="footer-desc">
            Temukan hiburan terbaik dari seluruh dunia dalam satu tempat. 
            Nikmati ribuan film dan serial TV pilihan dengan kualitas terbaik.
          </p>
          <p className="footer-copy">© 2024 The Cinematic Stage. Hak Cipta Dilindungi.</p>
        </div>
        
        <div className="footer-links">
          <Link to="#">Kebijakan Privasi</Link>
          <Link to="#">Syarat Layanan</Link>
          <Link to="#">Pusat Bantuan</Link>
          <Link to="#">Hubungi Kami</Link>
        </div>

        <div className="footer-right">
          <div className="retweet-logo">RETWEET</div>
        </div>
      </div>
    </footer>
  );
}

function HomePageWrapper() {
  const navigate = useNavigate();
  
  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`);
  };
  
  return <HomePage onMovieClick={handleMovieClick} />;
}

export default App;