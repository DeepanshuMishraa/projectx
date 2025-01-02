

import { GROQ_API_KEY } from "@/config";
import Groq from "groq-sdk";
import { z } from "zod";

const groq = new Groq({ apiKey: GROQ_API_KEY, dangerouslyAllowBrowser: true });

export type ProjectInput = {
  projectName: string;
  techStack: string;
  framework: string;
  domain: string;
  complexity: number;
};

const ProjectDetailsSchema = z.object({
  name: z.string(),
  description: z.string(),
  features: z.array(z.string()),
  architecture: z.object({
    frontend: z.array(z.string()).optional(),
    backend: z.array(z.string()).optional(),
    database: z.array(z.string()).optional(),
  }),
  implementation_steps: z.array(z.string()),
  estimated_timeline: z.string(),
  learning_resources: z.array(z.string()),
});

export type ProjectDetails = z.infer<typeof ProjectDetailsSchema>;

export async function generateProjectDetails(
  input: ProjectInput
): Promise<ProjectDetails> {
  try {
    const complexityLevel = getComplexityLevel(input.complexity);

    const prompt = `Generate a detailed software project plan based on these requirements:
    - Project Name: ${input.projectName}
    - Primary Technology: ${input.techStack}
    - Framework: ${input.framework}
    - Domain: ${input.domain}
    - Complexity Level: ${complexityLevel}

    Provide a JSON response with the following structure:
    {
      "name": "Project name",
      "description": "Comprehensive project description",
      "features": ["Key feature 1", "Key feature 2", ...],
      "architecture": {
        "frontend": ["Required frontend technologies"],
        "backend": ["Required backend technologies"],
        "database": ["Required database technologies"]
      },
      "implementation_steps": ["Step 1", "Step 2", ...],
      "estimated_timeline": "Estimated completion time",
      "learning_resources": ["Resource 1", "Resource 2", ...]
    }

    Focus on practical implementation details and modern best practices.`;

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a senior software architect specialized in generating detailed, practical project plans. Provide specific, actionable guidance tailored to the user's requirements and technology choices.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message.content || "{}";

    const jsonRegex = /\{[\s\S]*\}/;
    const jsonMatch = content.match(jsonRegex);

    if (!jsonMatch) {
      throw new Error("No valid JSON response found");
    }

    const parsedData = JSON.parse(jsonMatch[0]);
    const validatedData = ProjectDetailsSchema.parse(parsedData);

    return validatedData;
  } catch (error) {
    console.error("Failed to generate project details:", error);
    throw new Error("Failed to generate project details. Please try again.");
  }
}

function getComplexityLevel(complexity: number): string {
  if (complexity <= 33) return "Beginner";
  if (complexity <= 66) return "Intermediate";
  return "Advanced";
}
