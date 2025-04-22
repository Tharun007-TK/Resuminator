"use client"

import type { ResumeData } from "@/lib/types"
import { formatMarkdown } from "@/lib/utils"

interface ClassicTemplateProps {
  resumeData: ResumeData
}

export function ClassicTemplate({ resumeData }: ClassicTemplateProps) {
  const { personalInfo, education, experience, projects, skills } = resumeData

  return (
    <div className="font-serif max-w-[800px] mx-auto">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-wider text-gray-900 mb-1">{personalInfo.name}</h1>
        {personalInfo.title && <p className="text-lg text-gray-700 mb-2">{personalInfo.title}</p>}

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-gray-600">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.website && <div>{personalInfo.website}</div>}
          {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase text-gray-900 text-center border-b-2 border-gray-300 pb-1 mb-3">
            Professional Summary
          </h2>
          <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: formatMarkdown(personalInfo.summary) }} />
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase text-gray-900 text-center border-b-2 border-gray-300 pb-1 mb-3">
            Work Experience
          </h2>
          <div className="space-y-5">
            {experience.map((exp, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-800">{exp.position}</h3>
                  <span className="text-sm text-gray-600">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <p className="italic text-gray-700">{exp.company}</p>
                  {exp.location && <p className="text-sm text-gray-600">{exp.location}</p>}
                </div>
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
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase text-gray-900 text-center border-b-2 border-gray-300 pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-5">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-800">
                    {edu.degree}
                    {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <p className="italic text-gray-700">{edu.institution}</p>
                  {edu.location && <p className="text-sm text-gray-600">{edu.location}</p>}
                </div>
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
        <section className="mb-6">
          <h2 className="text-lg font-bold uppercase text-gray-900 text-center border-b-2 border-gray-300 pb-1 mb-3">
            Projects
          </h2>
          <div className="space-y-5">
            {projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-800">{project.name}</h3>
                  {(project.startDate || project.endDate) && (
                    <span className="text-sm text-gray-600">
                      {project.startDate}
                      {project.endDate ? ` - ${project.endDate}` : ""}
                    </span>
                  )}
                </div>
                {project.technologies && (
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-bold">Technologies:</span> {project.technologies}
                  </p>
                )}
                {project.link && (
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-bold">Link:</span> {project.link}
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
          <h2 className="text-lg font-bold uppercase text-gray-900 text-center border-b-2 border-gray-300 pb-1 mb-3">
            Skills
          </h2>

          {skills.categories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3 mb-3">
              {skills.categories.map(
                (category) =>
                  skills.skillsByCategory[category]?.length > 0 && (
                    <div key={category}>
                      <h3 className="font-bold text-gray-800">{category}</h3>
                      <p className="text-sm text-gray-700">{skills.skillsByCategory[category].join(", ")}</p>
                    </div>
                  ),
              )}
            </div>
          )}

          {skills.otherSkills && (
            <div className="text-sm text-gray-700">
              <h3 className="font-bold text-gray-800">Additional Skills</h3>
              <p>{skills.otherSkills}</p>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
