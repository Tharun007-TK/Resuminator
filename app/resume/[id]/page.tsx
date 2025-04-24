import { getResumeById } from "@/app/actions/resume-actions"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ResumePreview } from "@/components/resume-preview"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Edit } from "lucide-react"

export default async function ResumePage({ params }: { params: { id: string } }) {
  const { resume, error } = await getResumeById(params.id)

  if (error || !resume) {
    notFound()
  }

  const supabase = createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  const isOwner = user && user.id === resume.user_id

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/my-resumes" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to My Resumes
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">{resume.title}</h1>
        </div>

        {isOwner && (
          <Button asChild>
            <Link href={`/resume/${params.id}/edit`} className="flex items-center gap-1">
              <Edit className="h-4 w-4" />
              Edit Resume
            </Link>
          </Button>
        )}
      </div>

      {resume.description && <p className="text-gray-500 mb-6">{resume.description}</p>}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <ResumePreview resumeData={resume.resume_data} template={resume.template} />
      </div>
    </div>
  )
}
