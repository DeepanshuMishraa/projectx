"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Code2,
  Database,
  Layout,
  List,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import type { ProjectDetails } from "@/lib/llm";

export default function GeneratedProjectsPage() {
  const [project, setProject] = useState<ProjectDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedProject = localStorage.getItem("generatedProject");
    if (savedProject) {
      setProject(JSON.parse(savedProject));
    }
  }, []);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">No project found</h1>
        <Button onClick={() => router.push("/")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go back to generator
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex items-center mb-8">
        <Button
          onClick={() => router.push("/")}
          variant="outline"
          className="mr-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">{project.name}</h1>
      </div>

      <div className="grid gap-6">
        {/* Project Overview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{project.description}</p>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="features">
              <List className="mr-2 h-4 w-4" />
              Features
            </TabsTrigger>
            <TabsTrigger value="architecture">
              <Layout className="mr-2 h-4 w-4" />
              Architecture
            </TabsTrigger>
            <TabsTrigger value="implementation">
              <Code2 className="mr-2 h-4 w-4" />
              Implementation
            </TabsTrigger>
            <TabsTrigger value="resources">
              <BookOpen className="mr-2 h-4 w-4" />
              Resources
            </TabsTrigger>
          </TabsList>

          {/* Features Tab */}
          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
                <CardDescription>
                  Main functionalities of the project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 font-bold text-primary">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Architecture Tab */}
          <TabsContent value="architecture">
            <Card>
              <CardHeader>
                <CardTitle>Technical Architecture</CardTitle>
                <CardDescription>
                  Technology stack and components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {project.architecture.frontend && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Layout className="mr-2 h-4 w-4" />
                        Frontend
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.architecture.frontend.map((tech, index) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.architecture.backend && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Code2 className="mr-2 h-4 w-4" />
                        Backend
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.architecture.backend.map((tech, index) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.architecture.database && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Database className="mr-2 h-4 w-4" />
                        Database
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.architecture.database.map((tech, index) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Implementation Tab */}
          <TabsContent value="implementation">
            <Card>
              <CardHeader>
                <CardTitle>Implementation Steps</CardTitle>
                <CardDescription>
                  Estimated Timeline: {project.estimated_timeline}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4 list-decimal list-inside">
                  {project.implementation_steps.map((step, index) => (
                    <li key={index} className="text-muted-foreground">
                      <span className="text-foreground">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Learning Resources</CardTitle>
                <CardDescription>
                  Helpful materials and documentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {project.learning_resources.map((resource, index) => (
                    <li key={index} className="flex items-start">
                      <BookOpen className="mr-2 h-4 w-4 mt-1 flex-shrink-0" />
                      <span>{resource}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
