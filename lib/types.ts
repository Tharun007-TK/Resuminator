export type Template = "modern" | "classic" | "minimal"

export interface PersonalInfo {
  name: string
  title: string
  email: string
  phone: string
  location: string
  website: string
  linkedin: string
  summary: string
}

export interface Education {
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
  location: string
  description: string
}

export interface Experience {
  company: string
  position: string
  startDate: string
  endDate: string
  location: string
  description: string
}

export interface Project {
  name: string
  description: string
  technologies: string
  link: string
  startDate: string
  endDate: string
}

export interface Skills {
  categories: string[]
  skillsByCategory: {
    [category: string]: string[]
  }
  otherSkills: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  education: Education[]
  experience: Experience[]
  projects: Project[]
  skills: Skills
}
