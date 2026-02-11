import { useState, useEffect } from 'react';
import { swapAPI } from '../api/endpoints';
import { Button } from '../components/Button';
import { Loader2, ArrowRight, Check, X, Clock, Inbox, Send } from 'lucide-react';
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

    const RequestCard = ({ req, type }) => {
        const isIncoming = type === 'incoming';
        const otherUser = isIncoming ? req.fromUser : req.toUser;

        // Safety check for otherUser
        if (!otherUser) return null;

        return (
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-lg">
                            {otherUser.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">{otherUser.name}</h3>
                            <p className="text-sm text-gray-500">{isIncoming ? 'Wants to swap skills with you' : 'You requested a swap'}</p>
                        </div>
                    </div>
                    <div className={clsx(
                        "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide",
                        req.status === 'PENDING' || req.status === 'pending' ? "bg-yellow-100 text-yellow-700" :
                            req.status === 'ACCEPTED' || req.status === 'accepted' ? "bg-green-100 text-green-700" :
                                "bg-red-100 text-red-700"
                    )}>
                        {req.status}
                    </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6 grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                    <div className="text-center">
                        <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Teaching</p>
                        <p className="font-medium text-slate-700">{req.skillOffered || 'Any'}</p>
                    </div>
                    <div className="flex justify-center text-gray-300">
                        <ArrowRight className="h-5 w-5" />
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Learning</p>
                        <p className="font-medium text-brand">{req.skillWanted || 'Any'}</p>
                    </div>
                </div>

                {req.message && (
                    <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-gray-100 text-sm italic text-gray-600">
                        "{req.message}"
                    </div>
                )}

                <div className="flex justify-end gap-3">
                    {isIncoming && (req.status === 'PENDING' || req.status === 'pending') && (
                        <>
                            <Button
                                variant="danger"
                                size="sm"
                                className="rounded-xl"
                                onClick={() => handleAction(req.id, 'rejected')}
                            >
                                <X className="h-4 w-4 mr-2" /> Reject
                            </Button>
                            <Button
                                size="sm"
                                className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-200"
                                onClick={() => handleAction(req.id, 'accepted')}
                            >
                                <Check className="h-4 w-4 mr-2" /> Accept
                            </Button>
                        </>
                    )}
                    {!isIncoming && (req.status === 'PENDING' || req.status === 'pending') && (
                        <span className="flex items-center text-sm text-gray-400">
                            <Clock className="h-4 w-4 mr-2" /> Awaiting response
                        </span>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-4">
                <h1 className="text-3xl font-bold text-slate-900">Manage Swaps</h1>

                {/* Tabs */}
                <div className="flex justify-center">
                    <div className="bg-gray-100 p-1 rounded-xl inline-flex">
                        <button
                            onClick={() => setActiveTab('incoming')}
                            className={clsx(
                                "flex items-center px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                activeTab === 'incoming'
                                    ? "bg-white text-slate-900 shadow-sm text-brand"
                                    : "text-gray-500 hover:text-gray-900"
                            )}
                        >
                            <Inbox className={clsx("h-4 w-4 mr-2", activeTab === 'incoming' && "text-brand")} />
                            Incoming
                        </button>
                        <button
                            onClick={() => setActiveTab('outgoing')}
                            className={clsx(
                                "flex items-center px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                activeTab === 'outgoing'
                                    ? "bg-white text-slate-900 shadow-sm text-brand"
                                    : "text-gray-500 hover:text-gray-900"
                            )}
                        >
                            <Send className={clsx("h-4 w-4 mr-2", activeTab === 'outgoing' && "text-brand")} />
                            Sent
                        </button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="animate-spin h-10 w-10 text-brand" />
                </div>
            ) : (
                <div className="max-w-2xl mx-auto space-y-4">
                    {(activeTab === 'incoming' ? incoming : outgoing).length > 0 ? (
                        (activeTab === 'incoming' ? incoming : outgoing).map(req => (
                            <RequestCard key={req.id} req={req} type={activeTab} />
                        ))
                    ) : (
                        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
                            <div className="mx-auto h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                {activeTab === 'incoming' ? <Inbox className="h-8 w-8 text-gray-300" /> : <Send className="h-8 w-8 text-gray-300" />}
                            </div>
                            <p className="text-gray-500">No {activeTab} requests found.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
