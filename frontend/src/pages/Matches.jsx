import { useState, useEffect } from 'react';
import { skillsAPI } from '../api/endpoints';
import UserCard from '../components/UserCard';
import { Loader2, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function Matches() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        try {
            const res = await skillsAPI.getMatches();
            const users = new Map();
            res.data.forEach(match => {
                users.set(match.user.id, match.user);
            });
            setMatches(Array.from(users.values()));
        } catch (error) {
            console.error("Failed to fetch matches", error);
            toast.error("Failed to load matches");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 py-6 max-w-6xl mx-auto">
            <div className="text-center space-y-3">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full"
                >
                    <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-400">AI Powered</span>
                </motion.div>
                <h1 className="text-4xl font-black text-white tracking-tight">
                    Smart <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Matches</span>
                </h1>
                <p className="text-slate-400 text-base font-medium max-w-xl mx-auto">
                    These people teach exactly what you want to learn, and want to learn what you teach!
                </p>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="animate-spin h-10 w-10 text-indigo-400" />
                    <p className="text-slate-500 font-medium animate-pulse">Finding your best matches...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {matches.length > 0 ? (
                        matches.map((user, idx) => (
                            <motion.div
                                key={user.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.07 }}
                            >
                                <UserCard user={user} />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-24 text-center bg-slate-900/80 rounded-2xl border border-white/[0.06] backdrop-blur-sm">
                            <div className="mx-auto h-16 w-16 bg-white/[0.04] rounded-2xl flex items-center justify-center mb-4 border border-white/[0.06]">
                                <Sparkles className="h-8 w-8 text-slate-600" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">No matches yet</h3>
                            <p className="text-slate-500 max-w-sm mx-auto text-sm">
                                Try adding more skills you can teach or want to learn to increase your chances of finding a swap partner.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
