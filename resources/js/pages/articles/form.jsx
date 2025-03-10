import { UserLayout } from '@/layouts/user-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import { InputErrorMessage } from '@/components/input-error-message';
import { Textarea } from '@/components/ui/textarea';
import { FileUpload } from '@/components/file-upload';

export default function Form({ auth, page_meta, page_data }) {
    const { data, setData, post, errors, processing } = useForm({
        thumbnail: null,
        category_id: page_data.article?.category_id ?? '',
        title: page_data.article?.title ?? '',
        teaser: page_data.article?.teaser ?? '',
        tags: [],
        content: page_data.article?.content ?? '',
        published_at: page_data.article?.published_at ?? '',
        status: page_data.article?.status ?? '',
        _method: page_meta.method,
    });

    const [selected, setSelected] = useState(
        page_data.article.tags?.reduce((unique, tag) => {
            if (unique.findIndex((item) => item.value === tag.id) === -1) {
                unique.push({ value: tag.id, label: tag.name });
            }
            return unique;
        }, []) ?? [],
    );

    function submit(e) {
        e.preventDefault();
        post(page_meta.url, {
            preserveScroll: true
        });
    }

    function onChange(e) {
        setData(e.target.name, e.target.value);
    }

    useEffect(() => {
        function transformTags() {
            return selected.map((item) => item.value);
        }

        setData('tags', transformTags());
    }, [selected]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{page_meta.title}</CardTitle>
                <CardDescription>{page_meta.description}</CardDescription>
            </CardHeader>
            <form onSubmit={submit}>
                <CardContent>
                    <div className="space-y-6">
                        <div className="max-w-2xl space-y-1">
                            <Label>Thumbnail</Label>
                            <FileUpload onChange={(file) => setData('thumbnail', file)} />
                            <InputErrorMessage message={errors.thumbnail} />
                        </div>
                        <div className="space-y-1">
                            <Label>Title</Label>
                            <Input name="title" onChange={onChange} value={data.title} />
                            <InputErrorMessage message={errors.title} />
                        </div>
                        <div className="space-y-1">
                            <Label>Teaser</Label>
                            <Textarea name="teaser" onChange={onChange} value={data.teaser} />
                            <InputErrorMessage message={errors.teaser} />
                        </div>
                        <div className="space-y-1">
                            <Label>Content</Label>
                            <Textarea name="content" autoSize onChange={onChange} value={data.content} />
                            <InputErrorMessage message={errors.content} />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <Label>Category</Label>
                                <Select
                                    defaultValue={data.category_id}
                                    onValueChange={(value) => setData('category_id', value)}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select category">
                                            {page_data.categories.find((category) => category.value == data.category_id)
                                                ?.label ?? 'Select a status'}
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {page_data.categories.map((category) => (
                                            <SelectItem key={category.value} value={category.value}>
                                                {category.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputErrorMessage message={errors.category_id} />
                            </div>
                            {auth.user.is_admin && (
                                <div>
                                    <Label htmlFor="status">Status</Label>
                                    <Select
                                        defaultValue={data.status}
                                        onValueChange={(value) => setData('status', value)}
                                    >
                                        <SelectTrigger className="mt-1 capitalize">
                                            <SelectValue>
                                                {page_data.statuses.find((status) => status.value == data.status)
                                                    ?.label ?? 'Select a status'}
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {page_data.statuses.map((status) => (
                                                <SelectItem
                                                    key={status.value}
                                                    value={status.value}
                                                    className="capitalize"
                                                >
                                                    {status.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>

                                    <InputErrorMessage message={errors.status} />
                                </div>
                            )}
                        </div>
                        <div className="space-y-1">
                            <Label>Tags</Label>
                            <MultiSelect
                                max={3}
                                items={page_data.tags}
                                selected={selected}
                                setSelected={setSelected}
                                placeholder="Select tags..."
                            />
                            <InputErrorMessage message={errors.tags} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button disabled={processing} type="submit">
                        Save
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}

Form.layout = (page) => <UserLayout title={page.props.page_meta.title} children={page} />;
