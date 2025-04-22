"use client"

import type React from "react"

import { useState } from "react"
import type { ResumeData } from "@/lib/types"
import { PersonalInfoForm } from "@/components/form-sections/personal-info-form"
import { EducationForm } from "@/components/form-sections/education-form"
import { ExperienceForm } from "@/components/form-sections/experience-form"
import { ProjectsForm } from "@/components/form-sections/projects-form"
import { SkillsForm } from "@/components/form-sections/skills-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ResumeFormProps {
  resumeData: ResumeData
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>
}

export function ResumeForm({ resumeData, setResumeData }: ResumeFormProps) {
  const [activeTab, setActiveTab] = useState("personal")

  return (
    <div className="space-y-6">
      <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="mt-4">
          <PersonalInfoForm
            personalInfo={resumeData.personalInfo}
            setPersonalInfo={(personalInfo) => setResumeData((prev) => ({ ...prev, personalInfo }))}
          />
        </TabsContent>

        <TabsContent value="education" className="mt-4">
          <EducationForm
            education={resumeData.education}
            setEducation={(education) => setResumeData((prev) => ({ ...prev, education }))}
          />
        </TabsContent>

        <TabsContent value="experience" className="mt-4">
          <ExperienceForm
            experience={resumeData.experience}
            setExperience={(experience) => setResumeData((prev) => ({ ...prev, experience }))}
          />
        </TabsContent>

        <TabsContent value="projects" className="mt-4">
          <ProjectsForm
            projects={resumeData.projects}
            setProjects={(projects) => setResumeData((prev) => ({ ...prev, projects }))}
          />
        </TabsContent>

        <TabsContent value="skills" className="mt-4">
          <SkillsForm
            skills={resumeData.skills}
            setSkills={(skills) => setResumeData((prev) => ({ ...prev, skills }))}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
