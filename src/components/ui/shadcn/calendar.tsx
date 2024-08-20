import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker as Prim } from "react-day-picker"; //https://github.com/gpbl/react-day-picker/blob/main/website/docs/upgrading.mdx 'Upgrading to v9'
import { buttonVariants } from "./button";
import { cn } from "@/utils";

export type CalendarProps = React.ComponentProps<typeof Prim>;

function getClassNames(isRange: boolean) {
    const classnamesClasses = {
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        day: cn("relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
            isRange
                ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                : "[&:has([aria-selected])]:rounded-md"
        ),
        day_button: cn(buttonVariants({ variant: "ghost" }), "h-8 w-8 p-0 font-normal aria-selected:opacity-100"),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
    };
    return classnamesClasses;
}

function Calendar({ className, classNames, showOutsideDays = true, ...rest }: CalendarProps) {
    return (
        <Prim
            showOutsideDays={showOutsideDays}
            className={cn("p-3", className)}
            classNames={{ ...getClassNames(rest.mode === "range"), ...classNames, }}
            // components={{
            //     IconLeft: ({ ...rest }) => <ChevronLeftIcon className="h-4 w-4" />,
            //     IconRight: ({ ...rest }) => <ChevronRightIcon className="h-4 w-4" />,
            // }}
            components={{
                Chevron: (props) => props.orientation === "left"
                    ? <ChevronLeftIcon className="h-4 w-4" {...props} />
                    : <ChevronRightIcon className="h-4 w-4" {...props} />,
            }}
            {...rest}
        />
    );
}
Calendar.displayName = "Calendar";

export { Calendar };

//https://github.com/gpbl/react-day-picker/blob/main/website/docs/upgrading.mdx 'Upgrading to v9'