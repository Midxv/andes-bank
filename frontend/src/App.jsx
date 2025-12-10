// andes/frontend/src/App.jsx (Final Version: All Feature Icons Link to Login)

import React, { useState, useEffect } from 'react';

// --- Shared Components (Header and Footer) ---

export const SimpleHeader = ({ goToHome, isDashboard, goToLogin, goToContact }) => {
    const logoTextStyle = {
        fontSize: '1.2em',
        margin: '0 0 0 10px',
        fontWeight: '700',
        color: '#ffffff',
        display: 'inline-block'
    };

    return (
        <header className="simple-header auth-banking-header">
            <div className="container header-container">
                {/* 1. PERSISTENT BANK NAME/LOGO */}
                <div className="logo clickable-home" onClick={goToHome} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 'auto' }}>
                    <i className="fas fa-mountain" style={{ fontSize: '1.5em' }}></i>
                    <h1 style={logoTextStyle}>Andes Prime Bank</h1>
                </div>

                {/* 2. MAIN NAVIGATION LINKS */}
                <nav className="main-nav">
                    <a href="#" onClick={(e) => { e.preventDefault(); if(goToLogin) goToLogin(); }}>Personal</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); if(goToLogin) goToLogin(); }}>Business</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); if(goToLogin) goToLogin(); }}>Investments</a>
                    <a href="#" onClick={(e) => { e.preventDefault(); if(goToContact) goToContact(); }}>Contact</a>
                </nav>

                {/* 3. LOGIN BUTTON (Desktop Only) */}
                {!isDashboard && goToLogin && (
                    <button
                        onClick={goToLogin}
                        className="btn-login-nav btn-high-contrast"
                    >
                        <i className="fas fa-lock"></i> Iniciar Sesión
                    </button>
                )}
            </div>
        </header>
    );
};

export const SimpleFooter = () => (
    <footer className="simple-footer footer-redesign">
        <div className="container footer-grid-container">
            <div className="footer-column">
                <h4>Sobre Nosotros</h4>
                <a href="#">Misión y Visión</a>
                <a href="#">Medios de Prensa</a>
                <a href="#">Carreras</a>
            </div>
            <div className="footer-column">
                <h4>Servicios</h4>
                <a href="#">Pagos en Línea</a>
                <a href="#">Tasas de Interés</a>
                <a href="#">Calculadoras</a>
            </div>
            <div className="footer-column">
                <h4>Ayuda y Legal</h4>
                <a href="#" className="footer-link">Preguntas Frecuentes</a>
                <a href="#" className="footer-link">Política de Privacidad</a>
                <a href="#" className="footer-link">Términos y Condiciones</a>
            </div>
            <div className="footer-column">
                <h4>Soporte</h4>
                <div style={{ color: '#ccc', fontSize: '0.9em', lineHeight: '1.6' }}>
                    <p style={{ margin: '0 0 10px 0' }}>
                        <i className="fas fa-phone-alt" style={{ color: '#fca311', marginRight: '8px' }}></i>
                        (511) 613 2000
                    </p>
                    <p style={{ margin: 0 }}>
                        <i className="fas fa-map-marker-alt" style={{ color: '#fca311', marginRight: '8px' }}></i>
                        Carabayllo, Lima Province
                    </p>
                </div>
            </div>
        </div>
        <div className="footer-bottom-bar">
            &copy; 2025 Andes Prime Bank. Secure Digital Banking in Peru.
        </div>
    </footer>
);


// --- Main Homepage Component ---
function App({ goToOpenAccount, goToLogin, goToContact }) {

    // --- HERO CAROUSEL LOGIC ---
    const heroImages = [
        "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?q=80&w=2070&auto=format&fit=crop", // Family
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1932&auto=format&fit=crop", // Young People
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=2070&auto=format&fit=crop"  // Child with Dog
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // --- STYLES ---
    const heroSectionContainerStyle = {
        position: 'relative',
        height: '600px',
        overflow: 'hidden',
        color: '#ffffff',
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 48, 100, 0.55)',
        zIndex: 2,
        display: 'flex',
        alignItems: 'center'
    };

    const heroContentStyle = {
        textAlign: 'left',
        color: '#ffffff',
        maxWidth: '800px',
        position: 'relative',
        zIndex: 3
    };

    return (
        <>
            <SimpleHeader goToHome={goToOpenAccount} goToLogin={goToLogin} goToContact={goToContact} />

            <main className="homepage-main">
                {/* --- HERO SECTION CAROUSEL --- */}
                <div style={heroSectionContainerStyle}>
                    {heroImages.map((imgUrl, index) => (
                        <div
                            key={index}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                backgroundImage: `url('${imgUrl}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                opacity: currentImageIndex === index ? 1 : 0,
                                transform: currentImageIndex === index ? 'scale(1.05)' : 'scale(1)',
                                transition: 'opacity 1s ease-in-out, transform 3s ease-out',
                                zIndex: 1
                            }}
                        />
                    ))}

                    <div style={overlayStyle}>
                        <div className="container" style={heroContentStyle}>
                            <h1 className="hero-heading" style={{ color: '#ffffff', textShadow: '0 2px 5px rgba(0,0,0,0.6)' }}>
                                Building a better future for your family.
                            </h1>
                            <p style={{ fontSize: '1.5em', marginBottom: '40px', color: '#f0f0f0', textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
                                Trusted by millions in Peru. Secure, digital, and always by your side.
                            </p>
                            <div className="hero-actions">
                                <button onClick={goToOpenAccount} className="btn btn-open-account btn-large-cta">
                                    Abrir Cuenta Ahora
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- FEATURE GRID (ALL ITEMS REDIRECT TO LOGIN) --- */}
                <div className="container feature-grid-redesign feature-authentic-spacing">

                    <div className="feature-item-redesign" onClick={goToLogin} style={{ cursor: 'pointer' }} title="Cuentas">
                        <i className="fas fa-wallet feature-icon"></i>
                        <p>Accounts</p>
                    </div>

                    <div className="feature-item-redesign" onClick={goToLogin} style={{ cursor: 'pointer' }} title="Tarjetas">
                        <i className="fas fa-credit-card feature-icon"></i>
                        <p>Credit Cards</p>
                    </div>

                    <div className="feature-item-redesign" onClick={goToLogin} style={{ cursor: 'pointer' }} title="Inversiones">
                        <i className="fas fa-chart-line feature-icon"></i>
                        <p>Investments</p>
                    </div>

                    <div className="feature-item-redesign" onClick={goToLogin} style={{ cursor: 'pointer' }} title="Transferencias">
                        <i className="fas fa-exchange-alt feature-icon"></i>
                        <p>Transfers</p>
                    </div>

                    <div className="feature-item-redesign" onClick={goToLogin} style={{ cursor: 'pointer' }} title="Préstamos">
                        <i className="fas fa-home feature-icon"></i>
                        <p>Loans</p>
                    </div>

                    <div className="feature-item-redesign" onClick={goToLogin} style={{ cursor: 'pointer' }} title="Seguros">
                        <i className="fas fa-shield-alt feature-icon"></i>
                        <p>Insurance</p>
                    </div>

                </div>

                {/* --- BOTTOM CONTENT --- */}
                <div className="bottom-content-section">
                    <div className="container content-grid">
                        <div className="news-promotions">
                            <h3>Novedades y Promociones</h3>
                            <div className="news-item">
                                <h4>Nueva Tasa Preferencial de Ahorro</h4>
                                <p>Publicado: Diciembre 10, 2025</p>
                            </div>
                            <div className="news-item">
                                <h4>Campaña de Crédito Hipotecario 2026</h4>
                                <p>Publicado: Noviembre 25, 2025</p>
                            </div>
                        </div>

                        <div className="security-fraud">
                            <h3>Tu Seguridad es Primero</h3>
                            <div className="security-box">
                                <i className="fas fa-shield-alt security-icon"></i>
                                <h4>ALTO AL FRAUDE</h4>
                                <p>Aprende a reconocer estafas y protege tu información.</p>

                                <a
                                    href="https://www.cgap.org/sites/default/files/CGAP-Financial-Inclusion-and-Consumer-Protection-in-Peru-Feb-2010.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="security-link"
                                >
                                    Más información
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <SimpleFooter />
        </>
    );
}

export default App;