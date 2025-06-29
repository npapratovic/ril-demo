// components/PaginationButtons.tsx
import { Link } from '@inertiajs/react';
import type { PaginatedResponse } from '@/types';

export default function PaginationButtons<T>({ meta }: Pick<PaginatedResponse<T>, 'meta'>) {
    return (
        <div className="flex justify-end gap-2 mt-4 px-4 py-2">
            {meta.current_page > 1 && (
                <Link
                    href={`?page=${meta.current_page - 1}`}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    Previous
                </Link>
            )}
            <p className="text-sm text-gray-600 mt-2">
                Showing {meta.from}–{meta.to} of {meta.total} results
            </p>
            {meta.current_page < meta.last_page && (
                <Link
                    href={`?page=${meta.current_page + 1}`}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    Next
                </Link>
            )}
        </div>
    );
}