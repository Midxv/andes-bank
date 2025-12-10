// andes/frontend/src/Tarifario.jsx

import React from 'react';
import './Tarifario.css'; // Dedicated CSS for clean tables
// Assuming SimpleHeader/Footer are defined in App.jsx or a separate file for routing
import { SimpleHeader, SimpleFooter } from './App';

function Tarifario() {
    return (
        <>
            <SimpleHeader />

            <main className="tarifario-page" style={{ padding: '80px 0', minHeight: '80vh' }}>
                <div className="container">
                    <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>
                        <i className="fas fa-file-invoice-dollar"></i> Programa Oficial de Tarifas de Servicio
                    </h1>
                    <p style={{ textAlign: 'center', marginBottom: '40px', color: '#666', fontSize: '1.1em' }}>
                        Vigente a partir del 01 de Enero de 2025.
                    </p>

                    <p style={{ marginBottom: '30px', borderLeft: '4px solid var(--accent-color)', paddingLeft: '15px', backgroundColor: 'var(--light-gray)' }}>
                        En cumplimiento de la normativa vigente de la Superintendencia de Banca, Seguros y AFP (**SBS**) del Perú, Andes Prime Bank pone a disposición el detalle de todas las comisiones, gastos y tarifas aplicables a nuestros productos. Las tarifas se expresan en **Soles Peruanos (S/)** e incluyen el Impuesto General a las Ventas (**IGV**) cuando corresponda.
                    </p>

                    <section className="section-tarifas">
                        <h2>1. Cuentas de Ahorro y Corrientes</h2>
                        <table className="tabla-tarifas">
                            <thead>
                            <tr>
                                <th>Concepto</th>
                                <th>Tarifa (S/)</th>
                                <th>Frecuencia</th>
                                <th>Observaciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Mantenimiento de Cuenta Digital Prime (Saldo Promedio > S/ 500)</td>
                                <td>0.00</td>
                                <td>Mensual</td>
                                <td>Gratuito por uso de canales digitales.</td>
                            </tr>
                            <tr>
                                <td>Mantenimiento de Cuenta Digital Prime (Saldo Promedio ≤ S/ 500)</td>
                                <td>10.00</td>
                                <td>Mensual</td>
                                <td>Aplica si el saldo promedio mensual cae por debajo del mínimo.</td>
                            </tr>
                            <tr>
                                <td>Retiro de efectivo en ventanilla (a partir del 4to retiro)</td>
                                <td>5.00</td>
                                <td>Por transacción</td>
                                <td>Primeros 3 retiros mensuales son gratuitos.</td>
                            </tr>
                            <tr>
                                <td>Transferencia Interbancaria Inmediata (CCI - a otros bancos)</td>
                                <td>3.50</td>
                                <td>Por transacción</td>
                                <td>Transferencias diferidas son gratuitas.</td>
                            </tr>
                            </tbody>
                        </table>
                    </section>

                    <section className="section-tarifas">
                        <h2>2. Tarjetas de Crédito</h2>
                        <table className="tabla-tarifas">
                            <thead>
                            <tr>
                                <th>Concepto</th>
                                <th>Tarifa (S/)</th>
                                <th>Frecuencia</th>
                                <th>Observaciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Membresía Anual Tarjeta Prime Gold</td>
                                <td>180.00</td>
                                <td>Anual</td>
                                <td>**Exonerable** al realizar 12 consumos mensuales mínimos de S/ 50.00 al año.</td>
                            </tr>
                            <tr>
                                <td>Envío de Estado de Cuenta Físico</td>
                                <td>5.00</td>
                                <td>Mensual</td>
                                <td>Gratuito en formato digital.</td>
                            </tr>
                            <tr>
                                <td>Retiro de efectivo con Tarjeta de Crédito (Disposición de Efectivo)</td>
                                <td>5% del monto + S/ 15.00</td>
                                <td>Por transacción</td>
                                <td>Sujeto a interés compensatorio.</td>
                            </tr>
                            <tr>
                                <td>Comisión por Pago Tardío (Mora)</td>
                                <td>40.00</td>
                                <td>Por evento</td>
                                <td>Aplicable si el pago no se realiza después de 7 días de la fecha de vencimiento.</td>
                            </tr>
                            </tbody>
                        </table>
                    </section>

                    <section className="section-tarifas">
                        <h2>3. Servicios Varios</h2>
                        <table className="tabla-tarifas">
                            <thead>
                            <tr>
                                <th>Concepto</th>
                                <th>Tarifa (S/)</th>
                                <th>Frecuencia</th>
                                <th>Observaciones</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Emisión de Cheque de Gerencia</td>
                                <td>15.00</td>
                                <td>Por cheque</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Copia de Documento (Estado de Cuenta antiguo, voucher, etc.)</td>
                                <td>10.00</td>
                                <td>Por documento</td>
                                <td>Documentos de menos de 1 año son gratuitos en Banca Digital.</td>
                            </tr>
                            </tbody>
                        </table>
                    </section>

                    <p style={{ marginTop: '50px', fontSize: '0.9em', color: '#666', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
                        *Las tasas de interés (TEA y TCEA) aplicables a préstamos y tarjetas de crédito se encuentran detalladas en la sección de Contratos y Documentos Legales. Andes Prime Bank se reserva el derecho de modificar estas tarifas previa comunicación al cliente, según la legislación vigente de la Superintendencia de Banca, Seguros y AFP (SBS).
                    </p>
                </div>
            </main>

            <SimpleFooter />
        </>
    );
}

export default Tarifario;