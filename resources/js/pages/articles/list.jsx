import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserLayout } from '@/layouts/user-layout';
import { Link, router } from '@inertiajs/react';
import {
    IconChevronLeft,
    IconChevronRight,
    IconCirclePlusFill,
    IconDotsVertical,
    IconOpenLink,
} from '@irsyadadl/paranoid';
import { AlertAction } from '@/components/alert-action.jsx';
import { useState } from 'react';
import { useFilter } from '@/hooks/use-filter.js';
import SearchInput from '@/components/search-input.jsx';
import { flashMessage } from '@/lib/utils.js';
import { toast } from 'sonner';

export default function List({ auth, ...props }) {
    const { data: articles, meta, links } = props.articles;
    const [params, setParams] = useState(props.filters.state);

    useFilter({
        route: route('internal-articles.index'),
        values: params,
        only: ['articles'],
    });

    return (
        <div>
            <header className="mb-6 grid gap-6 sm:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>{meta.total}</CardTitle>
                        <CardDescription>Total Articles</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{meta.total_visits}</CardTitle>
                        <CardDescription>Total Visits</CardDescription>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{meta.unpublished_count}</CardTitle>
                        <CardDescription>Unpublihsed Articles</CardDescription>
                    </CardHeader>
                </Card>
            </header>
            <Card>
                <div className="flex flex-col justify-between gap-y-6 p-6 md:flex-row md:items-center md:gap-y-0">
                    <CardHeader className="p-0">
                        <CardTitle>Articles List</CardTitle>
                        <CardDescription>{meta.total} articles found on this application.</CardDescription>
                    </CardHeader>
                    <div className="flex max-w-md flex-col gap-2 md:flex-row">
                        <SearchInput
                            value={params?.search}
                            onChange={(e) => setParams((prev) => ({ ...prev, search: e.target.value }))}
                        />
                        <div className="grid grid-cols-2 gap-x-2 md:flex">
                            <Select value={params?.status} onValueChange={(e) => setParams({ ...params, status: e })}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder={params?.status ?? 'status'} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button asChild>
                                <Link href={route('internal-articles.create')}>
                                    <IconCirclePlusFill className="mr-2 size-4" />
                                    New
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <CardContent className="p-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6 [&_thead]:border-t">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#</TableHead>
                                <TableHead>Title</TableHead>
                                {auth.user.is_admin && <TableHead>Author</TableHead>}
                                <TableHead>Status</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Published At</TableHead>
                                <TableHead />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {articles.map((article, index) => (
                                <TableRow key={article.id}>
                                    <TableCell>{meta.from + index}</TableCell>
                                    <TableCell>
                                        <a href={route('articles.show', [article])} target="_blank">
                                            {article.title} <IconOpenLink className="ml-1 inline size-3" />
                                        </a>
                                    </TableCell>
                                    {auth.user.is_admin && <TableCell>{article.user?.name}</TableCell>}
                                    <TableCell>
                                        <Badge variant={article.status === 'published' ? 'default' : 'outline'}>
                                            {article.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{article.created_at}</TableCell>
                                    <TableCell>{article.published_at}</TableCell>
                                    <TableCell>
                                        <div className="flex justify-end">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <IconDotsVertical className="size-4" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48">
                                                    <DropdownMenuLabel>Article ID: {article.id}</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem asChild>
                                                        <Link href={route('internal-articles.edit', [article])}>
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    {auth.user.is_admin && (
                                                        <DropdownMenuGroup>
                                                            <AlertAction
                                                                trigger={
                                                                    <DropdownMenuItem
                                                                        onSelect={(e) => e.preventDefault()}
                                                                    >
                                                                        {article.status !== 'published'
                                                                            ? 'Publish'
                                                                            : 'Unpublished'}
                                                                    </DropdownMenuItem>
                                                                }
                                                                title="Publish Article"
                                                                description="Are you sure want to publish this article?"
                                                                action={() =>
                                                                    router.put(
                                                                        route('internal-articles.approve', [article]),
                                                                        {},
                                                                        { preserveScroll: true },
                                                                    )
                                                                }
                                                            />
                                                            <DropdownMenuSeparator />
                                                            <AlertAction
                                                                trigger={
                                                                    <DropdownMenuItem
                                                                        onSelect={(e) => e.preventDefault()}
                                                                    >
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                }
                                                                title="Delete Article"
                                                                description="Are you sure want to delete this article?"
                                                                action={() =>
                                                                    router.delete(
                                                                        route('internal-articles.destroy', [article]),
                                                                        {
                                                                            preserveScroll: true,
                                                                            onSuccess: (params) => {
                                                                                const flash = flashMessage(params);
                                                                                if (flash) {
                                                                                    toast[flash.type](flash.message);
                                                                                }
                                                                            },
                                                                        },
                                                                    )
                                                                }
                                                            />
                                                        </DropdownMenuGroup>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="justify-between border-t pt-6 text-sm text-muted-foreground">
                    <span>
                        Showing {meta.from} to {meta.to} of {meta.total} articles.
                    </span>
                    {meta.has_pages && (
                        <div className="flex items-center gap-x-1">
                            <Button asChild size="sm" variant="outline">
                                {links.prev ? (
                                    <Link href={links.prev}>
                                        <IconChevronLeft className="-ml-1 mr-1 size-4" />
                                        Prev
                                    </Link>
                                ) : (
                                    <span>Prev</span>
                                )}
                            </Button>
                            <Button asChild size="sm" variant="outline">
                                {links.next ? (
                                    <Link href={links.next}>
                                        Next
                                        <IconChevronRight className="-mr-1 ml-1 size-4" />
                                    </Link>
                                ) : (
                                    <span>Next</span>
                                )}
                            </Button>
                        </div>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}

List.layout = (page) => <UserLayout title="Articles List" children={page} />;
