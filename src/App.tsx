import ThemeController from "./components/ThemeController.tsx";
import LoginButton from "./features/auth/LoginButton.tsx";

export default function App() {
    return (
        <div>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <ThemeController />
            <LoginButton />
        </div>

    )
}