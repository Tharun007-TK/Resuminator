import { getResumeById } from "@/app/actions/resume-actions"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import { ResumeBuilder } from "@/components/resume-builder-with-id"

export default async function EditResumePage({ params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/")
  }

  const { resume, error } = await getResumeById(params.id)

  if (error || !resume) {
    notFound()
  }

  // Check if the user is the owner of the resume
  if (user.id !== resume.user_id) {
    redirect("/my-resumes")
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ResumeBuilder
        initialResumeData={resume.resume_data}
        initialTemplate={resume.template}
        resumeId={resume.id}
        resumeTitle={resume.title}
        resumeDescription={resume.description || ""}
        isPublic={resume.is_public}
      />
    </main>
  )
}
