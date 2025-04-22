"use client"

import { useState } from "react"
import type { ResumeData, Template } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

interface ExportOptionsProps {
  resumeData: ResumeData
  template: Template
}

export function ExportOptions({ resumeData, template }: ExportOptionsProps) {
  const [isExporting, setIsExporting] = useState(false)

  const exportAsPDF = async () => {
    setIsExporting(true)

    try {
      const resumeElement = document.querySelector(".bg-white.text-black") as HTMLElement

      if (!resumeElement) {
        console.error("Resume element not found")
        return
      }

      // Create a clone to avoid modifying the original
      const clone = resumeElement.cloneNode(true) as HTMLElement
      clone.style.width = "800px"
      clone.style.height = "auto"
      clone.style.padding = "0"
      document.body.appendChild(clone)

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      })

      document.body.removeChild(clone)

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 0

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio)
      pdf.save(`resume-${new Date().toISOString().slice(0, 10)}.pdf`)
    } catch (error) {
      console.error("Error exporting PDF:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const exportAsTXT = () => {
    const { personalInfo, education, experience, projects, skills } = resumeData

    let txtContent = `${personalInfo.name}\n`
    txtContent += personalInfo.title ? `${personalInfo.title}\n` : ""
    txtContent += `${personalInfo.email || ""} ${personalInfo.phone || ""} ${personalInfo.location || ""}\n`
    txtContent += personalInfo.website ? `${personalInfo.website}\n` : ""
    txtContent += personalInfo.linkedin ? `${personalInfo.linkedin}\n` : ""
    txtContent += "\n"

    if (personalInfo.summary) {
      txtContent += "PROFESSIONAL SUMMARY\n"
      txtContent += `${personalInfo.summary.replace(/\*\*/g, "").replace(/\*/g, "")}\n\n`
    }

    if (experience.length > 0) {
      txtContent += "EXPERIENCE\n"
      experience.forEach((exp) => {
        txtContent += `${exp.position}\n`
        txtContent += `${exp.company} | ${exp.startDate} - ${exp.endDate}\n`
        if (exp.location) txtContent += `${exp.location}\n`
        if (exp.description) txtContent += `${exp.description.replace(/\*\*/g, "").replace(/\*/g, "")}\n`
        txtContent += "\n"
      })
    }

    if (education.length > 0) {
      txtContent += "EDUCATION\n"
      education.forEach((edu) => {
        txtContent += `${edu.degree}${edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}\n`
        txtContent += `${edu.institution} | ${edu.startDate} - ${edu.endDate}\n`
        if (edu.location) txtContent += `${edu.location}\n`
        if (edu.description) txtContent += `${edu.description.replace(/\*\*/g, "").replace(/\*/g, "")}\n`
        txtContent += "\n"
      })
    }

    if (projects.length > 0) {
      txtContent += "PROJECTS\n"
      projects.forEach((project) => {
        txtContent += `${project.name}\n`
        if (project.startDate || project.endDate) {
          txtContent += `${project.startDate || ""} - ${project.endDate || ""}\n`
        }
        if (project.technologies) txtContent += `Technologies: ${project.technologies}\n`
        if (project.link) txtContent += `Link: ${project.link}\n`
        if (project.description) txtContent += `${project.description.replace(/\*\*/g, "").replace(/\*/g, "")}\n`
        txtContent += "\n"
      })
    }

    if (skills.categories.length > 0 || skills.otherSkills) {
      txtContent += "SKILLS\n"
      skills.categories.forEach((category) => {
        if (skills.skillsByCategory[category]?.length > 0) {
          txtContent += `${category}: ${skills.skillsByCategory[category].join(", ")}\n`
        }
      })
      if (skills.otherSkills) txtContent += `${skills.otherSkills}\n`
    }

    const blob = new Blob([txtContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `resume-${new Date().toISOString().slice(0, 10)}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={exportAsPDF} disabled={isExporting} className="flex items-center gap-1">
        <FileDown className="h-4 w-4" />
        {isExporting ? "Exporting..." : "Export as PDF"}
      </Button>
      <Button variant="outline" onClick={exportAsTXT} className="flex items-center gap-1">
        <FileDown className="h-4 w-4" />
        Export as TXT
      </Button>
    </div>
  )
}
