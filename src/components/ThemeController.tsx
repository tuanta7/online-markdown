import { ChangeEvent, useState } from 'react';
import { THEMES } from '../common/constants.ts';
import { BoltIcon, MoonIcon } from '@heroicons/react/24/solid';

function ThemeController() {
    const [check, setCheck] = useState(localStorage.getItem('use-light-theme') === 'true');

    const handleThemeToggle = (e: ChangeEvent<HTMLInputElement>) => {
        setCheck(e.target.checked);
        localStorage.setItem('use-light-theme', String(e.target.checked));
    };

    return (
        <label className="swap swap-flip">
            <input
                type="checkbox"
                className="theme-controller"
                value={THEMES.LIGHT}
                checked={check}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleThemeToggle(e)}
            />
            <BoltIcon className="swap-off h-6 w-6 fill-primary" />
            <MoonIcon className="swap-on h-6 w-6 fill-gray-300" />
        </label>
    );
}

export default ThemeController;
