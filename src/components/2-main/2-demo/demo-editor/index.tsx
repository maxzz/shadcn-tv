import { Code } from "@/components/ui/editor";
import { Example } from "./example";

const CODE = `
import {
  ImperativePanelHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

const ref = useRef<ImperativePanelHandle>(null);

const collapsePanel = () => {
  const panel = ref.current;
  if (panel) {
    panel.collapse();
  }
};

<PanelGroup direction="horizontal">
  <Panel collapsible ref={ref}>
    left
  </Panel>
  <PanelResizeHandle />
  <Panel>
    right
  </Panel>
</PanelGroup>
`;

export function EditorDemo() {
    return (
        <div>
            <Example
                title="Imperative Panel API"
                headerNode={<>
                    <p>
                        Sometimes panels need to resize or collapse/expand in response to
                        user actions. For example, double-clicking on a resize bar in VS
                        Code resizes the panel to a size that fits all file names. This type
                        of interaction can be implemented using the imperative API.
                    </p>
                    <p>
                        <code>Panel</code> provides the following imperative API methods:
                    </p>
                    <ul>
                        <li>
                            <Code className="mr-4" language="typescript" code="collapse(): void" />
                            Collapse the panel to its minimum size
                        </li>
                        <li>
                            <Code className="mr-4" language="typescript" code="expand(): void" />
                            Expand the panel to its previous size
                        </li>
                        <li>
                            <Code className="mr-4" language="typescript" code={`getId(): string`} />
                            Panel id
                        </li>
                        <li>
                            <Code className="mr-4" language="typescript" code={`getSize(): number`} />
                            Panel's current size in (in both percentage and pixel units)
                        </li>
                        <li>
                            <Code className="mr-4" language="typescript" code="isCollapsed(): boolean" />
                            Panel is currently collapsed
                        </li>
                        <li>
                            <Code className="mr-4" language="typescript" code="isExpanded(): boolean" />
                            Panel is currently expanded
                        </li>
                        <li>
                            <Code className="mr-4" language="typescript" code={`resize(size: number): void`} />
                            Resize the panel to the specified size (either percentage or pixel units)
                        </li>
                    </ul>
                </>}
                exampleNode={
                    // <Content
                    //     leftPanelRef={leftPanelRef}
                    //     middlePanelRef={middlePanelRef}
                    //     rightPanelRef={rightPanelRef}
                    //     onResize={onResize}
                    //     sizes={sizes}
                    // />
                    <div className="">Content goes here</div>
                }
                code={CODE}
                language="tsx"
            />
        </div>
    );
}
