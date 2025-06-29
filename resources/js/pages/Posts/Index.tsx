import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { Post, PaginatedResponse } from '@/types';
import PaginationButtons from '@/components/PaginationButtons';

interface IndexPageProps {
    posts: PaginatedResponse<Post>; // This is the type for the posts prop, which is expected to be a paginated response containing Post objects
}
// IndexPageProps is the type for the props passed to the Index component
export default function Index({ posts }: IndexPageProps) {
    // This is the main component for the Posts Index page.
    // parameter `posts` is expected to be an array of Post objects
    return (
        <AppLayout>
            <Head title="Posts" />
            <div>
                Posts list will be displayed here.
                <Table>
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Title</TableHead>
                            <TableHead>Description</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.data.map((post: Post) => (
                            <TableRow key={post.id}>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>{post.content}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="flex justify-end gap-2 mt-4 px-4 py-2">
                    <PaginationButtons meta={posts.meta} />
                </div>
            </div>

        </AppLayout>
    );
}