"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { saveResume, updateResume } from "@/app/actions/resume-actions"
import { useToast } from "@/hooks/use-toast"
import { Save } from "lucide-react"
import type { ResumeData, Template } from "@/lib/types"

interface SaveResumeDialogProps {
  resumeData: ResumeData
  template: Template
  existingResumeId?: string
  existingTitle?: string
  existingDescription?: string
  existingIsPublic?: boolean
  onSaveSuccess?: (id: string) => void
}

export function SaveResumeDialog({
  resumeData,
  template,
  existingResumeId,
  existingTitle = "",
  existingDescription = "",
  existingIsPublic = false,
  onSaveSuccess,
}: SaveResumeDialogProps) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(existingTitle)
  const [description, setDescription] = useState(existingDescription)
  const [isPublic, setIsPublic] = useState(existingIsPublic)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("resumeData", JSON.stringify(resumeData))
      formData.append("template", template)
      formData.append("isPublic", isPublic.toString())

      let result

      if (existingResumeId) {
        formData.append("id", existingResumeId)
        result = await updateResume(formData)
      } else {
        result = await saveResume(formData)
      }

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success",
          description: existingResumeId ? "Resume updated successfully" : "Resume saved successfully",
        })
        setOpen(false)
        if (onSaveSuccess && result.data?.[0]?.id) {
          onSaveSuccess(result.data[0].id)
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1">
          <Save className="h-4 w-4" />
          <span>{existingResumeId ? "Update" : "Save"} Resume</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{existingResumeId ? "Update" : "Save"} Your Resume</DialogTitle>
            <DialogDescription>
              {existingResumeId ? "Update the details of your saved resume." : "Save your resume to access it later."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isPublic" className="text-right">
                Public
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch id="isPublic" checked={isPublic} onCheckedChange={setIsPublic} />
                <Label htmlFor="isPublic">Make this resume publicly accessible</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : existingResumeId ? "Update Resume" : "Save Resume"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
