import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './Button';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';

export default function Navbar() {
    const { user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const isLanding = location.pathname === '/';

    return (
        <nav className={clsx(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            "bg-white/90 backdrop-blur-md border-b border-gray-100"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-slate-900 tracking-tight">
                            Skill<span className="text-emerald">Trade</span>
                        </span>
                    </Link>

                    {/* Center Links (Desktop) */}
                    <div className="hidden md:flex items-center space-x-8">
                        {['About', 'Explore', 'Communities', 'Connect'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-slate-600 hover:text-emerald font-medium text-sm transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </div>

                    {/* Right Actions */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <Link to="/dashboard">
                                    <Button variant="ghost" className="text-slate-600 hover:text-emerald">Dashboard</Button>
                                </Link>
                                <div className="h-9 w-9 rounded-full bg-emerald/10 flex items-center justify-center text-emerald font-bold border-2 border-transparent">
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link to="/login">
                                    <button className="text-emerald font-semibold text-sm px-4 py-2 rounded-xl border border-emerald hover:bg-emerald/5 transition-all">
                                        Sign In
                                    </button>
                                </Link>
                                <Link to="/register">
                                    <button className="bg-emerald text-white font-semibold text-sm px-5 py-2 rounded-xl hover:bg-emerald/90 shadow-lg shadow-emerald/20 transition-all transform hover:-translate-y-0.5">
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-500 hover:text-gray-900 focus:outline-none"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-xl">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        {['About', 'Explore', 'Communities', 'Connect'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-emerald hover:bg-emerald/5"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item}
                            </a>
                        ))}
                        {!user && (
                            <div className="pt-4 flex flex-col space-y-3">
                                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                    <button className="w-full text-emerald font-semibold text-sm px-4 py-3 rounded-xl border border-emerald hover:bg-emerald/5">
                                        Sign In
                                    </button>
                                </Link>
                                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                                    <button className="w-full bg-emerald text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-lg shadow-emerald/20">
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
