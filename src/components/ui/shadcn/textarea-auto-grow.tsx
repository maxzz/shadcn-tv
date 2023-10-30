import { forwardRef } from "react";
import { cn } from "@/utils";
import { Textarea, TextareaProps } from "./textarea";

// https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas
const containerClasses = '\
after:![content:attr(data-replicated)_"_"] \
after:whitespace-pre \
after:border-transparent \
after:invisible \
after:[grid-area:1/1/2/2] \
grid';
const textareaClasses = "resize-none overflow-hidden [grid-area:1/1/2/2]";

// These are for container padding, font, and border adjustments
export const containerPaddingFontClasses = 'after:px-3 after:py-2 after:text-sm after:border';

// These are for debugging syncronization of elements ::after and textarea
export const containerPaddingFontDebugClasses = "after:text-red-500 after:visible after:pointer-events-none";

/**
 *  ```
 *  // Example:
 *  const snap = useSnapshot(parseText, { sync: true });
 * 
 *  <TextareaAutoGrow
 *      value={snap.text}
 *      onChange={(e) => parseText.text = e.target.value}
 *      rows={1}
 *      className="min-h-0"
 *      // textareaPaddingFont={cn(textareaPaddingFontDebugClasses, textareaPaddingFontClasses)}
 *      placeholder="Paste theme vars here"
 *      spellCheck={false}
 *  />
 *  ```
 * @param {string} containerPaddingFont "textareaPaddingFontDebugClasses" can be used for debugging. \
 * Also additional styles can be provided to adjust container padding, font, or border.
 */
export const TextareaAutoGrow = forwardRef<HTMLTextAreaElement, { containerPaddingFont?: string; } & TextareaProps>(
    ({ containerPaddingFont = containerPaddingFontClasses, className, value, ...rest }, ref) => {
        return (
            <div className={cn(containerClasses, containerPaddingFont)} data-replicated={value}>
                <Textarea className={cn(textareaClasses, className)} value={value} ref={ref} {...rest} />
            </div>
        );
    }
);
TextareaAutoGrow.displayName = "TextareaAutoGrow";

export function TextareaAutoGrowWoRef({ containerPaddingFont = containerPaddingFontClasses, className, value, ...rest }: { containerPaddingFont?: string; } & TextareaProps) {
    return (
        <div className={cn(containerClasses, containerPaddingFont)} data-replicated={value}>
            <Textarea className={cn(textareaClasses, className)} value={value} {...rest} />
        </div>
    );
}
