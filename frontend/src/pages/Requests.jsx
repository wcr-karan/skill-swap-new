import { useState, useEffect } from 'react';
import { swapAPI } from '../api/endpoints';
import { Link } from 'react-router-dom';
import { Loader2, ArrowRight, Check, X, Clock, Inbox, Send, MessageSquare } from 'lucide-react';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

export default function Requests() {
    const [activeTab, setActiveTab] = useState('incoming');
    const [incoming, setIncoming] = useState([]);
    const [outgoing, setOutgoing] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        fetchRequests();
    }, [activeTab, refreshTrigger]);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            if (activeTab === 'incoming') {
                const res = await swapAPI.getIncoming();
                setIncoming(res.data);
            } else {
                const res = await swapAPI.getOutgoing();
                setOutgoing(res.data);
            }
        } catch (error) {
            console.error("Failed to fetch requests", error);
            toast.error('Failed to load requests');
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id, status) => {
        try {
            await swapAPI.updateStatus(id, status);
            toast.success(status === 'ACCEPTED' ? 'Request accepted!' : 'Request rejected');
            setRefreshTrigger(prev => prev + 1);
        } catch (error) {
            console.error("Failed to update status", error);
            toast.error('Failed to update request');
        }
    };

    const statusStyles = {
        PENDING: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
        ACCEPTED: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        accepted: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        REJECTED: 'bg-red-500/10 text-red-400 border-red-500/20',
        rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
    };

    const RequestCard = ({ req, type }) => {
        const isIncoming = type === 'incoming';
        const otherUser = isIncoming ? req.fromUser : req.toUser;
        if (!otherUser) return null;

        return (
            <div className="bg-slate-900/80 rounded-2xl border border-white/[0.06] p-6 backdrop-blur-sm hover:border-white/[0.1] transition-all">
                <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-4">
                        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center text-white font-bold border border-indigo-500/20">
                            {otherUser.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm">{otherUser.name}</h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                                {isIncoming ? 'Wants to swap skills with you' : 'You requested a swap'}
                            </p>
                        </div>
                    </div>
                    <div className={clsx(
                        "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide border",
                        statusStyles[req.status] || 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    )}>
                        {req.status}
                    </div>
                </div>

                {/* Skill swap display */}
                <div className="bg-white/[0.03] rounded-xl p-4 mb-5 grid grid-cols-[1fr,auto,1fr] gap-4 items-center border border-white/[0.05]">
                    <div className="text-center">
                        <p className="text-[10px] text-slate-600 uppercase font-bold mb-1 tracking-wider">Teaching</p>
                        <p className="font-semibold text-slate-200 text-sm">{req.skillOffered || 'Any'}</p>
                    </div>
                    <div className="flex justify-center">
                        <ArrowRight className="h-4 w-4 text-indigo-400" />
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] text-slate-600 uppercase font-bold mb-1 tracking-wider">Learning</p>
                        <p className="font-semibold text-indigo-400 text-sm">{req.skillWanted || 'Any'}</p>
                    </div>
                </div>

                {req.message && (
                    <div className="mb-5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm italic text-slate-400">
                        "{req.message}"
                    </div>
                )}

                <div className="flex justify-end gap-2">
                    {isIncoming && (req.status === 'PENDING' || req.status === 'pending') && (
                        <>
                            <button
                                onClick={() => handleAction(req.id, 'rejected')}
                                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-all"
                            >
                                <X className="h-3.5 w-3.5" /> Reject
                            </button>
                            <button
                                onClick={() => handleAction(req.id, 'accepted')}
                                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:from-indigo-500 hover:to-purple-500 transition-all"
                            >
                                <Check className="h-3.5 w-3.5" /> Accept
                            </button>
                        </>
                    )}
                    {!isIncoming && (req.status === 'PENDING' || req.status === 'pending') && (
                        <span className="flex items-center text-xs text-slate-500 gap-1.5">
                            <Clock className="h-3.5 w-3.5" /> Awaiting response
                        </span>
                    )}
                    {(req.status === 'ACCEPTED' || req.status === 'accepted') && (
                        <Link
                            to={`/chat/${req.id}`}
                            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-500/20 border border-indigo-500/30 rounded-xl hover:bg-indigo-500/30 transition-all text-indigo-300"
                        >
                            <MessageSquare className="h-3.5 w-3.5" /> Open Chat
                        </Link>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8 max-w-3xl mx-auto py-6">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-white">Manage Swaps</h1>

                {/* Tabs */}
                <div className="flex justify-center">
                    <div className="bg-slate-900/80 border border-white/[0.06] p-1 rounded-xl inline-flex backdrop-blur-sm">
                        <button
                            onClick={() => setActiveTab('incoming')}
                            className={clsx(
                                "flex items-center px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 gap-2",
                                activeTab === 'incoming'
                                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                                    : "text-slate-500 hover:text-slate-300"
                            )}
                        >
                            <Inbox className="h-4 w-4" />
                            Incoming
                        </button>
                        <button
                            onClick={() => setActiveTab('outgoing')}
                            className={clsx(
                                "flex items-center px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 gap-2",
                                activeTab === 'outgoing'
                                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                                    : "text-slate-500 hover:text-slate-300"
                            )}
                        >
                            <Send className="h-4 w-4" />
                            Sent
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-16">
                    <Loader2 className="animate-spin h-9 w-9 text-indigo-400" />
                </div>
            ) : (
                <div className="space-y-4">
                    {(activeTab === 'incoming' ? incoming : outgoing).length > 0 ? (
                        (activeTab === 'incoming' ? incoming : outgoing).map(req => (
                            <RequestCard key={req.id} req={req} type={activeTab} />
                        ))
                    ) : (
                        <div className="text-center py-20 bg-slate-900/80 rounded-2xl border border-white/[0.06] backdrop-blur-sm">
                            <div className="mx-auto h-14 w-14 bg-white/[0.04] rounded-2xl flex items-center justify-center mb-4 border border-white/[0.06]">
                                {activeTab === 'incoming'
                                    ? <Inbox className="h-7 w-7 text-slate-600" />
                                    : <Send className="h-7 w-7 text-slate-600" />}
                            </div>
                            <p className="text-slate-500 text-sm">No {activeTab} requests found.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
