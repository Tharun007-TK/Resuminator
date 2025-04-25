"use client"

import { useState, useEffect } from "react"
import { ResumeForm } from "@/components/resume-form"
import { ResumePreview } from "@/components/resume-preview"
import { TemplateSelector } from "@/components/template-selector"
import { ExportOptions } from "@/components/export-options"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import type { ResumeData, Template } from "@/lib/types"
import { SaveResumeDialog } from "@/components/save-resume-dialog"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase/supabaseClient"
import { AuthButton } from "@/components/auth/auth-button"
import Link from "next/link"

interface ResumeBuilderProps {
  initialResumeData?: ResumeData
  initialTemplate?: Template
  resumeId?: string
  resumeTitle?: string
  resumeDescription?: string
  isPublic?: boolean
}

export function ResumeBuilder({
  initialResumeData,
  initialTemplate = "modern",
  resumeId,
  resumeTitle = "",
  resumeDescription = "",
  isPublic = false,
}: ResumeBuilderProps) {
  const router = useRouter()
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    // First try to use initialResumeData from props
    if (initialResumeData) {
      return initialResumeData
    }

    // Then try to load from localStorage
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("resumeData")
      if (savedData) {
        try {
          return JSON.parse(savedData)
        } catch (e) {
          console.error("Failed to parse saved resume data")
        }
      }
    }

    // Finally, fall back to the initial data
    return (
      initialResumeData || {
        personalInfo: {
          name: "",
          title: "",
          email: "",
          phone: "",
          location: "",
          website: "",
          linkedin: "",
          summary: "",
        },
        education: [],
        experience: [],
        projects: [],
        skills: {
          categories: [],
          skillsByCategory: {},
          otherSkills: "",
        },
      }
    )
  })
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(initialTemplate)
  const [isMobileView, setIsMobileView] = useState(false)
  const [activeView, setActiveView] = useState<"form" | "preview">("form")
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Set up responsive behavior
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Get current user
    const fetchUser = async () => {
      const supabase = getSupabaseClient()
      const { data } = await supabase.auth.getUser()
      setUser(data.user)

      // Set up auth state change listener
      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user || null)
      })

      return () => {
        authListener.subscription.unsubscribe()
      }
    }

    const unsubscribe = fetchUser()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (typeof unsubscribe === "function") {
        unsubscribe()
      }
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData))
  }, [resumeData])

  const handleSaveSuccess = (id: string) => {
    if (!resumeId) {
      router.push(`/resume/${id}/edit`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        <header className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            {resumeId && (
              <Button variant="outline" size="sm" asChild className="mr-2">
                <Link href="/my-resumes" className="flex items-center gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Link>
              </Button>
            )}
            <h1 className="text-3xl font-bold">Resume Builder</h1>
          </div>
          <div className="flex items-center gap-2">
            <AuthButton user={user} />
            {user && (
              <SaveResumeDialog
                resumeData={resumeData}
                template={selectedTemplate}
                existingResumeId={resumeId}
                existingTitle={resumeTitle}
                existingDescription={resumeDescription}
                existingIsPublic={isPublic}
                onSaveSuccess={handleSaveSuccess}
              />
            )}
            <ThemeToggle />
          </div>
        </header>

        <TemplateSelector selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />

        {isMobileView ? (
          <div className="flex flex-col space-y-4">
            <div className="flex justify-center gap-2 mb-2">
              <Button variant={activeView === "form" ? "default" : "outline"} onClick={() => setActiveView("form")}>
                Edit
              </Button>
              <Button
                variant={activeView === "preview" ? "default" : "outline"}
                onClick={() => setActiveView("preview")}
              >
                Preview
              </Button>
            </div>

            {activeView === "form" ? (
              <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                <ResumePreview resumeData={resumeData} template={selectedTemplate} />
                <div className="mt-4">
                  <ExportOptions resumeData={resumeData} template={selectedTemplate} />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
              <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
              <ResumePreview resumeData={resumeData} template={selectedTemplate} />
              <div className="mt-6">
                <ExportOptions resumeData={resumeData} template={selectedTemplate} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
