import { useState, useEffect, useMemo } from 'react';
import { matchesAPI } from '../api/endpoints';
import UserCard from '../components/UserCard';
import { Search, Loader2, Filter, Users, Star, ArrowRight } from 'lucide-react';
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
                user.skills.some(skill => {
                    // Simple heuristic: match category name to skill name or a mock category mapping
                    return skill.name.toLowerCase().includes(activeCategory.toLowerCase());
                });

            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory, users]);

    return (
        <div className="space-y-10 py-6 max-w-6xl mx-auto">
            {/* Header section */}
            <div className="text-center space-y-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-block px-4 py-1.5 bg-brand/10 text-brand rounded-full text-[10px] font-black tracking-widest uppercase mb-2"
                >
                    Discover Talent
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Meet Your Next <span className="text-brand">Mentor</span></h1>
                <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">Search through our global community of experts ready to share their knowledge.</p>
            </div>

            {/* Controls */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-brand transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by name, expertise, or specific skill..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-[1.5rem] focus:outline-none focus:ring-4 focus:ring-brand/10 focus:border-brand/30 transition-all font-medium text-slate-800 shadow-sm"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-100 rounded-2xl font-bold text-slate-600 hover:border-brand/30 transition-all shadow-sm">
                        <Filter className="h-5 w-5" />
                        Advanced
                    </button>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={clsx(
                                "px-6 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap uppercase tracking-wider",
                                activeCategory === cat
                                    ? "bg-slate-900 text-white shadow-lg"
                                    : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <Loader2 className="animate-spin h-12 w-12 text-brand" />
                    <p className="text-slate-400 font-bold animate-pulse">Scanning the community...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                className="col-span-full py-24 text-center space-y-6 bg-white rounded-[3rem] border border-slate-100 shadow-sm"
                            >
                                <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto text-slate-300">
                                    <Users className="h-10 w-10" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-slate-900">No match found</h3>
                                    <p className="text-slate-500 font-medium">Try broadening your search or choosing a different category.</p>
                                </div>
                                <button
                                    onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                                    className="text-brand font-black text-sm uppercase tracking-widest hover:underline flex items-center gap-2 mx-auto"
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

// minor update code refactor: 1

// minor update code refactor: 3
