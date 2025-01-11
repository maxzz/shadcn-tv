import { useState, useRef, useEffect } from "react";
import { tabsData } from "./8-tabs-data";

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

const wrapperClasses = "relative mx-auto w-fit flex flex-col items-center";
const listClasses = "relative flex w-full justify-center gap-2";
const listOverlayClasses = "bg-blue-600";
const buttonClasses = "p-4 h-8 1h-[34px] rounded-full text-sm 1text-[14px] font-semibold text-foreground flex items-center gap-2";
const buttonOverlayClasses = "text-white";
const clipPathContainerClasses = "\
absolute \
w-full \
overflow-hidden \
[transition:clip-path_0.25s_ease] \
clip-path-[inset(0_100%_0_0)] \
[clip-path:inset(0px_75%_0px_0%_round_17px)] \
z-10 \
";

function TabsClipPath() {
    const [activeTab, setActiveTab] = useState(tabsData[0].name);

    const containerRef = useRef<HTMLDivElement>(null);
    const activeTabElementRef = useRef(null);

    useEffect(() => {
        if (activeTab) {
            updateStype(containerRef.current, activeTabElementRef.current);
        }
    }, [activeTab, activeTabElementRef, containerRef]);

    return (
        <div className={wrapperClasses}>

            <ul className={listClasses}>
                {tabsData.map(
                    (tab) => (
                        <li key={tab.name}>
                            <button
                                className={buttonClasses}
                                ref={activeTab === tab.name ? activeTabElementRef : null}
                                onClick={() => setActiveTab(tab.name)}
                                // data-tab={tab.name}
                            >
                                {tab.icon}
                                {tab.name}
                            </button>
                        </li>
                    ))
                }
            </ul>

            <div aria-hidden className={clipPathContainerClasses} ref={containerRef}>
                <ul className={`${listClasses} ${listOverlayClasses}`}>
                    {tabsData.map(
                        (tab) => (
                            <li key={tab.name}>
                                <button
                                    className={`${buttonClasses} ${buttonOverlayClasses}`}
                                    onClick={() => setActiveTab(tab.name)}
                                    // data-tab={tab.name}
                                    tabIndex={-1}
                                >
                                    {tab.icon}
                                    {tab.name}
                                </button>
                            </li>
                        ))
                    }
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
