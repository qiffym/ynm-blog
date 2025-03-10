import { UserLayout } from '@/layouts/user-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    IconChevronLeft,
    IconChevronRight,
    IconCirclePlusFill,
    IconDotsVertical,
    IconPencilBox, IconTrash
} from '@irsyadadl/paranoid';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, router } from '@inertiajs/react';
import { AlertAction } from '@/components/alert-action';
import { Button } from '@/components/ui/button';

export default function Index(props) {
    const { data: tags, meta, links } = props.tags;
    return (
        <Card>
            <div className="flex flex-col justify-between gap-y-6 p-6 md:flex-row md:items-center md:space-y-0">
                <CardHeader className="p-0">
                    <CardTitle>Tags List</CardTitle>
                    <CardDescription>{meta.total} tags found on this application.</CardDescription>
                </CardHeader>
                <Button asChild>
                    <Link href={route('tags.create')}>
                        <IconCirclePlusFill className="mr-2 size-4" />
                        New
                    </Link>
                </Button>
            </div>
            <CardContent className="p-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6 [&_thead]:border-t">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Article</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tags.map((tag, i) => (
                            <TableRow key={tag.id}>
                                <TableCell>{meta.from + i}</TableCell>
                                <TableCell>{tag.name}</TableCell>
                                <TableCell>{tag.slug}</TableCell>
                                <TableCell>{tag.articles_count}</TableCell>
                                <TableCell>
                                    <div className="flex justify-end">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <IconDotsVertical className="size-4" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-48" align="end">
                                                <DropdownMenuLabel>Tag ID: {tag.id}</DropdownMenuLabel>
                                                <DropdownMenuSeparator/>
                                                <DropdownMenuItem>
                                                    <IconPencilBox className="mr-2 size-4" />
                                                    <Link href={route('tags.edit', [tag])}>Edit</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuGroup>
                                                    <AlertAction
                                                        trigger={
                                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                                <IconTrash className="mr-2 size-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        }
                                                        variant="destructive"
                                                        title="Delete Tag"
                                                        description="Are you sure you want to delete this tag?"
                                                        action={() =>
                                                            router.delete(route('tags.destroy', [tag]), {
                                                                preserveScroll: true,
                                                            })
                                                        }
                                                    />
                                                </DropdownMenuGroup>
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
                    Showing {meta.from} to {meta.to} of {meta.total} tags.
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
    );
}

Index.layout = (page) => <UserLayout title="Tags List" children={page} />;
