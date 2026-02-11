import { useState, useEffect } from 'react';
import { swapAPI, skillsAPI } from '../api/endpoints';
import { Button } from './Button';
import { X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RequestSwapModal({ isOpen, onClose, targetUser }) {
    const [mySkills, setMySkills] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState('');
    const [selectedWant, setSelectedWant] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchMySkills();
            setSelectedOffer('');
            setSelectedWant('');
        }
    }, [isOpen]);

    const fetchMySkills = async () => {
        try {
            const res = await skillsAPI.getMySkills();
            setMySkills(res.data.filter(s => s.type === 'teach'));
        } catch (error) {
            console.error("Failed to fetch my skills", error);
            toast.error("Failed to load your skills");
        }
    };

    const handleSubmit = async () => {
        if (!selectedOffer || !selectedWant) return;

        setLoading(true);
        try {
            await swapAPI.sendRequest({
                toUserId: targetUser.id,
                skillOffered: selectedOffer,
                skillWanted: selectedWant
            });
            toast.success('Swap request sent successfully!');
            onClose();
        } catch (error) {
            console.error("Failed to send request", error);
            toast.error(error.response?.data?.error || 'Failed to send request');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const targetTeachSkills = targetUser?.skills || [];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900">Request Swap with {targetUser?.name}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            What skill do you want from {targetUser?.name}?
                        </label>
                        <select
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={selectedWant}
                            onChange={(e) => setSelectedWant(e.target.value)}
                        >
                            <option value="">Select a skill...</option>
                            {targetTeachSkills.map(s => (
                                <option key={s.id || s.name} value={s.name}>{s.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            What skill can you teach in return?
                        </label>
                        <select
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={selectedOffer}
                            onChange={(e) => setSelectedOffer(e.target.value)}
                        >
                            <option value="">Select a skill...</option>
                            {mySkills.map(s => (
                                <option key={s.id} value={s.name}>{s.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="pt-2">
                        <Button
                            className="w-full"
                            onClick={handleSubmit}
                            disabled={loading || !selectedOffer || !selectedWant}
                        >
                            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Send Request'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
