import css from "./bubbles.module.css"; // https://codepen.io/jkantner/pen/poYZMXX 'Bubble Preloader'

export function BubblesDemo() {
    return (
        <div className={css["pl"]}>
            <div className={css["pl__bubble"]}>
                <div className={css["pl__bubble-drop"]} />
                <div className={css["pl__bubble-drop"]} />
                <div className={css["pl__bubble-drop"]} />
                <div className={css["pl__bubble-drop"]} />
                <div className={css["pl__bubble-drop"]} />
                <div className={css["pl__bubble-drop"]} />
                <div className={css["pl__bubble-drop"]} />
            </div>
            <div className={css["pl__bubble"]}>
                <div className={css["pl__bubble-drop"]} />
                <div className={css["pl__bubble-drop"]} />
                <div className={css["pl__bubble-drop"]} />
                <div className={css["pl__bubble-drop"]} />
                <div className={css["pl__bubble-drop"]} />
                <div className={css["pl__bubble-drop"]} />
                <div className={css["pl__bubble-drop"]} />
            </div>
            <div className={css["pl__bubble"]}>
                <div className={css["pl__bubble-drop"]} />
                <div className={css["pl__bubble-drop"]} />
                <div className={css["pl__bubble-drop"]} />
                <div className={css["pl__bubble-drop"]} />
                <div className={css["pl__bubble-drop"]} />
                <div className={css["pl__bubble-drop"]} />
                <div className={css["pl__bubble-drop"]} />
            </div>
        </div>
    );
}
