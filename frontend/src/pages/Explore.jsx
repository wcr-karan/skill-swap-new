import { useState, useEffect, useMemo } from 'react';
import { matchesAPI } from '../api/endpoints';
import UserCard from '../components/UserCard';
import { Search, Loader2, Filter, Users, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

export default function Explore() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    const categories = ['All', 'Tech', 'Design', 'Business', 'Creative', 'Marketing'];

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await matchesAPI.getAllUsers();
            setUsers(res.data);
        } catch (error) {
            console.error("Failed to fetch users", error);
            toast.error("Failed to load community data");
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.skills.some(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase()));
            const matchesCategory = activeCategory === 'All' ||
                user.skills.some(skill => skill.name.toLowerCase().includes(activeCategory.toLowerCase()));
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory, users]);

    return (
        <div className="space-y-8 max-w-7xl">
            {/* Header */}
            <div className="space-y-3">
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                    <span className="text-[11px] text-indigo-300 font-semibold uppercase tracking-wider">Discover Talent</span>
                </motion.div>

                <h1 className="text-3xl font-bold text-white tracking-tight">
                    Find Your Next <span className="text-gradient-brand">Skill Partner</span>
                </h1>
                <p className="text-[15px] text-slate-400 max-w-xl">
                    Browse our global community of experts ready to share and exchange their knowledge.
                </p>
            </div>

            {/* Controls */}
            <div className="space-y-3">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by name, skill, or expertise..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-base input-icon"
                        />
                    </div>
                    <button className="btn-secondary gap-2">
                        <Filter className="h-4 w-4" />
                        Filters
                    </button>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={clsx(
                                "px-4 py-1.5 rounded-lg text-[12px] font-semibold transition-all whitespace-nowrap border",
                                activeCategory === cat
                                    ? "bg-indigo-500/15 text-indigo-300 border-indigo-500/25"
                                    : "bg-white/[0.03] text-slate-500 hover:text-slate-300 hover:bg-white/[0.05] border-white/[0.06]"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results count */}
            {!loading && (
                <p className="text-[12px] text-slate-500 font-medium">
                    {filteredUsers.length} member{filteredUsers.length !== 1 ? 's' : ''} found
                </p>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24 space-y-4">
                    <Loader2 className="animate-spin h-8 w-8 text-indigo-400" />
                    <p className="text-slate-500 text-sm font-medium">Loading community members...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <AnimatePresence mode="popLayout">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, idx) => (
                                <motion.div
                                    key={user.id}
                                    layout
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.96 }}
                                    transition={{ delay: idx * 0.04, duration: 0.3 }}
                                >
                                    <UserCard user={user} />
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full py-20 text-center space-y-4 card"
                            >
                                <div className="w-14 h-14 bg-white/[0.03] rounded-2xl flex items-center justify-center mx-auto border border-white/[0.06]">
                                    <Users className="h-7 w-7 text-slate-600" />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white">No results found</h3>
                                    <p className="text-slate-500 text-sm mt-1">Try a different search term or category.</p>
                                </div>
                                <button
                                    onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                                    className="btn-ghost text-xs mx-auto"
                                >
                                    <ArrowRight className="h-3.5 w-3.5" /> Clear filters
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
