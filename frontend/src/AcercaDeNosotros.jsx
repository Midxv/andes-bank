import React from 'react';
import './AcercaDeNosotros.css'; // Dedicated CSS for this page
import Header from './Header'; // Assuming you separate Header/Footer for routing
import Footer from './Footer'; // Assuming you separate Header/Footer for routing

// NOTE: For simplicity, I'm including simplified Header/Footer code below.
// In a real app, you would import Header and Footer from your App.jsx structure
// to maintain consistency across all pages.

const SimpleHeader = () => (
    <header className="main-header" style={{ position: 'relative', background: '#004085', color: 'white', padding: '15px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="logo"><i className="fas fa-mountain"></i> <h1>Andes Prime Bank</h1></div>
            <nav className="main-nav">
                <a href="/">Volver a Inicio</a>
            </nav>
        </div>
    </header>
);

const SimpleFooter = () => (
    <footer className="main-footer" style={{ background: '#004085', color: 'white', padding: '20px 0', textAlign: 'center' }}>
        <p>&copy; 2025 Andes Prime Bank. Todos los derechos reservados.</p>
    </footer>
);


function AcercaDeNosotros() {
    return (
        <>
            {/* Replace SimpleHeader with the actual Header component imported from App.jsx's structure */}
            <SimpleHeader />

            <main>
                <section className="about-hero">
                    <div className="container">
                        <h2><i className="fas fa-handshake"></i> Acerca de Andes Prime Bank</h2>
                        <p className="subtitle">Liderazgo Digital, Confianza Andina.</p>
                    </div>
                </section>

                <section className="mission-vision">
                    <div className="container grid-2-col">

                        <article className="mission-card">
                            <h3><i className="fas fa-bullseye"></i> Nuestra Misión</h3>
                            <p>Ser el socio estratégico de nuestros clientes en Perú, ofreciendo **soluciones financieras digitales y personalizadas** que preserven y hagan crecer su patrimonio con la máxima **seguridad, transparencia y eficiencia**.</p>
                        </article>

                        <article className="vision-card">
                            <h3><i className="fas fa-rocket"></i> Nuestra Visión</h3>
                            <p>Convertirnos en el banco privado digital de referencia en la región Andina, reconocido por nuestra **innovación tecnológica**, nuestra **gestión patrimonial experta** y nuestro compromiso inquebrantable con el **futuro financiero** de nuestros clientes.</p>
                        </article>

                    </div>
                </section>

                <section className="values-section">
                    <div className="container">
                        <h3><i className="fas fa-medal"></i> Nuestros Valores Fundamentales</h3>
                        <div className="values-grid">

                            <div className="value-item">
                                <i className="fas fa-balance-scale"></i>
                                <h4>Integridad</h4>
                                <p>Actuamos con la máxima honestidad y ética en todas nuestras operaciones. La confianza es nuestro activo más valioso.</p>
                            </div>

                            <div className="value-item">
                                <i className="fas fa-shield-alt"></i>
                                <h4>Seguridad</h4>
                                <p>Priorizamos la protección de los datos y el capital de nuestros clientes mediante tecnología de cifrado de vanguardia.</p>
                            </div>

                            <div className="value-item">
                                <i className="fas fa-star-of-life"></i>
                                <h4>Excelencia</h4>
                                <p>Buscamos la perfección en cada servicio, desde la aplicación móvil hasta la asesoría personalizada.</p>
                            </div>

                            <div className="value-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <h4>Compromiso con Perú</h4>
                                <p>Estamos dedicados al desarrollo económico y social del país, invirtiendo y operando bajo las más estrictas regulaciones locales.</p>
                            </div>

                        </div>
                    </div>
                </section>

                <section className="call-to-action">
                    <div className="container">
                        <h3>Inicie su Futuro Financiero con Andes Prime Bank</h3>
                        <a href="/abrir-cuenta" className="btn btn-cta">Abrir Cuenta Hoy</a>
                    </div>
                </section>
            </main>

            {/* Replace SimpleFooter with the actual Footer component imported from App.jsx's structure */}
            <SimpleFooter />
        </>
    );
}

export default AcercaDeNosotros;