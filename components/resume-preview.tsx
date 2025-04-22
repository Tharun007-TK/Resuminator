"use client"

import type { ResumeData, Template } from "@/lib/types"
import { ModernTemplate } from "@/components/templates/modern-template"
import { ClassicTemplate } from "@/components/templates/classic-template"
import { MinimalTemplate } from "@/components/templates/minimal-template"
import { useEffect, useState } from "react"

interface ResumePreviewProps {
  resumeData: ResumeData
  template: Template
}

export function ResumePreview({ resumeData, template }: ResumePreviewProps) {
  // Use client-side rendering for the templates
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const renderTemplate = () => {
    if (!isMounted) return null

    switch (template) {
      case "modern":
        return <ModernTemplate resumeData={resumeData} />
      case "classic":
        return <ClassicTemplate resumeData={resumeData} />
      case "minimal":
        return <MinimalTemplate resumeData={resumeData} />
      default:
        return <ModernTemplate resumeData={resumeData} />
    }
  }

  return (
    <div className="bg-white text-black rounded-md shadow-sm overflow-hidden">
      <div className="w-full aspect-[8.5/11] overflow-y-auto p-6 print:p-0 print:shadow-none">{renderTemplate()}</div>
    </div>
  )
}
