import styles from "./flip-clock.module.css";

export function FlipClock() {
    return (
        <div>
            {/* <div className="flip-clock" data-date="2017-02-11"
            // @click="update"
            >
                <tracker v-for="tracker in trackers" :property="tracker" :time="time" v-ref:trackers />
            </div> */}

            <div className="flip-clock" data-date="2017-02-11">
                <span className="flip-clock__piece" style={{}}>
                    <TwoDigits front={0} back={0} />
                    {/* <span className="flip-clock__card flip-card">
                        <b className="flip-card__top">00</b>
                        <b className="flip-card__bottom" data-value={00} />
                        <b className="flip-card__back" data-value={00} />
                        <b className="flip-card__back-bottom" data-value={00} />
                    </span> */}
                    <span className="flip-clock__slot">Days</span>
                </span>
                <span className="flip-clock__piece flip" style={{}}>
                    <TwoDigits front={7} back={7} />
                    {/* <span className="flip-clock__card flip-card">
                        <b className="flip-card__top">07</b>
                        <b className="flip-card__bottom" data-value={07} />
                        <b className="flip-card__back" data-value={00} />
                        <b className="flip-card__back-bottom" data-value={00} />
                    </span> */}
                    <span className="flip-clock__slot">Hours</span>
                </span>
                <span className="flip-clock__piece flip" style={{}}>
                    <TwoDigits front={46} back={0} />
                    {/* <span className="flip-clock__card flip-card">
                        <b className="flip-card__top">46</b>
                        <b className="flip-card__bottom" data-value={46} />
                        <b className="flip-card__back" data-value={00} />
                        <b className="flip-card__back-bottom" data-value={00} />
                    </span> */}
                    <span className="flip-clock__slot">Minutes</span>
                </span>
                <span className="flip-clock__piece flip" style={{}}>
                    <TwoDigits front={20} back={21} />
                    {/* <span className="flip-clock__card flip-card">
                        <b className="flip-card__top">20</b>
                        <b className="flip-card__bottom" data-value={20} />
                        <b className="flip-card__back" data-value={21} />
                        <b className="flip-card__back-bottom" data-value={21} />
                    </span> */}
                    <span className="flip-clock__slot">Seconds</span>
                </span>
            </div>

        </div>
    );
}
function TwoDigits({ front, back }: { front: number, back: number; }) {
    return <span className="flip-clock__card flip-card">
        <b className="flip-card__top">{front}</b>
        <b className="flip-card__bottom" data-value={front} />
        <b className="flip-card__back" data-value={back} />
        <b className="flip-card__back-bottom" data-value={back} />
    </span>;
}

