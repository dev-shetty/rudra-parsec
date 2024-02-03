"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { NewsDomains } from "@/lib/types"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn, getHumanFriendlyDate } from "@/lib/utils"

export default function NewsQuery({ domain }: { domain?: NewsDomains }) {
  const [date, setDate] = useState<Date>()
  const router = useRouter()
  const DAY_TO_MILLI = 86400000

  function updateDate(date: any) {
    let _date

    if (date.getTime() > new Date().getTime() - DAY_TO_MILLI) {
      const dateObj = new Date()
      _date = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${
        dateObj.getDate() - 1
      }`
    } else {
      _date = getHumanFriendlyDate(date)
      setDate(date)
    }

    router.refresh()
    router.push(`/news?date=${_date}`)
  }

  return (
    <div className="flex gap-4 my-4">
      <Select onValueChange={(e: string) => router.push(`/news?domain=${e}`)}>
        <SelectTrigger className="w-[300px]">
          <SelectValue placeholder={domain ?? "Indian Finance"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="Indian Finance">Indian Finance</SelectItem>
            <SelectItem value="Global Finance">Global Finance</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={updateDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
