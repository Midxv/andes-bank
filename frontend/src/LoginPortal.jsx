// andes/frontend/src/LoginPortal.jsx (Connected to ContactUs)

import React, { useState } from 'react';
import { SimpleHeader, SimpleFooter } from './App';
import './LoginPortal.css';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";

// Added goToContact prop
function LoginPortal({ goToHome, onLogin, goToContact }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Set session flag BEFORE calling Firebase
        sessionStorage.setItem('andes_session_active', 'true');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            onLogin(userCredential.user);

        } catch (error) {
            sessionStorage.removeItem('andes_session_active');
            let message = "Error desconocido al iniciar sesión.";
            if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
                message = "Usuario no encontrado. Verifique su correo.";
            } else if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                message = "Contraseña incorrecta. Intente de nuevo.";
            } else if (error.code === 'auth/too-many-requests') {
                message = "Demasiados intentos fallidos. Intente más tarde.";
            }
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <SimpleHeader goToHome={goToHome} goToContact={goToContact} />
            <main className="login-page">
                <div className="container login-container">
                    <div className="login-box">
                        <h2>Acceso a Banca por Internet</h2>
                        <p className="subtitle">Ingrese su correo y contraseña para continuar.</p>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Correo Electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="ej: usuario@email.com"
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="********"
                                    disabled={isLoading}
                                />
                            </div>

                            {error && <div className="login-error-message">{error}</div>}

                            <button type="submit" className="btn btn-cta login-btn" disabled={isLoading}>
                                {isLoading ? 'Verificando credenciales...' : 'Iniciar Sesión'}
                            </button>

                            <div className="login-links">
                                <a href="#">¿Olvidó su contraseña?</a>
                                <span className="separator">|</span>

                                {/* CONNECTED CONTACT LINK */}
                                <a href="#" onClick={(e) => { e.preventDefault(); if(goToContact) goToContact(); }}>
                                    <i className="fas fa-envelope"></i> Contáctenos
                                </a>

                                <span className="separator">|</span>
                                <span className="support-phone">
                                    <i className="fas fa-phone-alt"></i> (511) 613 2000
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
            <SimpleFooter />
        </>
    );
}

export default LoginPortal;