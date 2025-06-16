import { useNavigate } from 'react-router-dom'
import {useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const API = import.meta.env.VITE_API_URL; // Ensure this matches Vercel env var

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!email || !password) { // Added client-side validation for empty fields
            alert("Please enter both email and password.");
            return;
        }

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
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor='email'>
                            <strong>Email</strong>
                        </label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            autoComplete='off'
                            name='email'
                            className='form-control rounded-0'
                            onChange={(event) => setEmail(event.target.value)}
                            value={email} // Controlled component
                        />
                    </div>
                    {/* Password */}
                    <div className="mb-3">
                        <label htmlFor='password'>
                            <strong>Password</strong>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            autoComplete='off'
                            name='password'
                            className='form-control rounded-0'
                            onChange={(event) => setPassword(event.target.value)}
                            value={password} // Controlled component
                        />
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>
                        Login
                    </button>
                </form>
                <p>Don't Have An Account?</p>
                <Link to="/register" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
                    Register
                </Link>
            </div>
        </div>
    );
}

export default Login;