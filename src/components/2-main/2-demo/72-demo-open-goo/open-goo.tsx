// https://codepen.io/ste-vg/pen/dENPjO 'Modal Mitosis 🦠 | CSS-Only Gooey Content Toggle | @keyframers 2.5.0'

import styles from "./open-goo.module.css";
// console.log("styles", styles);

export function OpenGoo() {
    return (
        <div className={`relative ${styles["wrapper"]} bg-sky-950 flex items-center justify-center`}>

            <svg className={`w-full h-full ${styles["goo-filter"]}`} viewBox="0 0 1 1">
                <filter id="goo">
                    <feGaussianBlur
                        in="SourceGraphic"
                        stdDeviation={10}
                        result="blur"
                    />
                    <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -20"
                        result="goo"
                    />
                    <feBlend
                        in="SourceGraphic"
                        in2="goo"
                    />
                </filter>
            </svg>

            <div id={`relative ${styles["app"]}`}>
                <input type="checkbox" id={styles["toggle"]} name="toggle" />

                <div className={styles["background"]}>
                    <div className={styles["bg-content"]}>
                        <div className={styles["drip"]} />
                        <div className={styles["drip"]} />
                        <div className={styles["drip"]} />
                        <div className={styles["drip"]} />
                        <div className={styles["drip"]} />
                        <div className={styles["drip"]} />
                    </div>
                    <div className={`${styles["bg-description"]}`}>
                        <div className={styles["drip"]} />
                        <div className={styles["drip"]} />
                        <div className={styles["drip"]} />
                        <div className={styles["drip"]} />
                        <div className={styles["drip"]} />
                        <div className={styles["drip"]} />
                    </div>
                </div>

                <div className={styles["content"]}>
                    <div className={styles["avatar"]}>🕶</div>
                    <header>Ocularia Solaria</header>
                    <label className={styles["button"]} htmlFor={styles["toggle"]} />
                </div>

                <div className={`${styles["description"]} ${styles["transit"]}`}>
                    <header>Sunglasses!</header>
                    <p>Cool.</p>
                </div>

            </div>
        </div>
    );
}
