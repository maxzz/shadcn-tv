// https://codepen.io/ste-vg/pen/dENPjO 'Modal Mitosis 🦠 | CSS-Only Gooey Content Toggle | @keyframers 2.5.0'

import styles from "./open-goo.module.css";

export default function OpenGoo() {
    return (
        <div className="wrapper">
            <svg className="goo-filter" viewBox="0 0 1 1">
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation={10} result="blur" />
                    <feColorMatrix
                        in="blur"
                        mode="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 50 -20"
                        result="goo"
                    />
                    <feBlend in="SourceGraphic" in2="goo" />
                </filter>
            </svg>
            <div id="app">
                <input type="checkbox" id="toggle" name="toggle" />
                <div className="background">
                    <div className="bg-content">
                        <div className="drip" />
                        <div className="drip" />
                        <div className="drip" />
                        <div className="drip" />
                        <div className="drip" />
                        <div className="drip" />
                    </div>
                    <div className="bg-description">
                        <div className="drip" />
                        <div className="drip" />
                        <div className="drip" />
                        <div className="drip" />
                        <div className="drip" />
                        <div className="drip" />
                    </div>
                </div>
                <div className="content">
                    <div className="avatar">🕶</div>
                    <header>Ocularia Solaria</header>
                    <label className="button" htmlFor="toggle" />
                </div>
                <div className="description">
                    <header>Sunglasses!</header>
                    <p>Cool.</p>
                </div>
            </div>
        </div>
    );
}
