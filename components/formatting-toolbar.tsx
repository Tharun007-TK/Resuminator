"use client"

import { Button } from "@/components/ui/button"
import { Bold, Italic, List, ListOrdered, Heading2, Heading3 } from "lucide-react"

interface FormattingToolbarProps {
  text: string
  setText: (text: string) => void
}

export function FormattingToolbar({ text, setText }: FormattingToolbarProps) {
  const handleFormat = (format: string) => {
    const textarea = document.activeElement as HTMLTextAreaElement
    const selectionStart = textarea?.selectionStart || 0
    const selectionEnd = textarea?.selectionEnd || 0
    const selectedText = text.substring(selectionStart, selectionEnd)

    let formattedText = ""
    let newCursorPos = selectionEnd

    switch (format) {
      case "bold":
        formattedText = text.substring(0, selectionStart) + `**${selectedText}**` + text.substring(selectionEnd)
        newCursorPos = selectionEnd + 4
        break
      case "italic":
        formattedText = text.substring(0, selectionStart) + `*${selectedText}*` + text.substring(selectionEnd)
        newCursorPos = selectionEnd + 2
        break
      case "ul":
        formattedText = text.substring(0, selectionStart) + `\n- ${selectedText}` + text.substring(selectionEnd)
        newCursorPos = selectionEnd + 3
        break
      case "ol":
        formattedText = text.substring(0, selectionStart) + `\n1. ${selectedText}` + text.substring(selectionEnd)
        newCursorPos = selectionEnd + 4
        break
      case "h2":
        formattedText = text.substring(0, selectionStart) + `\n## ${selectedText}` + text.substring(selectionEnd)
        newCursorPos = selectionEnd + 4
        break
      case "h3":
        formattedText = text.substring(0, selectionStart) + `\n### ${selectedText}` + text.substring(selectionEnd)
        newCursorPos = selectionEnd + 5
        break
      default:
        return
    }

    setText(formattedText)

    // Set cursor position after formatting
    setTimeout(() => {
      if (textarea) {
        textarea.focus()
        textarea.setSelectionRange(newCursorPos, newCursorPos)
      }
    }, 0)
  }

  return (
    <div className="flex items-center gap-1 p-1 border-b">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => handleFormat("bold")}
        title="Bold"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => handleFormat("italic")}
        title="Italic"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => handleFormat("h2")}
        title="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => handleFormat("h3")}
        title="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => handleFormat("ul")}
        title="Bullet List"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => handleFormat("ol")}
        title="Numbered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
    </div>
  )
}
