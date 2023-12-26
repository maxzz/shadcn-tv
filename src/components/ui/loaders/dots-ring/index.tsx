import "./dots-ring.css"; // https://codepen.io/josetxu/pen/gOEYMyQ

export function LoaderDotsRing() {
    return (
        <div className="">
            <input type="checkbox" />
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
