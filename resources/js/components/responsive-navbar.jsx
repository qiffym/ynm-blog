import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Container } from '@/components/container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { IconHamburger, IconSearch, IconSettings } from '@irsyadadl/paranoid';
import { Label } from '@/components/ui/label';
import { FilterResponsive } from '@/components/filter.jsx';

export function ResponsiveNavbar(props) {
    const { auth, categories_g } = usePage().props;
    return (
        <nav className="block border-b bg-background py-3 lg:hidden">
            <Container>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2">
                        <Link href={'/'}>
                            <Logo className="size-6" />
                        </Link>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <div className="flex items-center gap-x-0.5">
                            <Button
                                size="icon"
                                className="size-8 rounded-full [&_svg]:size-4 [&_svg]:text-muted-foreground"
                                variant="ghost"
                                onClick={() => props.setOpen(true)}
                            >
                                <IconSearch />
                            </Button>
                            <ThemeToggle />
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger className="text-muted-foreground transition duration-200 hover:text-foreground focus:outline-none">
                                {auth.user ? (
                                    <Avatar className="size-6 sm:size-8">
                                        <AvatarImage src={auth.user.gravatar} />
                                        <AvatarFallback>{auth.user.initials}</AvatarFallback>
                                    </Avatar>
                                ) : (
                                    <IconHamburger className="size-5" />
                                )}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-60" align="end">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild>
                                        <Link href="/">Home</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/articles">Articles</Link>
                                    </DropdownMenuItem>
                                    <FilterResponsive />
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>Categories</DropdownMenuSubTrigger>
                                        <DropdownMenuSubContent sideOffset={-32}>
                                            {categories_g.map((category) => (
                                                <DropdownMenuItem key={category.id} asChild>
                                                    <Link href={route('categories.show', [category])}>
                                                        {category.name}
                                                    </Link>
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuSubContent>
                                    </DropdownMenuSub>
                                </DropdownMenuGroup>
                                {auth.user ? (
                                    <DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuLabel className="space-y-0.5">
                                            <Label>{auth.user.name}</Label>
                                            <span className="block text-sm text-muted-foreground">
                                                {auth.user.email}
                                            </span>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard">Dashboard</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href={route('profile.edit')}
                                                className="flex items-center justify-between [&_svg]:size-4 [&_svg]:text-muted-foreground"
                                            >
                                                Settings
                                                <IconSettings />
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild className="w-full">
                                            <Link href="/logout" as="button" method="post">
                                                Logout
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                ) : (
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem asChild>
                                            <Link href="/login">Login</Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </Container>
        </nav>
    );
}
