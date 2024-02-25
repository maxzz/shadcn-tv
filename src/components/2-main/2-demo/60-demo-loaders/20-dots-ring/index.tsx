import styles from "./dots-ring.module.css";
// console.log("styles", styles);

export function LoaderDotsRing() {
    return (
        <div className={`qw-64 qh-64 ${styles["dots-ring"]}`}>
            <input className={styles.control} type="checkbox" />
            <div className={styles.bg} />
            <div className={styles.content}>
                <div className={styles.dots}>
                    <div className={styles.dot}> <span /> </div>
                    <div className={styles.dot}> <span /> </div>
                    <div className={styles.dot}> <span /> </div>
                    <div className={styles.dot}> <span /> </div>
                    <div className={styles.dot}> <span /> </div>
                    <div className={styles.dot}> <span /> </div>
                    <div className={styles.dot}> <span /> </div>
                    <div className={styles.dot}> <span /> </div>
                    <div className={styles.dot}> <span /> </div>
                    <div className={styles.dot}> <span /> </div>
                    <div className={styles.dot}> <span /> </div>
                    <div className={styles.dot}> <span /> </div>

                    <div className={styles.ring} />
                </div>
            </div>
        </div>
    );
}
