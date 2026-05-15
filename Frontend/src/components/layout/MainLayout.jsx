import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1 px-4 sm:px-5 lg:px-5 py-6 max-w-7xl mx-auto w-full">
                    <Outlet />
                </main>
                <Footer />
            </div >
        </>
    );
};

export default MainLayout;