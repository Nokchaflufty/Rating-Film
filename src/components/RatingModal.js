import React, { useState } from 'react';

const RatingModal = ({ movie, onClose, onSave, currentRating }) => {
  const [rating, setRating] = useState(currentRating || 0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content rating-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>×</button>
        
        <h2 className="modal-title">Apa pendapatmu?</h2>
        <p className="modal-subtitle">
          Rating Anda membantu kami memberikan rekomendasi yang lebih baik untuk panggung ini.
        </p>
        
        <div className="rating-stars premium-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= (hover || rating) ? 'active' : ''}`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              ★
            </span>
          ))}
        </div>
        
        <textarea 
          className="rating-textarea"
          placeholder="Tulis ulasan singkat (opsional)..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        
        <button 
          className="submit-rating-btn" 
          onClick={() => onSave(movie.id, rating * 2)} // Mapping 5 stars to 10 scale if needed
        >
          KIRIM RATING
        </button>
      </div>
    </div>
  );
};

export default RatingModal;