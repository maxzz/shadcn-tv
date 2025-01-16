/**
 * Make console output more readable:
 ```js
 function some2Styles(v: ValueLife, out: ConsoleStyles = new ConsoleStyles()): ConsoleStyles {
     const isRefStr = v.isRef ? 'true ' : 'false';
     out.add({ name: ' value: ', value: `'${v.value}'`, cValue: 'color: #8eacf8' });
     out.add({ name: ' isRef: ', value: isRefStr,       cValue: v.isRef ? 'color: #00a000' : 'color: #ababab' });
     return out;
 }
 ```
 */
export class ConsoleStyles {
    colors: string[] = [];
    items: string[] = [];

    defaultColorName = 'color: #7c7c7c';
    defaultColorValue = 'color: #ababab'; // #d58e00 #8eacf8
    
    constructor(colorName?: string, colorValue?: string) {
        this.defaultColorName = colorName || this.defaultColorName;
        this.defaultColorValue = colorValue || this.defaultColorValue;
    }

    toFormat(): string {
        return this.items.join('');
    }

    toStyles(): string[] {
        return this.colors;
    }

    toFormated(label: string): string[] {
        return [`${label}${this.items.join('')}`, ...this.colors];
    }

    add({ name, value, cName, cValue }: { name: string; value: string | number | boolean; cName?: string; cValue?: string; }) {
        this.items.push(`%c${name}%c${value}`);
        this.colors.push(cName || this.defaultColorName);
        this.colors.push(cValue || this.defaultColorValue);
    }
}
