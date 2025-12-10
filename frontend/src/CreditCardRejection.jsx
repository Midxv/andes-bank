// andes/frontend/src/CreditCardRejection.jsx

import React from 'react';
import { SimpleHeader, SimpleFooter } from './App';
import './UserDashboard.css'; // Re-use dashboard styles for consistency

const CreditCardRejection = ({ goToHome }) => {
    return (
        <>
            <SimpleHeader goToHome={goToHome} isDashboard={false} />
            <main className="homepage-main" style={{ backgroundColor: '#f4f6f8', padding: '60px 0', minHeight: '80vh' }}>
                <div className="container" style={{ maxWidth: '600px', background: 'white', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center' }}>

                    {/* Status Icon */}
                    <div style={{ fontSize: '4em', color: '#D93025', marginBottom: '20px' }}>
                        <i className="fas fa-exclamation-circle"></i>
                    </div>

                    <h2 style={{ color: '#004085', marginBottom: '15px' }}>Solicitud No Aprobada</h2>

                    <p style={{ fontSize: '1.1em', color: '#555', lineHeight: '1.6', marginBottom: '30px' }}>
                        Estimado cliente, hemos procesado su solicitud para la Tarjeta de Crédito Andes Prime.
                        Lamentablemente, en este momento <strong>no podemos aprobar su solicitud</strong> debido a que su perfil crediticio no cumple con los criterios vigentes de evaluación de riesgos.
                    </p>

                    <div style={{ textAlign: 'left', background: '#fff3f2', padding: '20px', borderRadius: '6px', border: '1px solid #ffcdd2', marginBottom: '30px' }}>
                        <h4 style={{ color: '#D93025', margin: '0 0 10px 0' }}>Razones comunes:</h4>
                        <ul style={{ margin: '0', paddingLeft: '20px', color: '#333' }}>
                            <li>Historial crediticio insuficiente.</li>
                            <li>Ingresos mensuales no verificables en el sistema.</li>
                            <li>Política interna de riesgos del banco.</li>
                        </ul>
                    </div>

                    <p style={{ fontSize: '0.9em', color: '#777', marginBottom: '30px' }}>
                        Por razones de seguridad, su sesión ha sido cerrada automáticamente al finalizar este proceso de evaluación.
                    </p>

                    <button onClick={goToHome} className="btn btn-primary" style={{ padding: '12px 30px' }}>
                        Volver al Inicio
                    </button>
                </div>
            </main>
            <SimpleFooter />
        </>
    );
};

export default CreditCardRejection;