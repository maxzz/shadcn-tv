import { toast } from "sonner";
import { Button } from "@/components/ui/shadcn/button";

type toastKeys = Exclude<keyof typeof toast, 'custom' | 'promise' | 'dismiss'>;

const methods: toastKeys[] = ['success', 'info', 'warning', 'error', /*'custom',*/ 'message', /*'promise', 'dismiss',*/ 'loading',];

function randomToast() {
    const method: toastKeys = methods[Math.floor(Math.random() * methods.length)];
    const message = "Event has been created";
    const description = `Toda ${new Date().toLocaleString().replace(/\//g, ".")}`;
    
    // const action = {
    //     label: "Undo",
    //     onClick: () => console.log("Undo"),
    // };
    // toast[method](message, { description, action });
    
    toast[method](message, { description });
}

export function SonnerDemo() {
    return (
        <Button
            variant="outline"
            onClick={() => {
                randomToast();
                // toast("Event has been created", {
                //     description: `Toda ${new Date().toLocaleString().replace(/\//g, ".")}`,
                //     action: {
                //         label: "Undo",
                //         onClick: () => console.log("Undo"),
                //     },
                // });
            }}
        >
            Show Toast
        </Button>
    );
}
