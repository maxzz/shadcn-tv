import css from "./flip-clock.module.css";

export function FlipClock() {
    return (
        <div>
            {/* <div className="flip-clock" data-date="2017-02-11"
            // @click="update"
            >
                <tracker v-for="tracker in trackers" :property="tracker" :time="time" v-ref:trackers />
            </div> */}

            <div className={css["flip-clock"]} data-date="2017-02-11">
                <span className={css["flip-clock__piece"]} style={{}}>
                    <TwoDigits front={0} back={0} />
                    <span className={css["flip-clock__slot"]}>Days</span>
                </span>
                <span className={`${css["flip-clock__piece"]} ${css["flip"]}`} style={{}}>
                    <TwoDigits front={7} back={7} />
                    <span className={css["flip-clock__slot"]}>Hours</span>
                </span>
                <span className={`${css["flip-clock__piece"]} ${css["flip"]}`} style={{}}>
                    <TwoDigits front={46} back={0} />
                    <span className={css["flip-clock__slot"]}>Minutes</span>
                </span>
                <span className={`${css["flip-clock__piece"]} ${css["flip"]}`} style={{}}>
                    <TwoDigits front={20} back={21} />
                    <span className={css["flip-clock__slot"]}>Seconds</span>
                </span>
            </div>

        </div>
    );
}
function TwoDigits({ front, back }: { front: number, back: number; }) {
    return <span className={`${css["flip-clock__card"]} ${css["flip-card"]}`}>
        <b className={css["flip-card__top"]}>{front}</b>
        <b className={css["flip-card__bottom"]} data-value={front} />
        <b className={css["flip-card__back"]} data-value={back} />
        <b className={css["flip-card__back-bottom"]} data-value={back} />
    </span>;
}

