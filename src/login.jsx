import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_URL; // Ensure this matches Vercel env var

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email.trim() || !password.trim()) { // Ensure fields are not just whitespace
            alert("Please enter both email and password.");
            return;
        }

        setLoading(true); // Set loading to true
        axios.post(`${API}/login`, { email, password })
            .then(result => {
                console.log(result);
                if (result.data.message === "Success") {
                    localStorage.setItem("userEmail", result.data.user.email);
                    navigate('/home');
                } else {
                    // Display specific error messages from the backend
                    alert(result.data.message);
                }
                setLoading(false); // Set loading to false
            })
            .catch(error => {
                console.error("Login error:", error); // Log the actual error
                if (error.response) {
                    // Server responded with an error (e.g., 401, 404, 500)
                    alert(`Login failed: ${error.response.data.message || 'Server error'}`);
                } else if (error.request) {
                    // Request was made but no response (e.g., network issue, backend down)
                    alert("Network error: Could not connect to the server. Please try again.");
                } else {
                    // Something else happened
                    alert("An unexpected error occurred during login.");
                }
                setLoading(false); // Set loading to false
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
            <div className="bg-white p-4 rounded shadow" style={containerStyle}> {/* Adjusted padding, added shadow, applied style */}
                <h2 className="mb-3 text-center">Login</h2> {/* Centered heading */}
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor='email' className="form-label"> {/* Added form-label */}
                            <strong>Email</strong>
                        </label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            autoComplete='off'
                            name='email'
                            className='form-control'
                            onChange={(event) => setEmail(event.target.value)}
                            value={email} // Controlled component
                        />
                    </div>
                    {/* Password */}
                    <div className="mb-3">
                        <label htmlFor='password' className="form-label"> {/* Added form-label */}
                            <strong>Password</strong>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            autoComplete='off'
                            name='password'
                            className='form-control' 
                            onChange={(event) => setPassword(event.target.value)}
                            value={password} // Controlled component
                        />
                    </div>
                    <button type='submit' className='btn btn-success w-100' disabled={loading}>
                        {loading ? "Loading..." : "Login"}
                    </button>
                </form>
                <p className="mt-3 text-center">Don't Have An Account?</p> {/* Added margin-top and centered text */}
                <Link to="/register" className='btn btn-outline-primary w-100 text-decoration-none'> {/* Changed to outline button */}
                    Register
                </Link>
            </div>
        </div>
    );
}

export default Login;