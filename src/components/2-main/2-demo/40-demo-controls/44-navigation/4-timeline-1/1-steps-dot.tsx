import { ComponentProps } from "react"; // https://buildui.com/recipes/multistep-wizard#code
import { motion } from "framer-motion";

export function Step({ step, currentStep }: { step: number; currentStep: number; }) {
    let status =
        currentStep === step
            ? "active"
            : currentStep < step
                ? "inactive"
                : "complete";
    return (
        <motion.div className="relative" animate={status}>
            <motion.div
                className="absolute inset-0 rounded-full bg-blue-200"
                variants={frameVariants}
                transition={{ duration: 0.6, delay: 0.2, type: "tween", ease: "circOut", }}
            />

            <motion.div
                className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold"
                initial={false}
                variants={circleVariants}
                transition={{ duration: 0.2 }}
            >
                <div className="flex items-center justify-center">
                    {status === "complete"
                        ? <CheckIcon className="h-6 w-6 text-white" />
                        : <span>{step}</span>
                    }
                </div>
            </motion.div>
        </motion.div>
    );
}

const frameVariants = {
    active: {
        scale: 1,
        transition: { delay: 0, duration: 0.2, },
    },
    complete: {
        scale: 1.25,
    },
};

const circleVariants = {
    inactive: {
        backgroundColor: "#fff", // neutral
        borderColor: "#e5e5e5", // neutral-200
        color: "#a3a3a3", // neutral-400
    },
    active: {
        backgroundColor: "#fff",
        borderColor: "#3b82f6", // blue-500
        color: "#3b82f6", // blue-500
    },
    complete: {
        backgroundColor: "#3b82f6", // blue-500
        borderColor: "#3b82f6", // blue-500
        color: "#3b82f6", // blue-500
    },
};

function CheckIcon(props: ComponentProps<"svg">) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} {...props}>
            <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.2, type: "tween", ease: "easeOut", duration: 0.3, }}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
            />
        </svg>
    );
}
