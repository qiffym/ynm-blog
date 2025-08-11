import { Aside } from '@/components/aside';
import { Container } from '@/components/container';
import { Navbar } from '@/components/navbar';
import { Head } from '@inertiajs/react';
import { Toaster } from '@/components/ui/sonner.jsx';

export function UserLayout({ title, children }) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Toaster />

            <Head title={title} />
            <Navbar />
            <main className="min-h-[calc(100vh_-_theme(spacing.16))] bg-muted/40 py-6 lg:gap-8 lg:py-16">
                <div className="-mt- mb- border-b bg-background py-6 lg:-mt-16 lg:mb-12">
                    <Container>
                        <h1 className="text-xl font-semibold lg:text-3xl">{title}</h1>
                    </Container>
                </div>
                <Container>
                    <div className="flex flex-col items-start gap-6 lg:flex-row lg:gap-12">
                        <Aside />
                        <div className="w-full lg:w-4/5">{children}</div>
                    </div>
                </Container>
            </main>
        </div>
    );
}
