import { PropsWithChildren, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import LoginButton from '../auth/LoginButton';
import Sidebar from '../../components/Sidebar';

function MainLayout({ children }: PropsWithChildren) {
    const [openSideBar, setOpenSideBar] = useState(false);

    return (
        <div className="relative min-h-screen w-full">
            <aside
                className={`bg-base-200 fixed top-0 left-0 z-40 h-screen shadow-lg transition-all duration-300 ${openSideBar ? 'w-64 opacity-100' : 'pointer-events-none w-0 opacity-0'}`}
                style={{ minWidth: 0 }}
            >
                <Sidebar />
            </aside>
            {openSideBar && (
                <div
                    className="bg-opacity-40 fixed inset-0 z-30 bg-black transition-opacity duration-300"
                    onClick={() => setOpenSideBar(false)}
                />
            )}
            <div className="relative z-10 flex w-full flex-col">
                <Navbar element={<LoginButton />} openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        </div>
    );
}

export default MainLayout;
