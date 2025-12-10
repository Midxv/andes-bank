// andes/frontend/src/main.jsx (Complete Router Logic)

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import LoginPortal from './LoginPortal.jsx';
import UserDashboard from './UserDashboard.jsx';
import RegistrationPortal from './OpenAccount.jsx';
import ProfileBuilder from './ProfileBuilder.jsx';
import LoadingScreen from './LoadingScreen.jsx';
import CreditCardRejection from './CreditCardRejection.jsx';
import ContactUs from './ContactUs.jsx';
import './index.css';

import { auth, db } from './firebaseConfig';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Helper to check if the user has completed the multi-step form
const checkProfileStatus = async (user) => {
    if (!user) return false;
    try {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) return !!docSnap.data().profileComplete;
    } catch (error) { console.error(error); }
    return false;
};

function MainRouter() {
    const [view, setView] = useState('home');
    const [currentUser, setCurrentUser] = useState(null);
    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        // Enforce a minimum load time for the animation
        const minLoadTime = new Promise(resolve => setTimeout(resolve, 1500));

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            await minLoadTime;

            if (user) {
                // --- SECURITY CHECK: Detect Refresh ---
                const isSessionActive = sessionStorage.getItem('andes_session_active');

                if (!isSessionActive) {
                    console.warn("Security: No active session flag. Logging out.");
                    await signOut(auth);
                    setCurrentUser(null);
                    setView('home');
                    setAuthReady(true);
                    return;
                }

                // Session is valid, check profile status
                const isComplete = await checkProfileStatus(user);
                setCurrentUser(user);

                if (isComplete) {
                    setView('dashboard');
                } else {
                    setView('profileBuilder');
                }
            } else {
                // User is logged out
                setCurrentUser(null);
                if (view !== 'rejection' && view !== 'contact') {
                    setView('home');
                }
            }
            setAuthReady(true);
        });

        return () => unsubscribe();
    }, []);

    const setNavigation = (newView) => {
        setView(newView);
        window.scrollTo(0, 0);
    };

    const handleLogin = (user) => setNavigation('dashboard');

    const handleLogout = async () => {
        sessionStorage.removeItem('andes_session_active');
        await signOut(auth);
        setCurrentUser(null);
        setNavigation('home');
    };

    // Handler for Credit Card Rejection (Logout is handled inside UserDashboard)
    const handleRejection = () => {
        setNavigation('rejection');
    };

    const goToDashboard = () => setNavigation('dashboard');
    const goToProfileBuilder = () => setNavigation('profileBuilder');
    const goToContact = () => setNavigation('contact');

    // Show Loading Screen until Auth Check + Animation is done
    if (!authReady) return <LoadingScreen />;

    // --- VIEW ROUTING ---
    let CurrentComponent;

    if (view === 'rejection') {
        CurrentComponent = () => <CreditCardRejection goToHome={() => setNavigation('home')} />;
    }
    else if (view === 'contact') {
        CurrentComponent = () => <ContactUs goToHome={() => setNavigation('home')} goToLogin={() => setNavigation('login')} />;
    }
    else if (currentUser) {
        if (view === 'profileBuilder') {
            CurrentComponent = () => <ProfileBuilder user={currentUser} goToDashboard={goToDashboard} />;
        } else {
            CurrentComponent = () => (
                <UserDashboard
                    user={currentUser}
                    goToHome={() => setNavigation('home')}
                    onLogout={handleLogout}
                    onCreditCardReject={handleRejection}
                />
            );
        }
    }
    else if (view === 'openAccount') {
        CurrentComponent = () => <RegistrationPortal goToHome={() => setNavigation('home')} goToLogin={() => setNavigation('login')} goToProfileBuilder={goToProfileBuilder} />;
    }
    else if (view === 'login') {
        // IMPORTANT: Passing goToContact to LoginPortal so the link works there too
        CurrentComponent = () => <LoginPortal goToHome={() => setNavigation('home')} onLogin={handleLogin} goToContact={goToContact} />;
    }
    else {
        // Default Home View
        CurrentComponent = () => (
            <App
                goToOpenAccount={() => setNavigation('openAccount')}
                goToLogin={() => setNavigation('login')}
                goToContact={goToContact}
            />
        );
    }

    return (
        <React.StrictMode>
            <CurrentComponent />
        </React.StrictMode>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(<MainRouter />);