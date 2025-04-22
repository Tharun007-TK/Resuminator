"use client"

import { useState } from "react"
import type { Skills } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, X } from "lucide-react"

interface SkillsFormProps {
  skills: Skills
  setSkills: (skills: Skills) => void
}

export function SkillsForm({ skills, setSkills }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState("")
  const [newCategory, setNewCategory] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const addCategory = () => {
    if (!newCategory.trim()) return

    if (!skills.categories.includes(newCategory)) {
      setSkills({
        ...skills,
        categories: [...skills.categories, newCategory],
        skillsByCategory: {
          ...skills.skillsByCategory,
          [newCategory]: [],
        },
      })
      setSelectedCategory(newCategory)
    }

    setNewCategory("")
  }

  const removeCategory = (category: string) => {
    const { [category]: _, ...restSkillsByCategory } = skills.skillsByCategory

    setSkills({
      ...skills,
      categories: skills.categories.filter((c) => c !== category),
      skillsByCategory: restSkillsByCategory,
    })

    if (selectedCategory === category) {
      setSelectedCategory(null)
    }
  }

  const addSkill = () => {
    if (!newSkill.trim() || !selectedCategory) return

    setSkills({
      ...skills,
      skillsByCategory: {
        ...skills.skillsByCategory,
        [selectedCategory]: [...skills.skillsByCategory[selectedCategory], newSkill],
      },
    })

    setNewSkill("")
  }

  const removeSkill = (category: string, skillIndex: number) => {
    setSkills({
      ...skills,
      skillsByCategory: {
        ...skills.skillsByCategory,
        [category]: skills.skillsByCategory[category].filter((_, i) => i !== skillIndex),
      },
    })
  }

  const handleOtherSkillsChange = (value: string) => {
    setSkills({
      ...skills,
      otherSkills: value,
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Skills</h2>

      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <Label>Skill Categories</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {skills.categories.map((category) => (
              <div
                key={category}
                className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 cursor-pointer ${
                  selectedCategory === category ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 rounded-full ml-1 hover:bg-primary-foreground/20"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeCategory(category)
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Add new category (e.g., Programming Languages)"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addCategory()
                }
              }}
            />
            <Button onClick={addCategory} className="flex-shrink-0">
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </div>

        {selectedCategory && (
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium mb-3">{selectedCategory} Skills</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.skillsByCategory[selectedCategory]?.map((skill, index) => (
                  <div key={index} className="bg-muted px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    {skill}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 rounded-full ml-1 hover:bg-muted/80"
                      onClick={() => removeSkill(selectedCategory, index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder={`Add a ${selectedCategory} skill`}
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addSkill()
                    }
                  }}
                />
                <Button onClick={addSkill} className="flex-shrink-0">
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-2">
          <Label htmlFor="otherSkills">Additional Skills</Label>
          <Textarea
            id="otherSkills"
            value={skills.otherSkills}
            onChange={(e) => handleOtherSkillsChange(e.target.value)}
            placeholder="List any other skills or qualifications that don't fit into categories..."
            className="min-h-[100px]"
          />
        </div>
      </div>
    </div>
  )
}
