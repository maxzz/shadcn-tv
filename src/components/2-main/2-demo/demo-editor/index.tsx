import { Code } from "@/components/ui/editor";
import sharedStyles from "@/components/ui/editor/shared.module.css";
import Example from "./Example";

// export function EditorDemo() {
//     return (
//         <div>
//             <Code
//                 className={sharedStyles.InlineCode}
//                 code="expand(): void"
//                 language="typescript"
//             />
//         </div>
//     );
// }

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
                code={CODE}
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
                headerNode={
                    <>
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
                                <Code
                                    className={sharedStyles.InlineCode}
                                    code="collapse(): void"
                                    language="typescript"
                                />
                                Collapse the panel to its minimum size
                            </li>
                            <li>
                                <Code
                                    className={sharedStyles.InlineCode}
                                    code="expand(): void"
                                    language="typescript"
                                />
                                Expand the panel to its previous size
                            </li>
                            <li>
                                <Code
                                    className={sharedStyles.InlineCode}
                                    code={`getId(): string`}
                                    language="typescript"
                                />
                                Panel id
                            </li>
                            <li>
                                <Code
                                    className={sharedStyles.InlineCode}
                                    code={`getSize(): number`}
                                    language="typescript"
                                />
                                Panel's current size in (in both percentage and pixel units)
                            </li>
                            <li>
                                <Code
                                    className={sharedStyles.InlineCode}
                                    code="isCollapsed(): boolean"
                                    language="typescript"
                                />
                                Panel is currently collapsed
                            </li>
                            <li>
                                <Code
                                    className={sharedStyles.InlineCode}
                                    code="isExpanded(): boolean"
                                    language="typescript"
                                />
                                Panel is currently expanded
                            </li>
                            <li>
                                <Code
                                    className={sharedStyles.InlineCode}
                                    code={`resize(size: number): void`}
                                    language="typescript"
                                />
                                Resize the panel to the specified size (either percentage or pixel
                                units)
                            </li>
                        </ul>
                    </>
                }
                language="tsx"
                title="Imperative Panel API"
            />
        </div>
    );
}
