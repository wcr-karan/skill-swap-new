import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function DashboardLayout() {
    return (
        <div className="min-h-screen bg-[#0F1117]">
            <Navbar />
            <main className="pt-[64px] min-h-screen">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-10 lg:py-12">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
