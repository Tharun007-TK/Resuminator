"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ResumeForm } from "@/components/resume-form"
import { ResumePreview } from "@/components/resume-preview"
import { TemplateSelector } from "@/components/template-selector"
import { ExportOptions } from "@/components/export-options"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Upload, Save } from "lucide-react"
import { initialResumeData } from "@/lib/initial-data"
import type { ResumeData, Template } from "@/lib/types"

export function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)
  const [selectedTemplate, setSelectedTemplate] = useState<Template>("modern")
  const [isMobileView, setIsMobileView] = useState(false)
  const [activeView, setActiveView] = useState<"form" | "preview">("form")

  useEffect(() => {
    // Check if there's saved data in localStorage
    const savedData = localStorage.getItem("resumeData")
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData))
      } catch (e) {
        console.error("Failed to parse saved resume data")
      }
    }

    // Set up responsive behavior
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData))
  }, [resumeData])

  const handleSaveData = () => {
    const dataStr = JSON.stringify(resumeData)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportFileDefaultName = `resume-data-${new Date().toISOString().slice(0, 10)}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const handleLoadData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader()
    if (event.target.files && event.target.files.length > 0) {
      fileReader.readAsText(event.target.files[0], "UTF-8")
      fileReader.onload = (e) => {
        if (e.target?.result) {
          try {
            const parsedData = JSON.parse(e.target.result as string)
            setResumeData(parsedData)
          } catch (error) {
            console.error("Error parsing JSON file:", error)
          }
        }
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        <header className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold">Resume Builder</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleSaveData} className="flex items-center gap-1">
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline">Save</span>
            </Button>
            <div className="relative">
              <input
                type="file"
                id="load-file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept=".json"
                onChange={handleLoadData}
              />
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Upload className="h-4 w-4" />
                <span className="hidden sm:inline">Load</span>
              </Button>
            </div>
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
