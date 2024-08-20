import { useState, useRef, useEffect } from "react";
import { TABS } from "./8-tabs-data";

function updateStype(container: HTMLDivElement | null, activeTabElement: HTMLDivElement | null) {
    if (container && activeTabElement) {

        const { offsetLeft, offsetWidth } = activeTabElement;

        const clipLeft = offsetLeft;
        const clipRight = offsetLeft + offsetWidth;

        const w = Number(100 - (clipRight / container.offsetWidth) * 100).toFixed();
        const h = Number((clipLeft / container.offsetWidth) * 100).toFixed();

        container.style.clipPath = `inset(0 ${w}% 0 ${h}% round 17px)`;
    }
}

function TabsClipPath() {
    const [activeTab, setActiveTab] = useState(TABS[0].name);

    const containerRef = useRef<HTMLDivElement>(null);
    const activeTabElementRef = useRef(null);

    useEffect(() => {
        if (activeTab) {
            updateStype(containerRef.current, activeTabElementRef.current);
        }
    }, [activeTab, activeTabElementRef, containerRef]);

    return (
        <div className="wrapper">

            <ul className="list">
                {TABS.map((tab) => (
                    <li key={tab.name}>
                        <button
                            className="button"
                            ref={activeTab === tab.name ? activeTabElementRef : null}
                            onClick={() => setActiveTab(tab.name)}
                            data-tab={tab.name}
                        >
                            {tab.icon}
                            {tab.name}
                        </button>
                    </li>
                ))}
            </ul>

            <div aria-hidden className="clip-path-container" ref={containerRef}>
                <ul className="list list-overlay">
                    {TABS.map((tab) => (
                        <li key={tab.name}>
                            <button
                                className="button-overlay button"
                                onClick={() => setActiveTab(tab.name)}
                                data-tab={tab.name}
                                tabIndex={-1}
                            >
                                {tab.icon}
                                {tab.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
}

export function TabsTransitionDemo() {
    return (
        <div className="p-4 flex justify-center">
            <TabsClipPath />
        </div>
    );
}
