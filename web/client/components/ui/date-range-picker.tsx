"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CalendarDateRangePickerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  date?: DateRange | undefined;
  onDateChange?: (date: DateRange | undefined) => void;
}
// ... (previous imports)

export default function CalendarDateRangePicker({
  className,
  date: externalDate,
  onDateChange,
}: CalendarDateRangePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    externalDate?.from || new Date(2023, 0, 20)
  );

  // Update the local state when the external date changes
  React.useEffect(() => {
    setDate(externalDate?.from);
  }, [externalDate]);

  // Callback to inform external components about the date change
  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    if (onDateChange) {
      // Construct a DateRange object with 'from' property for consistency
      const newDateRange: DateRange | undefined = newDate
        ? { from: newDate, to: newDate }
        : undefined;
      onDateChange(newDateRange);
    }
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-center text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "LLL dd, y") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
