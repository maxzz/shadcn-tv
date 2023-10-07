import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger, } from "./popover";
import { Calendar } from "./calendar";
import { Button } from "./button";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/utils";

export function DatePickerDemo() {
    const [date, setDate] = useState<Date>();
    return (
        <Popover>

            <PopoverTrigger asChild>
                <Button variant={"outline"} className={cn("w-[280px] font-normal text-left justify-start", !date && "text-muted-foreground")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="p-0 w-auto">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>

        </Popover>
    );
}
