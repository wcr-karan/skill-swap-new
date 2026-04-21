import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Messages() {
    const { user } = useAuth();
    const [swaps, setSwaps] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const res = await api.get('/chat/my');
                setSwaps(res.data);
            } catch (err) {
                console.error("Failed to fetch chats", err);
            } finally {
                setLoading(false);
            }
        };
        fetchChats();
    }, []);

    return (
        <div className="space-y-8 max-w-3xl mx-auto py-6">
            <div className="text-center space-y-3 mb-8">
                <h1 className="text-3xl font-bold text-white">Your Conversations</h1>
                <p className="text-slate-400 text-sm">Jump back into your active skill swaps and chats.</p>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin h-8 w-8 text-indigo-400" />
                </div>
            ) : swaps.length === 0 ? (
                <div className="text-center py-20 bg-slate-900/80 rounded-2xl border border-white/[0.06] backdrop-blur-sm">
                    <MessageSquare className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                    <h3 className="text-white font-bold mb-2">No active conversations</h3>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto">
                        Accept a swap request or propose a swap to start chatting.
                    </p>
                    <Link to="/requests" className="text-indigo-400 text-sm mt-3 inline-block hover:text-indigo-300">
                        Check your requests →
                    </Link>
                </div>
            ) : (
                <div className="space-y-3">
                    {swaps.map((swap, idx) => {
                        const otherUser = swap.fromUserId === user?.id ? swap.toUser : swap.fromUser;
                        const latestMsg = swap.messages && swap.messages.length > 0 ? swap.messages[0] : null;

                        return (
                            <motion.div
                                key={swap.id}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                            >
                                <Link
                                    to={`/chat/${swap.id}`}
                                    className="block bg-slate-900/80 border border-white/[0.06] hover:border-indigo-500/30 rounded-2xl p-5 backdrop-blur-sm transition-all group"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border border-indigo-500/20 flex items-center justify-center text-white font-bold text-lg shrink-0">
                                            {otherUser.name.charAt(0).toUpperCase()}
                                        </div>
                                        
                                        <div className="flex-1 overflow-hidden">
                                            <div className="flex items-center justify-between mb-1">
                                                <h3 className="font-bold text-white text-base">{otherUser.name}</h3>
                                                {latestMsg && (
                                                    <span className="text-[10px] text-slate-500 font-medium">
                                                        {new Date(latestMsg.createdAt).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-500 mb-1.5 font-medium truncate">
                                                Swap: {swap.skillOffered} ↔ {swap.skillWanted}
                                            </p>
                                            <p className="text-sm text-slate-400 truncate">
                                                {latestMsg 
                                                    ? <><span className="text-slate-300 font-medium">{latestMsg.sender.name}:</span> {latestMsg.content}</>
                                                    : <span className="italic text-slate-600">No messages yet</span>
                                                }
                                            </p>
                                        </div>
                                        
                                        <div className="shrink-0 pl-2">
                                            <div className="w-8 h-8 rounded-full bg-white/[0.05] group-hover:bg-indigo-500/20 flex items-center justify-center transition-colors">
                                                <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-indigo-400" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
