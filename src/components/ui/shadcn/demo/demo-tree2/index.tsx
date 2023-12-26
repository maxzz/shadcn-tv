import { SplitPane } from "../../split-pane2";

export function DemoTree2() {
    return (
        <div className="relative p-4 w-full h-32 border-muted border">
            <SplitPane className="" split="vertical">
                <div>default min: 50px</div>
                <div />
                <div />
                <div />
            </SplitPane>
        </div>
    );
}
