"use client"

import { useState } from "react"
import type { Project } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormattingToolbar } from "@/components/formatting-toolbar"
import { Plus, Trash, ChevronUp, ChevronDown } from "lucide-react"

interface ProjectsFormProps {
  projects: Project[]
  setProjects: (projects: Project[]) => void
}

export function ProjectsForm({ projects, setProjects }: ProjectsFormProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const handleChange = (index: number, field: keyof Project, value: string) => {
    const updatedProjects = [...projects]
    updatedProjects[index] = { ...updatedProjects[index], [field]: value }
    setProjects(updatedProjects)
  }

  const addProject = () => {
    setProjects([
      ...projects,
      {
        name: "",
        description: "",
        technologies: "",
        link: "",
        startDate: "",
        endDate: "",
      },
    ])
    setExpandedIndex(projects.length)
  }

  const removeProject = (index: number) => {
    const updatedProjects = projects.filter((_, i) => i !== index)
    setProjects(updatedProjects)
    if (expandedIndex === index) {
      setExpandedIndex(null)
    } else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1)
    }
  }

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const moveProject = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === projects.length - 1)) {
      return
    }

    const newIndex = direction === "up" ? index - 1 : index + 1
    const updatedProjects = [...projects]
    ;[updatedProjects[index], updatedProjects[newIndex]] = [updatedProjects[newIndex], updatedProjects[index]]

    setProjects(updatedProjects)

    if (expandedIndex === index) {
      setExpandedIndex(newIndex)
    } else if (expandedIndex === newIndex) {
      setExpandedIndex(index)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Projects</h2>
        <Button onClick={addProject} size="sm" className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">
          No projects yet. Click "Add Project" to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader
                className="py-3 px-4 flex flex-row items-center justify-between cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <CardTitle className="text-base font-medium">{project.name || `Project ${index + 1}`}</CardTitle>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      moveProject(index, "up")
                    }}
                    disabled={index === 0}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      moveProject(index, "down")
                    }}
                    disabled={index === projects.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeProject(index)
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                  {expandedIndex === index ? (
                    <ChevronUp className="h-4 w-4 ml-1" />
                  ) : (
                    <ChevronDown className="h-4 w-4 ml-1" />
                  )}
                </div>
              </CardHeader>

              {expandedIndex === index && (
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${index}`}>Project Name</Label>
                    <Input
                      id={`name-${index}`}
                      value={project.name}
                      onChange={(e) => handleChange(index, "name", e.target.value)}
                      placeholder="Portfolio Website"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                      <Input
                        id={`startDate-${index}`}
                        value={project.startDate}
                        onChange={(e) => handleChange(index, "startDate", e.target.value)}
                        placeholder="Jan 2022"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${index}`}>End Date</Label>
                      <Input
                        id={`endDate-${index}`}
                        value={project.endDate}
                        onChange={(e) => handleChange(index, "endDate", e.target.value)}
                        placeholder="Mar 2022 (or Ongoing)"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor={`technologies-${index}`}>Technologies Used</Label>
                    <Input
                      id={`technologies-${index}`}
                      value={project.technologies}
                      onChange={(e) => handleChange(index, "technologies", e.target.value)}
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor={`link-${index}`}>Project Link</Label>
                    <Input
                      id={`link-${index}`}
                      value={project.link}
                      onChange={(e) => handleChange(index, "link", e.target.value)}
                      placeholder="https://github.com/username/project"
                    />
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <div className="border rounded-md">
                      <FormattingToolbar
                        text={project.description}
                        setText={(value) => handleChange(index, "description", value)}
                      />
                      <Textarea
                        id={`description-${index}`}
                        value={project.description}
                        onChange={(e) => handleChange(index, "description", e.target.value)}
                        placeholder="Describe the project, your role, and key achievements..."
                        className="min-h-[150px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
