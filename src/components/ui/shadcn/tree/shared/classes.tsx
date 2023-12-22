// tree folder

export const treeItemBaseClasses = "\
px-2 \
before:absolute \
before:left-0 \
before:w-full \
before:h-[1.75rem] \
before:bg-muted/80 before:opacity-0 hover:before:opacity-100 \
before:-z-10 \
";
export const treeItemSelectedClasses = "\
text-accent-foreground \
dark:before:border-0 \
before:bg-accent \
before:opacity-100 \
before:border-l-2 \
before:border-l-accent-foreground/50 \
";
export const treeItemIconClasses = "shrink-0 mr-2 w-4 h-4 text-accent-foreground/50";

// tree leaf

export const leafBaseClasses = "\
px-2 py-1 r1elative \
\
before:absolute \
before:left-0 \
before:right-1 \
before:w-full \
before:h-[1.75rem] \
before:bg-muted/80 before:opacity-0 hover:before:opacity-100 \
before:-z-10 \
\
cursor-pointer \
flex items-center \
";
export const leafSelectedClasses = "\
text-accent-foreground \
dark:before:border-0 \
before:bg-accent \
before:opacity-100 \
before:border-l-2 \
before:border-l-accent-foreground/50 \
";
export const leafIconClasses = "shrink-0 mr-2 w-4 h-4 text-accent-foreground/50";
