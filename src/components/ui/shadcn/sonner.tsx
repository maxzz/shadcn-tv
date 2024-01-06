import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const toastClasses = "\
group toast \
group-[.toaster]:bg-background \
group-[.toaster]:text-foreground \
group-[.toaster]:border-border \
group-[.toaster]:shadow-lg \
";
const descriptionClasses = "group-[.toast]:text-muted-foreground";
const actionButtonClasses = "\
group-[.toast]:bg-primary \
group-[.toast]:text-primary-foreground \
";
const cancelButtonClasses = "\
group-[.toast]:bg-muted \
group-[.toast]:text-muted-foreground \
";

/**
 * https://sonner.emilkowal.ski - docs
 * https://github.com/emilkowalski/sonner
 * https://github.com/pacocoursey/next-themes
 */
export function Toaster(props: ToasterProps) {
    const { theme = "system" } = useTheme();
    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            toastOptions={{
                classNames: {
                    toast: toastClasses,
                    description: descriptionClasses,
                    actionButton: actionButtonClasses,
                    cancelButton: cancelButtonClasses,
                },
            }}
            {...props}
        />
    );
}
