import { ReactNode } from 'react';

export function Card({ title, children }: { title: string; children: ReactNode; }) {
    return (
        <div className="p-2">
            <div className="p-4  bg-white shadow-md rounded-md inline-block">
                <div className="px-3 font-bold text-xl pb-4">{title}</div>
                {children}
            </div>
        </div>
    );
}
