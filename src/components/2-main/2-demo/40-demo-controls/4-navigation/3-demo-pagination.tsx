import * as P from "@/components/ui/shadcn/pagination";

export function PaginationDemo() {
    return (
        <div className="py-8">
            <P.Pagination>
                <P.PaginationContent>

                    <P.PaginationPrevious href="#" />

                    <P.PaginationLink href="#">1</P.PaginationLink>
                    <P.PaginationLink href="#" isActive>2</P.PaginationLink>
                    <P.PaginationLink href="#">3</P.PaginationLink>
                    <P.PaginationEllipsis />

                    <P.PaginationNext href="#" />

                </P.PaginationContent>
            </P.Pagination>
        </div>
    );
}
