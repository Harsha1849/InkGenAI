export async function POST(req) {
    try {
        const { prompt } = await req.json(); // Get prompt from frontend
        
        const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.HF_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: prompt })
        });

        if (!response.ok) {
            throw new Error("Failed to generate image");
        }

        const imageData = await response.blob(); // Get image data

        return new Response(imageData, {
            status: 200,
            headers: { "Content-Type": "image/png" }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
