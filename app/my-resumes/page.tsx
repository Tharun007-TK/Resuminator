import { getUserResumes } from "@/app/actions/resume-actions"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ResumeCard } from "@/components/resume-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export default async function MyResumesPage() {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/")
  }

  const { resumes, error } = await getUserResumes()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Resumes</h1>
        <Button asChild>
          <Link href="/" className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Create New Resume
          </Link>
        </Button>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      {resumes && resumes.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">You don't have any saved resumes yet</h2>
          <p className="text-gray-500 mb-6">Create and save your first resume to see it here.</p>
          <Button asChild>
            <Link href="/">Create Your First Resume</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes?.map((resume) => (
            <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
    </div>
  )
}
