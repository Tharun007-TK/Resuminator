import { AuthForm } from "@/components/auth/auth-form"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AuthPage() {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If the user is already logged in, redirect to the home page
  if (user) {
    redirect("/")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Resume Builder</h1>
        <AuthForm />
      </div>
    </div>
  )
}
