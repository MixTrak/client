import React, { useEffect, useState } from 'react';
import './home.css';
import axios from 'axios';

function Home() {
    const [user, setUser] = useState(null);
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("")
    const [text3, setText3] = useState("")
    const API = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const email = localStorage.getItem("userEmail");
        if (email) {
            axios.get(`${API}/user/${email}`)
                .then(response => {
                    setUser(response.data.user); // Access the user key
                })
                .catch(error => {
                    console.error("Failed to fetch user", error);
                });
        }
    }, []);

    function handleShowInfo() {
        if (user) {
            setText1(`Name: ${user.name}`)
            setText2(`Email: ${user.email}`)
            setText3(`Subject: ${user.subject}`);
        }
    }
    
    return (
        <>
            {user ? (
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
            ) : (
                <p>Loading user data...</p>
            )}
        </>
    );
}

export default Home;
