// andes/frontend/src/TarjetasDeCredito.jsx

import React from 'react';
import './TarjetasDeCredito.css';
// NOTE: Assuming SimpleHeader/Footer are defined in App.jsx or a separate file for routing
import { SimpleHeader, SimpleFooter } from './App';

// Helper component for the repeating chevron icon inside accordions
const Chevron = () => (
    <span className="span-svg-mid">
        <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
        </svg>
    </span>
);

// Helper component for the repeating download icon inside document links
const DownloadIcon = () => (
    <span>
        <svg style={{ verticalAlign: 'middle' }} width="16" height="16" fill="#323639" viewBox="0 0 18 18">
            <path className="cls-1" d="m9,12.5l-4.38-4.38,1.23-1.27,2.27,2.27V2h1.75v7.13l2.27-2.27,1.23,1.27-4.38,4.38Zm-5.25,3.5c-.48,0-.89-.17-1.24-.51s-.51-.75-.51-1.24v-2.62h1.75v2.62h10.5v-2.62h1.75v2.62c0,.48-.17.89-.51,1.24s-.75.51-1.24.51H3.75Z"/>
        </svg>
    </span>
);

// Helper component for the external link icon
const ExternalLinkIcon = () => (
    <span>
        <svg style={{ verticalAlign: 'middle' }} height="16px" width="16" fill="#323639" viewBox="0 0 18 18">
            <path className="cls-1" d="m3.56,16c-.43,0-.79-.15-1.1-.46-.3-.3-.46-.67-.46-1.1V3.56c0-.43.15-.79.46-1.1.3-.3.67-.46,1.1-.46h2.44v1.56h-2.44v10.89h10.89v-2.44h1.56v2.44c0,.43-.15.79-.46,1.1-.3.3-.67.46-1.1.46H3.56Zm3.66-4.12l-1.09-1.09,7.23-7.23h-2.8v-1.56h5.44v5.44h-1.56v-2.8l-7.23,7.23Z"/>
        </svg>
    </span>
);

function TarjetasDeCredito() {
    return (
        <>
            <SimpleHeader />

            <main className="tc-page">
                {/* --- BANNER (Cuerpo-Completo-Select) --- */}
                <div className="ctn-banner">
                    {/* Placeholder for the slider/carousel component */}
                    <div id="slider-container">
                        <div id="slider">
                            <div className="slide">
                                <div className="slide-txt">
                                    <p className="slider-txt-title">Navidad que te suma premios</p>
                                    <div className="slider-txt-sub">
                                        <p>Participa por una Smart TV Xiaomi usando tu Tarjeta de Crédito Andes Prime en compras o en disposiciones.</p>
                                    </div>
                                    <a className="slider-btn" target="_blank" href="/clientes/promociones/promocion-navidad-tc-2025.asp">Ingresa Aquí</a>
                                </div>
                                {/* [Image Placeholder] */}
                            </div>
                            {/* ... other slides would go here ... */}
                        </div>
                        {/* <div id="prev">&#10094;</div> <div id="next">&#10095;</div> <div id="page-counter"></div> */}
                    </div>
                </div>
                {/* --- FIN BANNER --- */}

                <div className="ctn-interno-cuerpo">
                    <div className="interno-cuerpo">

                        {/* --- RUTA DESGLOSABLE / BREADCRUMB --- */}
                        <div className="pre-cuerpo-ruta-desglosable">
                            <div className="pre-cuerpo-ruta">
                                <a href="/">Inicio</a>
                                <p>|</p>
                                <a href="/banca-personal.html">Clientes</a>
                                <p>|</p>
                                <p className="actual">Tarjeta de Crédito Andes Prime</p>
                            </div>
                        </div>

                        {/* --- VENTAJAS Y BOTONES (SIMULAR/PEDIR/PROMOCIONES) --- */}
                        <div className="pre-cuerpo-ventajas-btn">
                            <div className="pre-cuerpo-ventajas-btn-izq">
                                <p className="pre-cuerpo-ventajas-btn-izq-title"> Ventajas de tu Tarjeta de Crédito Andes Prime</p>

                                <div className="ventajas-info">
                                    <div className="ventajas-info-item">
                                        <i className="fas fa-file-alt"></i>
                                        <p className="ventajas-info-item-title">Cero Documentos</p>
                                        <p className="ventajas-info-item-txt">para solicitarla</p>
                                    </div>

                                    <div className="ventajas-info-item">
                                        <i className="fas fa-money-check-alt"></i>
                                        <p className="ventajas-info-item-title">Cero Comisiones</p>
                                        <p>para retiros en canales propios</p>
                                    </div>

                                    <div className="ventajas-info-item">
                                        <i className="fas fa-tags"></i>
                                        <p className="ventajas-info-item-title">Cero membresía</p>
                                        <p>y sin condiciones</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pre-cuerpo-ventajas-btn-der">
                                <a target="_blank" href="https://bnenlinea.bn.com.pe/SIMU/" className="pre-cuerpo-ventajas-btn-der-btn btn-simulate">
                                    Simula tu tarjeta
                                </a>

                                <a target="_blank" href="https://api.whatsapp.com/send/?phone=51966216942&text=Hola,+solicito+informacion+Tarjeta+de+Crédito+Andes+Prime" className="pre-cuerpo-ventajas-btn-der-btn btn-whatsapp">
                                    Pídelo aquí
                                </a>

                                <a target="_blank" href="/promociones" className="pre-cuerpo-ventajas-btn-der-btn btn-promotions">
                                    <i className="fas fa-gift"></i> Promociones
                                </a>
                            </div>
                        </div>

                        {/* --- CONTENIDO DESGLOSABLE (Accordion-Style) --- */}
                        <div className="ctn-title-desglosable-general">

                            {/* 1. BENEFICIOS */}
                            <div className="ctn-prest-title active">
                                <div className="ctn-pre-txt-title">
                                    <p className="pp-title">Beneficios</p>
                                    <Chevron />
                                </div>
                                <div className="pp-txt-enlaces">
                                    <div className="pp-txt-enlaces-txt">
                                        <ul className="nivel-1 sin-estilos-txt">
                                            <li> Compra en millones de establecimientos y por internet.</li>
                                            <li> Retiras efectivo en canales del banco y en cajeros automáticos del Perú y el mundo afiliados a la red Mastercard.</li>
                                            <li> Compra de manera segura usando tu clave secreta en cada operación.</li>
                                            <li> No cobra membresía.</li>
                                            <li> Puedes solicitar hasta 4 tarjetas adicionales gratis.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* 2. CARACTERISTICAS */}
                            <div className="ctn-prest-title">
                                <div className="ctn-pre-txt-title">
                                    <p className="pp-title">Características</p>
                                    <Chevron />
                                </div>
                                <div className="pp-txt-enlaces">
                                    <div className="pp-txt-enlaces-txt">
                                        <ul className="nivel-1 sin-estilos-txt">
                                            <li> Puedes solicitar una tarjeta Clásica, Gold y Platinum, sujeto a evaluación crediticia.</li>
                                            <li> Puedes acceder hasta S/ 50,000 de línea de crédito, sujeto a evaluación crediticia.</li>
                                            <li> Retiro de efectivo de hasta el 100% de tu línea de crédito.</li>
                                            <li> Cargo automático del pago mínimo, de tu cuenta de ahorros del banco.</li>
                                            <li> Consumo en soles.</li>
                                            <li> Entrega de tu tarjeta al instante.</li>
                                            <li> Tu tarjeta y adicionales tienen una vigencia de 4 años.</li>
                                            <li> Modalidad para compras: crédito revolvente (factor 1/48) y cuotas, y disposición en efectivo hasta en 48 cuotas o revolvente.</li>
                                            <li> Puedes elegir el envío de tu estado de cuenta virtual o físico.</li>
                                            <li> Tu fecha de pago se asigna según el <a target="_blank" href="/cronograma-pagos/cronograma-pagos.asp" className="a-enlaces">Cronograma Anual de Remuneraciones y Pensiones</a>.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* 3. REQUISITOS */}
                            <div className="ctn-prest-title">
                                <div className="ctn-pre-txt-title">
                                    <p className="pp-title">Requisitos</p>
                                    <Chevron />
                                </div>
                                <div className="pp-txt-enlaces">
                                    <div className="pp-txt-enlaces-txt">
                                        <ul className="nivel-1 sin-estilos-txt">
                                            <li>Ser trabajador o pensionista del sector público y recibir su remuneración o pensión mensual en Andes Prime Bank.</li>
                                            <li>Documento Nacional de Identidad (DNI) o carnet de extranjería, vigente.</li>
                                            <li>Tarjeta Débito Andes Prime activa.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* 4. SERVICIOS Y CANALES */}
                            <div className="ctn-prest-title">
                                <div className="ctn-pre-txt-title">
                                    <p className="pp-title">Servicios y canales</p>
                                    <Chevron />
                                </div>
                                <div className="pp-txt-enlaces">
                                    <div className="pp-txt-enlaces-txt">
                                        <ul className="nivel-1">
                                            <li>Retiro de efectivo:</li>
                                            <ul className="nivel-2">
                                                <li> En los cajeros automáticos, agentes Andes Prime y agencias, puedes retirar efectivo sin comisiones:</li>
                                                <li> En cajeros automáticos, desde 4 hasta 48 cuotas, monto máximo S/ 800.00 en el día y hasta 4 operaciones diarias como máximo.</li>
                                                <li> En agentes Andes Prime, desde 4 hasta 48 cuotas, monto máximo S/ 400.00 por operación y S/ 800.00 en el día; y máximo 3 operaciones diarias.</li>
                                                <li> En cajeros automáticos de otros bancos y de toda la red mundial Mastercard, puedes retirar efectivo (sujeto a comisiones).</li>
                                            </ul>

                                            <li>Pago de deuda:</li>
                                            <ul className="nivel-2">
                                                <li> En los agentes Andes Prime, puedes realizar el pago de deuda en efectivo, sin comisión, monto máximo de S/ 500.00 por operación y S/ 1 500.00 en el día.</li>
                                                <li> En las agencias, puedes realizar el pago a cuenta o el pago total de tu deuda o realizarlo vía transferencia interbancaria.</li>
                                            </ul>

                                            <li>Consulta de saldo y movimientos:</li>
                                            <ul className="nivel-2">
                                                <li> En Banca por Internet, puedes consultar tus saldos y últimos movimientos de tarjeta y estado de cuenta de los 3 últimos meses.</li>
                                            </ul>

                                            <li>Micropagos:</li>
                                            <ul className="nivel-2">
                                                <li> Son operaciones en las que no se requiere ingresar la clave secreta de tu tarjeta, firma del voucher u otro factor de autenticación en los puntos de venta. El importe límite permitido es de S/150.00 soles por transacción.</li>
                                            </ul>

                                            <li>Canales de atención presencial:</li>
                                            <ul className="txt-enlace-plomo pl-20">
                                                <li> Agencias del banco en Lima Metropolitana y a nivel Nacional.</li>
                                                <li> Cajeros automáticos y Agentes Andes Prime en Lima Metropolitana y Departamentos.</li>
                                            </ul>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* 5. DOCUMENTOS */}
                            <div className="ctn-prest-title">
                                <div className="ctn-pre-txt-title">
                                    <p className="pp-title">Documentos</p>
                                    <Chevron />
                                </div>
                                <div className="pp-txt-enlaces">
                                    <div className="pp-txt-enlaces-txt">
                                        <ul className="nivel-1 sin-estilo-lista-nivel-2">

                                            <li>Formularios contractuales</li>
                                            <ul className="nivel-2">
                                                <li><a target="_blank" href="/documentos/solicitud-tarjeta-credito.pdf" className="enlaces-documentos"><DownloadIcon /> Solicitud de tarjeta de Crédito</a></li>
                                                <li><a target="_blank" href="/documentos/contrato-tarjeta-credito.pdf" className="enlaces-documentos"><DownloadIcon /> Contrato de tarjeta de Crédito</a></li>
                                                <li><a target="_blank" href="/documentos/hoja-resumen-tarjeta-credito.pdf" className="enlaces-documentos"><DownloadIcon /> Hoja resumen de tarjeta de Crédito</a></li>
                                            </ul>

                                            <li>Tasas y comisiones, simulador, fórmulas y ejemplos</li>
                                            <ul className="nivel-2">
                                                <li><a target="_blank" href="/tarifario.html" className="enlaces-documentos"><DownloadIcon /> Tasas y comisiones</a></li>
                                                <li><a target="_blank" href="https://bnenlinea.bn.com.pe/SIMU/" className="enlaces-documentos"><ExternalLinkIcon /> Simulador de pago</a></li>
                                                <li><a target="_blank" href="/documentos/formulas-liquidacion-intereses-productos-activos.pdf" className="enlaces-documentos"><DownloadIcon /> Fórmulas y ejemplos para la liquidación de intereses</a></li>
                                            </ul>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* 6. SEGURO DE DESGRAVAMEN */}
                            <div className="ctn-prest-title">
                                <div className="ctn-pre-txt-title">
                                    <p className="pp-title">Seguro de Desgravamen</p>
                                    <Chevron />
                                </div>
                                <div className="pp-txt-enlaces">
                                    <div className="pp-txt-enlaces-txt">
                                        <ul className="nivel-1">
                                            <li>Cuentas con un Seguro de Desgravamen, el cual cubre el saldo deudor, en caso ocurra un siniestro al titular de la tarjeta:</li>
                                            <ul className="nivel-2">
                                                <li>Fallecimiento por muerte natural y muerte accidental.</li>
                                                <li>Invalidez total y permanente por accidente.</li>
                                            </ul>
                                            <li className="sin-estilo-lista">Tienes derecho a elegir entre el seguro obligatorio que ofrece el Banco o un seguro directamente contratado por ti, endosado a favor del Banco.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* 7. HAZLO EN 2 PASOS */}
                            <div className="pasos-4 ctn-prest-title">
                                <div className="ctn-pre-txt-title">
                                    <p className="pp-title">Hazlo en 2 pasos</p>
                                    <Chevron />
                                </div>
                                <div className="contenido-pasos-4 pp-txt-enlaces">
                                    <div className="pp-txt-enlaces-txt">
                                        <ul className="nivel-1 nivel-1-numeracion">
                                            <li>Pasa la evaluación</li>
                                            <ul className="nivel-2">
                                                <li className="sin-estilo-lista">Acércate a la agencia del Andes Prime Bank más cercana, o consulta por WhatsApp indicando tu número de DNI.</li>
                                            </ul>

                                            <li>Recibe tu tarjeta de crédito</li>
                                            <ul className="nivel-2">
                                                <li className="sin-estilo-lista">Según tu evaluación, el personal te entregará inmediatamente la tarjeta de crédito seleccionada.</li>
                                            </ul>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <SimpleFooter />
        </>
    );
}

export default TarjetasDeCredito;