import React from 'react';
import './Quote.css'; // Import the CSS file for styling

const Quote = ({ verse, reference }) => {
  return (
    <div className="quote-container">
      <p className="quote">
        &ldquo;{verse}&rdquo; <span className="reference">- {reference}</span>
      </p>
    </div>
  );
};

export default Quote;
