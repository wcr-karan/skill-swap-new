import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import api from '../api/axios';
import { Send, ArrowLeft, MessageSquare, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chat() {
    const { swapId } = useParams();
    const { user } = useAuth();
    const socketRef = useSocket();
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const [swap, setSwap] = useState(null);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const bottomRef = useRef(null);

    // Fetch history + join room
    useEffect(() => {
        const init = async () => {
            try {
                const res = await api.get(`/chat/${swapId}/messages`);
                setSwap(res.data.swap);
                setMessages(res.data.messages);
            } catch (err) {
                console.error('Failed to load chat', err);
            } finally {
                setLoading(false);
            }
        };
        init();

        const socket = socketRef?.current;
        if (socket) {
            socket.emit('joinRoom', swapId);
            socket.on('receiveMessage', (msg) => {
                setMessages(prev => [...prev, msg]);
            });
        }

        return () => {
            socket?.off('receiveMessage');
        };
    }, [swapId, socketRef]);

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = () => {
        if (!input.trim() || sending) return;
        setSending(true);

        const socket = socketRef?.current;
        if (socket) {
            socket.emit('sendMessage', {
                swapId: parseInt(swapId),
                senderId: user.id,
                content: input.trim(),
            });
        }
        setInput('');
        setSending(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    // Figure out the other user in the swap
    const otherUser = swap
        ? swap.fromUserId === user?.id
            ? { id: swap.toUserId, name: 'Partner' }
            : { id: swap.fromUserId, name: 'Partner' }
        : null;

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="animate-spin h-8 w-8 text-indigo-400" />
                    <p className="text-slate-500 text-sm">Loading chat...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] max-w-3xl mx-auto">
            {/* Header */}
            <div className="bg-slate-900/80 border border-white/[0.06] rounded-2xl px-6 py-4 mb-4 backdrop-blur-sm flex items-center gap-4">
                <button
                    onClick={() => navigate('/requests')}
                    className="p-2 rounded-xl hover:bg-white/[0.05] text-slate-400 hover:text-slate-200 transition-all"
                >
                    <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 border border-indigo-500/20 flex items-center justify-center text-white font-bold">
                    {swap?.fromUserId === user?.id
                        ? (swap?.toUserId?.toString()[0] || 'U')
                        : (swap?.fromUserId?.toString()[0] || 'U')}
                </div>
                <div>
                    <h2 className="text-white font-semibold text-sm">Skill Swap Chat</h2>
                    <p className="text-slate-500 text-xs">
                        {swap ? `${swap.skillOffered} ↔ ${swap.skillWanted}` : 'Loading...'}
                    </p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-xs text-emerald-400 font-medium">Live</span>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-1 space-y-3 pb-4">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-3">
                        <div className="w-14 h-14 bg-white/[0.03] rounded-2xl border border-white/[0.06] flex items-center justify-center">
                            <MessageSquare className="h-7 w-7 text-slate-600" />
                        </div>
                        <p className="text-slate-500 text-sm">No messages yet. Say hello! 👋</p>
                    </div>
                ) : (
                    <AnimatePresence initial={false}>
                        {messages.map((msg, idx) => {
                            const isMine = msg.senderId === user?.id;
                            return (
                                <motion.div
                                    key={msg.id || idx}
                                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.2 }}
                                    className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[72%] ${isMine ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                                        {!isMine && (
                                            <span className="text-[10px] text-slate-600 font-medium px-1">
                                                {msg.sender?.name || 'User'}
                                            </span>
                                        )}
                                        <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                                            isMine
                                                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-md'
                                                : 'bg-slate-800/80 border border-white/[0.06] text-slate-200 rounded-bl-md'
                                        }`}>
                                            {msg.content}
                                        </div>
                                        <span className="text-[10px] text-slate-600 px-1">
                                            {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                )}
                <div ref={bottomRef} />
            </div>

            {/* Input Bar */}
            <div className="bg-slate-900/80 border border-white/[0.06] rounded-2xl px-4 py-3 backdrop-blur-sm flex items-center gap-3">
                <textarea
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message... (Enter to send)"
                    className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-600 outline-none resize-none leading-relaxed"
                />
                <button
                    onClick={sendMessage}
                    disabled={!input.trim() || sending}
                    className="w-9 h-9 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:from-indigo-500 hover:to-purple-500 shrink-0"
                >
                    <Send className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
