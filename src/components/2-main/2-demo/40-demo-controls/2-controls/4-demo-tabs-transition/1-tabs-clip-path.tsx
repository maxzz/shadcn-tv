import { useState, useRef, useEffect } from "react";
import { TABS } from "./8-tabs-data";
import css from "./tabs-transition.module.css";

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
        <div className={css["wrapper"]}>

            <ul className={css["list"]}>
                {TABS.map((tab) => (
                    <li key={tab.name}>
                        <button
                            className={css["button"]}
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

            <div aria-hidden className={css["clip-path-container"]} ref={containerRef}>
                <ul className={css["list list-overlay"]}>
                    {TABS.map((tab) => (
                        <li key={tab.name}>
                            <button
                                className={css["button-overlay button"]}
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
        <div className="p-4 min-h-96 flex justify-center">
            <TabsClipPath />
        </div>
    );
}
