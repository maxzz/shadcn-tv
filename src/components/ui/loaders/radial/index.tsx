import styles from "./radial.module.css";

export function RadialLoader() {
    return (
        <div className="p-4 text-green-950 flex items-center justify-center">

            <div className="relative w-32 h-32 border-current border-[14px] rounded-full">
                <div className={`${styles.a} m-1 absolute inset-0 border-current border-[8px] border-y-transparent rounded-full`} />
                <div className={`${styles.b} m-4 absolute inset-0 border-current border-[20px] border-x-transparent rounded-full`} />
            </div>
           
        </div>
    );
}
