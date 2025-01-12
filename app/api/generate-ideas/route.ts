import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY as string, 
  dangerouslyAllowBrowser: true,
});

export async function POST(request: NextRequest) {
  try {
    const { techStack, framework, domain, difficulty } = await request.json();

    const prompt = `Generate 10-15 unique and creative project ideas for a ${difficulty} level developer using:
    - Technology: ${techStack}
    - Framework: ${framework}
    - Domain: ${domain}

    For each project idea, provide:
    1. A concise but catchy title
    2. A brief description (2-3 sentences) explaining what the project does and its main features
    3. The difficulty level (beginner/intermediate/advanced)
    4. The Projects should be unique and not avaible before on the internet.
    5. The Level should increase from beginner to super advanced.

    Return the response as a JSON array with this structure:
    [
      {
        "title": "Project Title",
        "description": "Project description",
        "difficulty": "difficulty level"
      }
    ]

    Focus on practical, engaging projects that would help developers learn and build their portfolio.`;

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a creative programming mentor specialized in suggesting practical, engaging project ideas that help developers learn and grow.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.8,
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message.content || "[]";
    const jsonMatch = content.match(/\[[\s\S]*\]/);

    if (!jsonMatch) {
      throw new Error("No valid JSON response found");
    }

    const projectIdeas = JSON.parse(jsonMatch[0]);

    return NextResponse.json(projectIdeas);
  } catch (error) {
    console.error("Failed to generate project ideas:", error);
    return NextResponse.json(
      { error: "Failed to generate project ideas" },
      { status: 500 }
    );
  }
}
