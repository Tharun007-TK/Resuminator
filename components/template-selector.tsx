"use client"

import type { Template } from "@/lib/types"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface TemplateSelectorProps {
  selectedTemplate: Template
  onSelectTemplate: (template: Template) => void
}

export function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Choose a Template</h2>
      <RadioGroup
        value={selectedTemplate}
        onValueChange={(value) => onSelectTemplate(value as Template)}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      >
        <div>
          <RadioGroupItem value="modern" id="modern" className="peer sr-only" />
          <Label
            htmlFor="modern"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
          >
            <div className="mb-2 w-full bg-gray-100 dark:bg-gray-700 rounded-md p-2">
              <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
              <div className="h-2 w-full bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
              <div className="h-2 w-full bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
              <div className="h-2 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
            <span className="block w-full text-center font-medium">Modern</span>
          </Label>
        </div>

        <div>
          <RadioGroupItem value="classic" id="classic" className="peer sr-only" />
          <Label
            htmlFor="classic"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
          >
            <div className="mb-2 w-full bg-gray-100 dark:bg-gray-700 rounded-md p-2">
              <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded mb-3 text-center"></div>
              <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-600 rounded mx-auto mb-3"></div>
              <div className="h-2 w-full bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
              <div className="h-2 w-full bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
              <div className="h-2 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
            <span className="block w-full text-center font-medium">Classic</span>
          </Label>
        </div>

        <div>
          <RadioGroupItem value="minimal" id="minimal" className="peer sr-only" />
          <Label
            htmlFor="minimal"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
          >
            <div className="mb-2 w-full bg-gray-100 dark:bg-gray-700 rounded-md p-2">
              <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
              <div className="h-2 w-full bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
              <div className="h-2 w-full bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
              <div className="h-2 w-3/4 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
              <div className="h-3 w-1/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
            <span className="block w-full text-center font-medium">Minimal</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}
