// andes/frontend/src/LoadingScreen.jsx
import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
    return (
        <div className="loading-overlay">
            <div className="loading-spinner">
                <i className="fas fa-mountain loading-icon"></i>
                <div className="loading-text">ANDES PRIME BANK</div>
                <div className="loading-bar"></div>
            </div>
        </div>
    );
};

export default LoadingScreen;