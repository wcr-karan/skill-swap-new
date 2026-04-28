import { useState } from 'react';
import RequestSwapModal from './RequestSwapModal';
import { ArrowRight } from 'lucide-react';

export default function UserCard({ user }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const teachSkills = user.skills || [];

    const initials = user.name
        ?.split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || '?';

    return (
        <>
            <div className="card card-hover flex flex-col h-full group overflow-hidden">
                {/* Top accent line */}
                <div className="h-[1.5px] bg-gradient-to-r from-indigo-500/60 via-violet-500/40 to-transparent" />

                <div className="p-5 flex flex-col h-full">
                    {/* User header */}
                    <div className="flex items-center gap-3.5 mb-4">
                        <div className="avatar w-11 h-11 rounded-xl text-base shrink-0">
                            {initials}
                        </div>
                        <div className="overflow-hidden">
                            <h3 className="font-semibold text-[14px] text-white leading-tight truncate">{user.name}</h3>
                            <p className="text-[11px] text-slate-500 font-medium mt-0.5 uppercase tracking-wider">Community Member</p>
                        </div>
                    </div>

                    {/* Bio */}
                    {user.bio && (
                        <p className="text-[13px] text-slate-400 leading-relaxed line-clamp-2 mb-4">
                            {user.bio}
                        </p>
                    )}

                    {/* Skills */}
                    <div className="mb-5 flex-1">
                        <p className="eyebrow mb-2">Skills</p>
                        <div className="flex flex-wrap gap-1.5">
                            {teachSkills.length > 0 ? (
                                teachSkills.map(skill => (
                                    <span key={skill.id} className="skill-tag skill-tag-green">
                                        {skill.name}
                                    </span>
                                ))
                            ) : (
                                <span className="text-[12px] text-slate-600 italic">No skills listed yet</span>
                            )}
                        </div>
                    </div>

                    {/* CTA */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full btn-primary justify-center py-2.5 group-hover:shadow-glow transition-all"
                    >
                        Propose Swap
                        <ArrowRight className="w-4 h-4" />
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
