import { ComponentPropsWithoutRef, ElementRef, HTMLAttributes, createContext, forwardRef, useContext, useId } from "react";
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext, } from "react-hook-form";
import { Slot } from "@radix-ui/react-slot";
import * as LabelPrim from "@radix-ui/react-label";
import { Label } from "./label";
import { cn } from "@/utils";

const Form = FormProvider;

type FormFieldContextValue<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
    name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>(
    {} as FormFieldContextValue
);

const FormField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>
    ({ ...rest }: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: rest.name }}>
            <Controller {...rest} />
        </FormFieldContext.Provider>
    );
};

const useFormField = () => {
    const fieldContext = useContext(FormFieldContext);
    const itemContext = useContext(FormItemContext);
    const { getFieldState, formState } = useFormContext();

    const fieldState = getFieldState(fieldContext.name, formState);

    if (!fieldContext) {
        throw new Error("useFormField should be used within <FormField>");
    }

    const { id } = itemContext;

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    };
};

type FormItemContextValue = {
    id: string;
};

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...rest }, ref) => {
        const id = useId();
        return (
            <FormItemContext.Provider value={{ id }}>
                <div ref={ref} className={cn("space-y-2", className)} {...rest} />
            </FormItemContext.Provider>
        );
    }
);
FormItem.displayName = "FormItem";

const FormLabel = forwardRef<ElementRef<typeof LabelPrim.Root>, ComponentPropsWithoutRef<typeof LabelPrim.Root>>(
    ({ className, ...rest }, ref) => {
        const { error, formItemId } = useFormField();
        return (
            <Label ref={ref} className={cn(error && "text-destructive", className)} htmlFor={formItemId} {...rest} />
        );
    }
);
FormLabel.displayName = "FormLabel";

const FormControl = forwardRef<ElementRef<typeof Slot>, ComponentPropsWithoutRef<typeof Slot>>(
    ({ ...rest }, ref) => {
        const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
        return (
            <Slot
                ref={ref}
                id={formItemId}
                aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
                aria-invalid={!!error}
                {...rest}
            />
        );
    }
);
FormControl.displayName = "FormControl";

const FormDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...rest }, ref) => {
        const { formDescriptionId } = useFormField();
        return (
            <p ref={ref} className={cn("text-[0.8rem] text-muted-foreground", className)} id={formDescriptionId} {...rest} />
        );
    }
);
FormDescription.displayName = "FormDescription";

const FormMessage = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
    ({ className, children, ...rest }, ref) => {
        const { error, formMessageId } = useFormField();
        const body = error ? String(error?.message) : children;
        if (!body) {
            return null;
        }
        return (
            <p ref={ref} className={cn("text-[0.8rem] font-medium text-destructive", className)} id={formMessageId} {...rest}>
                {body}
            </p>
        );
    }
);
FormMessage.displayName = "FormMessage";

export {
    useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
};
