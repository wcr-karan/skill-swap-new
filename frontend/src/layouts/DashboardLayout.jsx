import { Link, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Search, Users, Inbox, LogOut, Settings } from 'lucide-react';
import { clsx } from 'clsx';
import Navbar from '../components/Navbar';

export default function DashboardLayout() {
    const { logout } = useAuth();
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Explore Skills', href: '/explore', icon: Search },
        { name: 'My Matches', href: '/matches', icon: Users },
        { name: 'Swap Requests', href: '/requests', icon: Inbox },
    ];

    return (
        <div className="min-h-screen bg-[#F9FAFB] font-sans">
            <Navbar />

            <div className="pt-16 flex min-h-screen">
                {/* Sidebar */}
                <aside className="fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-100 hidden md:flex flex-col overflow-y-auto">
                    <div className="p-6 space-y-1">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">Menu</p>
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={clsx(
                                        "group flex items-center px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                                        isActive
                                            ? "bg-brand/10 text-brand"
                                            : "text-slate-600 hover:bg-gray-50 hover:text-slate-900"
                                    )}
                                >
                                    <item.icon
                                        className={clsx(
                                            "mr-3 h-5 w-5 transition-colors",
                                            isActive ? "text-brand" : "text-gray-400 group-hover:text-gray-600"
                                        )}
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="mt-auto p-6 border-t border-gray-100">
                        <button
                            onClick={logout}
                            className="flex items-center px-3 py-2.5 text-sm font-medium text-slate-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors w-full"
                        >
                            <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-red-500" />
                            Sign out
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 md:ml-64 p-6 md:p-8 overflow-y-auto">
                    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
