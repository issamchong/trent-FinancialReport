'use client'

import { FileDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PdfExportButton() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <Button onClick={handlePrint} variant="outline" size="sm">
      <FileDown className="mr-2 h-4 w-4" />
      Download PDF
    </Button>
  )
}
