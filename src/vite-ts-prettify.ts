type Prettify<T> = {
    [K in keyof T]: T[K];
} & {}; // https://www.youtube.com/watch?v=2lCCKiWGlC0
