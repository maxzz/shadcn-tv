---
title: Timeline
description: Timeline Component is designed to display events in chronological order or event sequences.
component: true
---

<ComponentPreview name="timeline-demo" description="A timeline" />

## Installation

<Tabs defaultValue="cli">

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add timeline
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

<ComponentSource name="timeline" />

<Step>Update the import paths to match your project setup.</Step>

</Steps>

</TabsContent>

</Tabs>

## Usage

```tsx
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineContentDescription,
  TimelineContentLabel,
  TimelineDot,
  TimelineItem,
  TimelineItemLabel,
} from "@/components/ui/timeline"
```

```tsx
<Timeline>
  <TimelineItemLabel>1 Nov, 2024</TimelineItemLabel>
  <TimelineItem>
    <TimelineConnector>
      <TimelineDot size="sm" />
    </TimelineConnector>
    <TimelineContent>
      <TimelineContentLabel>Created Task</TimelineContentLabel>
      <TimelineContentDescription>
        Find more detailed insctructions here.
      </TimelineContentDescription>
    </TimelineContent>
  </TimelineItem>

  <TimelineItem>
    <TimelineConnector>
      <TimelineDot size="sm" />
    </TimelineConnector>
    <TimelineContent>
      <TimelineContentLabel>Release v5.2.0 quick bug fix</TimelineContentLabel>
      <TimelineContentDescription>Nov 26, 01:38 PM</TimelineContentDescription>
    </TimelineContent>
  </TimelineItem>

  <TimelineItemLabel>20 Nov, 2024</TimelineItemLabel>
  <TimelineItem>
    <TimelineConnector>
      <TimelineDot size="sm" />
    </TimelineConnector>
    <TimelineContent>
      <TimelineContentLabel>Take a break</TimelineContentLabel>
      <TimelineContentDescription>
        Just chill for now
      </TimelineContentDescription>
    </TimelineContent>
  </TimelineItem>
</Timeline>
```

## With Icon

<ComponentPreview name="timeline-with-icon" description="A timeline" />

[feat(components): add new timeline component #5986](https://github.com/shadcn-ui/ui/pull/5986)
[feat(components): add new timeline component #5986 diff](https://github.com/shadcn-ui/ui/pull/5986/commits/f7395a3d78eeb4c377dbe1f8fb48e0ea470bdd56)
[timeline.tsx](https://github.com/shadcn-ui/ui/blob/f7395a3d78eeb4c377dbe1f8fb48e0ea470bdd56/apps/www/registry/default/ui/timeline.tsx)
