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
        <div className="space-y-8 py-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-3">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-bold tracking-widest uppercase text-indigo-400 mb-2"
                >
                    Discover Talent
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    Meet Your Next <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Mentor</span>
                </h1>
                <p className="text-slate-400 text-lg font-medium max-w-2xl mx-auto">
                    Search through our global community of experts ready to share their knowledge.
                </p>
            </div>

            {/* Controls */}
            <div className="space-y-4">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by name, expertise, or specific skill..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 bg-slate-900/80 border border-white/[0.08] rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/40 transition-all text-sm backdrop-blur-sm"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-5 py-3.5 bg-slate-900/80 border border-white/[0.08] rounded-xl text-sm font-semibold text-slate-400 hover:border-white/[0.15] hover:text-slate-200 transition-all backdrop-blur-sm">
                        <Filter className="h-4.5 w-4.5" />
                        Advanced
                    </button>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={clsx(
                                "px-5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap uppercase tracking-wider border",
                                activeCategory === cat
                                    ? "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                                    : "bg-slate-900/80 text-slate-500 hover:bg-white/[0.05] hover:text-slate-300 border-white/[0.06]"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <Loader2 className="animate-spin h-10 w-10 text-indigo-400" />
                    <p className="text-slate-500 font-medium animate-pulse">Scanning the community...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user, idx) => (
                                <motion.div
                                    key={user.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <UserCard user={user} />
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full py-24 text-center space-y-5 bg-slate-900/80 rounded-2xl border border-white/[0.06] backdrop-blur-sm"
                            >
                                <div className="w-16 h-16 bg-white/[0.04] rounded-2xl flex items-center justify-center mx-auto border border-white/[0.06]">
                                    <Users className="h-8 w-8 text-slate-600" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white">No match found</h3>
                                    <p className="text-slate-500 text-sm">Try broadening your search or choosing a different category.</p>
                                </div>
                                <button
                                    onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                                    className="text-indigo-400 font-semibold text-sm uppercase tracking-widest hover:text-indigo-300 flex items-center gap-2 mx-auto transition-colors"
                                >
                                    Reset Filters <ArrowRight className="h-4 w-4" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
