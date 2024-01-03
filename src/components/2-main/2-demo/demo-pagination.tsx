import * as P from "@/components/ui/shadcn/pagination";

export function PaginationDemo() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <P.Pagination>
                <P.PaginationContent>
                    
                    <P.PaginationItem>
                        <P.PaginationPrevious href="#" />
                    </P.PaginationItem>

                    <P.PaginationItem>
                        <P.PaginationLink href="#">1</P.PaginationLink>
                    </P.PaginationItem>

                    <P.PaginationItem>
                        <P.PaginationEllipsis />
                    </P.PaginationItem>

                    <P.PaginationItem>
                        <P.PaginationNext href="#" />
                    </P.PaginationItem>

                </P.PaginationContent>
            </P.Pagination>
        </div>
    );
}
