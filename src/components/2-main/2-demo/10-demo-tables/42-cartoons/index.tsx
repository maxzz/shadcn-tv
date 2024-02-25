import css from "./cartoons.module.css"; // https://codepen.io/pleasedonotdisturb/pen/poqrZLZ 'Character Showcase Gallery'

export function CartoonsDemo() {
    return (
        <div className={`${css["container"]} py-8`}>
            <div className={`${css["box"]} ${css["box-1"]}`} style={{ "--img": "url(https://i.postimg.cc/sgBkfbtx/img-1.jpg)" }} data-text="Renji"></div>
            <div className={`${css["box"]} ${css["box-2"]}`} style={{ "--img": "url(https://i.postimg.cc/3RZ6bhDS/img-2.jpg)" }} data-text="Sora"></div>
            <div className={`${css["box"]} ${css["box-3"]}`} style={{ "--img": "url(https://i.postimg.cc/DZhHg0m4/img-3.jpg)" }} data-text="Kaito"></div>
            <div className={`${css["box"]} ${css["box-4"]}`} style={{ "--img": "url(https://i.postimg.cc/KjqWx5ft/img-4.jpg)" }} data-text="Tsuki"></div>
            <div className={`${css["box"]} ${css["box-5"]}`} style={{ "--img": "url(https://i.postimg.cc/nrcWyW4H/img-5.jpg)" }} data-text="Mitsui"></div>
        </div>
    );
}
