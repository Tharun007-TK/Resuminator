import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { marked } from "marked"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Simple HTML sanitizer for server-side
function simpleSanitize(html: string): string {
  return html.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
}

export function formatMarkdown(text: string): string {
  if (!text) return ""

  // Configure marked options
  marked.setOptions({
    breaks: true,
    gfm: true,
  })

  // Convert markdown to HTML
  const html = marked.parse(text)

  // In a server environment, we need to handle sanitization differently
  if (typeof window === "undefined") {
    // Server-side: basic sanitization
    return simpleSanitize(html)
  } else {
    // Client-side: use DOMPurify if available
    // We'll use a dynamic import pattern that works in ESM
    try {
      // This will only execute in the browser
      const DOMPurify = (window as any).DOMPurify
      if (DOMPurify && typeof DOMPurify.sanitize === "function") {
        return DOMPurify.sanitize(html)
      }
      return simpleSanitize(html)
    } catch (e) {
      // Fallback to simple sanitization if DOMPurify is not available
      return simpleSanitize(html)
    }
  }
}
