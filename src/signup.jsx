import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [subject, setSubject] = useState('');
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_URL;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name || !email || !password || !subject) {
            alert("All fields are required.");
            return;
        }

        axios.post(`${API}/register`, { name, email, password, subject })
            .then(result => {
                if (result.data === "User Already Exists") {
                    alert("Email is already registered. Please use a different email or login.");
                } else {
                    console.log(result);
                    alert("Registration successful! Please login.");
                    navigate('/login');
                }
            })
            .catch(error => {
                console.error("Registration error:", error);
                if (error.response) {
                    alert(`Registration failed: ${error.response.data || 'Server error'}`);
                } else if (error.request) {
                    alert("Network error: Could not connect to the server. Please try again.");
                } else {
                    alert("An unexpected error occurred during registration.");
                }
            });
    };

    // Adjusted width: Increased maxWidth to 600px for larger screens
    // 'width: 90%' ensures it's still responsive and fits on smaller screens
    const containerStyle = {
        minWidth: '600px', // Increased maximum width for desktop/larger screens
        width: '100%',     // Ensures it takes 100% of available width on smaller screens
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-4 rounded shadow" style={containerStyle}>
                <h2 className="mb-3 text-center">Register</h2>
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
                            placeholder='Enter Password'
                            autoComplete='off'
                            name='password'
                            className='form-control'
                            onChange={(event) => setPassword(event.target.value)}
                            value={password}
                        />
                    </div>
                    {/* Options */}
                    <div className="mb-3">
                        <label htmlFor="select" className="form-label">
                            <strong>Select One</strong>
                        </label>
                        <select
                            id="select"
                            name="subject"
                            className="form-select"
                            onChange={(event) => setSubject(event.target.value)}
                            defaultValue=""
                        >
                            <option value="" disabled hidden>Choose subject...</option>
                            <option>Math</option>
                            <option>English</option>
                            <option>Science</option>
                            <option>Social Studies</option>
                            <option>Computer Science</option>
                        </select>
                    </div>
                    {/* Button */}
                    <button type='submit' className='btn btn-success w-100'>
                        Register
                    </button>
                </form>
                <p className="mt-3 text-center">Already Have An Account?</p>
                <Link to="/login" className='btn btn-outline-primary w-100 text-decoration-none'>
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;