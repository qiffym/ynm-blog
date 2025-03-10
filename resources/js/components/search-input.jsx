import React from 'react';
import { IconSearch } from '@irsyadadl/paranoid';
import { Input } from '@/components/ui/input.jsx';

export default function SearchInput({ value, onChange }) {
    return (
        <label className="relative h-10 w-full">
            <IconSearch className="group-focus-within:text-primary-400 absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 transform text-gray-500 transition duration-300" />
            <Input
                value={value}
                onChange={onChange}
                type="text"
                className="pl-9 pr-3"
                placeholder="Search..."
            />
        </label>
    );
}
