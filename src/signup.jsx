import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_URL;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name.trim() || !email.trim() || !password.trim()) {
            setMessage("All fields are required.");
            setMessageType('error');
            return;
        }

        setLoading(true);
        setMessage('');

        axios.post(`${API}/register`, { name, email, password })
            .then(result => {
                console.log(result);
                if (result.status === 201) {
                    setMessage("Registration successful! Please check your email and verify your account before logging in.");
                    setMessageType('success');
                    // Clear form
                    setName('');
                    setEmail('');
                    setPassword('');
                } else if (result.status === 200) {
                    // Resent verification email case
                    setMessage(result.data.message);
                    setMessageType('success');
                }
                setLoading(false);
            })
            .catch(error => {
                console.error("Registration error:", error);
                if (error.response) {
                    setMessage(error.response.data.message || 'Registration failed');
                    setMessageType('error');
                } else if (error.request) {
                    setMessage("Network error: Could not connect to the server. Please try again.");
                    setMessageType('error');
                } else {
                    setMessage("An unexpected error occurred during registration.");
                    setMessageType('error');
                }
                setLoading(false);
            });
    };

    const handleResendVerification = () => {
        if (!email.trim()) {
            setMessage("Please enter your email address first.");
            setMessageType('error');
            return;
        }

        setLoading(true);
        axios.post(`${API}/resend-verification`, { email })
            .then(result => {
                setMessage("Verification email sent successfully. Please check your inbox.");
                setMessageType('success');
                setLoading(false);
            })
            .catch(error => {
                console.error("Resend verification error:", error);
                if (error.response) {
                    setMessage(error.response.data.message || 'Failed to resend verification email');
                } else if (error.request) {
                    setMessage("Network error: Could not connect to the server. Please try again.");
                } else {
                    setMessage("An unexpected error occurred while resending verification email.");
                }
                setMessageType('error');
                setLoading(false);
            });
    };

    const containerStyle = {
        minWidth: '600px',
        width: '100%',
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-4 rounded shadow" style={containerStyle}>
                <h2 className="mb-3 text-center">Register</h2>
                
                {/* Message Display */}
                {message && (
                    <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} role="alert">
                        {message}
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={() => setMessage('')}
                            aria-label="Close"
                        ></button>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-3">
                        <label htmlFor='name' className="form-label">
                            <strong>Name</strong>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter Name'
                            autoComplete='off'
                            name='name'
                            className='form-control'
                            onChange={(event) => setName(event.target.value)}
                            value={name}
                        />
                    </div>
                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor='email' className="form-label">
                            <strong>Email</strong>
                        </label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            autoComplete='off'
                            name='email'
                            className='form-control'
                            onChange={(event) => setEmail(event.target.value)}
                            value={email}
                        />
                    </div>
                    {/* Password */}
                    <div className="mb-3">
                        <label htmlFor='password' className="form-label">
                            <strong>Password</strong>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password (min 8 characters)'
                            autoComplete='off'
                            name='password'
                            className='form-control'
                            onChange={(event) => setPassword(event.target.value)}
                            value={password}
                        />
                    </div>
                    {/* Register Button */}
                    <button type='submit' className='btn btn-success w-100 mb-3' disabled={loading}>
                        {loading ? "Processing..." : "Register"}
                    </button>
                </form>

                {/* Resend Verification Button */}
                <div className="text-center mb-3">
                    <button 
                        type='button' 
                        className='btn btn-outline-info btn-sm'
                        onClick={handleResendVerification}
                        disabled={loading}
                    >
                        Didn't receive verification email? Resend
                    </button>
                </div>

                <p className="mt-3 text-center">Already Have An Account?</p>
                <Link to="/login" className='btn btn-outline-primary w-100 text-decoration-none'>
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;