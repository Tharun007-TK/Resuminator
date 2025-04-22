"use client"

import type { ResumeData } from "@/lib/types"
import { formatMarkdown } from "@/lib/utils"

interface MinimalTemplateProps {
  resumeData: ResumeData
}

export function MinimalTemplate({ resumeData }: MinimalTemplateProps) {
  const { personalInfo, education, experience, projects, skills } = resumeData

  return (
    <div className="font-sans max-w-[800px] mx-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{personalInfo.name}</h1>
        {personalInfo.title && <p className="text-gray-600 mt-1">{personalInfo.title}</p>}

        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3 text-sm text-gray-500">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>• {personalInfo.phone}</div>}
          {personalInfo.location && <div>• {personalInfo.location}</div>}
          {personalInfo.website && <div>• {personalInfo.website}</div>}
          {personalInfo.linkedin && <div>• {personalInfo.linkedin}</div>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: formatMarkdown(personalInfo.summary) }} />
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-base font-bold text-gray-900 mb-4">EXPERIENCE</h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-800">{exp.company}</h3>
                  <span className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <p className="text-gray-600 italic mb-2">
                  {exp.position}
                  {exp.location ? ` | ${exp.location}` : ""}
                </p>
                {exp.description && (
                  <div
                    className="text-sm text-gray-700"
                    dangerouslySetInnerHTML={{ __html: formatMarkdown(exp.description) }}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-base font-bold text-gray-900 mb-4">EDUCATION</h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-800">{edu.institution}</h3>
                  <span className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <p className="text-gray-600 italic mb-2">
                  {edu.degree}
                  {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                  {edu.location ? ` | ${edu.location}` : ""}
                </p>
                {edu.description && (
                  <div
                    className="text-sm text-gray-700"
                    dangerouslySetInnerHTML={{ __html: formatMarkdown(edu.description) }}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-base font-bold text-gray-900 mb-4">PROJECTS</h2>
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-800">{project.name}</h3>
                  {(project.startDate || project.endDate) && (
                    <span className="text-sm text-gray-500">
                      {project.startDate}
                      {project.endDate ? ` - ${project.endDate}` : ""}
                    </span>
                  )}
                </div>
                {(project.technologies || project.link) && (
                  <p className="text-gray-600 italic mb-2">
                    {project.technologies}
                    {project.technologies && project.link ? " | " : ""}
                    {project.link}
                  </p>
                )}
                {project.description && (
                  <div
                    className="text-sm text-gray-700"
                    dangerouslySetInnerHTML={{ __html: formatMarkdown(project.description) }}
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {(skills.categories.length > 0 || skills.otherSkills) && (
        <section>
          <h2 className="text-base font-bold text-gray-900 mb-4">SKILLS</h2>

          {skills.categories.length > 0 && (
            <div className="space-y-3 mb-3">
              {skills.categories.map(
                (category) =>
                  skills.skillsByCategory[category]?.length > 0 && (
                    <div key={category}>
                      <p className="text-sm text-gray-700">
                        <span className="font-bold">{category}:</span> {skills.skillsByCategory[category].join(", ")}
                      </p>
                    </div>
                  ),
              )}
            </div>
          )}

          {skills.otherSkills && (
            <div className="text-sm text-gray-700">
              <p>{skills.otherSkills}</p>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
