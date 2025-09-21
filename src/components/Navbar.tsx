import { ChangeEvent } from 'react';
import { Bars3Icon, SunIcon, MoonIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';

import { THEMES } from '../utils/constants.ts';
import { useThemeStore } from '../store/themeStore';
import { useUserStore } from '../store/userStore';
import UserProfileAvatar from './UserProfileAvatar';
import LoginButton from '../features/auth/LoginButton';

interface NavbarProps {
    openSideBar: boolean;
    setOpenSideBar: (open: boolean) => void;
}

function Navbar({ openSideBar, setOpenSideBar }: NavbarProps) {
    const user = useUserStore((s) => s.user);
    return (
        <nav className="navbar flex items-center justify-between px-6 py-3">
            <div className="navbar-start">
                <button
                    className="btn btn-sm btn-ghost hover:text-primary border-0 p-0 hover:bg-transparent"
                    onClick={() => setOpenSideBar(!openSideBar)}
                    aria-label={openSideBar ? 'Close sidebar' : 'Open sidebar'}
                >
                    {openSideBar ? <ChevronLeftIcon className="w-5" /> : <Bars3Icon className="w-6" />}
                </button>
                <a href="/" className="btn btn-ghost no-animation mx-2 border-0 text-2xl hover:bg-transparent">
                    Jod Workspace
                </a>
            </div>
            <div className="navbar-end gap-3">
                <ThemeController />
                {user ? <UserProfileAvatar user={user} /> : <LoginButton />}
            </div>
        </nav>
    );
}

function ThemeController() {
    const useLightTheme = useThemeStore((s) => s.useLightTheme);
    const setUseLightTheme = useThemeStore((s) => s.setUseLightTheme);

    const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
        setUseLightTheme(e.target.checked);
    };

    return (
        <label className="swap swap-flip">
            <input
                type="checkbox"
                className="theme-controller"
                value={THEMES.LIGHT}
                checked={useLightTheme}
                onChange={handleToggle}
            />
            <span className="swap-off">
                <SunIcon className="h-7 w-7" />
            </span>
            <span className="swap-on flex items-center">
                <MoonIcon className="h-6 w-6" />
            </span>
        </label>
    );
}

export default Navbar;
