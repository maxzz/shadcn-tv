import "./radial.css";

export function RadialLoader() {
    return (
        <div className="text-green-500">
            <div className="relative w-32 h-32 border-current border-[14px] rounded-full" id="preloader">
                <div className="a m-1 absolute inset-0 bg-transparent border-current border-[8px] border-t-transparent border-b-transparent rounded-full" />
                <div className="b m-4 absolute inset-0 bg-transparent border-current border-[20px] border-l-transparent border-r-transparent rounded-full" />
            </div>
        </div>
    );
}
//flex items-center justify-center