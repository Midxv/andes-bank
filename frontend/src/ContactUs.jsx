// andes/frontend/src/ContactUs.jsx (Final Version: Toast + Address Fix)

import React, { useState, useEffect } from 'react';
import { SimpleHeader, SimpleFooter } from './App';
import './index.css';

const ContactUs = ({ goToHome, goToLogin }) => {
    const [formData, setFormData] = useState({
        name: '', email: '', subject: '', message: ''
    });

    // Toast State
    const [showToast, setShowToast] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Show Toast instead of Alert
        setShowToast(true);

        // Hide Toast after 3 seconds and redirect
        setTimeout(() => {
            setShowToast(false);
            goToHome();
        }, 3000);
    };

    return (
        <>
            <SimpleHeader goToHome={goToHome} goToLogin={goToLogin} />

            <main className="contact-page" style={{ backgroundColor: '#fff', padding: '40px 0', minHeight: '80vh', position: 'relative' }}>
                <div className="container" style={{ maxWidth: '900px' }}>

                    <h1 style={{ color: '#003366', fontSize: '2em', marginBottom: '10px' }}>Contact Form</h1>
                    <h2 style={{ color: '#003366', fontSize: '1.5em', fontWeight: '400', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                        Send an Email
                    </h2>

                    <form onSubmit={handleSubmit} style={{ maxWidth: '700px' }}>
                        <p style={{ fontSize: '0.9em', color: '#666', marginBottom: '20px' }}>* Required field</p>

                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontWeight: '600', color: '#003366', marginBottom: '5px' }}>Name *</label>
                            <input type="text" name="name" required value={formData.name} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>

                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontWeight: '600', color: '#003366', marginBottom: '5px' }}>Email *</label>
                            <input type="email" name="email" required value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>

                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontWeight: '600', color: '#003366', marginBottom: '5px' }}>Subject *</label>
                            <input type="text" name="subject" required value={formData.subject} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
                        </div>

                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontWeight: '600', color: '#003366', marginBottom: '5px' }}>Message *</label>
                            <textarea name="message" rows="6" required value={formData.message} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }}></textarea>
                        </div>

                        <button
                            type="submit"
                            className="btn"
                            style={{
                                backgroundColor: '#007bff',
                                color: 'white',
                                padding: '12px 25px',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '1em',
                                cursor: 'pointer',
                                fontWeight: '600'
                            }}
                        >
                            Send Email
                        </button>
                    </form>

                    <div style={{ marginTop: '50px' }}>
                        <h3 style={{ color: '#003366' }}>Miscellaneous Information</h3>
                        <p style={{ color: '#555', lineHeight: '1.6' }}>
                            <strong>Headquarters:</strong><br/>
                            Carabayllo, Lima Province<br/>
                            Phone: (511) 613 2000
                        </p>
                    </div>
                </div>

                {/* --- TOAST NOTIFICATION --- */}
                {showToast && (
                    <div style={{
                        position: 'fixed',
                        bottom: '30px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#333',
                        color: '#fff',
                        padding: '16px 24px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        animation: 'fadeInUp 0.3s ease-out'
                    }}>
                        <i className="fas fa-check-circle" style={{ color: '#4caf50', fontSize: '1.2em' }}></i>
                        <span>Gracias por contactarnos. Mensaje enviado.</span>
                    </div>
                )}
                <style>{`
                    @keyframes fadeInUp {
                        from { opacity: 0; transform: translate(-50%, 20px); }
                        to { opacity: 1; transform: translate(-50%, 0); }
                    }
                `}</style>
            </main>
            <SimpleFooter />
        </>
    );
};

export default ContactUs;