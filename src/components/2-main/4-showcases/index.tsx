import { ReactNode } from "react";
import * as A from "@/components/ui/shadcn/accordion";

export type Case = {
    id: string;
    name: string;
    component: ReactNode;
};

export function Showcases({ cases }: { cases: Case[]; }) {
    return (
        <A.Accordion type="single" collapsible className="w-full">

            {cases.map((c) => (
                <A.AccordionItem value={c.id} key={c.id}>
                    <A.AccordionTrigger>{c.name}</A.AccordionTrigger>
                    <A.AccordionContent>{c.component}</A.AccordionContent>
                </A.AccordionItem>
            ))}

        </A.Accordion>
    );
}
