import "./dots-ring.css"; // https://codepen.io/josetxu/pen/gOEYMyQ
import styles from "./dots-ring.module.css";

console.log("styles", styles);

export function LoaderDotsRing() {
    return (
        <div className="">
            <input className="control" type="checkbox" />
            <div className="bg" />
            <div className="content">
                <div className="dots">
                    <div className="dot"> <span /> </div>
                    <div className="dot"> <span /> </div>
                    <div className="dot"> <span /> </div>
                    <div className="dot"> <span /> </div>
                    <div className="dot"> <span /> </div>
                    <div className="dot"> <span /> </div>
                    <div className="dot"> <span /> </div>
                    <div className="dot"> <span /> </div>
                    <div className="dot"> <span /> </div>
                    <div className="dot"> <span /> </div>
                    <div className="dot"> <span /> </div>
                    <div className="dot"> <span /> </div>

                    <div className="ring" />
                </div>
            </div>
        </div>
    );
}
