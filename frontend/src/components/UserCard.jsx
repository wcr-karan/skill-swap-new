import { useState } from 'react';
import { Button } from './Button';
import RequestSwapModal from './RequestSwapModal';

export default function UserCard({ user }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const teachSkills = user.skills || [];

    return (
        <>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-5">
                    <div className="h-14 w-14 rounded-full bg-brand/10 flex items-center justify-center text-brand text-xl font-bold border-2 border-transparent">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-slate-900 leading-tight">{user.name}</h3>
                        {/* Placeholder for role/year if available in future */}
                        <p className="text-sm text-gray-400 font-medium">Student</p>
                    </div>
                </div>

                <div className="space-y-4 mb-6 flex-1">
                    {user.bio && (
                        <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                            {user.bio}
                        </p>
                    )}

                    <div className="space-y-3">
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Has</p>
                            <div className="flex flex-wrap gap-2">
                                {teachSkills.length > 0 ? (
                                    teachSkills.map(skill => (
                                        <span key={skill.id} className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                            🟢 {skill.name}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-xs text-gray-400 italic">No skills listed</span>
                                )}
                            </div>
                        </div>
                        {/* Future: Add 'Wants' section here if backend supports public viewing of 'learn' skills */}
                    </div>
                </div>

                <div className="mt-auto">
                    <Button
                        className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-200"
                        size="sm"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Propose Swap
                    </Button>
                </div>
            </div>
            <RequestSwapModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                targetUser={user}
            />
        </>
    );
}
