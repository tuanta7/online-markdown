import MainLayout from './layouts/MainLayout.tsx';
import PublicLayout from './layouts/PublicLayout.tsx';
import HomePage from './pages/HomePage.tsx';
import ProtectedLayout from './layouts/ProtectedLayout.tsx';
import FocusPage from './pages/FocusPage.tsx';

export default function App() {
    return (
        <MainLayout>
            <PublicLayout>
                <HomePage />
                <FocusPage />
            </PublicLayout>
            <ProtectedLayout></ProtectedLayout>
        </MainLayout>
    );
}
