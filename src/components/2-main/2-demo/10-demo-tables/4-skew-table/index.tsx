import css from './skew.module.css'; // https://codepen.io/bbx/pen/Jxoqdg 'accordion gallery zoom animation (css, responsive)'

const names = ['Plotting Cat', 'Angry Cat', 'Curious Cat', 'Prowling Cat', 'Sleepy Cat'];

const imgs = [
    "https://upload.wikimedia.org/wikipedia/commons/d/d6/Cat_plotting_something_evil%21.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/False_alarm_-a.jpg/1280px-False_alarm_-a.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Neugierige-Katze.JPG/1280px-Neugierige-Katze.JPG",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Al_acecho_%289272124788%29.jpg/1280px-Al_acecho_%289272124788%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Mimi%26Tigsi.jpg/1280px-Mimi%26Tigsi.jpg",
];

export function SkewTable() {
    return (
        <div className={css["container"]}>
            {
                imgs.map((img, idx) => (
                    <div key={idx} className={css["card"]}>
                        <img src={img} />
                        <div className={css["card__head"]}>{names[idx]}</div>
                    </div>
                ))
            }

            {/* <div className={css["card"]}>
                <img src={imgs[0]} />
                <div className={css["card__head"]}>Plotting Cat</div>
            </div>
            <div className={css["card"]}>
                <img src={imgs[1]} />
                <div className={css["card__head"]}>Angry Cat</div>
            </div>
            <div className={css["card"]}>
                <img src={imgs[2]} />
                <div className={css["card__head"]}>Curious Cat</div>
            </div>
            <div className={css["card"]}>
                <img src={imgs[3]} />
                <div className={css["card__head"]}>Prowling Cat</div>
            </div>
            <div className={css["card"]}>
                <img src={imgs[4]} />
                <div className={css["card__head"]}>Sleepy Cat</div>
            </div> */}
        </div>
    );
}
