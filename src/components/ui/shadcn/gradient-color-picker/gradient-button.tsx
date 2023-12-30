import { ReactNode } from 'react';

export const GradientButton = ({ background, children, }: { background: string; children: ReactNode; }) => {
    return (
        <div className="relative rounded-md !bg-cover !bg-center p-0.5 transition-all" style={{ background }}>
            <div className="rounded-md bg-popover/80 p-1 text-center text-xs">
                {children}
            </div>
        </div>
    );
};
