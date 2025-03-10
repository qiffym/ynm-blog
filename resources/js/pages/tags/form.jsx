import { UserLayout } from '@/layouts/user-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputErrorMessage } from '@/components/input-error-message';

export default function Form(props) {
    const { data, setData, post, errors, processing } = useForm({
        name: props.tag?.name ?? '',
        _method: props.page_meta.method,
    });

    function submit(e) {
        e.preventDefault();
        post(props.page_meta.url);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{props.page_meta.title}</CardTitle>
                <CardDescription>{props.page_meta.description}</CardDescription>
            </CardHeader>
            <form onSubmit={submit} noValidate>
                <CardContent>
                    <div className="space-y-1">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            error={errors.name}
                        />
                        <InputErrorMessage message={errors.name} />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" color="primary" disabled={processing}>Save</Button>
                </CardFooter>
            </form>
        </Card>
    );
}

Form.layout = (page) => <UserLayout title={page.props.page_meta.title} children={page} />
