import { ReactNode } from 'react';

export function Card({ title, children }: { title: string; children: ReactNode; }) {
    return (
        <div className="m-2 p-4 bg-background border-border border rounded-md shadow-md">
            <div className="px-3 font-bold text-xl pb-4">
                {title}
            </div>
            
            {children}
        </div>
    );
}
