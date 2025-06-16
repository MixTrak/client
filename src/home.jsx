import React, { useEffect, useState } from 'react';
import './home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function Home() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state
    const [error, setError] = useState(null);     // Added error state
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("")
    const [text3, setText3] = useState("")
    const navigate = useNavigate(); // Initialize navigate hook

    // Ensure VITE_API_URL is set in your Vercel project environment variables
    const API = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchUserData = async () => { // Made useEffect callback async
            const email = localStorage.getItem("userEmail");

            if (!email) {
                console.log("No userEmail found in localStorage, redirecting to login.");
                setLoading(false); // Stop loading
                navigate('/login'); // Redirect to login if not logged in
                return;
            }

            try {
                // Ensure API is defined. If VITE_API_URL is not set, API will be undefined.
                if (!API) {
                    throw new Error("VITE_API_URL is not defined. Check Vercel environment variables.");
                }

                const response = await axios.get(`${API}/user/${email}`);
                setUser(response.data.user); // Access the user key
                setError(null); // Clear any previous errors
            } catch (err) {
                console.error("Failed to fetch user:", err); // Log the actual error
                // Set a user-friendly error message based on the error type
                if (err.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    setError(`Error: ${err.response.data.message || 'Could not fetch user data.'}`);
                    if (err.response.status === 404) {
                        // If user not found, might indicate a bad session or deleted user
                        localStorage.removeItem("userEmail"); // Clear invalid email
                        alert("User not found or session expired. Please log in again.");
                        navigate('/login'); // Redirect to login
                    }
                } else if (err.request) {
                    // The request was made but no response was received
                    setError("Network error: Could not reach the server. Your backend might be spinning up.");
                } else {
                    // Something else happened in setting up the request that triggered an Error
                    setError(`An unexpected error occurred: ${err.message}`);
                }
            } finally {
                setLoading(false); // Always stop loading, whether success or error
            }
        };

        fetchUserData();
    }, [API, navigate]); // Add API and navigate to dependency array

    function handleShowInfo() {
        if (user) {
            setText1(`Name: ${user.name}`)
            setText2(`Email: ${user.email}`)
            setText3(`Subject: ${user.subject}`);
        }
    }

    // Conditional rendering based on loading, error, and user states
    if (loading) { // Display loading state
        return <p>Loading user data...</p>;
    }

    if (error) { // Display error state
        return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>{error}</div>;
    }

    // Only render the content if user data is available
    if (user) {
        return (
            <>
                <h1 id='title'>Welcome {user.name}</h1>
                <button onClick={handleShowInfo} id='show'>Show</button>
                <button onClick={() => {
                    setText1("");
                    setText2("");
                    setText3("");
                }} id='hide'>Hide</button>
                <div className="textContainer">
                    <h1 id='t1'>{text1}</h1>
                    <h1 id='t2'>{text2}</h1>
                    <h1 id='t3'>{text3}</h1>
                </div>
            </>
        );
    }

    // Fallback if none of the above conditions are met (should ideally not be reached if logic is correct)
    return <p>No user data available. Please try logging in again.</p>;
}

export default Home;