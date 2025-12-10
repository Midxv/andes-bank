// andes/frontend/src/UserDashboard.jsx

import React, { useState, useEffect } from 'react';
import { SimpleFooter } from './App';
import './UserDashboard.css';
import { db, auth } from './firebaseConfig';
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

// ... (DashboardHeader component remains the same) ...
const DashboardHeader = ({ goToHome, handleLogout, name }) => (
    <header className="simple-header">
        <div className="container header-container">
            <div className="logo clickable-home" onClick={goToHome}>
                <i className="fas fa-mountain"></i> <h1>Andes Prime Bank</h1>
            </div>
            <div className="header-actions">
                <span className="user-greeting">Bienvenido, {name.split(' ')[0]}</span>
                <button onClick={handleLogout} className="btn btn-logout-header" title="Cerrar Sesión">
                    <i className="fas fa-sign-out-alt"></i> Salir
                </button>
            </div>
        </div>
    </header>
);

function UserDashboard({ user, goToHome, onLogout, onCreditCardReject }) { // <--- Receive new prop
    const [bankingData, setBankingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- STATIC IFSC CODE ---
    // Genuine looking code: 4 letters (ANDP = Andes Prime), 0, 6 digits (Branch)
    const STATIC_IFSC = "ANDP0001042";

    useEffect(() => {
        if (user) {
            const fetchUserData = async () => {
                setLoading(true);
                try {
                    const docSnap = await getDoc(doc(db, "users", user.uid));
                    if (docSnap.exists()) {
                        setBankingData(docSnap.data());
                    } else {
                        setError("Error: No se encontró el perfil bancario.");
                    }
                } catch (e) {
                    setError("Error al cargar datos del servidor.");
                } finally {
                    setLoading(false);
                }
            };
            fetchUserData();
        }
    }, [user]);

    // Standard Logout
    const handleLogout = async () => {
        sessionStorage.removeItem('andes_session_active'); // Clear session flag
        await signOut(auth);
        onLogout();
    };

    // --- FAKE CREDIT CARD APPLICATION HANDLER ---
    const handleCreditCardApply = async () => {
        // 1. Clear session flag immediately
        sessionStorage.removeItem('andes_session_active');
        // 2. Sign out user from Firebase
        await signOut(auth);
        // 3. Trigger the router to show the Rejection Page
        onCreditCardReject();
    };

    if (loading) return <div className="loading-container">Cargando su panel de control seguro...</div>;
    if (error) return <div className="error-container" style={{ color: 'red', textAlign: 'center', padding: '50px' }}>Error: {error}</div>;
    if (!bankingData) return <div className="error-container">Perfil de usuario no disponible.</div>;

    const { name, accountNumber, bankBalance, transactionHistory } = bankingData;
    const transactions = transactionHistory || [];

    return (
        <>
            <DashboardHeader goToHome={goToHome} handleLogout={handleLogout} name={name} />

            <main className="dashboard-page">
                <div className="container dashboard-grid">

                    {/* Sidebar */}
                    <aside className="sidebar">
                        <div className="user-info-card">
                            <h3>Hola, {name.split(' ')[0]}</h3>
                            <p>Cuenta No: **{accountNumber.slice(-4)}</p>
                            {/* STATIC IFSC DISPLAY */}
                            <p>Banco IFSC: <strong>{STATIC_IFSC}</strong></p>
                        </div>

                        <div className="action-menu-card">
                            <h4>Acciones Rápidas</h4>
                            <ul className="action-list">
                                <li><i className="fas fa-list"></i> Mini Estado de Cuenta</li>
                                <li><i className="fas fa-exchange-alt"></i> Realizar Transferencia</li>
                                {/* UPDATED BUTTON WITH REJECTION HANDLER */}
                                <li onClick={handleCreditCardApply}>
                                    <i className="fas fa-credit-card"></i> Solicitar Tarjeta de Crédito
                                </li>
                                <li><i className="fas fa-cog"></i> Gestionar Tarjeta de Débito</li>
                            </ul>
                        </div>

                        <nav className="dashboard-nav">
                            <ul><li className="active-item"><i className="fas fa-chart-line"></i> Resumen General</li></ul>
                            <button onClick={handleLogout} className="btn btn-logout" style={{marginTop: '20px'}}>
                                <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                            </button>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <section className="main-content">
                        <h2>Resumen de Cuentas</h2>

                        <div className="balance-card">
                            <div className="balance-info"><h3>Saldo Disponible</h3><p className="balance-amount">S/ {bankBalance.toFixed(2)}</p></div>
                            <button className="btn btn-transfer"><i className="fas fa-paper-plane"></i> Transferir Ahora</button>
                        </div>

                        <h2 style={{marginTop: '40px', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px'}}>Historial de Transacciones</h2>

                        <div className="transaction-history">
                            <table>
                                <thead><tr><th>Fecha</th><th>Descripción</th><th>Monto (S/)</th><th>Tipo</th></tr></thead>
                                <tbody>
                                {transactions.length > 0 ? (
                                    transactions.slice(0, 5).map((tx, index) => (
                                        <tr key={index} className={tx.amount < 0 ? 'debit' : 'credit'}>
                                            <td>{tx.date || 'N/A'}</td><td>{tx.description || 'Transacción'}</td>
                                            <td className={tx.amount < 0 ? 'text-danger' : 'text-success'}>{tx.amount < 0 ? '-' : '+'}S/ {Math.abs(tx.amount || 0).toFixed(2)}</td>
                                            <td>{tx.type || 'Pago'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="4" style={{textAlign: 'center'}}>No hay transacciones recientes.</td></tr>
                                )}
                                </tbody>
                            </table>
                            <a href="#" className="view-all-link">Ver todo el historial &rarr;</a>
                        </div>
                    </section>
                </div>
            </main>
            <SimpleFooter />
        </>
    );
}

export default UserDashboard;