import { useCallback, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge.jsx';
import { IconX } from '@irsyadadl/paranoid';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command.jsx';
import { Command as CommandPrimitive } from 'cmdk';

export function MultiSelect({ items, placeholder = 'Select items...', max = 5, selected, setSelected }) {
    const inputRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleUnselect = useCallback((item) => {
        setSelected((prev) => prev.filter((s) => s.value !== item.value));
    }, []);

    const handleKeyDown = useCallback((e) => {
        const input = inputRef.current;
        if (input) {
            if (e.key === 'Delete' || e.key === 'Backspace') {
                if (input.value === '') {
                    setSelected((prev) => {
                        const newSelected = [...prev];
                        newSelected.pop();
                        return newSelected;
                    });
                }
            }

            if (e.key === 'Escape') {
                input.blur();
            }
        }
    }, []);

    const selectables = items.filter((item) => !selected.includes(item));

    return (
        <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
            <div className="focus-within::ring-offset-0 group rounded-md border border-input bg-background px-2 py-[0.575rem] text-sm transition duration-200 focus-within:border-foreground/70 focus-within:ring-[0.20rem] focus-within:ring-ring">
                <div className="flex flex-wrap gap-1">
                    {selected.map((item) => (
                        <Badge key={item.value} variant="secondary" className="rounded">
                            {item.label}
                            <button
                                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-[0.20rem] focus:ring-ring focus:ring-offset-2"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleUnselect(item);
                                    }
                                }}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                                onClick={() => handleUnselect(item)}
                            >
                                <IconX className="-mr-1 size-3 text-muted-foreground hover:text-foreground" />
                            </button>
                        </Badge>
                    ))}

                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        onBlur={() => setOpen(false)}
                        onFocus={() => setOpen(true)}
                        placeholder={selected.length >= max ? 'Remove one to select more' : placeholder}
                        className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                    />
                </div>
            </div>

            {open && selected.length < max ? (
                <div className="relative mt-2">
                    <div className="absolute top-0 z-10 w-full rounded-xl border bg-popover p-2 text-popover-foreground shadow-md outline-none animate-in">
                        <CommandGroup className="h-full overflow-auto p-0">
                            {selectables.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onSelect={(value) => {
                                        setInputValue('');
                                        setSelected((prev) => [...prev, item]);
                                    }}
                                    className="cursor-pointer rounded-md p-2 text-sm"
                                >
                                    {item.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </div>
                </div>
            ) : null}
        </Command>
    );
}
