import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function FlashMessage() {
    const [visible, setVisible] = useState(false);
    const [timeExit, setTimeExit] = useState(null);
    const { flash_message } = usePage().props;

    useEffect(() => {
        setVisible(true);
        if (timeExit) {
            clearTimeout(timeExit);
        }
        setTimeExit(setTimeout(() => setVisible(false), 4000));
    }, [flash_message]);

    return (
        <div
            aria-live="assertive"
            className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
        >
            <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                
            </div>
        </div>
    );
}
