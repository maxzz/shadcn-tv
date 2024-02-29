import { useSnapshot } from 'valtio';
import { appSettings } from '@/store';
import * as Prim from "@/components/ui/shadcn/accordion";
import { Showcase } from ".";

export function ShowcasesView({ cases }: { cases: Showcase[]; }) {
    const { activeDemoAccordion } = useSnapshot(appSettings).demosState;
    return (
        <Prim.Accordion
            className="w-full"
            type="single"
            collapsible
            value={activeDemoAccordion}
            onValueChange={(v) => appSettings.demosState.activeDemoAccordion = v}
        >
            {cases.map((c) => (
                <Prim.AccordionItem className="border-b-0" value={c.id} key={c.id}>
                    <Prim.AccordionTrigger className="underline-offset-4">{c.name}</Prim.AccordionTrigger>
                    <Prim.AccordionContent className="pt-4 border-t border-b" >{c.component}</Prim.AccordionContent>
                </Prim.AccordionItem>
            ))}

        </Prim.Accordion>
    );
}

//TODO: Do Prim.AccordionTrigger hover effect better: className="underline-offset-4 _hover:no-underline _hover:bg-muted"
