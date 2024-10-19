import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GuestLayout } from '@/layouts/guest-layout';
import { AuthenticatedCard } from '@/components/authenticated-card';
import { InputErrorMessage } from '@/components/input-error-message';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password" />

            {status && <div className="mb-4 text-sm font-medium text-green-600">{status}</div>}

            <AuthenticatedCard
                title="Forgot Password"
                description="Forgot your password? No problem. Just let us know your email address and we will email you a password
                             reset link that will allow you to choose a new one."
            >
                <form onSubmit={submit}>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            autoFocus
                        />
                        <InputErrorMessage className="mt-2" message={errors.email} />
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <Button variant="outline" asChild>
                            <Link href="/login">Cancel</Link>
                        </Button>
                        <Button className="ml-4" type="submit" disabled={processing}>
                            Email Password Reset Link
                        </Button>
                    </div>
                </form>
            </AuthenticatedCard>
        </>
    );
}

ForgotPassword.layout = (page) => <GuestLayout children={page} />;
