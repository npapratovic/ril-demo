import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, router } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { Post } from '@/types';

interface EditPostForm {
    title: string;
    content: string;
}

export default function Edit({post}: { post: Post }) {
    const postTitle = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing } = useForm<Required<EditPostForm>>({
        title: post.title,
        content: post.content,
    });

    const updatePost: FormEventHandler = (e) => {
        e.preventDefault();

        put(route('posts.update', post.id), {
            preserveScroll: true,
            onSuccess: () => {
                router.visit(route('posts.index'), {
                    preserveScroll: true,
                    only: ['posts'], // optimize reload
                    data: {},
                    onSuccess: () => {
                        // show success message or perform any additional actions
                        reset();
                    },
                });
            },
            onError: (errors) => {
                if (errors.title) {
                    reset('title');
                    postTitle.current?.focus();
                }
            },
        });
    };
    return (
        <AppLayout>
            <Head title="Edit Post" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form onSubmit={updatePost} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Post Name *</Label>

                        <Input
                            id="title"
                            ref={postTitle}
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1 block w-full"
                        />

                        <InputError message={errors.title} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="content">Content *</Label>

                        <Input
                            id="content"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="mt-1 block w-full textarea"
                        />

                        <InputError message={errors.content} />

                    </div>

                    <div className="flex items-center gap-2">
                        <Button disabled={processing} type="submit">Update Post</Button>
                    </div>

                </form>
            </div>
        </AppLayout>
    );
}