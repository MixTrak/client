import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function EmailVerification() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [verificationStatus, setVerificationStatus] = useState('verifying'); // 'verifying', 'success', 'error'
    const [message, setMessage] = useState('');
    const API = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`${API}/verify-email/${token}`);
                setVerificationStatus('success');
                setMessage('Email verified successfully! You can now log in to your account.');
                
                // Redirect to login after 3 seconds
                setTimeout(() => {
                    navigate('/login?verified=true');
                }, 3000);
                
            } catch (error) {
                console.error('Email verification error:', error);
                setVerificationStatus('error');
                
                if (error.response) {
                    setMessage(error.response.data.message || 'Email verification failed');
                } else {
                    setMessage('Network error. Please try again or contact support.');
                }
            }
        };

        if (token) {
            verifyEmail();
        } else {
            setVerificationStatus('error');
            setMessage('Invalid verification link');
        }
    }, [token, API, navigate]);

    const containerStyle = {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa'
    };

    const cardStyle = {
        maxWidth: '500px',
        width: '100%',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        textAlign: 'center'
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                {verificationStatus === 'verifying' && (
                    <>
                        <div className="spinner-border text-primary mb-3" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <h3 className="mb-3">Verifying Your Email</h3>
                        <p className="text-muted">Please wait while we verify your email address...</p>
                    </>
                )}

                {verificationStatus === 'success' && (
                    <>
                        <div className="text-success mb-3">
                            <svg width="64" height="64" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.061L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                            </svg>
                        </div>
                        <h3 className="text-success mb-3">Email Verified Successfully!</h3>
                        <p className="mb-4">{message}</p>
                        <p className="text-muted mb-3">Redirecting to login page in 3 seconds...</p>
                        <Link to="/login" className="btn btn-primary">
                            Go to Login Now
                        </Link>
                    </>
                )}

                {verificationStatus === 'error' && (
                    <>
                        <div className="text-danger mb-3">
                            <svg width="64" height="64" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </div>
                        <h3 className="text-danger mb-3">Verification Failed</h3>
                        <p className="mb-4">{message}</p>
                        <div className="d-grid gap-2">
                            <Link to="/register" className="btn btn-primary">
                                Register Again
                            </Link>
                            <Link to="/login" className="btn btn-outline-secondary">
                                Back to Login
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default EmailVerification;