import { cn } from '@/lib/utils';

export function InputErrorMessage({ className, message, ...props }) {
    return (
        <p {...props} className={cn('text-rose-400 mt-1 text-sm first-letter:uppercase', className)}>
            {message}
        </p>
    );
}
