import { useSnapshot } from "valtio";
import { appSettings } from "@/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn";
import { StepsDemo12 } from "../1-timeline-sam";
import { Timeline3WithIcon, TimelineDemo2 } from "../2-timeline-23";
import { StepIndicator4 } from "../4-timeline-horiz-vert";
import { Timeline5WithAI, Timeline5WithAIHardcoded } from "../5-timeline-steps-ai";
import { Timeline6Codepen } from "../6-timeline-tm-adjusted";
import { classNames } from "@/utils";

const tablistWrapClasses = "flex-wrap justify-start gap-2 h-auto";

export function SubTab_Timeline() {
    const { activeTabs } = useSnapshot(appSettings).demosState;
    return (
        <Tabs defaultValue="1" value={activeTabs.timeline} onValueChange={(v) => appSettings.demosState.activeTabs.timeline = v}>
            <TabsList className={classNames("mt-2", tablistWrapClasses)}>
                <TabsTrigger value="10" title="Sam's demo"                 /**/ >Timeline1 </TabsTrigger>
                <TabsTrigger value="20" title="Shadcn proposal with steps" /**/ >Timeline2 </TabsTrigger>
                <TabsTrigger value="30" title="Shadcn proposal with icons" /**/ >Timeline3 </TabsTrigger>
                <TabsTrigger value="40" title="Horizontal/Vertical"        /**/ >Timeline4 </TabsTrigger>
                <TabsTrigger value="51" title="With AI hardcoded"          /**/ >Timeline51</TabsTrigger>
                <TabsTrigger value="52" title="With AI by components"      /**/ >Timeline52</TabsTrigger>
                <TabsTrigger value="60" title="Codepen"                    /**/ >Timeline6 </TabsTrigger>
            </TabsList>

            <TabsContent value="10" children={<StepsDemo12 />} />
            <TabsContent value="20" children={<TimelineDemo2 />} />
            <TabsContent value="30" children={<Timeline3WithIcon />} />
            <TabsContent value="40" children={<StepIndicator4 />} />
            <TabsContent value="51" children={<Timeline5WithAIHardcoded />} />
            <TabsContent value="52" children={<Timeline5WithAI />} />
            <TabsContent value="60" children={<Timeline6Codepen />} />
        </Tabs>
    );
}
