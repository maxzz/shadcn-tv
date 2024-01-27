import styles from "./spinner7.module.css";

export function Spinner7() {
    return (
        <div>
            <div className={`${styles["loader"]}`}>
                Loading
                <span />
            </div>
        </div>
    );
}
