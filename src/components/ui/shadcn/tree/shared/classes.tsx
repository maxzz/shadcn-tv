// tree folder (mr-2 space for scroll bar)

export const folderBaseClasses = "\
mr-2 pl-1 py-1 \
before:absolute \
before:left-0 \
before:w-full \
before:h-[1.75rem] \
before:bg-muted/80 before:opacity-0 hover:before:opacity-100 \
before:-z-10 \
";

export const folderSelectedClasses = "\
text-accent-foreground \
dark:before:border-0 \
before:bg-accent \
before:opacity-100 \
before:border-l-2 \
before:border-l-accent-foreground/50 \
";

export const folderIconClasses = "shrink-0 mr-2 w-4 h-4 text-accent-foreground/50";

// tree leaf (mr-2 space for scroll bar)

export const leafBaseClasses = "\
mr-2 pl-1 py-1 relative \
\
before:absolute \
before:left-0 \
before:right-1 \
before:w-full \
before:h-full \
before:bg-muted/80 before:opacity-0 hover:before:opacity-100 \
before:-z-10 \
\
cursor-pointer \
flex items-center \
";

export const leafSelectedClasses = "\
text-accent-foreground \
\
before:data-[tree-item-selected]:1border \
\
dark:before:border-0 \
before:bg-accent \
before:opacity-100 \
before:border-l-2 \
before:border-l-accent-foreground/50 \
\
outline-primary-400 \
[outline-width:calc(var(--parent-active)_*_1px)] \
outline rounded-[3px] \
";

export const leafIconClasses = "shrink-0 mr-2 w-4 h-4 text-accent-foreground/50";
