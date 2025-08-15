import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  hint?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  text = 'Loading...',
  hint 
}) => {
  return (
    <div className={`loading-spinner-container ${size}`}>
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
      {text && <p className="loading-text">{text}</p>}
      {hint && <p className="loading-hint">{hint}</p>}
    </div>
  );
};

export default LoadingSpinner; 