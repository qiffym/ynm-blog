import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    EmailShareButton,
    FacebookShareButton,
    PinterestShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from 'react-share';
import {
    IconBrandFacebook,
    IconBrandPinterest,
    IconBrandTelegram,
    IconBrandWhatsapp,
    IconBrandX,
    IconEnvelope,
    IconUpload,
} from '@irsyadadl/paranoid';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Share({ article }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                className={cn(buttonVariants({ size: 'sm', variant: 'secondary' }), 'h-8 [&_svg]:size-4')}
            >
                <IconUpload />
                <span className="hidden sm:ml-2 sm:inline">Share</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 [&_svg]:mr-2 [&_svg]:size-4" align="end">
                <DropdownMenuLabel>Share</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <IconEnvelope />
                    <EmailShareButton url={route('articles.show', [article])}>Email</EmailShareButton>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <IconBrandFacebook />
                    <FacebookShareButton url={route('articles.show', [article])}>Facebook</FacebookShareButton>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <IconBrandX />
                    <TwitterShareButton url={route('articles.show', [article])}>
                        X (Formerly Twitter)
                    </TwitterShareButton>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <IconBrandPinterest />
                    <PinterestShareButton url={route('articles.show', [article])} media={article.thumbnail}>
                        Pinterest
                    </PinterestShareButton>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <IconBrandWhatsapp />
                    <WhatsappShareButton url={route('articles.show', [article])}>Whatsapp</WhatsappShareButton>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <IconBrandTelegram />
                    <TelegramShareButton url={route('articles.show', [article])}>Telegram</TelegramShareButton>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
