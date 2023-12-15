import { ReactNode } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/shadcn/accordion";

export type Case = {
    id: string;
    name: string;
    component: () => JSX.Element;
};

export function DifferentCases({ cases }: { cases: Case[]; }) {
    return (
        <Accordion type="single" collapsible className="w-full">

            {cases.map((c) => (
                <AccordionItem value={c.id} key={c.id}>
                    <AccordionTrigger>{c.name}</AccordionTrigger>
                    <AccordionContent><c.component /></AccordionContent>
                </AccordionItem>
            ))}

        </Accordion>
    );
}
