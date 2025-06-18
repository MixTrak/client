import { useState } from "react";
import './news.css';

function News() {
    const [text1, setText1] = useState("Breaking: AI achieves sentience!");
    const [text2, setText2] = useState("Scientists confirm that artificial intelligence is now self-aware and is writing its own stories.");

    return (
        <div className="News">
            <h1>News</h1>
            <h2>{text1}</h2>
            <p>{text2}</p>
        </div>
    );
}

export default News;