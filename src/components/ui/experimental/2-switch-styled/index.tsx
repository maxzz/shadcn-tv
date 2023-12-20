import { InputHTMLAttributes } from "react";
import { classNames } from "@/utils";
import "./styles.css";

export function SwitchStyled({ className, ...rest }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className={classNames("toggle-wrapper", className)}>
            <input className="toggle-checkbox" type="checkbox" {...rest} />

            <svg className="toggle-icon off" viewBox="0 0 16 16">
                <path d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8Z" />
            </svg>

            <div className="toggle-container">
                <div className="toggle-button" />
            </div>

            <svg className="toggle-icon on" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 1 1 16 0zM2 8a6 6 0 1 0 12 0A6 6 0 1 0 2 8zm10 0a4 4 0 1 1-8 0 4 4 0 1 1 8 0z" />
            </svg>

        </div>
    );
}

export function DemoSwitchStyled() {
    return (
        <div className="flex flex-col space-y-2">
            <SwitchStyled />
            <SwitchStyled defaultChecked />
        </div>
    );
}
