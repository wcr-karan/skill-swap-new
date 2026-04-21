import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, Brain, ArrowRight, TrendingUp, BookOpen } from 'lucide-react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import RequestSwapModal from '../components/RequestSwapModal';

function MatchScoreBadge({ score }) {
    const color = score >= 70
        ? 'from-emerald-500 to-teal-500'
        : score >= 40
            ? 'from-amber-500 to-orange-500'
            : 'from-slate-500 to-slate-600';

    const label = score >= 70 ? 'Great Match' : score >= 40 ? 'Good Match' : 'Possible Match';

    return (
        <div className="flex flex-col items-center gap-1">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
                <span className="text-white font-black text-sm">{score}%</span>
            </div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
        </div>
    );
}

function AIMatchCard({ user, idx }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const teachSkills = user.skills?.filter(s => s.type === 'teach') || [];
    const learnSkills = user.skills?.filter(s => s.type === 'learn') || [];

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                className="bg-slate-900/80 rounded-2xl border border-white/[0.06] p-6 backdrop-blur-sm hover:border-indigo-500/25 transition-all group"
            >
                <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border border-indigo-500/20 flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm">{user.name}</h3>
                            {user.bio && (
                                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1 max-w-[160px]">{user.bio}</p>
                            )}
                        </div>
                    </div>
                    <MatchScoreBadge score={user.matchScore} />
                </div>

                {/* Score breakdown */}
                <div className="grid grid-cols-2 gap-2 mb-5">
                    <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                            <TrendingUp className="h-3 w-3 text-emerald-400" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Teach Score</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1">
                            <div
                                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-1.5 rounded-full transition-all"
                                style={{ width: `${user.teachScore}%` }}
                            />
                        </div>
                        <span className="text-xs text-emerald-400 font-bold mt-1 block">{user.teachScore}%</span>
                    </div>
                    <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                            <BookOpen className="h-3 w-3 text-indigo-400" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Learn Score</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 mt-1">
                            <div
                                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full transition-all"
                                style={{ width: `${user.learnScore}%` }}
                            />
                        </div>
                        <span className="text-xs text-indigo-400 font-bold mt-1 block">{user.learnScore}%</span>
                    </div>
                </div>

                {/* Skills */}
                <div className="space-y-2 mb-5">
                    {teachSkills.length > 0 && (
                        <div>
                            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Teaches</p>
                            <div className="flex flex-wrap gap-1.5">
                                {teachSkills.map(s => (
                                    <span key={s.id} className="px-2 py-0.5 text-xs rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                                        {s.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    {learnSkills.length > 0 && (
                        <div>
                            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1.5">Wants to Learn</p>
                            <div className="flex flex-wrap gap-1.5">
                                {learnSkills.map(s => (
                                    <span key={s.id} className="px-2 py-0.5 text-xs rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                                        {s.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:from-indigo-500 hover:to-purple-500 transition-all flex items-center justify-center gap-2"
                >
                    Propose Swap <ArrowRight className="h-4 w-4" />
                </button>
            </motion.div>
            <RequestSwapModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                targetUser={user}
            />
        </>
    );
}

export default function AIMatches() {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAIMatches = async () => {
            try {
                const res = await api.get('/matches/ai');
                setMatches(res.data);
            } catch (err) {
                console.error('Failed to load AI matches', err);
                setError('Failed to load AI matches. Make sure you have skills added!');
            } finally {
                setLoading(false);
            }
        };
        fetchAIMatches();
    }, []);

    return (
        <div className="space-y-8 py-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-3">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full"
                >
                    <Brain className="h-3.5 w-3.5 text-indigo-400" />
                    <span className="text-[10px] font-bold tracking-widest uppercase text-indigo-400">
                        TF-IDF Cosine Similarity
                    </span>
                </motion.div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    AI-Powered{' '}
                    <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Matches
                    </span>
                </h1>
                <p className="text-slate-400 text-base font-medium max-w-xl mx-auto">
                    Our ML algorithm ranks every user by how well their skills align with yours — scored 0–100%.
                </p>
            </div>

            {/* Algorithm info banner */}
            <div className="bg-indigo-500/[0.06] border border-indigo-500/20 rounded-2xl px-6 py-4 flex items-start gap-4">
                <div className="w-9 h-9 bg-indigo-500/15 rounded-xl flex items-center justify-center border border-indigo-500/25 shrink-0 mt-0.5">
                    <Sparkles className="h-4.5 w-4.5 text-indigo-400" />
                </div>
                <div>
                    <p className="text-sm font-semibold text-indigo-300 mb-1">How the AI Match Score works</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        Each user is scored using <strong className="text-slate-300">TF-IDF vectorization</strong> on skill names, then ranked by <strong className="text-slate-300">cosine similarity</strong> against your learn/teach preferences.
                        Teach Score = how well they teach what you want to learn (60% weight).
                        Learn Score = how well they want to learn what you teach (40% weight).
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <div className="relative">
                        <Loader2 className="animate-spin h-10 w-10 text-indigo-400" />
                        <Brain className="h-4 w-4 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-slate-500 text-sm animate-pulse">AI is computing your matches...</p>
                </div>
            ) : error ? (
                <div className="text-center py-20 bg-slate-900/80 rounded-2xl border border-white/[0.06]">
                    <p className="text-slate-400 text-sm">{error}</p>
                    <Link to="/dashboard" className="text-indigo-400 text-sm mt-2 block hover:text-indigo-300">
                        → Add skills on your dashboard first
                    </Link>
                </div>
            ) : matches.length === 0 ? (
                <div className="text-center py-20 bg-slate-900/80 rounded-2xl border border-white/[0.06]">
                    <Brain className="h-10 w-10 text-slate-600 mx-auto mb-3" />
                    <h3 className="text-white font-bold mb-2">No matches computed yet</h3>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto">
                        Add skills to your profile (teach & learn) so the AI can find your best matches.
                    </p>
                    <Link to="/dashboard" className="text-indigo-400 text-sm mt-3 inline-flex items-center gap-1 hover:text-indigo-300">
                        Go to Dashboard <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
            ) : (
                <>
                    <div className="flex items-center justify-between">
                        <p className="text-slate-500 text-sm">
                            Found <span className="text-white font-semibold">{matches.length}</span> users ranked by compatibility
                        </p>
                        <div className="flex items-center gap-3 text-xs text-slate-600">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> 70%+ Great</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> 40%+ Good</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-500 inline-block" /> Below</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <AnimatePresence>
                            {matches.map((user, idx) => (
                                <AIMatchCard key={user.id} user={user} idx={idx} />
                            ))}
                        </AnimatePresence>
                    </div>
                </>
            )}
        </div>
    );
}
