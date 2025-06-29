import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { Toaster, toast } from 'sonner';
import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const { props } = usePage<{
        success?: string;
        error?: string;
        warning?: string;
        info?: string;
    }>();

    useEffect(() => {
        if (props.success) toast.success(props.success);
        if (props.error) toast.error(props.error);
        if (props.warning) toast.warning(props.warning);
        if (props.info) toast.message(props.info); // generic toast
    }, [props]);

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
            <Toaster position={'top-right'}/>
        </AppShell>
    );
}