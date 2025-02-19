import { PropsWithChildren } from 'react';
import Navbar from '../components/Navbar.tsx';
import Footer from '../components/Footer.tsx';

function MainLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col items-center mt-6">
            <div className="w-9/12 flex flex-col gap-6">
                <Navbar />
                <main className="h-screen">{children}</main>
            </div>
            <Footer />
        </div>
    );
}

export default MainLayout;
