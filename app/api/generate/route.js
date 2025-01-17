import Together from "together-ai";
import { NextResponse } from "next/server";
import { uploadToCloudinary } from "../../utils/cloudStorage";

const together = new Together({ apiKey: process.env.TOGETHER_API_KEY });


const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

export async function POST(req) {
  try {

    const { image, numberOfImages = 1 } = await req.json();

    if (!image) {
      return NextResponse.json(
        { error: "No image provided" },
        { status: 400, headers: corsHeaders }
      );
    }

    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const imageUrl = await uploadToCloudinary(base64Data);

    console.log("Sending request to Together AI with image URL:", imageUrl);

    const response = await together.images.create({
      model: "black-forest-labs/FLUX.1-depth",
      prompt:
        "A vibrant and expressive digital painting of this image, rendered in a dynamic watercolor and splash art style. The subject is central, with sharp, detailed features and surrounded by abstract splashes of vibrant colors like blue, orange, and yellow. The background seamlessly blends into the composition with fluid splatter effects and soft brushstrokes, creating a harmonious interplay between the subject and the surroundings. Soft lighting enhances the scene, highlighting intricate details while adding depth and vibrancy. The overall style is energetic, artistic, and modern, combining high-resolution detail with a playful yet elegant use of colors.",
      steps: 28,
      width: 1024,
      height: 768,
      n: numberOfImages,
      response_format: "b64_json",
      image_url: imageUrl,
    });

    if (!response.data || response.data.length === 0) {
      console.error("No images generated");
      return NextResponse.json(
        { error: "No images generated" },
        { status: 500, headers: corsHeaders }
      );
    }

    const images = response.data.map((img) => img.b64_json);
    console.log(`Generated ${images.length} images`);

    return NextResponse.json({ images }, { headers: corsHeaders });
  } catch (error) {
    console.error("Error generating images:", error);
    return NextResponse.json(
      { error: error.message || "An unknown error occurred" },
      { status: 500, headers: corsHeaders }
    );
  }
}


export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
