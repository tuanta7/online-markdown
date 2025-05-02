import ThemeController from './ThemeController.tsx';
import LoginButton from '../features/auth/LoginButton.tsx';

function Navbar() {
    return (
        <header className="navbar py-2 px-4 sticky bg-white/20 shadow-lg border-2 border-green-800/20 rounded-xl flex justify-between items-center">
            <div className="navbar-start">
                <ThemeController />
            </div>
            <div className="navbar-center">
                <a className="text-lg btn btn-ghost p-0 no-animation hover:bg-transparent">Gookie Workspace</a>
            </div>
            <div className="navbar-end">
                <LoginButton />
            </div>
        </header>
    );
}

export default Navbar;
