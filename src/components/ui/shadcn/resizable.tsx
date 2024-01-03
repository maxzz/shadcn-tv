import * as R from "react-resizable-panels"; // https://github.com/bvaughn/react-resizable-panels
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { cn } from "@/utils";

const ResizablePanelGroup = ({ className, ...rest }: React.ComponentProps<typeof R.PanelGroup>) => (
    <R.PanelGroup
        className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
        {...rest}
    />
);

const ResizablePanel = R.Panel;

const ResizableHandleClasses = "\
relative w-px \
\
bg-border \
\
after:absolute \
after:left-1/2 \
after:-translate-x-1/2 \
after:w-1 \
after:inset-y-0 \
\
focus-visible:outline-none \
focus-visible:ring-1 \
focus-visible:ring-ring \
focus-visible:ring-offset-1 \
\
data-[panel-group-direction=vertical]:w-full \
data-[panel-group-direction=vertical]:h-px \
data-[panel-group-direction=vertical]:after:left-0 \
data-[panel-group-direction=vertical]:after:translate-x-0 \
data-[panel-group-direction=vertical]:after:-translate-y-1/2 \
data-[panel-group-direction=vertical]:after:w-full \
data-[panel-group-direction=vertical]:after:h-1 \
[&[data-panel-group-direction=vertical]>div]:rotate-90 \
\
flex items-center justify-center \
";

const ResizableHandle = ({ withHandle, className, ...rest }: React.ComponentProps<typeof R.PanelResizeHandle> & { withHandle?: boolean; }) => (
    <R.PanelResizeHandle
        className={cn(ResizableHandleClasses, className)} {...rest} >
        {withHandle && (
            <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
                <DragHandleDots2Icon className="h-2.5 w-2.5" />
            </div>
        )}
    </R.PanelResizeHandle>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
