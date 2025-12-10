// andes/frontend/src/admin.jsx

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './AdminPortal.css';

const ADMIN_API_BASE = 'http://localhost:3000/api/admin';
const REGISTER_API = 'http://localhost:3000/api/register';

// Helper for generating unique Account Number (must match backend logic)
const generateAccountNumber = () => 'AP' + Math.floor(Math.random() * 900000 + 100000);

// --- User List and Dashboard Component ---
function AdminPortal() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);

    // Fetch all users from the backend
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${ADMIN_API_BASE}/users`);
            const data = await response.json();
            if (data.success) {
                setUsers(data.users);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Error de conexión con el servidor. Verifique el backend (index.js).');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Delete user logic
    const deleteUser = async (userId) => {
        if (!window.confirm(`¿Está seguro de eliminar al usuario con ID ${userId}? Esta acción es irreversible.`)) {
            return;
        }
        try {
            const response = await fetch(`${ADMIN_API_BASE}/user/${userId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.success) {
                alert(data.message);
                fetchUsers(); // Refresh list
            } else {
                alert('Error al eliminar: ' + data.message);
            }
        } catch (err) {
            alert('Error de red al intentar eliminar.');
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1>Andes Prime Bank | Portal de Administración</h1>
                <p>Gestión de Cuentas de Usuario</p>
                <button className="btn-primary" onClick={() => setShowAddModal(true)}>
                    <i className="fas fa-plus"></i> Añadir Nuevo Usuario
                </button>
            </header>

            <div className="admin-content container">
                <h2>Usuarios Registrados ({users.length})</h2>
                {loading && <p className="loading-message">Cargando datos de la base de datos...</p>}
                {error && <p className="error-message">{error}</p>}

                {!loading && !error && (
                    <div className="user-table-wrapper">
                        <table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre Completo</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Cuenta No.</th>
                                <th>Saldo (S/)</th>
                                <th>Tarjeta Status</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map(user => (
                                <tr key={user.user_id}>
                                    <td>{user.user_id}</td>
                                    <td>{user.full_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone_number}</td>
                                    <td>{user.account_id}</td>
                                    <td className="balance">S/ {user.current_balance.toFixed(2)}</td>
                                    <td>{user.credit_card_status}</td>
                                    <td>
                                        <button
                                            className="btn-delete"
                                            onClick={() => deleteUser(user.user_id)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {showAddModal && (
                <AddUserModal
                    onClose={() => setShowAddModal(false)}
                    onUserAdded={fetchUsers}
                />
            )}
        </div>
    );
}

// --- Modal Component for Adding Users ---
function AddUserModal({ onClose, onUserAdded }) {
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', password: '',
        phone: '', nationalId: '', dateOfBirth: '', monthlyIncome: 0,
        accountType: 'digital', requestCreditCard: false,
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Simulate initial login for new user
    const handleAddUser = async (e) => {
        e.preventDefault();
        setStatus('Registrando...');

        try {
            // Note: We use the existing /api/register endpoint, which inserts into both users/accounts tables.
            const response = await fetch(REGISTER_API, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (data.success) {
                setStatus('Usuario añadido con éxito! Cuenta: ' + data.accountNumber);
                onUserAdded(); // Refresh the list in the parent component
                setTimeout(onClose, 2000);
            } else {
                setStatus('Error: ' + data.message);
            }
        } catch (err) {
            setStatus('Error de conexión con el servidor. No se pudo registrar.');
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content-admin">
                <div className="modal-header-admin">
                    <h2>Añadir Nuevo Usuario</h2>
                    <button onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleAddUser}>
                    <div className="form-grid-admin">
                        <div className="form-group-admin">
                            <label>Nombre(s)</label>
                            <input name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div className="form-group-admin">
                            <label>Apellido(s)</label>
                            <input name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>
                        <div className="form-group-admin">
                            <label>Email</label>
                            <input name="email" type="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="form-group-admin">
                            <label>Teléfono (+51)</label>
                            <input name="phone" type="tel" value={formData.phone} onChange={handleChange} required maxLength="9" />
                        </div>
                        <div className="form-group-admin">
                            <label>DNI/ID Nacional</label>
                            <input name="nationalId" value={formData.nationalId} onChange={handleChange} required />
                        </div>
                        <div className="form-group-admin">
                            <label>Fecha de Nacimiento</label>
                            <input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleChange} required />
                        </div>
                        <div className="form-group-admin">
                            <label>Ingreso Mensual (S/)</label>
                            <input name="monthlyIncome" type="number" value={formData.monthlyIncome} onChange={handleChange} required min="0" />
                        </div>
                        <div className="form-group-admin">
                            <label>Contraseña</label>
                            <input name="password" type="password" value={formData.password} onChange={handleChange} required minLength="8" />
                        </div>
                    </div>

                    <p className={`status-message ${status.includes('Error') ? 'error' : 'success'}`}>{status}</p>

                    <button type="submit" className="btn-submit-admin" disabled={status.includes('Registrando')}>
                        Guardar y Activar Usuario
                    </button>
                </form>
            </div>
        </div>
    );
}


// --- Render the main component into the admin.html file ---
const rootAdmin = ReactDOM.createRoot(document.getElementById('root-admin'));
rootAdmin.render(<AdminPortal />);