import { ComponentProps } from "react";
import * as R from "react-resizable-panels";
import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import { cn } from "@/utils";

/**
 * https://github.com/bvaughn/react-resizable-panels
 */
const ResizablePanelGroup = ({ className, ...rest }: React.ComponentProps<typeof R.PanelGroup>) => (
    <R.PanelGroup
        className={cn("w-full h-full flex data-[panel-group-direction=vertical]:flex-col", className)}
        {...rest}
    />
);

const ResizablePanel = R.Panel;

//hover:bg-sky-700 transition-colors delay-[.15s] \
//hover:bg-sky-500 [transition:background-color_.1s_ease_.4s] \

const ResizableHandleClasses = "\
relative pb-2 w-px \
\
bg-border \
hover:bg-sky-700 transition-colors delay-[.15s] \
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
flex items-end justify-center \
";

function ResizableHandleToys() {
    return (
        <div className="w-3 h-4 rounded-sm border bg-border flex items-center justify-center z-10">
            <DragHandleDots2Icon className="h-2.5 w-2.5" />
        </div>
    );
}

function ResizableHandle({ className, children, ...rest }: ComponentProps<typeof R.PanelResizeHandle>) {
    return (
        <R.PanelResizeHandle className={cn(ResizableHandleClasses, className)} {...rest}>
            {children}
        </R.PanelResizeHandle>
    );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle, ResizableHandleToys };
