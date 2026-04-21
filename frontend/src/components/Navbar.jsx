import { useState, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Users, LayoutDashboard, Search, Inbox, Brain, MessageSquare, LogOut, Settings, User } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import Notifications from './Notifications';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Authenticated Navigation Links
    const authLinks = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Explore', href: '/explore', icon: Search },
        { name: 'Mathches', href: '/matches', icon: Users },
        { name: 'AI Matches', href: '/ai-matches', icon: Brain },
        { name: 'Requests', href: '/requests', icon: Inbox },
        { name: 'Messages', href: '/messages', icon: MessageSquare },
    ];

    // Public Navigation Links
    const publicLinks = [
        { name: 'About', href: '/about' },
        { name: 'Explore', href: '/explore' },
        { name: 'Communities', href: '/communities' },
        { name: 'Connect', href: '/connect' },
    ];

    const currentLinks = user ? authLinks : publicLinks;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/[0.06] shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
                            <Users className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold text-white tracking-tight">
                            Skill<span className="text-indigo-400">Swap</span>
                        </span>
                    </Link>

                    {/* Center Links (Desktop) */}
                    <div className="hidden lg:flex flex-1 items-center justify-center -ml-4">
                        <div className="flex space-x-1 items-center bg-slate-950/50 p-1.5 rounded-2xl border border-white/[0.04]">
                            {currentLinks.map((item) => {
                                const isActive = location.pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        title={item.name}
                                        className={clsx(
                                            "relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-2",
                                            isActive
                                                ? "text-indigo-300 bg-white/[0.08] shadow-sm"
                                                : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]"
                                        )}
                                    >
                                        {item.icon && <item.icon className={clsx("w-4 h-4", isActive ? "text-indigo-400" : "text-slate-500")} />}
                                        <span className={clsx("hidden xl:inline", !item.icon && "inline")}>{item.name}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-pill"
                                                className="absolute inset-0 bg-white/[0.05] rounded-xl border border-white/[0.05]"
                                                initial={false}
                                                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="hidden lg:flex items-center justify-end min-w-[200px] gap-3">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <Notifications />

                                {/* Headless UI Dropdown for Profile */}
                                <HeadlessMenu as="div" className="relative inline-block text-left z-50">
                                    <div>
                                        <HeadlessMenu.Button className="flex items-center hover:opacity-80 transition-opacity focus:outline-none">
                                            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-500/20 border border-indigo-400/20 ring-2 ring-transparent focus:ring-indigo-500/50">
                                                {user.name?.charAt(0).toUpperCase()}
                                            </div>
                                        </HeadlessMenu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <HeadlessMenu.Items className="absolute right-0 mt-3 w-56 origin-top-right divide-y divide-white/[0.06] rounded-2xl bg-slate-900 border border-white/[0.08] shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none backdrop-blur-xl">
                                            <div className="px-4 py-3">
                                                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                                                <p className="text-xs text-slate-400 truncate">{user.email}</p>
                                            </div>
                                            <div className="px-1 py-1">
                                                <HeadlessMenu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to={`/profile/${user.id}`}
                                                            className={clsx(
                                                                active ? 'bg-indigo-500/10 text-indigo-300' : 'text-slate-300',
                                                                'group flex w-full items-center rounded-xl px-3 py-2.5 text-sm transition-colors'
                                                            )}
                                                        >
                                                            <User className={clsx("mr-2 h-4 w-4", active ? "text-indigo-400" : "text-slate-500")} aria-hidden="true" />
                                                            Profile
                                                        </Link>
                                                    )}
                                                </HeadlessMenu.Item>
                                            </div>
                                            <div className="px-1 py-1">
                                                <HeadlessMenu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={logout}
                                                            className={clsx(
                                                                active ? 'bg-red-500/10 text-red-400' : 'text-slate-300',
                                                                'group flex w-full items-center rounded-xl px-3 py-2.5 text-sm transition-colors'
                                                            )}
                                                        >
                                                            <LogOut className={clsx("mr-2 h-4 w-4", active ? "text-red-400" : "text-slate-500")} aria-hidden="true" />
                                                            Sign out
                                                        </button>
                                                    )}
                                                </HeadlessMenu.Item>
                                            </div>
                                        </HeadlessMenu.Items>
                                    </Transition>
                                </HeadlessMenu>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login">
                                    <button className="text-sm font-medium text-slate-300 px-4 py-2 rounded-xl hover:text-white hover:bg-white/[0.08] transition-all">
                                        Sign In
                                    </button>
                                </Link>
                                <Link to="/register">
                                    <button className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:from-indigo-500 hover:to-purple-500 transition-all transform hover:-translate-y-0.5">
                                        Sign Up
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button  */}
                    <div className="lg:hidden flex items-center gap-3">
                        {user && <Notifications />}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-slate-400 hover:text-white focus:outline-none p-2 rounded-xl hover:bg-white/[0.08] transition-all border border-white/[0.05]"
                        >
                            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/[0.06] overflow-hidden shadow-2xl"
                    >
                        <div className="px-4 pt-4 pb-6 space-y-1">
                            {/* Profile Info (Mobile) */}
                            {user && (
                                <div className="mb-4 px-3 pb-4 border-b border-white/[0.06] flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-base shadow-md shadow-indigo-500/20">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-white">{user.name}</p>
                                        <p className="text-xs text-slate-400">{user.email}</p>
                                    </div>
                                </div>
                            )}

                            {/* Links */}
                            {currentLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={clsx(
                                        "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors",
                                        location.pathname === item.href
                                            ? "text-indigo-300 bg-indigo-500/10 border border-indigo-500/20"
                                            : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]"
                                    )}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.icon && <item.icon className={clsx("h-4.5 w-4.5", location.pathname === item.href ? "text-indigo-400" : "text-slate-500")} />}
                                    {item.name}
                                </Link>
                            ))}

                            {/* Mobile Auth Actions */}
                            {user ? (
                                <div className="pt-4 mt-2 border-t border-white/[0.06]">
                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full flex items-center justify-center gap-2 text-sm font-medium text-red-400 px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition-all border border-red-500/20"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Sign out
                                    </button>
                                </div>
                            ) : (
                                <div className="pt-4 flex flex-col gap-2 border-t border-white/[0.06] mt-4">
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                        <button className="w-full text-sm font-medium text-slate-300 px-4 py-3 rounded-xl border border-white/[0.08] hover:bg-white/[0.08] transition-all">
                                            Sign In
                                        </button>
                                    </Link>
                                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                                        <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm px-5 py-3.5 rounded-xl shadow-lg shadow-indigo-500/25">
                                            Sign Up
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
