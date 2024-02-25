import css from "./books.module.css"; // https://codepen.io/BlogFire/pen/RwMwjMP 'Book reviews - CSS and a bit of GSAP'

const books = [
    {
        title: "Angels 3o'clock",
        author: "Jack Hartley",
        publisher: "Crown Press",
        review: "When Jack wakes up at 3am one morning to find angels in his bedroom his life changes forever. An extraordinary read and a fine first novel. The Grauniad"
    },
    {
        title: "Cloud Bustin'",
        author: "Sian O'Brien",
        publisher: "Crown Press",
        review: "Kate's father has a secret. When the Russians discover it she and her father have a race against time to stop it falling into the wrong hands. I couldn't put this down. The story charges towards a thrilling climax. Woman's Weekly"
    },
    {
        title: "Seven Deadly Bins",
        author: "Trash Norton",
        publisher: "Crown Press",
        review: "Michael uncovers a plot to blow up the Australian Embassy in London. However, no one believes him and he must find a way to convince the authorities of the truth. Following hot on the heels of his previous novel, The Henchman's Basin, this is a fine novel indeed. Fishing Magazine Monthly"
    },
    {
        title: "A Cuckoo Calls",
        author: "Erasmus Coach",
        publisher: "Crown Press",
        review: "Expect the unexpected in this expertly woven tale of a birdwatcher. Well, I certainly didn't expect this when I started reading. Twitcher's Monthly"
    },
    {
        title: "A Steamy Romance",
        author: "Eliza Smalls",
        publisher: "Crown Press",
        review: "Hubert and Molly have worked in the same clothes cleaner's for years. When they fall in love their loyalty to their boss is tested. I cried buckets to this one and got the pages wet. The Rock Garden Hobbyist"
    }
];

const itemClass = ["one", "two", "three", "four", "five"];

export function RotaingBooksDemo() {
    return (
        <div className={css["wrap"]}>
            {
                books.map((book, idx) => (
                    <div key={idx} className={`${css["strip"]} ${css[itemClass[idx]]}`} style={{ opacity: 1, height: "100%" }}>
                        <p className={css["crown"]}>♔</p>
                        <div className={css["h1"]}>{book.title}</div>
                        <div className={css["h2"]}>{book.author}</div>
                        <div className={css["h3"]}>{book.publisher}</div>
                        <div className={css["review"]}>
                            <p>{book.review}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

/*
gsap.to(".strip", {
    height: "100%",
    opacity: 1,
    duration: 1.5,
    delay: .5,
    ease: "expo.out",
    stagger: {
        ease: "none",
        amount: 1.5,
    }
})
gsap.from("h1, h2, h3, h4", {
    opacity: 0,
    duration: 1,
    delay: 1,
    stagger: {
        amount: 1.5,
    }
});
*/