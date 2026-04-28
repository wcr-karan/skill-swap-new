import { useState, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    Menu, X, Users, LayoutDashboard, Search,
    Inbox, Brain, MessageSquare, LogOut, User, ChevronDown
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import Notifications from './Notifications';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const authLinks = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Explore', href: '/explore', icon: Search },
        { name: 'Matches', href: '/matches', icon: Users },
        { name: 'AI Matches', href: '/ai-matches', icon: Brain },
        { name: 'Requests', href: '/requests', icon: Inbox },
        { name: 'Messages', href: '/messages', icon: MessageSquare },
    ];

    const publicLinks = [
        { name: 'About', href: '/about' },
        { name: 'Explore', href: '/explore' },
        { name: 'Communities', href: '/communities' },
        { name: 'Connect', href: '/connect' },
    ];

    const currentLinks = user ? authLinks : publicLinks;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            {/* Navbar glass bar */}
            <div className="bg-[#0F1117]/90 backdrop-blur-xl border-b border-white/[0.06]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center h-[64px] gap-6">

                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
                            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-shadow duration-300">
                                <Users className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-[15px] font-bold text-white tracking-tight">
                                Skill<span className="text-indigo-400">Swap</span>
                            </span>
                        </Link>

                        {/* Separator */}
                        <div className="hidden lg:block w-px h-5 bg-white/[0.08]" />

                        {/* Center Navigation */}
                        <div className="hidden lg:flex items-center gap-1 flex-1">
                            {currentLinks.map((item) => {
                                const isActive = location.pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={clsx(
                                            "relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-150",
                                            isActive
                                                ? "nav-active"
                                                : "nav-inactive"
                                        )}
                                    >
                                        {item.icon && (
                                            <item.icon className={clsx(
                                                "w-3.5 h-3.5 shrink-0",
                                                isActive ? "text-indigo-400" : "text-slate-600"
                                            )} />
                                        )}
                                        <span className="hidden xl:inline">{item.name}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-indicator"
                                                className="absolute inset-0 rounded-lg"
                                                initial={false}
                                                transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                                            />
                                        )}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Right actions */}
                        <div className="hidden lg:flex items-center gap-2 ml-auto">
                            {user ? (
                                <div className="flex items-center gap-3">
                                    <Notifications />

                                    {/* Profile Dropdown */}
                                    <HeadlessMenu as="div" className="relative z-50">
                                        <HeadlessMenu.Button className="flex items-center gap-2.5 pl-1 pr-3 py-1.5 rounded-xl hover:bg-white/[0.06] border border-transparent hover:border-white/[0.08] transition-all group focus:outline-none">
                                            <div className="avatar w-7 h-7 rounded-lg text-[13px]">
                                                {user.name?.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors max-w-[100px] truncate">
                                                {user.name?.split(' ')[0]}
                                            </span>
                                            <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-400 transition-colors" />
                                        </HeadlessMenu.Button>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-150"
                                            enterFrom="transform opacity-0 scale-95 translate-y-1"
                                            enterTo="transform opacity-100 scale-100 translate-y-0"
                                            leave="transition ease-in duration-100"
                                            leaveFrom="transform opacity-100 scale-100 translate-y-0"
                                            leaveTo="transform opacity-0 scale-95 translate-y-1"
                                        >
                                            <HeadlessMenu.Items className="absolute right-0 mt-2 w-60 origin-top-right bg-[#161B27] border border-white/[0.08] rounded-2xl shadow-2xl focus:outline-none overflow-hidden">
                                                {/* User info */}
                                                <div className="px-4 py-3.5 border-b border-white/[0.06]">
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar w-9 h-9 rounded-xl text-sm shrink-0">
                                                            {user.name?.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div className="overflow-hidden">
                                                            <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                                                            <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-1.5">
                                                    <HeadlessMenu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to={`/profile/${user.id}`}
                                                                className={clsx(
                                                                    "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-colors",
                                                                    active ? 'bg-white/[0.06] text-white' : 'text-slate-400'
                                                                )}
                                                            >
                                                                <User className="h-4 w-4 shrink-0" />
                                                                View Profile
                                                            </Link>
                                                        )}
                                                    </HeadlessMenu.Item>
                                                </div>

                                                <div className="p-1.5 border-t border-white/[0.06]">
                                                    <HeadlessMenu.Item>
                                                        {({ active }) => (
                                                            <button
                                                                onClick={logout}
                                                                className={clsx(
                                                                    "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-colors",
                                                                    active ? 'bg-red-500/10 text-red-400' : 'text-slate-500'
                                                                )}
                                                            >
                                                                <LogOut className="h-4 w-4 shrink-0" />
                                                                Sign Out
                                                            </button>
                                                        )}
                                                    </HeadlessMenu.Item>
                                                </div>
                                            </HeadlessMenu.Items>
                                        </Transition>
                                    </HeadlessMenu>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link to="/login">
                                        <button className="btn-ghost text-[13px]">Sign In</button>
                                    </Link>
                                    <Link to="/register">
                                        <button className="btn-primary text-[13px] py-2 px-4">Get Started</button>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden flex items-center gap-2 ml-auto">
                            {user && <Notifications />}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all border border-white/[0.06]"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="lg:hidden bg-[#0F1117]/98 backdrop-blur-xl border-b border-white/[0.06] shadow-2xl"
                    >
                        <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
                            {user && (
                                <div className="flex items-center gap-3 px-3 py-3 mb-3 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                                    <div className="avatar w-9 h-9 rounded-xl text-sm">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                                    </div>
                                </div>
                            )}

                            {currentLinks.map((item) => {
                                const isActive = location.pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={clsx(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                                            isActive
                                                ? "bg-indigo-500/12 text-indigo-300 border border-indigo-500/20"
                                                : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]"
                                        )}
                                    >
                                        {item.icon && <item.icon className={clsx("h-4 w-4", isActive ? "text-indigo-400" : "text-slate-600")} />}
                                        {item.name}
                                    </Link>
                                );
                            })}

                            {user ? (
                                <div className="pt-3 mt-2 border-t border-white/[0.06]">
                                    <button
                                        onClick={() => { logout(); setIsMenuOpen(false); }}
                                        className="w-full btn-danger justify-center"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <div className="pt-3 mt-2 border-t border-white/[0.06] flex flex-col gap-2">
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                        <button className="w-full btn-secondary justify-center">Sign In</button>
                                    </Link>
                                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                                        <button className="w-full btn-primary justify-center">Get Started</button>
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
