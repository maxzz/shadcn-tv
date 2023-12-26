import { SplitPane } from "../../split-pane2";

export function DemoSplitter() {
    return (
        <div className="relative p-4 w-full h-32 border-muted border">
            <SplitPane className="" split="vertical">
                <div>default1</div>
                <div className="p-4">default2</div>
            </SplitPane>
        </div>
    );
}
