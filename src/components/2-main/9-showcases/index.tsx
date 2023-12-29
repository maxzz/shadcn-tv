import * as A from "@/components/ui/shadcn/accordion";
import { Showcase, initialCase } from "./cases";

export function Showcases({ cases }: { cases: Showcase[]; }) {
    return (
        <A.Accordion className="w-full" type="single" collapsible defaultValue={initialCase}>

            {cases.map((c) => (
                <A.AccordionItem className="border-b-0" value={c.id} key={c.id}>
                    <A.AccordionTrigger>{c.name}</A.AccordionTrigger>
                    <A.AccordionContent className="pt-4 border-t border-b" >{c.component}</A.AccordionContent>
                </A.AccordionItem>
            ))}

        </A.Accordion>
    );
}
