import { DayPicker as Prim } from "react-day-picker"; //https://github.com/gpbl/react-day-picker/blob/main/website/docs/upgrading.mdx 'Upgrading to v9'
import { buttonVariants } from "./button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/utils";

export type CalendarProps = React.ComponentProps<typeof Prim>;

const navButtonClasses = buttonVariants({ variant: "outline" });
const dayButtonClasses = buttonVariants({ variant: "ghost" });

const dayClasses = "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent"
const dayIsRangeClasses = "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
const dayNotIsRangeClasses = "[&:has([aria-selected])]:rounded-md";

function getClassNames(isRange: boolean) {
    const classnamesClasses = {
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",

        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",

        nav: "flex items-center space-x-1",
        nav_button_previous: cn(navButtonClasses, "p-0 size-7 bg-transparent opacity-50 hover:opacity-100", "absolute left-1"),
        nav_button_next: cn(navButtonClasses, "p-0 size-7 bg-transparent opacity-50 hover:opacity-100", "absolute right-1"),
        
        month_grid: "w-full border-collapse space-y-1",

        weekdays: "flex",
        weekday: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        
        day: cn(dayClasses, isRange ? dayIsRangeClasses : dayNotIsRangeClasses),
        day_button: cn(dayButtonClasses, "size-8 p-0 font-normal aria-selected:opacity-100"),
        range_start: "day-range-start",
        range_end: "day-range-end",
        selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside: "text-muted-foreground opacity-50",
        disabled: "text-muted-foreground opacity-50",
        range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
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