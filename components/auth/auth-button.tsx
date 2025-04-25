"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogIn, LogOut, User, UserPlus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { getSupabaseClient } from "@/lib/supabase/supabaseClient"
import Link from "next/link"

interface AuthButtonProps {
  user: any | null
}

export function AuthButton({ user }: AuthButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      const supabase = getSupabaseClient()
      await supabase.auth.signOut()
      router.refresh()
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="flex gap-2">
        <Button asChild variant="outline" size="sm" className="flex items-center gap-1">
          <Link href="/auth">
            <LogIn className="h-4 w-4" />
            <span className="hidden sm:inline">Login</span>
          </Link>
        </Button>
        <Button asChild size="sm" className="flex items-center gap-1">
          <Link href="/auth?tab=signup">
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Sign Up</span>
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          {user.email ? user.email.split("@")[0] : "Account"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/my-resumes")}>My Resumes</DropdownMenuItem>
        <DropdownMenuItem onClick={handleSignOut} className="text-red-500">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
