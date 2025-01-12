"use client";

import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "next", label: "Next.js" },
  { value: "flutter", label: "Flutter" },
  { value: "reactnative", label: "React Native" },
];


type FormValues = {
  techStack: string;
  framework: string;
  domain: string;
  difficulty: string;
};

type ProjectIdea = {
  title: string;
  description: string;
  difficulty: string;
};

const ProjectGeneratorCard = () => {
  const [projectIdeas, setProjectIdeas] = useState<ProjectIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      techStack: "",
      framework: "",
      domain: "",
      difficulty: "beginner",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to generate ideas");

      const ideas = await response.json();
      setProjectIdeas(ideas);
    } catch (error) {
      console.error("Failed to generate project ideas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-4">
      <Card className="w-[400px]">
        <CardHeader className="space-y-1.5">
          <CardTitle className="text-2xl font-semibold tracking-tight">
            Project Ideas Generator
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Generate project ideas based on your preferences
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Tech Stack */}
                <FormField
                  control={form.control}
                  name="techStack"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tech Stack</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="typescript">TypeScript</SelectItem>
                            <SelectItem value="javascript">JavaScript</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="go">Go</SelectItem>
                            <SelectItem value="rust">Rust</SelectItem>
                            <SelectItem value="java">Java</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Framework */}
                <FormField
                  control={form.control}
                  name="framework"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Framework</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select framework" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {frameworks.map((framework) => (
                              <SelectItem
                                key={framework.value}
                                value={framework.value}
                              >
                                {framework.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Domain */}
                <FormField
                  control={form.control}
                  name="domain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domain</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select domain" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="frontend">Frontend</SelectItem>
                            <SelectItem value="backend">Backend</SelectItem>
                            <SelectItem value="fullstack">Fullstack</SelectItem>
                            <SelectItem value="mobile">Mobile</SelectItem>
                            <SelectItem value="ml">Machine Learning</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Difficulty */}
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Generate Ideas"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {/* Results Card */}
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Generated Project Ideas</CardTitle>
          <CardDescription>
            Select a project to see more details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {projectIdeas.map((idea, index) => (
                <Card key={index} className="p-4">
                  <h3 className="font-semibold text-lg">{idea.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {idea.description}
                  </p>
                  <div className="mt-2">
                    <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                      {idea.difficulty}
                    </span>
                  </div>
                </Card>
              ))}
              {projectIdeas.length === 0 && !isLoading && (
                <p className="text-center text-muted-foreground">
                  No project ideas generated yet. Fill out the form and click generate!
                </p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectGeneratorCard;
