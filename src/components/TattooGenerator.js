'use client';
import { useState } from "react";

export default function TattooGenerator() {
    const [prompt, setPrompt] = useState("");
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateTattoo = async () => {
        setLoading(true);
        setImage(null);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt }),
            });

            if (!response.ok) throw new Error("Failed to generate image");

            const blob = await response.blob();
            setImage(URL.createObjectURL(blob));
        } catch (error) {
            alert("Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>AI Tattoo Generator</h1>
            <input
                type="text"
                placeholder="Describe your tattoo idea..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
            />
            <br />
            <button onClick={generateTattoo} disabled={loading} style={{ padding: "10px 20px" }}>
                {loading ? "Generating..." : "Generate Tattoo"}
            </button>
            <div>
                {image && <img src={image} alt="Tattoo Design" style={{ marginTop: "20px", maxWidth: "100%" }} />}
            </div>
        </div>
    );
}
