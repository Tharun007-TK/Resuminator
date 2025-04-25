"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { getSupabaseClient } from "@/lib/supabase/supabaseClient"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export function AuthForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const supabase = getSupabaseClient()

      if (activeTab === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        toast({
          title: "Success",
          description: "You have been logged in successfully",
        })

        router.push("/")
        router.refresh()
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })

        if (error) throw error

        toast({
          title: "Success",
          description: "Check your email to confirm your account",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during authentication",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Welcome</CardTitle>
        <CardDescription className="text-center">Sign in to your account or create a new one</CardDescription>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {activeTab === "login" ? "Logging in..." : "Signing up..."}
                </>
              ) : activeTab === "login" ? (
                "Login"
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </CardContent>
      </Tabs>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center text-muted-foreground">
          {activeTab === "login" ? "Don't have an account?" : "Already have an account?"}
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setActiveTab(activeTab === "login" ? "signup" : "login")}
        >
          {activeTab === "login" ? "Create an account" : "Login to existing account"}
        </Button>
      </CardFooter>
    </Card>
  )
}
