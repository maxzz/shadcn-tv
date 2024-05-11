import { InputHTMLAttributes } from 'react';

function RadioButton({ label, ...rest }: { label: string; } & InputHTMLAttributes<HTMLElement>) {
    return (
        <div>
            <label className="h-6 cursor-pointer select-none inline-flex items-center space-x-3">
                <input type="radio" className="size-4 dark-radio" {...rest} />

                <div>
                    {label}
                </div>
            </label>
        </div>
    );
}

type RadioGroupProps = {
    items: string[];
    groupName: string;
    selected: number;
    setSelected: (v: number) => void;
};

export function RadioGroup({ items, groupName, selected, setSelected }: RadioGroupProps) {
    return (
        <div className="px-3 py-2 min-w-[14rem] max-w-max bg-background rounded flex flex-col space-y-1">
            {items.map(
                (item, idx) => (
                    <RadioButton
                        name={groupName}
                        label={item}
                        value={idx}
                        checked={selected === idx}
                        onChange={() => setSelected(idx)}
                        key={idx}
                    />
                ))
            }
        </div>
    );
}
