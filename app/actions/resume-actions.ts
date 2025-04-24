"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import type { Template } from "@/lib/types"

// Save a resume
export async function saveResume(formData: FormData) {
  const supabase = createServerSupabaseClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "You must be logged in to save a resume" }
  }

  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const resumeDataString = formData.get("resumeData") as string
  const template = formData.get("template") as Template
  const isPublic = formData.get("isPublic") === "true"

  if (!title || !resumeDataString) {
    return { error: "Title and resume data are required" }
  }

  const resumeData = JSON.parse(resumeDataString)

  try {
    const { data, error } = await supabase
      .from("resumes")
      .insert({
        user_id: user.id,
        title,
        description,
        resume_data: resumeData,
        template,
        is_public: isPublic,
        updated_at: new Date().toISOString(),
      })
      .select()

    if (error) throw error

    revalidatePath("/my-resumes")
    return { success: true, data }
  } catch (error: any) {
    return { error: error.message || "Failed to save resume" }
  }
}

// Update an existing resume
export async function updateResume(formData: FormData) {
  const supabase = createServerSupabaseClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "You must be logged in to update a resume" }
  }

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const resumeDataString = formData.get("resumeData") as string
  const template = formData.get("template") as Template
  const isPublic = formData.get("isPublic") === "true"

  if (!id || !title || !resumeDataString) {
    return { error: "ID, title, and resume data are required" }
  }

  const resumeData = JSON.parse(resumeDataString)

  try {
    const { data, error } = await supabase
      .from("resumes")
      .update({
        title,
        description,
        resume_data: resumeData,
        template,
        is_public: isPublic,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()

    if (error) throw error

    revalidatePath("/my-resumes")
    revalidatePath(`/resume/${id}`)
    return { success: true, data }
  } catch (error: any) {
    return { error: error.message || "Failed to update resume" }
  }
}

// Delete a resume
export async function deleteResume(id: string) {
  const supabase = createServerSupabaseClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "You must be logged in to delete a resume" }
  }

  try {
    const { error } = await supabase.from("resumes").delete().eq("id", id).eq("user_id", user.id)

    if (error) throw error

    revalidatePath("/my-resumes")
    return { success: true }
  } catch (error: any) {
    return { error: error.message || "Failed to delete resume" }
  }
}

// Get all resumes for the current user
export async function getUserResumes() {
  const supabase = createServerSupabaseClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/")
  }

  try {
    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false })

    if (error) throw error

    return { resumes: data }
  } catch (error: any) {
    return { error: error.message || "Failed to fetch resumes", resumes: [] }
  }
}

// Get a single resume by ID
export async function getResumeById(id: string) {
  const supabase = createServerSupabaseClient()

  try {
    const { data, error } = await supabase.from("resumes").select("*").eq("id", id).single()

    if (error) throw error

    // Check if the resume is public or belongs to the current user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!data.is_public && (!user || user.id !== data.user_id)) {
      return { error: "You don't have permission to view this resume" }
    }

    return { resume: data }
  } catch (error: any) {
    return { error: error.message || "Failed to fetch resume" }
  }
}
