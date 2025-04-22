"use client"

import { useState } from "react"
import type { Experience } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormattingToolbar } from "@/components/formatting-toolbar"
import { Plus, Trash, ChevronUp, ChevronDown } from "lucide-react"

interface ExperienceFormProps {
  experience: Experience[]
  setExperience: (experience: Experience[]) => void
}

export function ExperienceForm({ experience, setExperience }: ExperienceFormProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const handleChange = (index: number, field: keyof Experience, value: string) => {
    const updatedExperience = [...experience]
    updatedExperience[index] = { ...updatedExperience[index], [field]: value }
    setExperience(updatedExperience)
  }

  const addExperience = () => {
    setExperience([
      ...experience,
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        location: "",
        description: "",
      },
    ])
    setExpandedIndex(experience.length)
  }

  const removeExperience = (index: number) => {
    const updatedExperience = experience.filter((_, i) => i !== index)
    setExperience(updatedExperience)
    if (expandedIndex === index) {
      setExpandedIndex(null)
    } else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1)
    }
  }

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const moveExperience = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === experience.length - 1)) {
      return
    }

    const newIndex = direction === "up" ? index - 1 : index + 1
    const updatedExperience = [...experience]
    ;[updatedExperience[index], updatedExperience[newIndex]] = [updatedExperience[newIndex], updatedExperience[index]]

    setExperience(updatedExperience)

    if (expandedIndex === index) {
      setExpandedIndex(newIndex)
    } else if (expandedIndex === newIndex) {
      setExpandedIndex(index)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Work Experience</h2>
        <Button onClick={addExperience} size="sm" className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add Experience
        </Button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">
          No experience entries yet. Click "Add Experience" to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((exp, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader
                className="py-3 px-4 flex flex-row items-center justify-between cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <CardTitle className="text-base font-medium">
                  {exp.company || exp.position
                    ? `${exp.company}${exp.position ? ` - ${exp.position}` : ""}`
                    : `Experience Entry ${index + 1}`}
                </CardTitle>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      moveExperience(index, "up")
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
                      moveExperience(index, "down")
                    }}
                    disabled={index === experience.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeExperience(index)
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`company-${index}`}>Company</Label>
                      <Input
                        id={`company-${index}`}
                        value={exp.company}
                        onChange={(e) => handleChange(index, "company", e.target.value)}
                        placeholder="Example Corp"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`position-${index}`}>Position</Label>
                      <Input
                        id={`position-${index}`}
                        value={exp.position}
                        onChange={(e) => handleChange(index, "position", e.target.value)}
                        placeholder="Software Engineer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                      <Input
                        id={`startDate-${index}`}
                        value={exp.startDate}
                        onChange={(e) => handleChange(index, "startDate", e.target.value)}
                        placeholder="Jan 2020"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${index}`}>End Date</Label>
                      <Input
                        id={`endDate-${index}`}
                        value={exp.endDate}
                        onChange={(e) => handleChange(index, "endDate", e.target.value)}
                        placeholder="Present"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor={`location-${index}`}>Location</Label>
                    <Input
                      id={`location-${index}`}
                      value={exp.location}
                      onChange={(e) => handleChange(index, "location", e.target.value)}
                      placeholder="San Francisco, CA"
                    />
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <div className="border rounded-md">
                      <FormattingToolbar
                        text={exp.description}
                        setText={(value) => handleChange(index, "description", value)}
                      />
                      <Textarea
                        id={`description-${index}`}
                        value={exp.description}
                        onChange={(e) => handleChange(index, "description", e.target.value)}
                        placeholder="Describe your responsibilities and achievements..."
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
