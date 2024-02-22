import { useEffect } from 'react';

export const useClickOutside = (menuRef, buttonRef, callback) => {
    useEffect(() => {
        const handleClickOutside = (e) => {
            if ((!menuRef.current || !menuRef.current.contains(e.target)) && 
                (!buttonRef.current || !buttonRef.current.contains(e.target))) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });
};