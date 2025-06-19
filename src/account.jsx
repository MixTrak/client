import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './account.css';

function Account() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [text3, setText3] = useState("");
    const navigate = useNavigate();

    const API = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchUserData = async () => {
            const email = localStorage.getItem("userEmail");

            if (!email) {
                console.log("No userEmail found in localStorage, redirecting to login.");
                setLoading(false);
                navigate('/login');
                return;
            }

            try {
                if (!API) {
                    throw new Error("VITE_API_URL is not defined.");
                }

                const response = await axios.get(`${API}/user/${email}`);
                const fetchedUser = response.data.user;

                setUser(fetchedUser);
                setText1(fetchedUser.name);
                setText2(fetchedUser.email);
                setText3(fetchedUser.password);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch user:", err);
                if (err.response) {
                    setError(`Error: ${err.response.data.message || 'Could not fetch user data.'}`);
                    if (err.response.status === 404) {
                        localStorage.removeItem("userEmail");
                        alert("User not found or session expired. Please log in again.");
                        navigate('/login');
                    }
                } else if (err.request) {
                    setError("Network error: Could not reach the server.");
                } else {
                    setError(`Unexpected error: ${err.message}`);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [API, navigate]);

    if (loading) {
        return <p>Loading user data...</p>;
    }

    if (error) {
        return <div style={{ color: 'red', textAlign: 'center', padding: '20px' }}>{error}</div>;
    }
    return (
        <div className="container mt-5">
            <div className="card p-4">
                <h2>Account Information:</h2>
                <p><strong>Name:</strong> {text1}</p>
                <p><strong>Email:</strong> {text2}</p>
                <p><strong>Password</strong> {text3}</p>
            </div>
        </div>
    );
}

export default Account;