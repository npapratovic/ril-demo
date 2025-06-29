import AppLayout from '@/layouts/app-layout';
import { Head, router, Link } from '@inertiajs/react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import type { Post, PaginatedResponse } from '@/types';
import PaginationButtons from '@/components/PaginationButtons';
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface IndexPageProps {
    posts: PaginatedResponse<Post>; // This is the type for the posts prop, which is expected to be a paginated response containing Post objects
}
// IndexPageProps is the type for the props passed to the Index component
export default function Index({ posts }: IndexPageProps) {
    // This is the main component for the Posts Index page.
    // parameter `posts` is expected to be an array of Post objects
    const deletePost = (postId: number) => {
            // send a DELETE request to the server to delete the post
            // `route` is a helper function that generates the URL for the delete request
            // `postId` is the ID of the post to be deleted
            // `router.delete` is a method from Inertia.js to send a DELETE request

            router.delete(route('posts.destroy', postId), {
            preserveScroll: true, // This option keeps the scroll position when the page is updated
            onSuccess: () => {
                // Optionally, you can handle success here, like showing a notification
                console.log("Post deleted successfully");
                toast.success("Post deleted successfully");
            }});

    };

    return (
        <AppLayout>
            <Head title="Posts" />
            <div>
                <h1 className="text-xl font-bold mb-4">Posts</h1>
                <div className="mb-4">
                    <Button
                        variant="default"
                        size="sm">
                        <a href="/posts/create">Create Post</a>
                    </Button>
                </div>
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
                                <TableCell></TableCell>
                                <TableCell>
                                    <Button asChild variant="outline" size="sm" className="mr-2">
                                        <a href={`/posts/${post.id}/edit`}>Edit</a>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => deletePost(post.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
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