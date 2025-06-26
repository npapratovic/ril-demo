import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type Post } from '@/types';
interface IndexPageProps {
    // The posts prop is expected to be an array of Post objects
    posts: Post[];
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

                        {posts.map((post: Post) => (
                            <TableRow key={post.id}>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>{post.content}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        </AppLayout>
    );
}