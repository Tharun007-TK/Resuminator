import { ResumeBuilder } from "@/components/resume-builder-with-id"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { initialResumeData } from "@/lib/initial-data"

export default async function Home() {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ResumeBuilder initialResumeData={initialResumeData} />
    </main>
  )
}
