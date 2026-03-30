import { motion, AnimatePresence } from 'framer-motion';
import { Users, Plus, Search, Globe, Lock, Filter, ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/Button';
import { useState, useMemo } from 'react';
import { clsx } from 'clsx';

export default function Communities() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [joinedIds, setJoinedIds] = useState(new Set());

    const categories = ['All', 'Tech', 'Design', 'Business', 'Creative'];

    const communities = [
        {
            id: 1,
            name: "React Artisans",
            category: "Tech",
            description: "A group for frontend developers mastering React and modern JavaScript ecosystems.",
            members: 1240,
            type: "Public",
            image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60"
        },
        {
            id: 2,
            name: "Design Systems Hub",
            category: "Design",
            description: "Discussing UI/UX trends, Figma workflows, and building scalable design systems.",
            members: 850,
            type: "Public",
            image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=800&auto=format&fit=crop&q=60"
        },
        {
            id: 3,
            name: "Backend Wizards",
            category: "Tech",
            description: "Deep dives into Node.js, Go, Rust, and distributed systems architecture.",
            members: 2100,
            type: "Public",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=800&auto=format&fit=crop&q=60"
        },
        {
            id: 4,
            name: "Content Creators",
            category: "Creative",
            description: "Strategy for YouTubers, bloggers, and social media growth hackers.",
            members: 450,
            type: "Private",
            image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&auto=format&fit=crop&q=60"
        },
        {
            id: 5,
            name: "SaaS Builders",
            category: "Business",
            description: "Entrepreneurs sharing journey, metrics, and growth strategies for software businesses.",
            members: 3100,
            type: "Public",
            image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&auto=format&fit=crop&q=60"
        },
        {
            id: 6,
            name: "Illustrators Guild",
            category: "Creative",
            description: "Digital and traditional artists sharing techniques, feedback, and commissions.",
            members: 120,
            type: "Private",
            image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=60"
        }
    ];

    const filteredCommunities = useMemo(() => {
        return communities.filter(c => {
            const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory]);

    const toggleJoin = (id) => {
        const newSet = new Set(joinedIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setJoinedIds(newSet);
    };

    const handleCreateGroup = () => {
        toast.success("Opening group creation wizard...", {
            icon: '🚀',
            duration: 4000
        });
        toast("Note: This feature is currently in demo mode.", {
            icon: 'ℹ️'
        });
    };

    return (
        <div className="space-y-10 py-6 max-w-6xl mx-auto">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Communities</h1>
                    <p className="text-slate-500 text-lg font-medium">Find your tribe and start learning together.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="ghost" className="border-slate-100 bg-white shadow-sm ring-1 ring-slate-200/60 font-bold">
                        <Filter className="h-4 w-4 mr-2" />
                        Sort By
                    </Button>
                    <Button
                        onClick={handleCreateGroup}
                        className="flex items-center gap-2 bg-emerald hover:bg-emerald-600 shadow-lg shadow-emerald/20 px-6 font-bold"
                    >
                        <Plus className="h-5 w-5" />
                        Create Group
                    </Button>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-emerald transition-colors" />
                    <input
                        type="text"
                        placeholder="Search communities, topics, or skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-100 rounded-[1.25rem] focus:outline-none focus:ring-4 focus:ring-emerald/10 focus:border-emerald/30 transition-all font-medium text-slate-800 shadow-sm"
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={clsx(
                                "px-6 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap",
                                activeCategory === cat
                                    ? "bg-slate-900 text-white shadow-lg"
                                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Communities Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredCommunities.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex flex-col h-full"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <div className="px-3 py-1 bg-white/95 backdrop-blur rounded-xl text-[10px] font-black text-slate-800 uppercase tracking-wider">
                                        {item.category}
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4 px-3 py-1 bg-slate-900/80 backdrop-blur rounded-xl text-[10px] font-black text-white flex items-center gap-1.5 uppercase tracking-wider">
                                    {item.type === 'Public' ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                                    {item.type}
                                </div>
                            </div>
                            <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-black text-slate-900 leading-tight group-hover:text-emerald transition-colors">{item.name}</h3>
                                    <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2">{item.description}</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                                                    <img src={`https://i.pravatar.cc/100?u=${item.id}${i}`} alt="Avatar" />
                                                </div>
                                            ))}
                                            <div className="w-8 h-8 rounded-full border-2 border-white bg-emerald/10 text-emerald flex items-center justify-center text-[10px] font-bold">+ {item.members > 1000 ? (item.members / 1000).toFixed(1) + 'k' : item.members}</div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleJoin(item.id)}
                                        className={clsx(
                                            "w-full py-4 rounded-2xl font-black text-sm transition-all duration-300 flex items-center justify-center gap-2",
                                            joinedIds.has(item.id)
                                                ? "bg-slate-100 text-slate-500 cursor-default"
                                                : "bg-slate-900 text-white hover:bg-emerald shadow-lg hover:shadow-emerald/20"
                                        )}
                                    >
                                        {joinedIds.has(item.id) ? (
                                            <>
                                                <Check className="h-5 w-5 text-emerald" />
                                                Joined Group
                                            </>
                                        ) : (
                                            <>
                                                Join Community
                                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredCommunities.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-20 text-center space-y-4 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200"
                >
                    <div className="w-16 h-16 bg-slate-200 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
                        <Users className="h-8 w-8" />
                    </div>
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold text-slate-900">No communities found</h3>
                        <p className="text-slate-500">Try adjusting your search or category filters.</p>
                    </div>
                    <Button variant="ghost" onClick={() => { setSearchTerm(''); setActiveCategory('All'); }} className="font-bold text-emerald">Clear Filters</Button>
                </motion.div>
            )}
        </div>
    );
}
