import { useState } from 'react';
import RequestSwapModal from './RequestSwapModal';

export default function UserCard({ user }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const teachSkills = user.skills || [];

    return (
        <>
            <div className="bg-slate-900/80 rounded-2xl border border-white/[0.06] p-6 backdrop-blur-sm hover:border-indigo-500/25 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
                {/* User header */}
                <div className="flex items-center gap-4 mb-5">
                    <div className="h-13 w-13 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center text-white text-xl font-bold border border-indigo-500/20 shrink-0">
                        {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="font-bold text-base text-white leading-tight">{user.name}</h3>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">Community Member</p>
                    </div>
                </div>

                <div className="space-y-4 mb-5 flex-1">
                    {user.bio && (
                        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
                            {user.bio}
                        </p>
                    )}

                    <div>
                        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-2.5">Skills</p>
                        <div className="flex flex-wrap gap-1.5">
                            {teachSkills.length > 0 ? (
                                teachSkills.map(skill => (
                                    <span key={skill.id} className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                        {skill.name}
                                    </span>
                                ))
                            ) : (
                                <span className="text-xs text-slate-600 italic">No skills listed</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-auto">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:from-indigo-500 hover:to-purple-500 transition-all transform group-hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Propose Swap
                    </button>
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
