"use client"

import { useState } from "react"
import type { Education } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormattingToolbar } from "@/components/formatting-toolbar"
import { Plus, Trash, ChevronUp, ChevronDown } from "lucide-react"

interface EducationFormProps {
  education: Education[]
  setEducation: (education: Education[]) => void
}

export function EducationForm({ education, setEducation }: EducationFormProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const handleChange = (index: number, field: keyof Education, value: string) => {
    const updatedEducation = [...education]
    updatedEducation[index] = { ...updatedEducation[index], [field]: value }
    setEducation(updatedEducation)
  }

  const addEducation = () => {
    setEducation([
      ...education,
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        location: "",
        description: "",
      },
    ])
    setExpandedIndex(education.length)
  }

  const removeEducation = (index: number) => {
    const updatedEducation = education.filter((_, i) => i !== index)
    setEducation(updatedEducation)
    if (expandedIndex === index) {
      setExpandedIndex(null)
    } else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1)
    }
  }

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const moveEducation = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index === 0) || (direction === "down" && index === education.length - 1)) {
      return
    }

    const newIndex = direction === "up" ? index - 1 : index + 1
    const updatedEducation = [...education]
    ;[updatedEducation[index], updatedEducation[newIndex]] = [updatedEducation[newIndex], updatedEducation[index]]

    setEducation(updatedEducation)

    if (expandedIndex === index) {
      setExpandedIndex(newIndex)
    } else if (expandedIndex === newIndex) {
      setExpandedIndex(index)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Education</h2>
        <Button onClick={addEducation} size="sm" className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add Education
        </Button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-4 text-muted-foreground">
          No education entries yet. Click "Add Education" to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader
                className="py-3 px-4 flex flex-row items-center justify-between cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <CardTitle className="text-base font-medium">
                  {edu.institution || edu.degree
                    ? `${edu.institution}${edu.degree ? ` - ${edu.degree}` : ""}`
                    : `Education Entry ${index + 1}`}
                </CardTitle>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation()
                      moveEducation(index, "up")
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
                      moveEducation(index, "down")
                    }}
                    disabled={index === education.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeEducation(index)
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
                      <Label htmlFor={`institution-${index}`}>Institution</Label>
                      <Input
                        id={`institution-${index}`}
                        value={edu.institution}
                        onChange={(e) => handleChange(index, "institution", e.target.value)}
                        placeholder="University of Example"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`degree-${index}`}>Degree</Label>
                      <Input
                        id={`degree-${index}`}
                        value={edu.degree}
                        onChange={(e) => handleChange(index, "degree", e.target.value)}
                        placeholder="Bachelor of Science"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor={`fieldOfStudy-${index}`}>Field of Study</Label>
                      <Input
                        id={`fieldOfStudy-${index}`}
                        value={edu.fieldOfStudy}
                        onChange={(e) => handleChange(index, "fieldOfStudy", e.target.value)}
                        placeholder="Computer Science"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`location-${index}`}>Location</Label>
                      <Input
                        id={`location-${index}`}
                        value={edu.location}
                        onChange={(e) => handleChange(index, "location", e.target.value)}
                        placeholder="New York, NY"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${index}`}>Start Date</Label>
                      <Input
                        id={`startDate-${index}`}
                        value={edu.startDate}
                        onChange={(e) => handleChange(index, "startDate", e.target.value)}
                        placeholder="Sep 2018"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${index}`}>End Date</Label>
                      <Input
                        id={`endDate-${index}`}
                        value={edu.endDate}
                        onChange={(e) => handleChange(index, "endDate", e.target.value)}
                        placeholder="May 2022 (or Present)"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <div className="border rounded-md">
                      <FormattingToolbar
                        text={edu.description}
                        setText={(value) => handleChange(index, "description", value)}
                      />
                      <Textarea
                        id={`description-${index}`}
                        value={edu.description}
                        onChange={(e) => handleChange(index, "description", e.target.value)}
                        placeholder="Relevant coursework, achievements, or activities..."
                        className="min-h-[100px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
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
