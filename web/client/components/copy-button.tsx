"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Copy } from "lucide-react"

export default function CopyButton({ value }: { value: string }) {
  const { toast } = useToast()
  const handleCopyId = () => {
    const tempInput = document.createElement("input")
    document.body.appendChild(tempInput)
    tempInput.value = value ?? ""
    tempInput.select()
    document.execCommand("copy")
    document.body.removeChild(tempInput)

    toast({
      title: "Pot Code Copied",
      variant: "success",
    })
  }

  return (
    <Button
      variant={"ghost"}
      onClick={handleCopyId}
      className="w-10 p-3 absolute right-0"
    >
      <Copy className="w-10 h-10" />
    </Button>
  )
}
