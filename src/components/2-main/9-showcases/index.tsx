import * as A from "@/components/ui/shadcn/accordion";
import { Showcase } from "./cases";

export function Showcases({ cases }: { cases: Showcase[]; }) {
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
