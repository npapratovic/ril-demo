import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';

interface CreatePostForm {
    title: string;
    content: string;
}

export default function Create() {
    const postTitle = useRef<HTMLInputElement>(null);

    const { data, setData, errors, post, reset, processing } = useForm<Required<CreatePostForm>>({
        title: '',
        content: '',
    });

    const createPost: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('posts.store'), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                reset();
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
            <Head title="Create Post" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form onSubmit={createPost} className="space-y-6">
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
                        <Button disabled={processing} type="submit">Create Post</Button>
                    </div>

                </form>
            </div>
        </AppLayout>
    );
}