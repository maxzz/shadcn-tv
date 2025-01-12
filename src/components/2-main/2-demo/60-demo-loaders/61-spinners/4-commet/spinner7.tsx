import styles from "./spinner7.module.css";

export function Spinner7() {
    return (
        <div className={`relative w-[150px] h-[150px] ${styles["loader"]}`}>
            Loading
            <span />
        </div>
    );
}
