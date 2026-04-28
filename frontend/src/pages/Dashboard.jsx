import { useState } from 'react';
import ProfileHeader from '../components/ProfileHeader';
import AddSkill from '../components/AddSkill';
import MySkills from '../components/MySkills';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, Award, ArrowRight, Zap, Plus, Activity } from 'lucide-react';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.07 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.4 } }
};

export default function Dashboard() {
    const [refreshSkills, setRefreshSkills] = useState(0);

    const handleSkillAdded = () => setRefreshSkills(prev => prev + 1);

    const stats = [
        {
            label: 'Total Swaps',
            value: '12',
            icon: Zap,
            change: '+3 this month',
            changePositive: true,
            glowClass: 'stat-card-glow-indigo',
            iconBg: 'bg-indigo-500/10 border-indigo-500/20',
            iconColor: 'text-indigo-400',
        },
        {
            label: 'Hours Taught',
            value: '28',
            icon: Clock,
            change: '+6 this week',
            changePositive: true,
            glowClass: 'stat-card-glow-violet',
            iconBg: 'bg-violet-500/10 border-violet-500/20',
            iconColor: 'text-violet-400',
        },
        {
            label: 'People Met',
            value: '8',
            icon: Users,
            change: '2 new this week',
            changePositive: true,
            glowClass: 'stat-card-glow-cyan',
            iconBg: 'bg-cyan-500/10 border-cyan-500/20',
            iconColor: 'text-cyan-400',
        },
        {
            label: 'Skill Points',
            value: '450',
            icon: Award,
            change: '+50 points',
            changePositive: true,
            glowClass: 'stat-card-glow-amber',
            iconBg: 'bg-amber-500/10 border-amber-500/20',
            iconColor: 'text-amber-400',
        },
    ];

    const recommended = [
        { name: 'Sarah Chen', role: 'Python Expert', match: 98, initial: 'S', skills: ['Python', 'ML', 'FastAPI'] },
        { name: 'Alex Rivera', role: 'UI/UX Master', match: 95, initial: 'A', skills: ['Figma', 'Prototyping'] },
        { name: 'Jordan Park', role: 'Data Analyst', match: 91, initial: 'J', skills: ['SQL', 'Tableau'] },
    ];

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 max-w-7xl"
        >
            {/* Profile Header */}
            <motion.div variants={itemVariants}>
                <ProfileHeader />
            </motion.div>

            {/* ─── Stats Row ─── */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, idx) => (
                    <div
                        key={idx}
                        className={`card card-hover relative overflow-hidden p-6 lg:p-7 ${stat.glowClass}`}
                    >
                        {/* Icon */}
                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border ${stat.iconBg} ${stat.iconColor} mb-5`}>
                            <stat.icon className="w-4 h-4" />
                        </div>

                        {/* Value */}
                        <p className="text-4xl font-black text-white tracking-tight leading-none">
                            {stat.value}
                        </p>
                        <p className="eyebrow mt-2">{stat.label}</p>

                        {/* Change */}
                        <div className={`mt-4 flex items-center gap-1.5 text-[12px] font-semibold ${stat.changePositive ? 'text-emerald-400' : 'text-red-400'}`}>
                            <Activity className="w-3 h-3" />
                            {stat.change}
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* ─── Main Grid ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* My Skills — spans 2 cols */}
                <motion.div variants={itemVariants} className="lg:col-span-2">
                    <div className="card p-7 lg:p-8 h-full">
                        <div className="flex items-center justify-between mb-7">
                            <div>
                                <h2 className="section-title text-[17px]">My Skill Portfolio</h2>
                                <p className="text-[13px] text-slate-500 mt-1">Skills you teach &amp; want to learn</p>
                            </div>
                            <button className="btn-ghost text-xs gap-1.5">
                                View Analytics <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                        <MySkills refreshTrigger={refreshSkills} />
                    </div>
                </motion.div>

                {/* Right Column */}
                <div className="space-y-6">

                    {/* Add New Skill */}
                    <motion.div variants={itemVariants}>
                        <div className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/10 to-violet-600/10 p-7">
                            {/* Orb decoration */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
                            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center">
                                        <Plus className="h-4 w-4 text-indigo-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white text-[14px] leading-tight">Add New Skill</h3>
                                        <p className="text-[11px] text-slate-500 mt-0.5">Teach or learn something new</p>
                                    </div>
                                </div>
                                <AddSkill onSkillAdded={handleSkillAdded} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Recommended Partners */}
                    <motion.div variants={itemVariants}>
                        <div className="card p-6 lg:p-7">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                        <TrendingUp className="h-4 w-4 text-amber-400" />
                                    </div>
                                    <h3 className="font-semibold text-white text-[15px]">Top Matches</h3>
                                </div>
                                <button className="text-[12px] text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                                    See all →
                                </button>
                            </div>

                            <div className="space-y-3">
                                {recommended.map((rec, i) => (
                                    <div
                                        key={i}
                                        className="group flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-indigo-500/25 hover:bg-indigo-500/[0.04] transition-all cursor-pointer"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="avatar w-9 h-9 rounded-xl text-[13px] shrink-0">
                                                {rec.initial}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-200 leading-tight">{rec.name}</p>
                                                <div className="flex gap-1 mt-1 flex-wrap">
                                                    {rec.skills.slice(0, 2).map(s => (
                                                        <span key={s} className="skill-tag">{s}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="badge badge-indigo shrink-0 ml-2">
                                            {rec.match}%
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-5 py-3 rounded-xl border border-white/[0.06] text-[12px] font-semibold text-slate-500 hover:text-slate-300 hover:border-white/[0.12] hover:bg-white/[0.03] transition-all uppercase tracking-wider">
                                Explore All Matches
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
