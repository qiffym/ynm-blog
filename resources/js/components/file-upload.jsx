import { useState } from 'react';
import { cn } from '@/lib/utils.js';
import { Button } from '@/components/ui/button.jsx';
import { IconX } from '@irsyadadl/paranoid';
import { Input } from '@/components/ui/input.jsx';

export function FileUpload({ className, onChange }) {
    const [previewSrc, setPreviewSrc] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files ? e.target.files[0] : null;
        onChange(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewSrc(reader.result);
            };
        } else {
            setPreviewSrc(null);
        }
    };

    return (
        <div className={cn(className)}>
            {previewSrc ? (
                <div className="relative rounded-lg">
                    <img
                        src={String(previewSrc)}
                        alt="Preview"
                        className="max-h-96 w-full rounded-lg border object-cover object-center"
                    />
                    <Button
                        className="absolute -right-3 -top-3 size-6 rounded-full"
                        size="icon"
                        variant="secondary"
                        type="button"
                        onClick={() => setPreviewSrc(null)}
                    >
                        <IconX className="size-4" />
                    </Button>
                </div>
            ) : null}
            <Input className="mt-2 max-w-[14rem] file:text-foreground" onChange={handleFileChange} type="file" />
        </div>
    );
}
